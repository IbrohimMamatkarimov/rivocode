"use client";
import { useId, useEffect, useRef, useState } from "react";
export function RobotMascot({mood="idle",className=""}:{mood?:"idle"|"thinking"|"happy"|"error";tone?:"blue"|"forest";className?:string}){
 const id=useId().replace(/:/g,"");

 const host=useRef<HTMLSpanElement>(null);
 const [action,setAction]=useState("idle");
 useEffect(()=>{
  const el=host.current;if(!el)return;
  const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(motion.matches)return;
  let visible=false;let step=0;
  const sequence=["look","walk","wave","idle","happy","idle"];
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.2});observer.observe(el);
  const timer=window.setInterval(()=>{if(visible&&!document.hidden){setAction(sequence[step%sequence.length]);step++;}},4200);
  return()=>{clearInterval(timer);observer.disconnect();};
 },[]);
 return <span ref={host} data-action={mood==="idle"?action:mood} onPointerEnter={()=>setAction("wave")} onPointerLeave={()=>setAction("idle")} className={"robot-mascot brand-mascot code-mascot "+className} data-mood={mood} aria-hidden="true"><svg viewBox="0 0 160 170" fill="none">
 <defs><linearGradient id={id+"case"} x1="30" y1="31" x2="126" y2="142" gradientUnits="userSpaceOnUse"><stop stopColor="#c4d8f5"/><stop offset="1" stopColor="#7598c9"/></linearGradient></defs>
 <ellipse cx="80" cy="161" rx="36" ry="5" fill="#104e4a" opacity=".12"/>
 <g className="code-float"><g className="bot-leg-left"><path d="M62 142v11" stroke="#5d7fae" strokeWidth="9" strokeLinecap="round"/><path d="M52 155h18" stroke="#c2d7f2" strokeWidth="9" strokeLinecap="round"/></g><g className="bot-leg-right"><path d="M99 142v11" stroke="#5d7fae" strokeWidth="9" strokeLinecap="round"/><path d="M91 155h18" stroke="#c2d7f2" strokeWidth="9" strokeLinecap="round"/></g>
 <rect x="47" y="103" width="66" height="42" rx="12" fill={"url(#"+id+"case)"} stroke="#5b80af"/>
 <rect x="58" y="112" width="44" height="24" rx="5" fill="#304f7d"/><circle cx="80" cy="124" r="8" fill="#99bdf4" opacity=".12"/><circle cx="80" cy="124" r="5" stroke="#bad4ff" strokeWidth="1.3"/><circle cx="80" cy="124" r="2.5" fill="#dfebff"/><path d="M63 121h4m-4 4h4m26-4h4m-4 4h4" stroke="#8caede" strokeWidth="1.3" strokeLinecap="round"/>
 <path d="M51 111h4m-4 5h4m-4 5h4M105 111h4m-4 5h4m-4 5h4" stroke="#e4efff" strokeWidth="1.3" opacity=".7"/>
 <circle cx="62" cy="140" r="1.5" fill="#dbb978"/><circle cx="68" cy="140" r="1.5" fill="#b7d1fa"/><path d="M94 138h9m-9 3h6" stroke="#4c6b95" strokeWidth="1.2"/>
 <path d="m46 116-16 12" stroke="#6b8db9" strokeWidth="8" strokeLinecap="round"/><path d="M25 121c-7 0-7 6-3 7-4 1-4 7 3 7" stroke="#c3d9f7" strokeWidth="5" strokeLinecap="round"/>
 <g className="code-wave"><path d="m114 115 18-16" stroke="#6b8db9" strokeWidth="8" strokeLinecap="round"/><path d="M138 91c7 0 7 6 3 7 4 1 4 7-3 7" stroke="#c3d9f7" strokeWidth="5" strokeLinecap="round"/></g>
 <rect x="19" y="59" width="6" height="21" rx="3" fill="#9dbce6"/><path d="M21 64v3m0 4v3" stroke="#314c74" strokeWidth="1.4"/>
 <rect x="135" y="59" width="6" height="21" rx="3" fill="#9dbce6"/><path d="M138 64v10" stroke="#314c74" strokeWidth="1.4"/>
 <path d="M80 30V18" stroke="#849fc5" strokeWidth="3"/><path d="m73 14 7-6 7 6-7 6-7-6Z" fill="#c1d6f8" stroke="#7696c2"/>
 <g className="code-head"><path d="M26 49a15 15 0 0 1 15-15h78a15 15 0 0 1 15 15v42a15 15 0 0 1-15 15H41a15 15 0 0 1-15-15V49Z" fill={"url(#"+id+"case)"} stroke="#5b80af" strokeWidth="2"/>
 <rect x="33" y="42" width="94" height="55" rx="10" fill="#192b46"/><path d="M34 54h92" stroke="#3c5981" strokeWidth="1"/><circle cx="41" cy="48" r="1.8" fill="#efae89"/><circle cx="48" cy="48" r="1.8" fill="#e6cd7e"/><circle cx="55" cy="48" r="1.8" fill="#8ed5a8"/>
 <g className="code-bracket-eyes"><path d="m62 64-10 8 10 8M98 64l10 8-10 8" stroke="#c0d8ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g>
 <path d="m77 64-4 14" stroke="#96b4e1" strokeWidth="1.6" strokeLinecap="round"/>
 <path d="M37 62h4v13h-4m86-13h-4v13h4" stroke="#5878a2" strokeWidth="1"/>
 <path d="M40 89h10m-10 3h6m64-3h9" stroke="#8ba9d0" strokeWidth="1" opacity=".6"/>
 <path className="code-cursor" d="M74 86h13" stroke="#cfddf8" strokeWidth="3" strokeLinecap="round"/>
 </g></g></svg></span>;
}
