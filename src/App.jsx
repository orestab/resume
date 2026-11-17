import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Send,
  ExternalLink,
  Code2,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Printer,
  Globe,
  Briefcase,
  GraduationCap,
  Heart,
  ChevronRight,
  X,
  Layers,
  Cpu,
  Database,
  Layout,
  ShoppingBag,
  Headphones,
  Kanban,
  CheckSquare,
} from "lucide-react";

// Кастомні SVG-іконки брендів
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// 3D-нахил карток
const TiltCard = ({ children, className = "", onClick }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform.includes("scale3d(1,")
          ? "transform 0.4s ease-out"
          : "transform 0.08s ease-out",
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-sky-500/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(350px circle at ${glowPos.x}% ${glowPos.y}%, rgba(56, 189, 248, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// Плавна поява секцій
const RevealSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CONTENT = {
  ua: {
    status: "Відкритий до пропозицій • Junior Frontend",
    name: "Орест",
    rolePrefixes: [
      "Junior Frontend Developer",
      "React & JavaScript"
    ],
    location: "Луцьк, Україна (Remote / Relocation)",
    summary:
      "Junior Frontend Developer. Маю практичний досвід розробки сучасних SPA-додатків та повноцінних e-commerce платформ із нуля. Впевнено володію екосистемою JavaScript (ES6+) та React (функціональні компоненти, кастомні хуки, маршрутизація). Проєктую чисту, модульну архітектуру та налаштовую ефективне управління станом (State Management) і локальним сховищем (localStorage). Створюю адаптивні, кросбраузерні інтерфейси за допомогою Tailwind CSS із застосуванням принципів Glassmorphic UI та плавних UI/UX анімацій. Вмію працювати з асинхронними запитами (REST API, Firebase), збирати проєкти через Vite та контролювати версії коду через Git і GitHub. Пишу чистий, підтримуваний код та прагну розв'язувати складні завдання.",
    ctaCopy: "Скопіювати Email",
    ctaCopied: "Скопійовано!",
    ctaPrint: "Зберегти PDF",
    nav: {
      skills: "Стек",
      projects: "Проєкти",
      experience: "Досвід",
      about: "Інфо",
    },
    skillsTitle: "Технічний стек",
    skillsSubtitle: "Інструменти та технології, з якими я створюю вебінтерфейси",
    filterAll: "Усі",
    projectsTitle: "Вибрані проєкти",
    projectsSubtitle: "Натисни на картку будь-якого проєкту для детального огляду",
    viewDetails: "Детальніше",
    experienceTitle: "Досвід та освіта",
    freelanceRole: "Приватна веб-розробка",
    freelancePeriod: "2025 — дотепер",
    freelanceDesc: [
      "Розробка сучасних адаптивних вебдодатків та e-commerce рішень під ключ.",
      "Проєктування компонентної архітектури на React, інтеграція анімацій.",
      "Оптимізація швидкодії, робота з деплоєм та пряма комунікація із замовниками.",
    ],
    eduTitle: "Самоосвіта та профільне навчання",
    eduPeriod: "2023 — 2026",
    eduDesc:
      "Core: JavaScript (ES6+), React (Hooks, Router), HTML5, CSS3,  UI & Styling: Tailwind CSS, CSS Animations, Glassmorphism UI Tools & Workflow: Vite, npm, Git, GitHub Data & State: Firebase, REST API, localStorage, State Management",
    languagesTitle: "Мови",
    languages: [
      { name: "Українська", level: "Рідна (Native)" },
      { name: "Англійська", level: "Intermediate (Технічна документація)" },
    ],
    hobbiesTitle: "Захоплення",
    hobbies: [
      "Читання",
      "Програмування",
    ],
    modalStack: "Використаний стек",
    modalFeatures: "Ключові реалізації",
    modalLive: "Live Demo",
    modalCode: "GitHub Репозиторій",
  },
  en: {
    status: "Open to Work • Junior Frontend",
    name: "Orest",
    rolePrefixes: [
      "Junior Frontend Developer",
      "React & JavaScript Developer",
      "Modern SPA & UI Builder",
    ],
    location: "Lutsk, Ukraine (Remote / Relocation)",
    summary:"Junior Frontend Developer. I have practical experience developing modern SPA applications and full-scale e-commerce platforms from scratch. I am proficient in the JavaScript (ES6+) and React ecosystems (functional components, custom hooks, routing). I design clean, modular architecture and implement efficient state management and local storage solutions. I build responsive, cross-browser interfaces using Tailwind CSS, incorporating Glassmorphic UI principles and smooth UI/UX animations. I am experienced in handling asynchronous requests (REST API, Firebase), bundling projects with Vite, and managing version control via Git and GitHub. I write clean, maintainable code and enjoy tackling complex challenges.",
    ctaCopy: "Copy Email",
    ctaCopied: "Copied!",
    ctaPrint: "Save PDF",
    nav: {
      skills: "Stack",
      projects: "Projects",
      experience: "Experience",
      about: "About",
    },
    skillsTitle: "Tech Stack",
    skillsSubtitle: "Technologies and tools I use to build web apps",
    filterAll: "All",
    projectsTitle: "Featured Projects",
    projectsSubtitle: "Click on any project card to explore architecture and features",
    viewDetails: "View Details",
    experienceTitle: "Experience & Education",
    freelanceRole: "Freelance Web Developer",
    freelancePeriod: "2026 — Present",
    freelanceDesc: [
      "End-to-end development of modern responsive web apps and e-commerce solutions.",
      "Component architecture design in React, animation integration.",
      "Performance optimization, deployment management, and direct client communication.",
    ],
    eduTitle: "Self-Education & Frontend Studies",
    eduPeriod: "2023 — 2026",
    eduDesc:
      "Core: JavaScript (ES6+), React (Hooks, Router), HTML5, CSS3, UI & Styling: Tailwind CSS, CSS Animations, Glassmorphism UI Tools & Workflow: Vite, npm, Git, GitHub Data & State: Firebase, REST API, localStorage, State Management",
    languagesTitle: "Languages",
    languages: [
      { name: "Ukrainian", level: "Native" },
      { name: "English", level: "Intermediate (Technical docs)" },
    ],
    hobbiesTitle: "Interests",
    hobbies: [
      "Reading",
      "Programming",
    ],
    modalStack: "Tech Stack",
    modalFeatures: "Key Implementations",
    modalLive: "Live Demo",
    modalCode: "GitHub Repo",
  },
};

const SKILLS_DATA = [
  { name: "JavaScript (ES6+)", category: "Core", level: 88, icon: Code2 },
  { name: "React (Hooks, Router)", category: "Core", level: 85, icon: Cpu },
  { name: "HTML5 & CSS3", category: "Core", level: 95, icon: Layout },
  { name: "Tailwind CSS", category: "UI", level: 92, icon: Sparkles },
  { name: "CSS Animations & Glass UI", category: "UI", level: 90, icon: Sparkles },
  { name: "Vite & npm", category: "Tools", level: 85, icon: Terminal },
  { name: "Git & GitHub", category: "Tools", level: 82, icon: GithubIcon },
  { name: "Firebase & REST API", category: "Data", level: 75, icon: Database },
  { name: "localStorage & State", category: "Data", level: 90, icon: Database },
];

// Тексти навичок для безперервного друку в консолі
const SKILLS_CONSOLE_TEXTS = [
  "⚡ SKILL: JavaScript (ES6+) — closures, async/await, DOM manipulation, modular architecture.",
  "⚛️ SKILL: React.js — custom hooks, useState, useEffect, context, SPA component structure.",
  "🎨 SKILL: Tailwind CSS & UI/UX — responsive layouts, flexbox/grid, glassmorphism design.",
  "🚀 SKILL: Vite, npm & Build Tools — fast bundling, hot module replacement, package management.",
  "📦 SKILL: State & Storage — localStorage persistence, cart management, wishlist synchronization.",
  "🛠️ SKILL: Git & GitHub — version control, branching, repository management, clean commits."
];

const PROJECTS_DATA = [
  {
    id: "techstore",
    title: "TechStore E-Commerce",
    tag: "E-Commerce Platform",
    icon: ShoppingBag,
    accent: "from-sky-400 to-blue-600",
    stack: ["React", "Tailwind CSS", "Vite", "State Management"],
    demo: "https://techstore-psi-murex.vercel.app/",
    github: "https://github.com/orestab",
    shortUa:
      "Сучасний інтернет-магазин гаджетів та техніки з інтерактивним каталогом і кошиком.",
    shortEn:
      "Modern gadgets and electronics e-commerce store featuring interactive catalog and cart.",
    featuresUa: [
      "Фільтрація та сортування товарів за категоріями у реальному часі",
      "Інтерактивний кошик покупок з управлінням кількістю та підрахунком суми",
      "Адаптивний дизайн та швидка навігація завдяки Vite",
    ],
    featuresEn: [
      "Real-time product filtering and sorting by categories",
      "Interactive shopping cart with quantity controls and total calculation",
      "Fully responsive design and lightning-fast navigation with Vite",
    ],
  },
  {
    id: "headphone",
    title: "Headphone Store",
    tag: "Product Landing & Shop",
    icon: Headphones,
    accent: "from-purple-400 to-indigo-600",
    stack: ["React", "Tailwind CSS", "UI/UX Animations"],
    demo: "https://headphone-j2rl.vercel.app/",
    github: "https://github.com/orestab",
    shortUa:
      "Преміальний магазин аудіотехніки та навушників із витонченою анімацією та вітриною.",
    shortEn:
      "Premium audio gear and headphones store featuring refined animations and product showcase.",
    featuresUa: [
      "Стильний сучасний інтерфейс у темній темі з акцентом на преміумпродукцію",
      "Плавні мікроанімації при наведенні та перегляді характеристик товарів",
      "Зручна інтерактивна вітрина аудіопристроїв",
    ],
    featuresEn: [
      "Sleek dark-themed UI focused on premium audio presentation",
      "Smooth micro-interactions on hover and specification viewing",
      "Intuitive interactive showcase for audio devices",
    ],
  },
  {
    id: "kanban",
    title: "Kanban Task Manager",
    tag: "Productivity Web App",
    icon: Kanban,
    accent: "from-emerald-400 to-teal-600",
    stack: ["JavaScript", "HTML5", "CSS3", "Drag & Drop / State"],
    demo: "https://orestab.github.io/kanban/",
    github: "https://github.com/orestab/kanban",
    shortUa:
      "Зручний менеджер завдань у стилі Kanban для організації робочого процесу та проєктів.",
    shortEn:
      "Intuitive Kanban task manager app designed for workflow organization and project tracking.",
    featuresUa: [
      "Управління завданнями по колонках статусу (To Do, Doing, Done)",
      "Створення, редагування та видалення карток завдань у реальному часі",
      "Збереження стану та структури завдань у браузері",
    ],
    featuresEn: [
      "Task management across status columns (To Do, Doing, Done)",
      "Create, edit, and delete task cards in real time",
      "Persistent task state and structure saved locally",
    ],
  },
];

export default function App() {
  const [lang, setLang] = useState("ua");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Стани для анімації навичок у консолі
  const [skillTextIdx, setSkillTextIdx] = useState(0);
  const [skillTyped, setSkillTyped] = useState("");
  const [skillDeleting, setSkillDeleting] = useState(false);

  const t = CONTENT[lang];
  const email = "orest19011986@gmail.com";

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // Анімація друку ролі в заголовку
  useEffect(() => {
    const currentFullText = t.rolePrefixes[roleIndex % t.rolePrefixes.length];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => prev + 1);
      } else {
        setTypedText(
          isDeleting
            ? currentFullText.substring(0, typedText.length - 1)
            : currentFullText.substring(0, typedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, t.rolePrefixes]);

  // Неперервний друк інформації про всі навички в консолі
  useEffect(() => {
    const currentSkillSnippet = SKILLS_CONSOLE_TEXTS[skillTextIdx % SKILLS_CONSOLE_TEXTS.length];
    const speed = skillDeleting ? 18 : 35;

    const consoleTimer = setTimeout(() => {
      if (!skillDeleting && skillTyped === currentSkillSnippet) {
        setTimeout(() => setSkillDeleting(true), 1800);
      } else if (skillDeleting && skillTyped === "") {
        setSkillDeleting(false);
        setSkillTextIdx((prev) => prev + 1);
      } else {
        setSkillTyped(
          skillDeleting
            ? currentSkillSnippet.substring(0, skillTyped.length - 1)
            : currentSkillSnippet.substring(0, skillTyped.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(consoleTimer);
  }, [skillTyped, skillDeleting, skillTextIdx]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const categories = ["All", "Core", "UI", "Tools", "Data"];
  const filteredSkills =
    activeCategory === "All"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200 font-sans relative overflow-x-hidden">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(25px, -30px) scale(1.05); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 25px) scale(0.98); }
        }
        .animate-float-slow { animation: floatSlow 15s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 18s ease-in-out infinite; }
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
        @media print {
          body { background: #06080d !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Фоновий світловий слід за курсором (оптимізовано) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 no-print opacity-70"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
        }}
      />

      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />
      <div className="fixed top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-[100px] animate-float-slow pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[110px] animate-float-reverse pointer-events-none z-0" />

      {/* Навігаційна панель */}
      <header className="sticky top-4 z-40 mx-auto max-w-5xl px-4 no-print">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d121f]/90 px-4 sm:px-5 py-3 backdrop-blur-xl shadow-2xl">
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 text-slate-950 font-extrabold shadow-md shadow-sky-500/20">
              O
            </span>
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Orest
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400 order-3 sm:order-2 w-full sm:w-auto justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 overflow-x-auto pb-1 sm:pb-0">
            <a href="#skills" className="hover:text-sky-400 transition-colors whitespace-nowrap">
              {t.nav.skills}
            </a>
            <a href="#projects" className="hover:text-sky-400 transition-colors whitespace-nowrap">
              {t.nav.projects}
            </a>
            <a href="#experience" className="hover:text-sky-400 transition-colors whitespace-nowrap">
              {t.nav.experience}
            </a>
            <a href="#about" className="hover:text-sky-400 transition-colors whitespace-nowrap">
              {t.nav.about}
            </a>
          </div>

          <div className="flex items-center gap-2 order-2 sm:order-3">
            <button
              onClick={() => setLang(lang === "ua" ? "en" : "ua")}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              {lang === "ua" ? "EN" : "UA"}
            </button>
            <button
              onClick={() => window.print()}
              title={t.ctaPrint}
              className="flex items-center gap-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/25 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.ctaPrint}</span>
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-10 sm:pt-12 pb-24 space-y-20 sm:space-y-24">
        {/* HERO SECTION (Текст зліва, нерухома консоль навичок справа/знизу в потоці верстки — нічого не перекриває) */}
        <section className="pt-2 sm:pt-4">
          <TiltCard className="p-6 sm:p-10 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-5 max-w-2xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {t.status}
                </div>

                <div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
                    {t.name}
                  </h1>
                  <div className="h-8 sm:h-10 flex items-center text-lg sm:text-2xl font-semibold bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    <span>{typedText}</span>
                    <span className="ml-1 inline-block w-0.5 h-5 sm:h-6 bg-sky-400 animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{t.location}</span>
                </div>

                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {t.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
                  <button
                    onClick={handleCopyEmail}
                    className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-200" />
                        <span>{t.ctaCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{t.ctaCopy}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://github.com/orestab"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-white/25 hover:bg-white/10 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
  href="https://t.me/asdxom"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-sky-400/40 hover:text-sky-300 transition-all"
>
  <Send className="w-4 h-4" />
  <span>Telegram</span>
</a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:border-sky-400/40 hover:text-sky-300 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* НЕРУХОМА КОНСОЛЬ НАВИЧОК (вбудована в сітку, не перекриває контент) */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="rounded-xl border border-sky-500/30 bg-[#090d16]/95 p-4 font-mono text-xs text-slate-300 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="ml-2 text-[10px] text-sky-400 font-semibold">skills-stream.sh</span>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="h-24 sm:h-28 flex items-start overflow-hidden">
                    <p className="text-emerald-300/90 leading-relaxed break-words">
                      <span className="text-sky-400 select-none">$ </span>
                      {skillTyped}
                      <span className="inline-block w-1.5 h-3.5 bg-sky-400 ml-0.5 animate-pulse" />
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-[10px] text-slate-500">
                    <span>Status: Active</span>
                    <span>Buffer: OK</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24">
          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                  <Terminal className="w-6 h-6 text-sky-400" />
                  {t.skillsTitle}
                </h2>
                <p className="text-sm text-slate-400 mt-1">{t.skillsSubtitle}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 no-print">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/25 scale-105"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5"
                    }`}
                  >
                    {cat === "All" ? t.filterAll : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TiltCard key={skill.name} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-sm text-slate-100">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {skill.category}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </RevealSection>
        </section>

        {/* PROJECTS SECTION (3 чистих проєкти) */}
        <section id="projects" className="scroll-mt-24">
          <RevealSection>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
                <Code2 className="w-6 h-6 text-sky-400" />
                {t.projectsTitle}
              </h2>
              <p className="text-sm text-slate-400 mt-1">{t.projectsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((project) => {
                const ProjectIcon = project.icon;
                return (
                  <TiltCard
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="p-6 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.accent} text-white shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <ProjectIcon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-slate-300 border border-white/10 bg-white/5 rounded-full px-3 py-1">
                          {project.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-5">
                        {lang === "ua" ? project.shortUa : project.shortEn}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono bg-white/5 text-sky-300/90 border border-white/10 px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                          <span>{t.viewDetails}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-400 underline underline-offset-4 group-hover:text-white transition-colors">
                          Live Demo ↗
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </RevealSection>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="scroll-mt-24">
          <RevealSection>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5 mb-8">
              <Briefcase className="w-6 h-6 text-sky-400" />
              {t.experienceTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TiltCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">
                    <Briefcase className="w-3.5 h-3.5" />
                    {t.freelancePeriod}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {t.freelanceRole}
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {t.freelanceDesc.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>

              <TiltCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2.5 py-1 rounded-full">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {t.eduPeriod}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {t.eduTitle}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.eduDesc}
                </p>
              </TiltCard>
            </div>
          </RevealSection>
        </section>

        {/* LANGUAGES & HOBBIES */}
        <section id="about" className="scroll-mt-24">
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TiltCard className="p-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-sky-400" />
                  {t.languagesTitle}
                </h3>
                <div className="space-y-3">
                  {t.languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/5 px-4 py-2.5 text-sm"
                    >
                      <span className="font-semibold text-slate-200">{l.name}</span>
                      <span className="text-slate-400 text-xs">{l.level}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>

              <TiltCard className="p-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-rose-400" />
                  {t.hobbiesTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          </RevealSection>
        </section>
      </main>

      {/* Модальне вікно деталей проєкту */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#0e1422] p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              {selectedProject.tag}
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {lang === "ua" ? selectedProject.shortUa : selectedProject.shortEn}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                {t.modalFeatures}
              </h4>
              <ul className="space-y-2 text-sm text-slate-200">
                {(lang === "ua"
                  ? selectedProject.featuresUa
                  : selectedProject.featuresEn
                ).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {t.modalStack}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-sky-500/10 border border-sky-400/20 px-2.5 py-1 text-xs font-mono text-sky-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                {t.modalLive}
              </a>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                {t.modalCode}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast-сповіщення */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-[#0d1512]/95 px-4 py-3 text-sm font-medium text-emerald-300 shadow-2xl backdrop-blur-xl">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{email} — {t.ctaCopied}</span>
        </div>
      )}
    </div>
  );
}
