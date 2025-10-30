"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Menu, Home, Layers, User, Mail, MapPin, Instagram, Aperture } from 'lucide-react';
import { FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

// --- GLOBAL STYLES ---
const globalStyles = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap'); 

    .font-display { font-family: 'Playfair Display', serif; }
    .font-content { font-family: 'Inter', sans-serif; }
    .font-pinyon { font-family: 'Pinyon Script', cursive; }

    @keyframes ticker {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); } 
    }
    
    @keyframes polka-move {
      0% { background-position: 0 0; }
      100% { background-position: 25px 25px; }
    }

    @keyframes horizontal-scroll {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-100%, 0, 0); } 
    }

    .ticker-content {
      display: flex;
      width: 200%; 
      animation: ticker 30s linear infinite;
    }

    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .fade-in { animation: fadeIn 0.8s ease-out both; }
    
    .project-carousel { animation: horizontal-scroll 60s linear infinite; will-change: transform; }
    .project-carousel:hover { animation-play-state: paused; }
    
    .bg-polka-animated {
      background-color: #ffffff;
      background-image: radial-gradient(#d1d5db 1.5px, transparent 0);
      background-size: 25px 25px;
      animation: polka-move 60s linear infinite;
    }
    
    .bg-wireframe-map {
        background-color: #111;
        background-image: repeating-linear-gradient(45deg, #222 0, #222 1px, transparent 1px, transparent 50%), repeating-linear-gradient(-45deg, #222 0, #222 1px, transparent 1px, transparent 50%);
        background-size: 20px 20px;
        background-blend-mode: overlay;
    }
  `}</style>
);

// --- RESUME DATA ---
const resumeData = {
  name: "Vanya Shaumy (17)",
  location: "Bogor, Indonesia", 
  sections: [
    {
      title: "ABOUT ME",
      content: `Hi, I'm Vanya! I'm a software developer and front-end engineer who loves creating smooth, intuitive, and visually appealing web experiences. I'm passionate about combining creativity with technology to build interfaces that feel great to use. I enjoy working in collaborative environments where teamwork and open communication lead to better ideas and stronger results. I'm always up for solving new challenges, adapting to different tools or workflows, and learning something new every day.`,
      type: 'paragraph' as const
    },
    {
      title: "EDUCATION",
      content: [
        { title: "PESAT VOCATIONAL SCHOOL", details: "Software Engineering" },
      ],
      type: 'list' as const
    },
    {
      title: "SKILLS",
      content: [
        { name: "JavaScript", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "React", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Laravel", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
        { name: "TailwindCSS", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Bootstrap", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
        { name: "PHP", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
        { name: "MySQL", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "SQLite", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
        { name: "Figma", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
      ],
      type: "skills" as const
    }
  ]
};

const projectData = [
  { id: 1, title: 'Company Profile Website', image: '/images/projects/Demo_CA.png', description: 'Company profile website for a dummy brand.', fullDescription: 'A sample company profile website built with Bootstrap as a demonstration project. It showcases company information, services, and contact details within a professional and structured layout, highlighting how corporate websites can appear clean and modern.', github: 'https://github.com/username/project-1' },
  { id: 2, title: 'Foodie Website', image: '/images/projects/Demo_foodie.png', description: 'Restaurant landing page for Foodie.', fullDescription: 'An engaging restaurant landing page developed using HTML, CSS, and JavaScript to showcase Foodie’s brand identity, menu highlights, and customer reviews. The website emphasizes appealing visuals and smooth layout transitions, although it is not yet fully responsive across all devices.', github: 'https://github.com/username/project-2' },
  { id: 3, title: 'Expro Hotel Website', image: '/images/projects/Demo_hotel.png', description: 'Hotel booking platform for room reservations.', fullDescription: 'A full-stack hotel booking platform built with Laravel and Bootstrap, designed to help users browse available rooms, check details, and make online reservations seamlessly. The system allows administrators to manage room availability, pricing, and customer bookings efficiently through a dedicated dashboard.', github: 'https://github.com/username/project-3' },
  { id: 4, title: 'To-Do Mobile App', image: '/images/projects/Demo_todo.png', description: 'Mobile to-do app for task management.', fullDescription: 'A full-stack mobile application built with React Native and Tailwind CSS that helps users organize and manage their daily tasks efficiently. The app provides features such as task creation, progress tracking, and completion checklists, all within a clean and user-friendly interface.', github: 'https://github.com/username/project-4' },
  { id: 5, title: 'DoTravel Website', image: '/images/projects/Demo_travel.png', description: 'Travel website for a tour agency.', fullDescription: 'A travel website developed using HTML, Tailwind CSS, and JavaScript for a tour agency to promote destinations, tour packages, and customer reviews. The website focuses on presenting travel information attractively but does not include an online booking feature.', github: 'https://github.com/username/project-5' },
  { id: 6, title: 'Beasiswa Website', image: '/images/projects/Demo_Bs.png', description: 'Scholarship website for online applications.', fullDescription: 'A web platform built with Laravel, MySQL, and TailwindCSS that enables students to explore various scholarship opportunities and submit their applications online. The website focuses solely on the registration process, allowing applicants to fill out and submit forms easily without an admin panel.', github: 'https://github.com/username/project-5' },
];

const TESTIMONIALS = [
  { id: 1, clientImage: "/images/certificates/ser-foodie.JPG", title: "Landing page with HTML and Css Certification", description: "Certification demonstrating expertise in developing and maintaining applications on AWS platform.", companyName: "PT WAN Teknologi", rating: 5 },
  { id: 2, clientImage: "/images/certificates/ser-hotel.JPG", title: "EXPro Hotel Application Website Certification", description: "Completed comprehensive course on React.js, including hooks, context, and advanced patterns.", companyName: "PT Dimensi Kreasi Nusantara", rating: 5 },
  { id: 3, clientImage: "/images/certificates/ser-library.JPG", title: "Library Management Website Certification", description: "Certification in full-stack development covering MERN stack and modern web technologies.", companyName: "PT Kreasi Media", rating: 5 },
  { id: 4, clientImage: "/images/certificates/ser-todo.JPG", title: "Full Stack Mobile App Certification", description: "Completed intensive program on building scalable backend applications with Node.js and Express.", companyName: "Ginvo Studio", rating: 5 },
  { id: 5, clientImage: "/images/certificates/ser-toeic.jpg", title: "Toeic Test Certification (2025)", description: "Certification in Python programming with focus on data structures, algorithms, and AI fundamentals.", companyName: "TOEIC", rating: 5 },
  { id: 6, clientImage: "/images/certificates/ser-fr1.JPG", title: "EF Course FR 1.1 Certification", description: "Certification in Python programming with focus on data structures, algorithms, and AI fundamentals.", companyName: "English First", rating: 5 },
  { id: 7, clientImage: "/images/certificates/ser-osis.JPG", title: "Student Council (Secretary) Certification", description: "Certification in Python programming with focus on data structures, algorithms, and AI fundamentals.", companyName: "Pesat Vocational School", rating: 5 },
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- COMPONENTS ---
const Ticker = () => {
  const tickerItems = "SOFTWARE DEVELOPER ✦ FRONT END ENGINEER ✦ WEB & MOBILE APPS ✦ ";
  const fullContent = tickerItems.repeat(5);

  return (
    <div className="ticker-container w-full h-8 overflow-hidden border-t border-b border-black text-black bg-white">
      <div className="ticker-content py-1 text-base font-content uppercase tracking-widest whitespace-nowrap">
        <span className="inline-block text-lg px-2">{fullContent}</span>
        <span className="inline-block text-lg px-2">{fullContent}</span>
      </div>
    </div>
  );
};

const SkillLogo = ({ name, imageUrl, index }: { name: string; imageUrl: string; index: number }) => (
  <motion.div 
    
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex flex-col items-center p-3 transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg border border-gray-100 will-change-transform" 
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    <img 
      src={imageUrl} 
      alt={`${name} Logo`}
      className="w-8 h-8 md:w-10 md:h-10 object-contain pointer-events-none"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; 
        target.src = `https://placehold.co/40x40/f0f0f0/333333?text=${name.substring(0, 1)}`;
      }}
    />
    <span className="text-xs mt-1 font-semibold text-gray-700 pointer-events-none">{name}</span>
  </motion.div>
);

