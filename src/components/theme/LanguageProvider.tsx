"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "uz";

export const LANG_STORAGE_KEY = "rivocode-lang";

const dictionaries = {
  en: {
    nav_dashboard: "Dashboard",
    nav_learn: "Learn",
    nav_courses: "Courses",
    nav_practice: "Practice",
    nav_projects: "Projects",
    nav_progress: "Progress",
    nav_settings: "Settings",
    nav_profile: "Profile",
    nav_section_studio: "Studio",
    workspace_label: "Workspace",
    title_dashboard: "Dashboard",
    title_learn: "Learn",
    title_courses: "Explore Courses",
    title_practice: "Practice",
    title_projects: "Projects",
    title_progress: "Progress",
    title_profile: "Profile",
    title_settings: "Settings",
    title_course: "Course",
    title_lesson: "Lesson",
    title_default: "RivoCode",
    hero_eyebrow: "Your workspace",
    hero_subtitle:
      "Continue a lesson or choose a project. Practice in the browser as you learn.",
    hero_greeting_morning: "Good morning",
    hero_greeting_afternoon: "Good afternoon",
    hero_greeting_evening: "Good evening",
    hero_question: "what will you build today?",
    hero_quote: "Start with one small project.",
    hero_quote_author: "Leonardo da Vinci",
    btn_continue_learning: "Continue Learning",
    btn_start_learning: "Start Learning",
    btn_try_it: "Try it Yourself »",
    btn_view_all: "View all",
    btn_browse_courses: "Browse all courses",
    stat_streak: "Day streak",
    stat_hours: "Hours learned",
    stat_lessons: "Lessons completed",
    stat_problems: "Problems solved",
    stat_projects: "Projects",
    learning_path: "Your Learning Path",
    continue_learning_label: "Continue learning",
    jump_in_eyebrow: "Jump in",
    jump_in_title: "Pick a language and make progress.",
    footer_tagline: "Learn to code. Build something real.",

    // Shared
    btn_clear_filters: "Clear filters",
    btn_reset_filters: "Reset filters",
    btn_clear_search: "Clear search",
    label_progress: "Progress",
    label_your_progress: "Your progress",
    video_lessons_badge: "Video lessons",
    lessons_suffix: "lessons",
    diff_beginner: "Beginner",
    diff_intermediate: "Intermediate",
    diff_advanced: "Advanced",
    diff_easy: "Easy",
    diff_medium: "Medium",
    diff_hard: "Hard",
    cat_all: "All",
    cat_web_development: "Web Development",
    cat_programming: "Programming",
    cat_data_science: "Data Science",
    cat_ai: "AI",
    cat_mobile: "Mobile",
    btn_start_challenge: "Start Challenge",
    btn_open_project: "Open Project",
    btn_continue: "Continue",
    btn_start_course: "Start course",
    not_started_label: "Not started",
    lessons_complete: "complete",
    students_suffix: "students",
    course_content: "Course content",
    watch_intro: "Watch intro video",
    continue_watching: "Continue watching",
    your_course: "Your course",
    featured_challenge_eyebrow: "Famous interview question",
    featured_challenge_note: "One of the most commonly asked questions in technical interviews",
    btn_solve_it: "Solve it",
    current_week: "this week",
    login_ready: "Ready when you are.",
    login_build_future: "Build something you care about.",
    login_next_project: "Pick up your project where you left off.",
    login_workspace_idea: "Sign in to continue learning.",
    login_identity_check: "identity.check()  // welcome back, builder",
    login_identity_create: "identity.create() // initialize your workspace",
    login_connecting: "Connecting…",
    login_enter_workspace: "Enter workspace",
    login_create_workspace: "Create workspace",
    login_email_confirm: "Check your inbox to confirm your email, then return here to sign in.",

    // Courses page
    courses_eyebrow: "Course catalog",
    courses_description:
      "Free tutorials, real projects, and video lessons pulled from the best educators on the web. Sign in to track your progress.",
    courses_search_placeholder: "Search courses...",
    stat_free_lessons: "Free lessons",
    empty_courses_title: "No courses found",
    empty_courses_desc: "Try a different search term or category.",

    // Learn page
    learn_eyebrow: "Your curriculum",
    learn_title: "A path with momentum.",
    learn_description: "Everything you are learning, organized so the next worthwhile step is always obvious.",
    stat_paths: "Paths",
    recommended_for_you: "Recommended for you",
    explore_all: "Explore all",

    // Practice page
    practice_eyebrow: "The practice floor",
    practice_title: "Solve with intent.",
    practice_description: "Short, focused problems that reinforce the mechanics behind the courses you are taking.",
    stat_challenges_label: "Challenges",
    stat_tracks_label: "Tracks",
    practice_search_placeholder: "Search challenges...",
    available_suffix: "available",
    empty_practice_title: "No challenges match",
    empty_practice_desc: "Try a different track or difficulty filter.",

    // Progress page
    progress_eyebrow: "Your signal",
    progress_title: "Progress worth noticing.",
    progress_description:
      "A clear view of your activity, skills, and the small wins that compound into real capability.",
    current_streak_label: "Current learning streak",
    weekly_activity_label: "Weekly activity",
    skills_label: "Skills",
    achievements_label: "Achievements",

    // Projects page
    projects_eyebrow: "The project bench",
    projects_title: "Turn lessons into proof.",
    projects_description:
      "Well-scoped briefs that help you practice decisions, not just syntax. Choose one and build it in your own style.",
    stat_briefs_label: "Briefs",
    stat_skill_levels_label: "Skill levels",
    projects_search_placeholder: "Search project briefs...",
    empty_projects_title: "No project briefs found",
    empty_projects_desc: "Try a different technology, level, or title.",

    // Project detail page
    back_all_briefs: "All project briefs",
    project_brief_label: "Project brief",
    assignment_heading: "The assignment",
    assignment_body:
      "Use this brief as the boundary, then make the outcome your own. A strong project has a small, finished core before it grows into extra features.",
    ready_to_begin: "Ready to begin?",
    start_focused_task: "Start with one focused task.",
    open_practice_first: "Open a practice challenge first, then translate what you learn into this project.",
    btn_open_practice: "Open practice",
    project_plan_saved: "Your project plan is saved in this brief.",
    milestone_1: "Define a compact scope",
    milestone_2: "Build the core interaction",
    milestone_3: "Refine responsive states",
    milestone_4: "Document what you learned",

    // Settings page
    settings_eyebrow: "Preferences",
    settings_title: "Shape your workspace.",
    settings_subtitle: "Manage your account and learning preferences.",
    section_account: "Account",
    section_appearance: "Appearance",
    section_notifications: "Notifications",
    section_learning_prefs: "Learning preferences",
    row_name: "Name",
    row_username: "Username",
    row_password_title: "Password",
    row_password_desc: "Last changed 3 months ago",
    row_logout_title: "Log out",
    btn_edit: "Edit",
    btn_change: "Change",
    theme_title: "Theme",
    theme_light_active: "Light mode is active",
    theme_dark_active: "Dark mode is active",
    row_daily_reminders_title: "Daily reminders",
    row_daily_reminders_desc: "Get a nudge if you haven't practiced today",
    row_weekly_summary_title: "Weekly summary",
    row_weekly_summary_desc: "A recap of your progress every Sunday",
    row_product_updates_title: "Product updates",
    row_product_updates_desc: "News about new courses and features",
    row_daily_goal_title: "Daily goal reminders",
    row_daily_goal_desc: "Show a banner when you're close to your daily goal",
    row_auto_run_title: "Auto-run code",
    row_auto_run_desc: "Automatically run code a moment after you stop typing",
    preferences_saved: "Preferences saved locally",
    btn_save_changes: "Save Changes",
    btn_saved: "Saved",

    // Profile page
    developer_profile_label: "Developer profile",
    learning_since_label: "Learning since",
    signed_in_with_label: "Signed in with",
    btn_log_out: "Log out",
    stat_courses_label: "Courses",

    // Login page
    login_back: "Back",
    login_welcome_back: "Welcome back",
    login_create_account: "Create your account",
    login_signin_subtitle: "Sign in to continue your progress.",
    login_signup_subtitle: "Start learning to code for free.",
    login_continue_google: "Continue with Google",
    login_or_signin_email: "or sign in with email",
    login_or_signup_email: "or sign up with email",
    label_email: "Email",
    label_password: "Password",
    btn_sign_in: "Sign In",
    btn_create_account_submit: "Create Account",
    new_to_rivocode: "New to RivoCode?",
    already_have_account: "Already have an account?",
    link_create_account: "Create an account",
    link_sign_in: "Sign in",
    login_hero_badge: "Learn by building",
    login_hero_title: "Real lessons. Real code. Real projects.",
    login_hero_subtitle:
      "Free video lessons, a live in-browser editor, and hands-on challenges — pick up right where you left off, on any device.",

    // Lesson page
    lesson_progress_label: "Lesson progress",
    btn_previous: "Previous",
    btn_next: "Next",
    concept_label: "Concept",
    example_label: "Example",
    runnable_badge: "Runnable",
    your_turn_label: "Your turn",
    console_label: "Console",
    btn_run: "Run",
    btn_running: "Running…",
    btn_reset: "Reset",
    btn_submit: "Submit",
    btn_submitted: "Submitted",

    // Global search
    search_aria: "Search RivoCode",
    search_placeholder_desktop: "Search courses, projects…",
    search_placeholder_modal: "Search your learning workspace…",
    quick_navigation: "Quick navigation",
    esc_to_close: "Esc to close",
  },
  uz: {
    nav_dashboard: "Boshqaruv paneli",
    nav_learn: "O'rganish",
    nav_courses: "Kurslar",
    nav_practice: "Mashq",
    nav_projects: "Loyihalar",
    nav_progress: "Rivojlanish",
    nav_settings: "Sozlamalar",
    nav_profile: "Profil",
    nav_section_studio: "Studiya",
    workspace_label: "Ish maydoni",
    title_dashboard: "Boshqaruv paneli",
    title_learn: "O'rganish",
    title_courses: "Kurslarni ko'rish",
    title_practice: "Mashq",
    title_projects: "Loyihalar",
    title_progress: "Rivojlanish",
    title_profile: "Profil",
    title_settings: "Sozlamalar",
    title_course: "Kurs",
    title_lesson: "Dars",
    title_default: "RivoCode",
    hero_eyebrow: "Ish maydoni",
    hero_subtitle:
      "Darsni davom ettiring yoki loyiha tanlang. Brauzerda mashq qiling.",
    hero_greeting_morning: "Xayrli tong",
    hero_greeting_afternoon: "Xayrli kun",
    hero_greeting_evening: "Xayrli kech",
    hero_question: "bugun nima yaratasiz?",
    hero_quote: "Bitta kichik loyihadan boshlang.",
    hero_quote_author: "Leonardo da Vinci",
    btn_continue_learning: "Davom ettirish",
    btn_start_learning: "O'rganishni boshlash",
    btn_try_it: "O'zingiz sinab ko'ring »",
    btn_view_all: "Barchasini ko'rish",
    btn_browse_courses: "Barcha kurslarni ko'rish",
    stat_streak: "Kunlik streak",
    stat_hours: "O'rganilgan soatlar",
    stat_lessons: "Tugallangan darslar",
    stat_problems: "Yechilgan masalalar",
    stat_projects: "Loyihalar",
    learning_path: "Sizning o'quv yo'lingiz",
    continue_learning_label: "Davom ettirish",
    jump_in_eyebrow: "Boshlaylik",
    jump_in_title: "Tilni tanlang va rivojlaning.",
    footer_tagline: "Dasturlashni o‘rganing. Haqiqiy loyiha yarating.",

    // Shared
    btn_clear_filters: "Filtrlarni tozalash",
    btn_reset_filters: "Filtrlarni qayta tiklash",
    btn_clear_search: "Qidiruvni tozalash",
    label_progress: "Rivojlanish",
    label_your_progress: "Sizning rivojlanishingiz",
    video_lessons_badge: "Video darslar",
    lessons_suffix: "dars",
    diff_beginner: "Boshlang'ich",
    diff_intermediate: "O'rta",
    diff_advanced: "Yuqori",
    diff_easy: "Oson",
    diff_medium: "O'rtacha",
    diff_hard: "Qiyin",
    cat_all: "Barchasi",
    cat_web_development: "Veb-dasturlash",
    cat_programming: "Dasturlash",
    cat_data_science: "Ma'lumotlar fani",
    cat_ai: "Sun'iy intellekt",
    cat_mobile: "Mobil",
    btn_start_challenge: "Mashqni boshlash",
    btn_open_project: "Loyihani ochish",
    btn_continue: "Davom etish",
    btn_start_course: "Kursni boshlash",
    not_started_label: "Boshlanmagan",
    lessons_complete: "bajarildi",
    students_suffix: "o'quvchi",
    course_content: "Kurs tarkibi",
    watch_intro: "Kirish videosini ko'rish",
    continue_watching: "Tomosha qilishni davom ettirish",
    your_course: "Sizning kursingiz",
    featured_challenge_eyebrow: "Mashhur suhbat savoli",
    featured_challenge_note: "Texnik suhbatlarda eng ko'p so'raladigan savollardan biri",
    btn_solve_it: "Yechish",
    current_week: "bu hafta",
    login_ready: "Tayyor bo'lsangiz, boshlaymiz.",
    login_build_future: "Keling, kelajagingizni yarataylik.",
    login_next_project: "Keyingi loyihangiz ish maydonida kutmoqda.",
    login_workspace_idea: "Ish maydoningiz — g'oyalar ishlaydigan kodga aylanadigan joy.",
    login_identity_check: "identity.check()  // xush kelibsiz, dasturchi",
    login_identity_create: "identity.create() // ish maydoningizni ishga tushirish",
    login_connecting: "Ulanmoqda…",
    login_enter_workspace: "Ish maydoniga kirish",
    login_create_workspace: "Ish maydoni yaratish",
    login_email_confirm: "Emailingizni tasdiqlash uchun pochta qutingizni tekshiring, so'ng bu yerga qaytib kiring.",

    // Courses page
    courses_eyebrow: "Kurslar katalogi",
    courses_description:
      "Internetdagi eng yaxshi o'qituvchilarning bepul darsliklari, haqiqiy loyihalar va video darslari. Rivojlanishingizni kuzatish uchun tizimga kiring.",
    courses_search_placeholder: "Kurslarni qidirish...",
    stat_free_lessons: "Bepul darslar",
    empty_courses_title: "Kurslar topilmadi",
    empty_courses_desc: "Boshqa qidiruv so'zi yoki kategoriyani sinab ko'ring.",

    // Learn page
    learn_eyebrow: "Sizning dasturingiz",
    learn_title: "Barqaror rivojlanish yo'li.",
    learn_description: "O'rganayotgan barcha narsalaringiz tartibga solingan, shunda keyingi qadam har doim aniq bo'ladi.",
    stat_paths: "Yo'nalishlar",
    recommended_for_you: "Siz uchun tavsiya etiladi",
    explore_all: "Barchasini ko'rish",

    // Practice page
    practice_eyebrow: "Mashq maydoni",
    practice_title: "Maqsadli yeching.",
    practice_description: "O'qiyotgan kurslaringiz ortidagi mexanikani mustahkamlaydigan qisqa, aniq masalalar.",
    stat_challenges_label: "Masalalar",
    stat_tracks_label: "Yo'nalishlar",
    practice_search_placeholder: "Masalalarni qidirish...",
    available_suffix: "ta mavjud",
    empty_practice_title: "Mos masala topilmadi",
    empty_practice_desc: "Boshqa yo'nalish yoki qiyinlik darajasini sinab ko'ring.",

    // Progress page
    progress_eyebrow: "Sizning natijangiz",
    progress_title: "E'tiborga loyiq rivojlanish.",
    progress_description: "Faoliyatingiz, ko'nikmalaringiz va haqiqiy mahoratga aylanadigan kichik yutuqlaringizning aniq manzarasi.",
    current_streak_label: "Joriy o'rganish streaki",
    weekly_activity_label: "Haftalik faollik",
    skills_label: "Ko'nikmalar",
    achievements_label: "Yutuqlar",

    // Projects page
    projects_eyebrow: "Loyihalar maydoni",
    projects_title: "Darslarni amaliyotga aylantiring.",
    projects_description: "Faqat sintaksisni emas, qaror qabul qilishni mashq qildiradigan, aniq belgilangan topshiriqlar. Birini tanlang va o'z uslubingizda yarating.",
    stat_briefs_label: "Topshiriqlar",
    stat_skill_levels_label: "Daraja",
    projects_search_placeholder: "Loyiha topshiriqlarini qidirish...",
    empty_projects_title: "Loyiha topshiriqlari topilmadi",
    empty_projects_desc: "Boshqa texnologiya, daraja yoki nomni sinab ko'ring.",

    // Project detail page
    back_all_briefs: "Barcha loyiha topshiriqlari",
    project_brief_label: "Loyiha topshirig'i",
    assignment_heading: "Topshiriq",
    assignment_body:
      "Ushbu topshiriqni chegara sifatida ishlating, so'ng natijani o'zingiznikiga aylantiring. Kuchli loyiha qo'shimcha funksiyalar bilan kengayishidan oldin kichik va tugallangan yadroga ega bo'ladi.",
    ready_to_begin: "Boshlashga tayyormisiz?",
    start_focused_task: "Bitta aniq vazifadan boshlang.",
    open_practice_first: "Avval mashq masalasini oching, so'ng o'rganganlaringizni ushbu loyihaga qo'llang.",
    btn_open_practice: "Mashqni ochish",
    project_plan_saved: "Loyiha rejangiz ushbu topshiriqda saqlangan.",
    milestone_1: "Ixcham doirani belgilang",
    milestone_2: "Asosiy funksiyani yarating",
    milestone_3: "Moslashuvchan holatlarni yaxshilang",
    milestone_4: "O'rganganlaringizni hujjatlashtiring",

    // Settings page
    settings_eyebrow: "Sozlamalar",
    settings_title: "Ish maydoningizni sozlang.",
    settings_subtitle: "Hisobingiz va o'quv sozlamalaringizni boshqaring.",
    section_account: "Hisob",
    section_appearance: "Ko'rinish",
    section_notifications: "Bildirishnomalar",
    section_learning_prefs: "O'quv sozlamalari",
    row_name: "Ism",
    row_username: "Foydalanuvchi nomi",
    row_password_title: "Parol",
    row_password_desc: "So'nggi marta 3 oy oldin o'zgartirilgan",
    row_logout_title: "Chiqish",
    btn_edit: "Tahrirlash",
    btn_change: "O'zgartirish",
    theme_title: "Mavzu",
    theme_light_active: "Yorug' rejim faol",
    theme_dark_active: "Qorong'i rejim faol",
    row_daily_reminders_title: "Kunlik eslatmalar",
    row_daily_reminders_desc: "Agar bugun mashq qilmagan bo'lsangiz, eslatma oling",
    row_weekly_summary_title: "Haftalik xulosa",
    row_weekly_summary_desc: "Har yakshanba rivojlanishingiz haqida qisqacha hisobot",
    row_product_updates_title: "Yangiliklar",
    row_product_updates_desc: "Yangi kurslar va funksiyalar haqida xabarlar",
    row_daily_goal_title: "Kunlik maqsad eslatmalari",
    row_daily_goal_desc: "Kunlik maqsadingizga yaqinlashganingizda banner ko'rsatish",
    row_auto_run_title: "Kodni avtomatik ishga tushirish",
    row_auto_run_desc: "Yozishni to'xtatganingizdan bir zum o'tib kodni avtomatik ishga tushirish",
    preferences_saved: "Sozlamalar mahalliy saqlandi",
    btn_save_changes: "O'zgarishlarni saqlash",
    btn_saved: "Saqlandi",

    // Profile page
    developer_profile_label: "Dasturchi profili",
    learning_since_label: "O'rganishni boshlagan",
    signed_in_with_label: "Tizimga kirgan holat",
    btn_log_out: "Chiqish",
    stat_courses_label: "Kurslar",

    // Login page
    login_back: "Orqaga",
    login_welcome_back: "Xush kelibsiz",
    login_create_account: "Hisob yarating",
    login_signin_subtitle: "Rivojlanishingizni davom ettirish uchun tizimga kiring.",
    login_signup_subtitle: "Bepul dasturlashni o'rganishni boshlang.",
    login_continue_google: "Google orqali davom etish",
    login_or_signin_email: "yoki email orqali kiring",
    login_or_signup_email: "yoki email orqali ro'yxatdan o'ting",
    label_email: "Email",
    label_password: "Parol",
    btn_sign_in: "Kirish",
    btn_create_account_submit: "Hisob yaratish",
    new_to_rivocode: "RivoCode'da yangimisiz?",
    already_have_account: "Hisobingiz bormi?",
    link_create_account: "Hisob yaratish",
    link_sign_in: "Kirish",
    login_hero_badge: "Yaratish orqali o'rganing",
    login_hero_title: "Haqiqiy darslar. Haqiqiy kod. Haqiqiy loyihalar.",
    login_hero_subtitle:
      "Bepul video darslar, brauzeringizdagi jonli muharrir va amaliy masalalar — istalgan qurilmada to'xtagan joyingizdan davom eting.",

    // Lesson page
    lesson_progress_label: "Dars jarayoni",
    btn_previous: "Oldingi",
    btn_next: "Keyingi",
    concept_label: "Tushuncha",
    example_label: "Misol",
    runnable_badge: "Ishga tushiriladi",
    your_turn_label: "Sizning navbatingiz",
    console_label: "Konsol",
    btn_run: "Ishga tushirish",
    btn_running: "Ishlamoqda…",
    btn_reset: "Qayta tiklash",
    btn_submit: "Yuborish",
    btn_submitted: "Yuborildi",

    // Global search
    search_aria: "RivoCode'da qidirish",
    search_placeholder_desktop: "Kurslar, loyihalarni qidirish…",
    search_placeholder_modal: "Ish maydoningizda qidiring…",
    quick_navigation: "Tezkor navigatsiya",
    esc_to_close: "Yopish uchun Esc",
  },
} as const;

