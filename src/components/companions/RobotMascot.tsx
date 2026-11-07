"use client";
import { useId } from "react";
export function RobotMascot({mood="idle",className=""}:{mood?:"idle"|"thinking"|"happy"|"error";tone?:"blue"|"forest";className?:string}){
 const id=useId().replace(/:/g,"");
 return <span className={"robot-mascot brand-mascot code-mascot "+className} data-mood={mood} aria-hidden="true"><svg viewBox="0 0 160 170" fill="none">
 <defs><linearGradient id={id+"case"} x1="30" y1="31" x2="126" y2="142" gradientUnits="userSpaceOnUse"><stop stopColor="#b5e9e3"/><stop offset="1" stopColor="#58a8a5"/></linearGradient></defs>
 <ellipse cx="80" cy="161" rx="36" ry="5" fill="#104e4a" opacity=".12"/>
 <g className="code-float"><path d="M62 142v11M99 142v11" stroke="#43847f" strokeWidth="9" strokeLinecap="round"/><path d="M52 155h18M91 155h18" stroke="#afdcd5" strokeWidth="9" strokeLinecap="round"/>
 <rect x="47" y="103" width="66" height="42" rx="12" fill={"url(#"+id+"case)"} stroke="#438c89"/>
 <rect x="58" y="112" width="44" height="24" rx="5" fill="#125451"/><circle cx="80" cy="124" r="8" fill="#7be2c1" opacity=".12"/><circle cx="80" cy="124" r="5" stroke="#91e7cc" strokeWidth="1.3"/><circle cx="80" cy="124" r="2.5" fill="#b9ffe4"/><path d="M63 121h4m-4 4h4m26-4h4m-4 4h4" stroke="#64b8a7" strokeWidth="1.3" strokeLinecap="round"/>
 <path d="M51 111h4m-4 5h4m-4 5h4M105 111h4m-4 5h4m-4 5h4" stroke="#d5fff0" strokeWidth="1.3" opacity=".7"/>
 <circle cx="62" cy="140" r="1.5" fill="#dbb978"/><circle cx="68" cy="140" r="1.5" fill="#a5f3d8"/><path d="M94 138h9m-9 3h6" stroke="#397a78" strokeWidth="1.2"/>
 <path d="m46 116-16 12" stroke="#4e9390" strokeWidth="8" strokeLinecap="round"/><path d="M25 121c-7 0-7 6-3 7-4 1-4 7 3 7" stroke="#b3e7df" strokeWidth="5" strokeLinecap="round"/>
 <g className="code-wave"><path d="m114 115 18-16" stroke="#4e9390" strokeWidth="8" strokeLinecap="round"/><path d="M138 91c7 0 7 6 3 7 4 1 4 7-3 7" stroke="#b3e7df" strokeWidth="5" strokeLinecap="round"/></g>
 <rect x="19" y="59" width="6" height="21" rx="3" fill="#78c4ba"/><path d="M21 64v3m0 4v3" stroke="#214f54" strokeWidth="1.4"/>
 <rect x="135" y="59" width="6" height="21" rx="3" fill="#78c4ba"/><path d="M138 64v10" stroke="#214f54" strokeWidth="1.4"/>
 <path d="M80 30V18" stroke="#629f99" strokeWidth="3"/><path d="m73 14 7-6 7 6-7 6-7-6Z" fill="#a4ebcb" stroke="#5ba193"/>
 <g className="code-head"><path d="M26 49a15 15 0 0 1 15-15h78a15 15 0 0 1 15 15v42a15 15 0 0 1-15 15H41a15 15 0 0 1-15-15V49Z" fill={"url(#"+id+"case)"} stroke="#438c89" strokeWidth="2"/>
 <rect x="33" y="42" width="94" height="55" rx="10" fill="#092c32"/><path d="M34 54h92" stroke="#286164" strokeWidth="1"/><circle cx="41" cy="48" r="1.8" fill="#efae89"/><circle cx="48" cy="48" r="1.8" fill="#e6cd7e"/><circle cx="55" cy="48" r="1.8" fill="#8ed5a8"/>
 <g className="code-bracket-eyes"><path d="m62 64-10 8 10 8M98 64l10 8-10 8" stroke="#a8efd3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g>
 <path d="m77 64-4 14" stroke="#72c1ad" strokeWidth="1.6" strokeLinecap="round"/>
 <path d="M37 62h4v13h-4m86-13h-4v13h4" stroke="#37797a" strokeWidth="1"/>
 <path d="M40 89h10m-10 3h6m64-3h9" stroke="#71ac9d" strokeWidth="1" opacity=".6"/>
 <path className="code-cursor" d="M74 86h13" stroke="#d3e9be" strokeWidth="3" strokeLinecap="round"/>
 </g></g></svg></span>;
}