interface ResumeSectionParagraph {
  title: string;
  content: string;
  type: 'paragraph';
}

interface ResumeSectionListItem {
  title: string;
  details: string;
}

interface ResumeSectionList {
  title: string;
  content: ResumeSectionListItem[];
  type: 'list';
}

interface ResumeSectionSkillItem {
  name: string;
  imageUrl: string;
}

interface ResumeSectionSkills {
  title: string;
  content: ResumeSectionSkillItem[];
  type: 'skills';
}

type ResumeSection = ResumeSectionParagraph | ResumeSectionList | ResumeSectionSkills;

const renderSectionContent = (section: ResumeSection) => {
  switch (section.type) {
    case 'paragraph':
      return <p className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />;
    case 'list':
      return (
        <div className="space-y-4">
          {section.content.map((item, index) => (
            <motion.div 
              key={index}
              
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-semibold text-sm md:text-base">{item.details}</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-700">{item.title}</p>
            </motion.div>
          ))}
        </div>
      );
    case 'skills':
      return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {section.content.map((skill, index) => (
            <SkillLogo key={index} name={skill.name} imageUrl={skill.imageUrl} index={index} />
          ))}
        </div>
      );
    default:
      return null;
  }
};

const DownloadCVButton = ({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    className="cursor-pointer"
    whileTap={{ scale: 0.95 }}
    onClick={() => window.open('/CV_vanya.pdf', '_blank')}
  >
    <div
      className={`group relative inline-flex h-[36px] items-center justify-center rounded-full py-0.5 pl-4 pr-10 font-medium shadow-xl transition-colors duration-300
        ${isScrolled ? 'bg-neutral-50 text-neutral-950 hover:bg-gray-200' : 'bg-white text-neutral-950 hover:bg-gray-100 border border-white/20'}`}
    >
      <span className="z-10 pr-1 uppercase tracking-wider text-xs font-content">Download CV</span>
      <motion.div
        className={`absolute right-1 inline-flex h-7 w-7 items-center justify-end rounded-full transition-[width] group-hover:w-[calc(97%-4px)] duration-300 ${isScrolled ? 'bg-neutral-300' : 'bg-neutral-300'}`}
        initial={false}
      >
        <div className="mr-2 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${isScrolled ? 'text-neutral-950' : 'text-neutral-950'}`}>
            <path d="M7.5 10.8536C7.30574 10.6583 7.30574 10.3417 7.5 10.1464L10.6464 7H2.5C2.22386 7 2 6.77614 2 6.5C2 6.22386 2.22386 6 2.5 6H10.6464L7.5 2.85355C7.30574 2.65829 7.30574 2.34171 7.5 2.14645C7.69526 1.95118 8.01184 1.95118 8.20711 2.14645L12.2071 6.14645C12.4024 6.34171 12.4024 6.65829 12.2071 6.85355L8.20711 10.8536C8.01184 11.0488 7.69526 11.0488 7.5 10.8536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" transform="rotate(90 7.5 7.5)" />
          </svg>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const ParallaxBackground = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    interface Offset {
      x: number;
      y: number;
    }

    interface MouseMoveEvent extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 40; 
      const moveY = (clientY / window.innerHeight - 0.5) * 40;
      setOffset({ x: moveX, y: moveY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url('/images/bgv.JPG')",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.1)`, 
          filter: 'grayscale(100%) contrast(1.2) blur(6px)',
        }}
      />
      <div className="absolute inset-0 z-1 bg-black/30 backdrop-blur-sm"></div>
    </>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const links = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Resume", href: "#resume", icon: User }, 
    { name: "Projects", href: "#projects", icon: Layers },
    { name: "Certificates", href: "#clients", icon: Aperture },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const menuVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const handleLinkClick = () => setIsMenuOpen(false);
  
  const innerDivClasses = `flex justify-between items-center w-full mx-auto transition-all duration-500 ease-in-out 
    ${isScrolled ? 'max-w-full px-6 py-3 shadow-lg bg-black/80 border-b border-gray-700 rounded-none backdrop-blur-md' 
    : 'max-w-6xl px-6 py-3 bg-white/5 border border-white/10 rounded-full shadow-2xl backdrop-blur-sm'}`;
  
  const logoColorClass = isScrolled ? 'text-white' : 'text-white';
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out p-4 sm:p-6" style={{ padding: isScrolled ? '0' : '1rem' }}>
      <div className={innerDivClasses}>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 1 }}
          className={`text-lg font-semibold tracking-widest uppercase cursor-pointer ${logoColorClass} transition-colors duration-500`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          VANYA
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 1.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          <div className="flex space-x-2">
            {links.map((link, index) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition duration-300 rounded-full font-medium
                  ${isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/90 hover:text-gray-900'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <DownloadCVButton isScrolled={isScrolled} />
        </motion.div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`md:hidden z-20 p-1 rounded hover:bg-white/10 transition ${logoColorClass}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          initial="closed" 
          animate="open" 
          
          className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[calc(100%-48px)] ${isScrolled ? 'bg-black/70 text-white' : 'bg-white/10 text-white'} backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/10`}
        >
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={handleLinkClick} 
              className={`flex items-center justify-center py-3 text-center ${isScrolled ? 'text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'} rounded-md transition duration-200 uppercase tracking-wider text-sm`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <link.icon size={16} className="mr-2"/>
              {link.name}
            </a>
          ))}
          <div className="mt-4 border-t border-white/20 pt-4 flex justify-center">
            <DownloadCVButton isScrolled={isScrolled} />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- PROJECTS SECTION ---
type Project = {
  id: number;
  title: string;
  image: string;
  description: string;
  fullDescription: string;
  github: string;
};

const ProjectCard = ({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}) => (
  <motion.div 
    onClick={() => onClick(project)} 
    className="relative flex-shrink-0 w-[300px] md:w-[350px] mx-4 cursor-pointer"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }} 
    style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
  >
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-6 bg-neutral-900 rounded-md shadow-inner border-b-2 border-neutral-700 z-10 pointer-events-none" />
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-in-out border border-gray-100 will-change-transform">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-48 object-cover pointer-events-none"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = `https://placehold.co/600x400/e0e0e0/757575?text=Image+Error`; 
        }}
      />
      <div className="p-5 pointer-events-none">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-700 text-sm line-clamp-2">{project.description}</p>
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    onClick={onClose}
    className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
  >
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }} 
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <button 
        onClick={onClose} 
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors z-10 p-2 bg-white rounded-full shadow-md" 
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-64 md:h-80 object-cover rounded-t-lg"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = `https://placehold.co/600x400/e0e0e0/757575?text=Image+Error`; 
        }}
      />
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{project.fullDescription}</p>
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-neutral-950 text-white font-semibold rounded-lg shadow-md hover:bg-neutral-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-opacity-50"
        >
          Lihat Detail
          <ArrowUpRight size={20} className="ml-2" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const doubledProjects = [...projectData, ...projectData];

  return (
    <section id="projects" className="w-full py-10 md:py-17 overflow-hidden bg-polka-animated">
      <motion.div 
        className="container mx-auto px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          
          className="text-3xl md:text-4xl font-extrabold text-black uppercase mb-3 font-content"
        >
          Projects ✦
        </motion.h2>
        <motion.p 
          
          className="text-md md:text-md text-black max-w-lg mx-auto font-content"
        >
          Several selected projects I've worked on, ranging from web applications to analytics dashboards. 
        </motion.p>
        <motion.p   className="text-md md:text-md text-black max-w-lg mx-auto mb-10 font-bold">Tap for more details.</motion.p>
      </motion.div>
      <div className="w-full overflow-hidden py-7">
        <div className="w-full" style={{ perspective: '1200px', transform: 'rotateY(-3deg) scale(0.95)', transformOrigin: 'left center' }}>
          <motion.div className="flex whitespace-nowrap project-carousel" style={{ animationDuration: '20s' }}>
            {doubledProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} onClick={setSelectedProject} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
};

