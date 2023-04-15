var l=(e,t={})=>{let n=typeof t=="number"?{status:t}:t,s=new Headers(n.headers);return s.has("Content-Type")||s.set("Content-Type","application/json; charset=utf-8"),new Response(JSON.stringify(e),{...n,headers:s})};function i(...e){}async function E(e){i("Service worker installed")}async function x(e){i("Service worker activated")}var h="asset-cache",g="data-cache",y="document-cache",_=["/build/","/icons/"];async function k(e){console.debug("sync manifest");let t=new Map,[n,s,c]=await Promise.all([caches.open(g),caches.open(y),caches.open(h)]),d=e.data.manifest,b=Object.values(d.routes);for(let a of b){if(a.id.includes("$")){console.debug("parametrized route",a.id);continue}w(a)}await Promise.all(t.values());function w(a){let r=f(a);if(a.hasLoader&&S(a),a.module&&t.set(a.module,m(a.module)),a.imports)for(let o of a.imports)i(a.index,a.parentId,a.imports,a.module),!t.has(o)&&t.set(o,m(o));t.set(r,s.add(r).catch(o=>{console.debug(`Failed to cache document ${r}:`,o)}))}function S(a){let r=f(a),R=`?${new URLSearchParams({_data:a.id}).toString()}`,u=r+R;t.has(u)||(console.debug("Caching data for",u),t.set(u,n.add(u).catch(C=>{console.debug(`Failed to cache data for ${u}:`,C)})))}async function m(a){if(!await c.match(a))return console.debug("Caching asset",a),c.add(a).catch(r=>{console.debug(`Failed to cache asset ${a}:`,r)})}function f(a){let r="";if(a.path&&a.path.length>0&&(r="/"+a.path),a.parentId){let o=f(d.routes[a.parentId]);o&&(r=o+r)}return r}}async function q(e){let t=new URL(e.request.url);if(T(e.request)){let n=await caches.match(e.request,{cacheName:h,ignoreVary:!0,ignoreSearch:!0});if(n)return i("Serving asset from cache",t.pathname),n;i("Serving asset from network",t.pathname);let s=await fetch(e.request);return s.status===200&&await(await caches.open(h)).put(e.request,s.clone()),s}if(A(e.request))try{i("Serving data from network",t.pathname+t.search);let n=await fetch(e.request.clone());return await(await caches.open(g)).put(e.request,n.clone()),n}catch{i("Serving data from network failed, falling back to cache",t.pathname+t.search);let s=await caches.match(e.request);return s?(s.headers.set("X-Remix-Worker","yes"),s):l({message:"Network Error"},{status:500,headers:{"X-Remix-Catch":"yes","X-Remix-Worker":"yes"}})}if(P(e.request)){let n=new URL(e.request.url);return console.debug("Serving document from network",n.pathname),caches.open(y).then(s=>fetch(e.request.clone()).then(c=>(s.put(e.request,c.clone()),c)).catch(async c=>{console.debug("Serving document from network failed, falling back to cache",n.pathname);let d=await caches.match(e.request);if(!d)throw c;return d}))}return fetch(e.request.clone())}var L=e=>{let t=JSON.parse(e.data.text()),n=t.title?t.title:"Remix PWA",s={body:t.body?t.body:"Notification Body Text",icon:t.icon?t.icon:"/android-icon-192x192.png",badge:t.badge?t.badge:"/android-icon-48x48.png",dir:t.dir?t.dir:"auto",image:t.image?t.image:void 0,silent:t.silent?t.silent:!1};self.registration.showNotification(n,{...s})};function p(e,t){return t.includes(e.method.toLowerCase())}function T(e){return p(e,["get"])&&_.some(t=>e.url.includes(t))}function A(e){let t=new URL(e.url);return p(e,["get"])&&t.searchParams.get("_data")}function P(e){return p(e,["get"])&&e.mode==="navigate"}self.addEventListener("install",e=>{e.waitUntil(E(e).then(()=>self.skipWaiting()))});self.addEventListener("activate",e=>{e.waitUntil(x(e).then(()=>self.clients.claim()))});self.addEventListener("message",e=>{e.waitUntil(k(e))});self.addEventListener("push",e=>{e.waitUntil(L(e))});self.addEventListener("fetch",e=>{e.respondWith((async()=>{let t={};try{t.response=await q(e)}catch(n){t.error=n}return F(e,t)})())});async function F(e,{error:t,response:n}){return n}
