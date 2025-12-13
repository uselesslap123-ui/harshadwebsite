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
  { 
    name: "Flutter", 
    icon: Smartphone,
    details: `### Key Aspects of Flutter Development
* **Cross-Platform:** Build natively compiled applications for mobile, web, and desktop from a single codebase.
* **Hot Reload:** Instantly view changes in your app, leading to faster development cycles.
* **Widget-Based UI:** Create complex UIs by composing simple, customizable widgets.
* **Expressive UI:** Easily create beautiful and highly-animated user interfaces.
* **Strong Community:** Backed by Google and a large, active developer community.`
  },
  { 
    name: "Dart", 
    icon: Code,
    details: `### Core Features of Dart
* **Optimized for UI:** Specifically designed for building user interfaces with features like null safety.
* **High Performance:** Compiles to fast, native code for mobile and desktop.
* **Productive Development:** Offers a flexible and robust syntax that is easy to learn.
* **Asynchronous Programming:** Excellent support for asynchronous operations, crucial for responsive apps.
* **Multi-Platform:** The language behind Flutter, enabling code to run on various platforms.`
  },
  { 
    name: "UI/UX Design", 
    icon: PenTool,
    details: `### Principles of UI/UX Design
* **User-Centric:** Focuses on understanding user behaviors, needs, and motivations.
* **Wireframing & Prototyping:** Creating low and high-fidelity mockups to visualize the user flow.
* **Intuitive Interfaces:** Designing layouts that are easy to navigate and understand.
* **Visual Hierarchy:** Guiding the user's attention to the most important elements.
* **Feedback & Iteration:** Continuously improving the design based on user testing and feedback.`
  },
  { 
    name: "App Navigation", 
    icon: Navigation,
    details: `### Core Concepts of App Navigation
* **User Flow:** Mapping out the path a user takes to complete a task.
* **Navigation Patterns:** Implementing standard patterns like tabs, drawers, and stacks.
* **State Management:** Managing the app's state to handle different navigation scenarios.
* **Deep Linking:** Allowing users to navigate directly to specific content within the app.
* **Accessibility:** Ensuring navigation is usable for everyone, including those with disabilities.`
  },
  { 
    name: "Debugging", 
    icon: Bug,
    details: `### Effective Debugging Techniques
* **Problem Identification:** Systematically identifying, isolating, and fixing issues in code.
* **Using Breakpoints:** Pausing code execution to inspect variables and program state.
* **Reading Logs:** Analyzing error messages and logs to trace the source of a problem.
* **Reproducing Bugs:** Reliably recreating issues to understand their cause.
* **Version Control:** Using tools like Git to track changes and revert to working states.`
  },
  { 
    name: "Adaptability", 
    icon: RefreshCw,
    details: `### Key Traits of Adaptability
* **Flexible Mindset:** Being open to new ideas, technologies, and changing project requirements.
* **Problem Solving:** Adjusting strategies to overcome unexpected challenges.
* **Continuous Learning:** Proactively acquiring new skills to stay relevant in a fast-paced industry.
* **Resilience:** Maintaining performance and a positive attitude during times of change.
* **Collaboration:** Effectively working with different teams and personalities.`
  },
  { 
    name: "Eager to Learn", 
    icon: Sparkles,
    details: `### Demonstrating Eagerness to Learn
* **Curiosity:** Actively seeking out new knowledge and asking insightful questions.
* **Proactive Learning:** Independently exploring new technologies and concepts beyond coursework.
* **Seeking Feedback:** Viewing constructive criticism as an opportunity for growth.
* **Applying Knowledge:** Putting newly learned skills into practice through personal projects.
* **Staying Current:** Following industry trends and engaging with the developer community.`
  },
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
  { name: "LinkedIn", url: "https://www.linkedin.com/in/harshad-shewale-5189b428a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: "Linkedin" }
];