// --- CERTIFICATES SECTION ---
interface Testimonial {
  id: number;
  clientImage: string;
  title: string;
  description: string;
  companyName: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
  const baseClasses = "flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-xl transition-all duration-500 ease-in-out w-full text-center cursor-pointer will-change-transform";
  const activeClasses = isActive ? "scale-100 opacity-100 shadow-2xl z-10" : "scale-90 opacity-50 shadow-md"; 
  const hoverClasses = isActive ? "hover:-translate-y-2 hover:shadow-2xl" : "hover:opacity-70";

  return (
    <motion.div 
      className={`${baseClasses} ${activeClasses} ${hoverClasses}`} 
      style={{ minHeight: '300px', WebkitTapHighlightColor: 'transparent' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        scale: isActive ? 1 : 0.9 
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex items-center justify-center mb-4 pointer-events-none">
        <img 
          src={testimonial.clientImage} 
          alt={`Sertifikat dari ${testimonial.companyName}`}
          className="w-full h-full max-w-xs rounded-lg shadow-md object-contain" 
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = `https://placehold.co/400x250/e0e0e0/757575?text=Sertifikat+Image+Error`; 
          }}
        />
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 w-full pointer-events-none">
        <p className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-snug">{testimonial.title}</p>
        <p className="text-xs md:text-sm font-medium text-gray-500">{testimonial.companyName}</p>
      </div>
    </motion.div>
  );
};

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = TESTIMONIALS.length;
  const AUTO_PLAY_INTERVAL = 6000;

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalCards);
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const indices = useMemo(() => {
    const prevIndex = (activeIndex - 1 + totalCards) % totalCards;
    const nextIndex = (activeIndex + 1) % totalCards;
    return { prevIndex, activeIndex, nextIndex };
  }, [activeIndex, totalCards]);

  return (
    <section id="clients" className="w-full py-10 md:py-17 flex flex-col justify-center items-center bg-white font-content">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.header 
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            
            className="text-3xl md:text-4xl font-extrabold text-black mb-3 uppercase"
          >
            CERTIFICATES ✦
          </motion.h2>
          <motion.p 
            
            className="text-md md:text-md text-black max-w-2xl mx-auto"
          >
            Official proof of qualifications and technical skills achieved.
          </motion.p>
        </motion.header>

        <div className="relative w-full max-w-6xl mx-auto px-4"> 
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <div className="hidden md:block w-1/3">
              <TestimonialCard testimonial={TESTIMONIALS[indices.prevIndex]} isActive={false} />
            </div>
            <div className="w-full md:w-1/3">
              <TestimonialCard testimonial={TESTIMONIALS[indices.activeIndex]} isActive={true} />
            </div>
            <div className="hidden md:block w-1/3">
              <TestimonialCard testimonial={TESTIMONIALS[indices.nextIndex]} isActive={false} />
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 z-20 hidden md:block hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 z-20 hidden md:block hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {TESTIMONIALS.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActiveIndex(index)}
              className={"w-3 h-3 rounded-full transition-colors duration-300 " + (index === activeIndex ? 'bg-neutral-950 w-6' : 'bg-gray-300')}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex justify-between md:hidden mt-8 max-w-xs mx-auto">
          <button 
            onClick={prevSlide}
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            aria-label="Previous testimonial (Mobile)"
          >
            <svg className="w-5 h-5 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
            aria-label="Next testimonial (Mobile)"
          >
            <svg className="w-5 h-5 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT SECTION ---
interface UnderlineInputProps {
  name: string;
  type?: string;
  placeholder: string;
  isTextarea?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const UnderlineInput = ({
  name,
  type = 'text',
  placeholder,
  isTextarea = false,
  value,
  onChange,
}: UnderlineInputProps) => {
  const commonClasses = "w-full pt-4 pb-2 border-b border-gray-300 focus:outline-none focus:border-black text-lg placeholder-gray-500 transition-all duration-300 bg-transparent font-content";

  return (
    <div className="mb-6">
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={2}
          value={value}
          onChange={onChange}
          className={`${commonClasses} resize-none`}
          required
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={commonClasses}
          required
        />
      )}
    </div>
  );
};

