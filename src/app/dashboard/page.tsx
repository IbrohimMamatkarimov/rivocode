"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Clock, Flame, Terminal, FolderKanban } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { CodeWorkbench } from "@/components/dashboard/CodeWorkbench";
import { LanguageLogo } from "@/lib/language-logos";
import { courses, challenges } from "@/lib/mock-data";
import { useLanguage } from "@/components/theme/LanguageProvider";
import { useLearningProgress } from "@/components/progress/LearningProgressProvider";
import { useAuth } from "@/components/auth/AuthProvider";
export default function DashboardPage(){
 const {t,lang}=useLanguage();const uz=lang==="uz";const {stats,weeklyActivity,getCourseProgress,isLessonComplete}=useLearningProgress();const {account,status}=useAuth();
 const started=courses.filter(course=>{const p=getCourseProgress(course);return p.completedLessons>0&&p.progress<100;});
 const current=started[0]||courses.find(course=>course.slug==="javascript-fundamentals")||courses[0];
 const progress=getCourseProgress(current);const next=current.sections.flatMap(section=>section.lessons).find(lesson=>!isLessonComplete(lesson.id));
 const name=status==="account"?account?.name?.split(" ")[0]:null;
 const maxMinutes=Math.max(1,...weeklyActivity.map(day=>day.minutes));
 const totalMinutes=weeklyActivity.reduce((sum,day)=>sum+day.minutes,0);
 const recommended=[current,...courses.filter(course=>course.id!==current.id)].slice(0,3);
 const challenge=challenges.find(item=>item.id==="fizz-buzz")||challenges[0];
 return <AppShell><div className="rivo-dashboard-v2">
 <header className="rivo-desk-title"><div><p className="rivo-eyebrow">{uz?"DASTURCHINING ISH STOLI":"THE DEVELOPER’S DESK"}</p><h1>{uz?"Keyingi g‘oyangizni quring.":"Build your next idea."}</h1><span>{name?(uz?`Xush kelibsiz, ${name}. O‘rganishda davom eting.`:`Welcome back, ${name}. Your workspace is ready.`):(uz?"O‘rganing. Sinab ko‘ring. Ishlaydigan narsa yarating.":"Learn a concept. Try it out. Make something work.")}</span></div><Link href="/courses" className="rivo-desk-browse">{t("btn_browse_courses")}<ArrowUpRight size={15}/></Link></header>
 <div className="rivo-stat-rail">{[{icon:Flame,value:stats.streakDays,label:t("stat_streak")},{icon:CheckCircle2,value:stats.completedLessons,label:t("stat_lessons")},{icon:Clock,value:stats.hoursLearned,label:t("stat_hours")},{icon:FolderKanban,value:stats.projectsCompleted,label:t("stat_projects")}].map(item=><div key={item.label}><item.icon size={17}/><span><strong>{item.value}</strong><small>{item.label}</small></span></div>)}</div>
 <div className="rivo-workspace-columns"><div className="rivo-workspace-main">
 <section className="rivo-resume-card"><div className="rivo-resume-card__top"><span className="rivo-eyebrow">{progress.completedLessons?uz?"TO‘XTAGAN JOYDAN DAVOM ETING":"PICK UP WHERE YOU LEFT OFF":uz?"BIRINCHI QADAM":"YOUR FIRST STEP"}</span>{next&&<span className="rivo-lesson-duration"><Clock size={12}/>{next.durationMinutes} {uz?"daqiqa":"min"}</span>}</div>
 <div className="rivo-resume-card__content"><LanguageLogo courseId={current.slug} className="h-14 w-14 shrink-0"/><div><h2>{current.title}</h2><p>{next?.title||(uz?"Kursni qayta ko‘rib chiqing":"Revisit your completed lessons")}</p></div><Link href={next?"/lessons/"+next.id:"/courses/"+current.slug}>{progress.completedLessons?t("btn_continue_learning"):t("btn_start_learning")}<ArrowRight size={15}/></Link></div>
 <div className="rivo-resume-progress"><span><i style={{width:progress.progress+"%"}}/></span><small>{progress.completedLessons}/{current.sections.flatMap(section=>section.lessons).length} {t("lessons_suffix")}<b>{progress.progress}%</b></small></div></section>
 <CodeWorkbench/>
 <section className="rivo-course-shelf"><div className="rivo-section-heading"><div><p className="rivo-eyebrow">{uz?"O‘Z YO‘LINGIZ":"YOUR LEARNING ROUTE"}</p><h2>{uz?"Bitta mahoratni tanlang.":"Choose a skill to grow."}</h2></div><Link href="/courses">{t("btn_view_all")}<ArrowRight size={13}/></Link></div><div className="rivo-shelf-grid">{recommended.map(course=>{const p=getCourseProgress(course);return <Link key={course.id} href={"/courses/"+course.slug} className="rivo-shelf-card"><div><LanguageLogo courseId={course.slug} className="h-9 w-9"/><ArrowUpRight size={16}/></div><h3>{course.title}</h3><p>{course.sections.flatMap(section=>section.lessons).length} {t("lessons_suffix")}</p><span className="rivo-shelf-track"><i style={{width:p.progress+"%"}}/></span><small>{p.progress}% {t("lessons_complete")}</small></Link>;})}</div></section>
 </div><aside className="rivo-workspace-aside">
 <section className="rivo-activity-card"><div className="rivo-section-heading"><span className="rivo-eyebrow">{uz?"HAFTALIK FAOLLIK":"YOUR WEEK IN CODE"}</span><Link href="/progress" aria-label={uz?"Natijalarni ochish":"Open progress"}><ArrowUpRight size={16}/></Link></div><strong>{totalMinutes}<small> {uz?"daqiqa":"min"}</small></strong><p>{uz?"Yakunlangan darslar asosida":"Based on completed lessons"}</p><div className="rivo-activity-chart">{weeklyActivity.map((day,i)=><div key={i}><span title={day.minutes+" min"}><i style={{height:Math.max(3,day.minutes/maxMinutes*100)+"%"}} data-empty={day.minutes===0}/></span><small>{day.day}</small></div>)}</div><footer>{uz?"Har bir yakunlangan dars shu yerda aks etadi.":"Every completed lesson adds to your week."}</footer></section>
 <section className="rivo-challenge-card"><div className="rivo-challenge-icon"><Terminal size={20}/></div><p className="rivo-eyebrow">{uz?"AMALIY MASHQ":"PUT IT INTO PRACTICE"}</p><h2>{challenge.title}</h2><p>{challenge.description}</p><div><span>{challenge.track}</span><span>{challenge.difficulty}</span></div><Link href={"/practice/"+challenge.id}>{uz?"Mashqni ochish":"Open challenge"}<ArrowRight size={15}/></Link></section>
 <Link href="/projects" className="rivo-project-note"><FolderKanban size={20}/><div><strong>{uz?"Bilimingizni loyihaga aylantiring":"Turn knowledge into a project"}</strong><span>{uz?"Mustaqil yaratish uchun g‘oyalar":"Ideas for building on your own"}</span></div><ArrowUpRight size={16}/></Link>
 </aside></div></div></AppShell>;
}
