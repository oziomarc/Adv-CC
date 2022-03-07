import{g as L,A as W,G as x,C as p,T as w,S as g,a as D,b as k}from"./vendor.5897ce6b.js";const G=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}};G();const O=e=>new Promise(u=>{e.loader.add("world1","assets/hello-world.png").add("star","./dist/assets/star.png").load(()=>{u()})});let m=L.timeline(),z=[],y={planetData:{radius:90,color:16777215,speed:10,isPressed:!1}};const A=async()=>{let e=new W;document.body.style.margin="0",e.renderer.view.style.position="absolute",e.renderer.view.style.display="block",e.renderer.backgroundColor=2872,e.renderer.resize(window.innerWidth,window.innerHeight),await O(e),window.addEventListener("resize",i=>{e.renderer.resize(window.innerWidth,window.innerHeight)}),e.stage.interactive=!0;let u=1e3;for(let i=200;i<u;i+=160){let o=new x;o.interactive=!0,o.buttonMode=!0,o.lineStyle(1,16777215),o.drawCircle(innerWidth/2,innerHeight/2,i),o.on("pointerover",N),e.stage.addChild(o)}const s=new p,d=new p,t=new p,n=new p,r=new p;e.stage.addChild(s),e.stage.addChild(s,d,t,n,r);const C=w.from("./dist/assets/star.png"),b=w.from("./dist/assets/p1.png"),M=w.from("./dist/assets/p2.png"),P=w.from("./dist/assets/p3.png"),H=w.from("./dist/assets/p4.png"),a=new g(b),l=new g(M),c=new g(P),h=new g(H);a.scale.set(.08),a.anchor.set(.5),a.x=500,a.y=150,d.addChild(a),d.x=e.screen.width/2,d.y=e.screen.height/2,d.pivot.x=d.width/2,d.pivot.y=d.height/2,l.scale.set(.07),l.x=500,l.y=150,t.addChild(l),t.x=e.screen.width/2,t.y=e.screen.height/2,t.pivot.x=t.width/2+190,t.pivot.y=t.height/2,c.scale.set(30),c.x=500,c.y=150,n.addChild(c),n.x=e.screen.width/2,n.y=e.screen.height/2,n.pivot.x=n.width/2+970,n.pivot.y=n.height/2,h.scale.set(.1),h.x=500,h.y=150,r.addChild(h),r.x=e.screen.width/2,r.y=e.screen.height/2,r.pivot.x=r.width/2,r.pivot.y=r.height/2+120;for(let i=0;i<80;i++){const o=new g(C);o.scale.set(.02),o.anchor.set(.5),o.x=Math.floor(Math.random()*window.innerWidth),o.y=Math.floor(Math.random()*window.innerHeight),s.addChild(o),console.log("drawing stars...")}s.x=e.screen.width/2,s.y=e.screen.height/2,s.pivot.x=s.width/2,s.pivot.y=s.height/2,e.ticker.add(i=>{s.rotation+=15e-5*i,d.rotation-=.009*i,t.rotation-=.009*i,n.rotation-=.009*i,r.rotation-=.009*i});let f=new x;f.beginFill(16755200),f.drawCircle(innerWidth/2,innerHeight/2,100);let S=new D({color:16608040,distance:45});f.filters=[S],a.interactive=!0,a.buttonMode=!0,l.interactive=!0,l.buttonMode=!0,c.interactive=!0,c.buttonMode=!0,h.interactive=!0,h.buttonMode=!0,a.on("pointerdown",I),a.on("pointerdown",()=>{y.planetData.isPressed=!0}),a.on("pointerup",()=>{y.planetData.isPressed=!1}),l.x=400,l.y=200,l.width=100,l.height=100,c.x=300,c.y=200,c.width=100,c.height=100,h.x=100,h.y=200,h.width=100,h.height=100,document.body.appendChild(e.view),e.stage.addChild(f),e.stage.addChild();const v=new k;v.add(y.planetData,"radius",50,100);var F={color1:"#FF0000",color2:[0,128,255],color3:[0,128,255,.3],color4:{h:350,s:.9,v:.3}};v.add(y.planetData,"speed",10,100),v.addColor(F,"color1"),z.forEach((i,o)=>{o%2==0?m.to(i,{height:window.innerHeight,duration:3.2},0+o/50).to(i,{height:0,duration:1.5},1.7+o/50):m.to(i,{height:-window.innerHeight+20,duration:1.5},o/19).to(i,{height:0,duration:3},1.7+o/20)}),m.repeat(4),e.ticker.add(E)};function E(){}function N(e){console.log("Pointer over ring"),this.isover=!0,e.clear,e.lineStyle(1,2872)}function I(){}A();