const ContactSection = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

  const handleChange = (e: HandleChangeEvent): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    
  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  type SubmitStatus = 'success' | 'error' | null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:vanyashaumy@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  interface MouseMoveEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
    currentTarget: HTMLDivElement;
    clientX: number;
    clientY: number;
  }

  const handleMouseMove = (e: MouseMoveEvent): void => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 font-content">
      <motion.div
        className="w-full max-w-7xl bg-[#1c1c1c] shadow-2xl overflow-hidden relative rounded-3xl"
        
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <motion.div
            className="relative flex flex-col text-white bg-wireframe-map p-8 sm:p-12 lg:p-16"
            variants={itemVariants}
          >
            <div className="relative z-20 flex flex-col h-full justify-between">
              <div>
                <motion.h1 
                  className="flex gap-2 text-5xl sm:text-4xl lg:text-6xl font-semibold mb-20" 
                  variants={itemVariants}
                >
                  Get in <p style={{ fontFamily:"'pinyon script'" }} className='items-center flex justify-center ml-3 text-7xl'>t</p>ouch
                </motion.h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm md:mt-40">
                <motion.div variants={itemVariants}>
                  <h3 className="uppercase tracking-wider text-xs opacity-60 mb-3">LOCATION</h3>
                  <p className="leading-relaxed opacity-90">
                    Bogor, Indonesia<br />
                    Available for remote work<br />
                    & on-site collaboration
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <h3 className="uppercase tracking-wider text-xs opacity-60 mb-3">CONTACT</h3>
                  <p className="leading-relaxed opacity-90">
                    vanyashaumy@gmail.com
                  </p>
                </motion.div>
              </div>

              <motion.div className="flex space-x-4 mt-8 pt-8 border-t border-white/10" variants={itemVariants}>
                <a href="https://github.com/stiIlanya" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FaGithub size={18} />
                </a>
                <a href="https://discord.com/users/cottonblush" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FaDiscord size={18} />
                </a>
                <a href="https://instagram.com/vanyaasha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://linkedin.com/in/vanya-shaumy-b1473538a" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FaLinkedin size={18} />
                </a>
              </motion.div>
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center p-8 sm:p-12 lg:p-16" style={{ perspective: '1500px' }}>
            <motion.div
              className="bg-white text-gray-900 p-8 sm:p-10 lg:p-12 shadow-2xl w-full max-w-md lg:max-w-lg rounded-2xl"
              variants={itemVariants}
              style={{
                position: 'relative',
                zIndex: 10,
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: rotateX,
                rotateY: rotateY,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h2 className="uppercase tracking-widest text-black text-sm font-semibold mb-2">
                LET'S WORK TOGETHER
              </h2>
              <p className="text-xs text-gray-600 mb-8">
                Have a project in mind? I'm ready to help bring your technical vision to life
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <UnderlineInput 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                />
                <UnderlineInput 
                  name="email" 
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                />
                <UnderlineInput 
                  name="message" 
                  placeholder="Your Message" 
                  isTextarea={true} 
                  value={formData.message}
                  onChange={handleChange}
                />

                {submitStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm"
                  >
                    Opening email client...
                  </motion.p>
                )}
                
                {submitStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}

                <div className="flex justify-end items-center pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white py-3 px-10 font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaLinkedin, href: "https://linkedin.com/in/vanya-shaumy-b1473538a", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/stiIlanya", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com/vanyashaumy", label: "Instagram" },
    { icon: FaDiscord, href: "https://discord.com/users/cottonblush", label: "Discord" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Resume", href: "#resume" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#clients" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.footer 
      className="bg-neutral-200 text-neutral-800 py-12 px-6 md:px-20 font-content"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <motion.div 
            className="space-y-4"
            
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold tracking-wider text-neutral-700">
              VANYA SHAUMY
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Software Developer specializing in full-stack web development, mobile applications, and cloud solutions.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4 md:ml-20"
            
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="space-y-4"
           
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
              Get In Touch
            </h4>
            <div className="space-y-2 text-sm text-neutral-500">
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-neutral-500" />
                vanyashaumy@gmail.com
              </p>
              <p className="flex items-center">
                <MapPin size={16} className="mr-2 text-neutral-500" />
                Bogor, Indonesia
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-400 hover:text-neutral-900 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-neutral-400 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600 space-y-4 md:space-y-0">
          <p>© {currentYear} Vanya Shaumy. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-neutral-900 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// --- MAIN APP ---
export default function App() {
  useEffect(() => {
    document.title = "Vanya Shaumy | Portfolio & Resume";
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-content">
      {globalStyles}
      <Navbar />
      
      <section id="home" className="min-h-screen w-full text-white relative flex flex-col justify-center items-center p-6 sm:p-12">
        <ParallaxBackground />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-full max-w-4xl text-center px-4 z-10"
        >
          <h1 style={{ fontFamily: "'Inter', sans-serif" }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
            Welcome to my
          </h1>
          <div className="relative inline-block -mt-4 sm:-mt-8">
            <h2 className="text-5xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-none text-white -mt-2 sm:-mt-4">
              <span style={{ fontFamily: "'Pinyon Script', cursive" }}>Portfolio</span>
            </h2>
          </div>
        </motion.div>
        
        <motion.footer 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="absolute bottom-6 sm:bottom-12 left-0 right-0 w-full px-6 sm:px-12 z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-8 w-full max-w-7xl mx-auto text-xs sm:text-sm uppercase tracking-widest text-white/80">
            <div className="text-center md:text-left">
              <p>VANYA SHAUMY</p>
              <p>VANYASHAUMY@GMAIL.COM</p>
            </div>
            <div className="text-center md:text-right md:self-end">
              <p>SOFTWARE DEVELOPER</p>
            </div>
          </div>
        </motion.footer>
      </section>
      
      <section id="resume" className="relative bg-white text-black z-20">
        <Ticker />
        <main className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-16">
          <div className="md:grid md:grid-cols-3 gap-10 lg:gap-20">
            <motion.section 
              className="col-span-1 border-b border-black md:border-b-0 pb-8 md:pb-0 flex flex-col items-center md:items-start md:block"
              
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-none mb-4 font-bold text-center md:text-left w-full">
                <div className="flex justify-center items-center space-x-2 md:block md:space-x-0 md:justify-start">
                  <span className="inline-block" style={{ fontFamily: "'Inter', sans-serif" }}>Vanya</span>
                  <div className="md:inline-block flex items-center">
                    <span className="font-pinyon text-5xl sm:text-7xl md:text-7xl md:inline-block" style={{ marginTop: '0', verticalAlign: 'middle' }}>S</span>
                    <span className="inline-block" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1' }}>haumy</span>
                  </div>
                </div>
                <span className="inline-block text-base font-content tracking-normal font-medium mt-2 md:mt-0 md:align-top md:ml-1 md:text-base">(17)</span>
              </h1>
              
              <div className="w-full h-auto rounded-3xl max-w-[200px] aspect-[4/5] p-2 border border-black my-2 mx-auto md:mx-0">
                <img 
                  src="/images/resume.JPG" 
                  alt="Vanya Shaumy Profile"
                  className="w-full h-full object-cover rounded-3xl"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = "https://placehold.co/200x250/f0f0f0/333333?text=Image+Error"; 
                  }}
                />
              </div>
            </motion.section>

            <motion.section 
              className="col-span-2 space-y-12 pt-8 md:pt-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {resumeData.sections.map((section, sectionIndex) => (
                <motion.div 
                  key={sectionIndex} 
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8"
                  
                >
                  <h2 className="col-span-1 font-content font-bold uppercase tracking-wider text-sm md:text-base pt-1">
                    {section.title}
                  </h2>
                  <div className="col-span-3">
                    {renderSectionContent(section)}
                  </div>
                </motion.div>
              ))}
            </motion.section>
          </div>
        </main>
      </section>
      
      <ProjectsSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}