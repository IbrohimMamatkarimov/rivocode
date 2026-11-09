"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Send, X, ArrowRight, Code2 } from "lucide-react";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { courses } from "@/lib/mock-data";
export function RivoCompanion(){
 const {lang}=useLanguage();const uz=lang==="uz";const pathname=usePathname();
 const [open,setOpen]=useState(false);const [question,setQuestion]=useState("");const [answer,setAnswer]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(false);
 const input=useRef<HTMLTextAreaElement>(null);const button=useRef<HTMLButtonElement>(null);const controller=useRef<AbortController|null>(null);
 useEffect(()=>()=>controller.current?.abort(),[]);
 useEffect(()=>{if(!open)return;input.current?.focus();const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);button.current?.focus();}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[open]);
 async function ask(){
 if(!question.trim()||loading)return;setLoading(true);setError("");setAnswer("");
 const abort=new AbortController();controller.current=abort;const timer=window.setTimeout(()=>abort.abort(),25000);
 const course=courses.find(item=>pathname.includes(item.slug)||item.sections.some(section=>section.lessons.some(lesson=>pathname.endsWith("/"+lesson.id))));
 const lesson=(course?"Course: "+course.title+". "+course.description:"RivoCode programming study workspace.")+" Page: "+pathname;
 try{const response=await fetch("/api/student-help",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:question.trim(),lesson:lesson.slice(0,4000)}),signal:abort.signal});const data=await response.json();if(!response.ok)throw Error(data.error||(uz?"Hozir javob olib bo‘lmadi.":"Could not get an answer right now."));setAnswer(data.answer||"");}
 catch(cause){setError(cause instanceof Error?cause.message:(uz?"Qayta urinib ko‘ring.":"Please try again."));}
 finally{window.clearTimeout(timer);setLoading(false);}
 }
 const ideas=uz?["Bu kodni tushuntiring","Keyin nimani o‘rganay?","Xatoni qanday topaman?"]:["Explain this code","What should I learn next?","Help me debug"];
 return <><button ref={button} type="button" className="rivo-tutor-trigger" aria-expanded={open} aria-controls="rivo-tutor" onClick={()=>setOpen(value=>!value)}><span className="brand-mascot"><Code2 size={22}/></span><span><strong>Byte</strong><small>{uz?"Sizning kod yo‘l ko‘rsatuvchingiz":"Your coding guide"}</small></span></button>
 {open&&<section id="rivo-tutor" role="dialog" aria-label="Rivo coding companion" className="rivo-tutor-panel"><header><span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-slate-900"><Code2 size={22}/></span><div><h2>{uz?"Byte bilan birga o‘rganing":"Figure it out with Byte"}</h2><p>{uz?"Bir vaqtning o‘zida bitta tushuncha.":"One concept at a time."}</p></div><button type="button" aria-label={uz?"Yopish":"Close assistant"} onClick={()=>{setOpen(false);button.current?.focus();}}><X size={17}/></button></header>
 <div className="rivo-tutor-body"><p>{uz?"Salom! Nima ustida ishlayapsiz? Kodni yoki savolingizni yuboring, keyingi qadamni birga tushunamiz.":"Hey! What are you working on? Share the code or concept that’s confusing you, and we’ll find the next small step."}</p><div>{ideas.map(idea=><button key={idea} type="button" onClick={()=>{setQuestion(idea);input.current?.focus();}}>{idea}<ArrowRight size={11}/></button>)}</div><div aria-live="polite" aria-busy={loading}>{loading&&<p>{uz?"O‘ylayapman…":"Thinking it through…"}</p>}{answer&&<article>{answer}</article>}</div>{error&&<p role="alert" className="text-danger">{error}</p>}<small>{uz?"Savolingiz va kurs konteksti Google Gemini xizmatiga yuboriladi. Javobni tekshiring.":"Your message and course context are sent to Google Gemini. Check the reasoning."}</small></div>
 <form onSubmit={event=>{event.preventDefault();void ask();}}><textarea ref={input} value={question} onChange={event=>setQuestion(event.target.value)} maxLength={2000} placeholder={uz?"Qayerda qiynaldingiz?":"Where are you stuck?"} aria-label={uz?"Savolingiz":"Your question"}/><button type="submit" aria-label={uz?"Yuborish":"Send question"} disabled={loading||!question.trim()}><Send size={16}/></button></form>
 </section>}</>;
}
