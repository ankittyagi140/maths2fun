if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const l=e=>a(e,t),r={module:{uri:t},exports:i,require:l};s[t]=Promise.all(c.map((e=>r[e]||l(e)))).then((e=>(n(...e),i)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"79b22ca66d2b6993093393defe947ff4"},{url:"/_next/static/chunks/173-95c70b0cc6094e97.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/181-9d37c44c5eb73b5b.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/242-61ca666f847896e0.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/351-6f2546f52ee62f73.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/381-77d7293b66ea5b98.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/4bd1b696-fdc377434c35b674.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/517-582b01dceda1bcf5.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/874-60c51823d0509d5e.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/_not-found/page-55f864598ba8494a.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/about/page-f18b2dceb00d1e2b.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/achievements/page-1a15bd6656bee9a1.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/algebra-advance-maths-puzzles/page-fbf183439f8a0602.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/arithmetic-calculation-puzzles/page-89bab536a72c6b5a.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/geometry-spatial-puzzles/page-35efc49fbc221277.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/graph-coordinate-based-puzzles/page-7d84b27591461faa.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/maths-riddles/page-7dec96ed38b8a639.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/measurement-estimation-puzzles/page-edef07ba244f1aba.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/number-logic-puzzles/page-e8ce1178b0731a84.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/page-2115e700b798dc0f.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/pattern-recognition-matching-puzzles/page-f3c3fc9a66ba2c33.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/all-puzzles/time-based-multiplayer-puzzles/page-a514e6dad883e5ed.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/help/page-99cce07c7e1b6082.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/layout-57497cde8c5d31be.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/learn-more/page-45c0c0cff0f577f8.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/login/page-8d5594a6d81d3f59.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/page-246cbd11d05d3105.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/privacy/page-7e115e849ed36efe.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/profile/page-bf9366e24ec9f465.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/signup/page-c983f56f2aadca69.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/app/terms/page-4764c7525ec222d7.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/f71d1b72-d12416c83d534be5.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/main-app-7877a41198fc11e4.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/main-ecd615a9318f36f1.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/pages/_app-04c695bc05fa7935.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/pages/_error-da21db4e7d4f6e09.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-de63a27a032969f5.js",revision:"ckyVsJIKxTKUef7l_l_gw"},{url:"/_next/static/ckyVsJIKxTKUef7l_l_gw/_buildManifest.js",revision:"1f3df7064886617191a5f782ac2a69e2"},{url:"/_next/static/ckyVsJIKxTKUef7l_l_gw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/css/eb5e93e8f9f88d85.css",revision:"eb5e93e8f9f88d85"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/favicon.ico",revision:"42029591cd9cdd92effd78cbf355a5a6"},{url:"/manifest.json",revision:"66082b4b968b0f2eb1720ac6b0e6bb8b"},{url:"/maths2fun.png",revision:"6e997b5e810b551c7355dd2040e06354"},{url:"/maths2fun1.png",revision:"62781d57b897a69ff97d46be95a68c17"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
