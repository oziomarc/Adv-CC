import{g as c,A as u,G as h}from"./vendor.d4b5e681.js";const f=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}};f();let s=c.timeline(),a=[],d=[];const w=async()=>{let r=new u;document.body.style.margin="0",r.renderer.view.style.position="absolute",r.renderer.view.style.display="block",r.renderer.resize(window.innerWidth,window.innerHeight),window.addEventListener("resize",e=>{r.renderer.resize(window.innerWidth,window.innerHeight)});let o=Math.floor(window.innerWidth/10);for(let e=0;e<o;++e){const i=new h;i.x=0,i.y=window.innerHeight,i.x+=20*e,a.push(i),r.stage.addChild(i),d[e]={height:0,width:15}}document.body.appendChild(r.view),d.forEach((e,i)=>{i%2==0?s.to(e,{height:window.innerHeight,duration:3.2},0+i/50).to(e,{height:0,duration:1.5},1.7+i/50):s.to(e,{height:-window.innerHeight+20,duration:1.5},i/19).to(e,{height:0,duration:3},1.7+i/20)}),s.repeat(4),r.ticker.add(p)};function p(r){a.forEach((o,e)=>{o.clear(),o.beginFill(16768e3),o.drawRoundedRect(0,0,d[e].width,d[e].height,30)})}w();