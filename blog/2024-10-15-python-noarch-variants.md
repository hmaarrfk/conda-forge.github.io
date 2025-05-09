---
authors:
  - isuruf
tags: [infrastructure]
---

# Noarch variant packages for Python packages on conda-forge

We introduce noarch variants for python packages on conda-forge
that have compiled extensions but with pure python reference
implementations to make life easier for early adopters of
new python variants.

<!-- truncate -->

conda-forge packages have always been batteries included. When
a package has some build options turned off by default to reduce
dependencies, we have enabled these options to give the most
functionality and performance to our users.

In the Python world, some packages are written in C/C++/Cython
to get the most performance out of a package. However these packages
sometimes have a reference implementation written in Python. The Python
reference implementation is a good way to check the C/C++/Cython
code against a much simpler python implementation and is also
useful for platforms like PyPy where the C/C++/Cython implementation
can be slower than the Python reference implementation due to the
emulation of the Python C/C++ API by PyPy. For example for the Cython
package, setting the `CYTHON_NO_COMPILE` environment variable
when building the Cython wheel itself, it will use the Python reference
implementation. The only way to figure out if a package has a Python
reference implementation is to look at the library's source code
to see if `extensions` are optional.

To support platforms like PyPy, some packages build wheels with
compiled extensions for the platforms that are
known to be more performant with the compiled extension, but also
provide a universal pure Python wheel for the other platforms.
This also provides a way for new Python versions and variants
like the free-threading Python build to use these packages by the
early adopters of these Python versions.

On conda-forge we usually have compiled Python packages, but provide
no reference implementation. This means early adopters of new Python
versions need to wait for the conda-forge bot managed by @conda-forge/bot
team to start the migration and rebuild the packages. For example the
free-threading Python 3.13 build is still paused as
conda-forge has decided to focus on the default (GIL enabled)
Python 3.13 build first while upstream packages work on
supporting free-threading.
Another issue is that some packages have cyclic dependencies at build
or test time and this requires some manual handling.

We have been adding `noarch: python` variants for some feedstocks
so that the compiled extension has higher priority and the pure
Python extension has lower priority, which makes the conda solver
use the `noarch: python` variant if no suitable compiled variant
is available. One issue is that the linter might not like selectors
on noarch recipes. We added an option

```yaml
linter:
  skip:
    - lint_noarch_selectors
```

to `conda-forge.yml` that will make the linter skip this warning/error.

We build the two variants using a `recipe/conda_build_config.yaml`
with the contents,

```yaml
use_noarch:
- true       # [linux64]
- false
```

Then in `recipe/meta.yaml` we make the following changes

```yaml
build:
  noarch: python           # [use_noarch]
  track_features:          # [use_noarch]
    - pyyaml_no_compile    # [use_noarch]

requirements:
  build:
    - {{ compiler('c') }}
    - {{ stdlib("c") }}
  host:
    - python                        # [not use_noarch]
    - python {{ python_min }}.*     # [use_noarch]
    - setuptools
    - pip
  run:
    - python                        # [not use_noarch]
    - python >={{ python_min }}.*   # [use_noarch]
    - yaml

test:
  requires:
    - pip
    - python {{ python_min }}.*     # [use_noarch]
```

Finally in the build script, we use the env variable `use_noarch`
to set an option to force the extension to be pure python.
In the case of pyyaml, we can force that by setting the env variable
`PYYAML_NO_LIBYAML`. A `recipe/build.sh` might look like,

```bash
if [[ "$use_noarch" == "true" ]]; then
  export PYYAML_NO_LIBYAML=1
fi
$PYTHON -m pip install .
```

We list some PRs here as a reference for conda-forge maintainers who
want to experiment.

- [pyyaml](https://github.com/conda-forge/pyyaml-feedstock/pull/55)
- [coverage](https://github.com/conda-forge/coverage-feedstock/pull/123)
- [cython](https://github.com/conda-forge/cython-feedstock/pull/147)
- [aiohttp](https://github.com/conda-forge/aiohttp-feedstock/pull/99)
