import {
  CircuitBoard,
  FunctionSquare,
  Camera,
  Smartphone,
  Code,
  PenTool,
  Navigation,
  Bug,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export const studentName = "Harshad Shewale";

export const summary = {
  title: "Aspiring Electronics Engineer & Developer",
  description: "A second-year Electronics and Telecommunication student passionate about gaining practical industry exposure. Eager to leverage hands-on internship experience to grow my skills in both electronics and software development, with a keen interest in Web and Flutter development.",
  inspiring_quote: "Bridging the world of hardware and software, one line of code at a time."
};

export type Skill = {
  name: string;
  icon: LucideIcon;
  url?: string;
  details?: string;
};

export const skills: Skill[] = [
  { 
    name: "Basic Electronics", 
    icon: CircuitBoard,
    details: `### Key Concepts in Basic Electronics
* **Components:** Deals with fundamental electronic components like resistors, diodes, transistors, and capacitors.
* **Current Flow:** Explains the flow of electric current within electronic circuits.
* **Signal Types:** Helps in understanding the difference between AC and DC signals.
* **Real-World Applications:** Teaches how common electronic devices work in daily life.
* **Foundation:** Forms the basis for advanced subjects like digital electronics and communication systems.`
  },
  { 
    name: "Circuit Analysis", 
    icon: FunctionSquare,
    details: `### What I learned in Circuit Analysis
* I learned the **basic concepts of electrical circuits** like current, voltage, and resistance.
* I understood **Ohm’s Law** and how it is used to solve simple circuits.
* I learned **Kirchhoff’s Current Law (KCL)** and **Kirchhoff’s Voltage Law (KVL)**.
* I studied **series and parallel circuits** and how to calculate total resistance.
* I learned how to **analyze simple DC circuits step by step**.
### My experience while learning
* At first, the subject felt **difficult and confusing**.
* With practice, I started **understanding the logic behind formulas**.
* Solving numerical problems improved my **confidence and speed**.
* I learned the importance of **practice and patience** in circuit analysis.
### How I will work ahead
* I will **revise basics regularly** to avoid confusion.
* I will **practice more numerical problems** daily.
* I will focus on **understanding concepts instead of memorizing formulas**.
* I will use **diagrams and step-by-step methods** while solving problems.
* I will ask doubts early and **keep improving my problem-solving skills**.`
  },
  { name: "Photography", icon: Camera, url: "https://www.instagram.com/photographic_harsh_213?igsh=MWprdm95YXllaHd4ZQ==" },
  { name: "Flutter", icon: Smartphone },
  { name: "Dart", icon: Code },
  { name: "UI/UX Design", icon: PenTool },
  { name: "App Navigation", icon: Navigation },
  { name: "Debugging", icon: Bug },
  { name: "Adaptability", icon: RefreshCw },
  { name: "Eager to Learn", icon: Sparkles },
];

export const experiences = [
    {
        year: "2025",
        company: "Red Bull",
        title: "Job Simulation",
        description: "Participated in a virtual program exploring marketing and data analysis strategies in a fast-paced environment.",
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_redbull-forage-salessimulation-activity-7400397505437548544-VdZ8?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=share_via",
    },
    {
        year: "2025",
        company: "Siemens",
        title: "Job Simulation",
        description: "Gained insights into industrial engineering and digital solutions through a simulated project.",
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_im-happy-to-share-that-ive-obtained-a-new-activity-7400072432780423168-HkOr?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=share_via",
    },
    {
        year: "2025",
        company: "Accenture",
        title: "Job Simulation",
        description: "Completed a job simulation focusing on software engineering principles and project management.",
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_accenture-forage-linkedincommunity-activity-7399144782347956224-vTrC?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=share_via",
    },
    {
        year: "2025",
        company: "Tata",
        title: "Job Simulation",
        description: "A virtual experience covering various aspects of engineering and corporate strategy within the Tata group.",
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_genai-aiinanalytics-dataanalytics-activity-7398620806236291072-kg17?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=share_via",
    },
    {
        year: "2025",
        company: "Deloitte",
        title: "Job Simulation",
        description: "Engaged in a virtual experience simulating real-world tasks and challenges faced by technology consultants.",
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_winterinternship-internship2025-winterintern-activity-7354917636368986113-l7JT?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=copy_link",
    },
    {
        year: "2025",
        company: "Workshop",
        title: "GenAI Data Analyst",
        description: "Intensive workshop on leveraging Generative AI for data analysis and interpretation.",
    },
    {
        year: "2025",
        company: "Bootcamp",
        title: "Full Stack AI Development",
        description: "Comprehensive bootcamp covering the entire stack of AI application development, from backend models to frontend interfaces.",
        certificateUrl: "https://www.linkedin.com/posts/kumarmajethia_join-our-2nd-in-person-full-stack-ai-bootcamp-activity-7350215846272630786-dhiw?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=copy_link",
    },
];

export const projects = [
  { name: "Trustyatra App", description: "A travel companion app focused on safety and reliability.", imageId: "project1" },
  { name: "UPI QR Generator", description: "A web tool to quickly generate UPI payment QR codes.", imageId: "project2", liveDemoUrl: "https://adityashewale.vercel.app" },
  { name: "Graphic Design Portfolio", description: "A website showcasing various graphic design projects.", imageId: "project3" },
  { name: "Flower Selling Website", description: "An e-commerce platform for a local floral business.", imageId: "project4", liveDemoUrl: "https://studioflowers.vercel.app" },
  { name: "University Event Website", description: "A portal for managing and promoting university events.", imageId: "project5" },
  { name: "Chatbot App", description: "A conversational AI application for customer support.", imageId: "project6" },
];

export const education = {
  degree: "Bachelor of Engineering, Electronics & Telecommunication",
  university: "Bharati Vidyapeeth College Of Engineering",
  years: "2024 - 2028",
  status: "Currently a 2nd year Student"
};

export const navLinks = [
    { href: "#summary", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
];

export const socialLinks = [
  { name: "GitHub", url: "#", icon: "Github" },
  { name: "LinkedIn", url: "#", icon: "Linkedin" }
];
