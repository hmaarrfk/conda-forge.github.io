"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[14321],{82547:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var o=t(8518),i=t(74848),r=t(28453);const s={},a="Migration to Unique Feedstock Tokens per Provider",c={authorsImageUrls:[]},l=[];function d(e){const n={code:"code",p:"p",...(0,r.R)(),...e.components};return(0,i.jsxs)(n.p,{children:["We will be slowly migrating ",(0,i.jsx)(n.code,{children:"conda-forge"})," to use unique feedstock tokens per provider. The feedstock token is used to allow maintainers to copy packages from our staging area to the main ",(0,i.jsx)(n.code,{children:"conda-forge"})," channel. This change will improve our security posture and help us limit the impact of any leaked tokens. During this migration we will also be using newly implemented feedstock token expiration times to avoid race conditions between token changes and running builds."]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(96540);const i={},r=o.createContext(i);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:n},e.children)}},8518:e=>{e.exports=JSON.parse('{"permalink":"/news/2024/11/08/unique-feedstock-token-per-provider-migration","source":"@site/news/2024-11-08-unique-feedstock-token-per-provider-migration.md","title":"Migration to Unique Feedstock Tokens per Provider","description":"We will be slowly migrating conda-forge to use unique feedstock tokens per provider. The feedstock token is used to allow maintainers to copy packages from our staging area to the main conda-forge channel. This change will improve our security posture and help us limit the impact of any leaked tokens. During this migration we will also be using newly implemented feedstock token expiration times to avoid race conditions between token changes and running builds.","date":"2024-11-08T00:00:00.000Z","tags":[],"hasTruncateMarker":false,"authors":[],"frontMatter":{},"unlisted":false,"prevItem":{"title":"Updating our default docker images","permalink":"/news/2024/11/22/new-images"},"nextItem":{"title":"New time available for conda-forge core meetings","permalink":"/news/2024/11/07/new-time-core-meetings"}}')}}]);