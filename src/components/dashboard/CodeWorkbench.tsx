"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Terminal, Play, Braces } from "lucide-react";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { getCourseBySlug } from "@/lib/mock-data";
const EXAMPLES=[
 {id:"javascript",label:"JavaScript",file:"hello.js",course:"javascript-fundamentals",code:'const names = ["Aziza", "Temur", "Ali"];\n\nconst greetings = names.map(name => {\n  return "Hello, " + name + "!";\n});\n\nconsole.log(greetings.join("\\n"));',output:"Hello, Aziza!\nHello, Temur!\nHello, Ali!"},
 {id:"python",label:"Python",file:"scores.py",course:"python-basics",code:'scores = [72, 85, 93]\n\npassed = [\n    score for score in scores\n    if score >= 80\n]\n\nprint(passed)',output:"[85, 93]"},
 {id:"html",label:"HTML",file:"button.html",course:"html-css",code:'<button\n  onclick="this.textContent=\'Nice work!\'">\n  Try me\n</button>\n\n<!-- Small interactions matter. -->',output:""},
];
export function CodeWorkbench(){
 const {lang}=useLanguage();const uz=lang==="uz";const [active,setActive]=useState("javascript");const [show,setShow]=useState(false);const [copied,setCopied]=useState(false);const [previewClicked,setPreviewClicked]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const example=EXAMPLES.find(item=>item.id===active)!;
 const lesson=getCourseBySlug(example.course)?.sections[0]?.lessons[0];
 function select(id:string){setActive(id);setShow(false);setCopied(false);setPreviewClicked(false);}
 async function copy(){try{await navigator.clipboard.writeText(example.code);setCopied(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(false),1600);}catch{setCopied(false);}}
 return <section className="rivo-workbench" aria-labelledby="workbench-title">
 <header><div><span className="rivo-eyebrow">{uz?"KOD BILAN TANISHING":"A SMALL IDEA, MADE REAL"}</span><h2 id="workbench-title">{uz?"Kodga yaqinroq keling.":"Get closer to the code."}</h2></div><span className="rivo-editor-badge"><Braces size={13}/>{uz?"Interaktiv namuna":"Interactive example"}</span></header>
 <div className="rivo-editor"><div className="rivo-editor-tabs" role="tablist" aria-label="Code examples">{EXAMPLES.map(item=><button key={item.id} type="button" role="tab" id={"example-tab-"+item.id} aria-selected={active===item.id} aria-controls={"example-panel-"+item.id} onClick={()=>select(item.id)}>{item.label}<span/></button>)}<button type="button" className="rivo-copy" aria-label={uz?"Kodni nusxalash":"Copy code"} onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>}</button></div>
 <div className="rivo-editor-file"><span/><span>{example.file}</span><small>{uz?"Namuna":"Example"}</small></div>
 <div id={"example-panel-"+active} role="tabpanel" aria-labelledby={"example-tab-"+active} className="rivo-editor-code"><pre><code>{example.code.split("\n").map((line,index)=><span className="rivo-code-line" key={index}><i>{index+1}</i><span data-comment={line.trim().startsWith("//")||line.trim().startsWith("<!--")}>{line||" "}</span></span>)}</code></pre></div>
 <div className="rivo-editor-footer"><button type="button" onClick={()=>setShow(value=>!value)} aria-expanded={show}><Play size={13}/>{show?(uz?"Yashirish":"Hide result"):(uz?"Natijani ko‘rish":"Preview result")}</button><Link href={lesson?"/lessons/"+lesson.id:"/courses/"+example.course}>{uz?"Darsni ochish":"Open lesson"}<ArrowUpRight size={13}/></Link></div>
 {show&&<div className="rivo-editor-output" aria-live="polite"><span><Terminal size={13}/>{uz?"Namunaviy natija":"Example output"}</span>{active==="html"?<div className="rivo-html-preview"><button type="button" onClick={()=>setPreviewClicked(true)}>{previewClicked?"Nice work!":"Try me"}</button></div>:<pre>{example.output}</pre>}<small>{uz?"Bu namuna ko‘rinishi. Mustaqil kod yozish uchun darsni oching.":"Illustrative preview. Open the lesson to write your own code."}</small></div>}
 </div></section>;
}