export type TranslationKey = keyof (typeof dictionaries)["en"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is unavailable during SSR, so the real language can only be known after mount
    setLangState(stored === "en" ? "en" : "uz");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang, mounted]);

  const setLang = (next: Lang) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === "en" ? "uz" : "en"));

  const t = (key: TranslationKey) => dictionaries[lang][key] ?? dictionaries.en[key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Maps a data-layer value (kept in English so filtering/equality logic
// elsewhere keeps working) to its translated display label.
export function translateDifficulty(t: (key: TranslationKey) => string, difficulty: string) {
  const map: Record<string, TranslationKey> = {
    Beginner: "diff_beginner",
    Intermediate: "diff_intermediate",
    Advanced: "diff_advanced",
    Easy: "diff_easy",
    Medium: "diff_medium",
    Hard: "diff_hard",
  };
  const key = map[difficulty];
  return key ? t(key) : difficulty;
}

export function translateCategory(t: (key: TranslationKey) => string, category: string) {
  const map: Record<string, TranslationKey> = {
    All: "cat_all",
    "Web Development": "cat_web_development",
    Programming: "cat_programming",
    "Data Science": "cat_data_science",
    AI: "cat_ai",
    Mobile: "cat_mobile",
  };
  const key = map[category];
  return key ? t(key) : category;
}
