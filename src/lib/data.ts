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
  description: "A second-year Electronics and Telecommunication student and an active member of the BVCOE Robotics Club, I am passionate about gaining practical industry exposure. I'm eager to leverage hands-on internship experience to grow my skills in both electronics and software development, with a keen interest in Web and Flutter development.",
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
    details: `### 📘 10 Points Learned in Basic Electronics
* **Ohm’s Law** — The relationship between voltage, current, and resistance is defined as V = I × R.
* **Types of Components** — Basic electronic circuits use resistors, capacitors, inductors, diodes, and transistors.
* **Series and Parallel Circuits** — Components can be connected in series or parallel, affecting voltage and current distribution.
* **Diodes** — Diodes allow current to flow in only one direction and are used for rectification.
* **Capacitors** — Capacitors store and release electrical energy and are used for filtering and timing applications.
* **Transistors** — Transistors act as switches or amplifiers in electronic circuits.
* **Power and Energy** — Electrical power is calculated as P = V × I, and it represents the rate of energy consumption.
* **AC and DC** — Direct current (DC) flows in one direction, while alternating current (AC) changes direction periodically.
* **Signal Filtering** — Filters are used to remove unwanted frequencies from a signal using capacitors and inductors.
* **Safety Practices** — Proper grounding, insulation, and current limits are essential to prevent damage and ensure user safety.`
  },
  { 
    name: "Circuit Analysis", 
    icon: FunctionSquare,
    details: `### 📘 10 Key Concepts in Circuit Analysis
* **Kirchhoff's Current Law (KCL)** — The sum of currents entering a node is equal to the sum of currents leaving it, based on the conservation of charge.
* **Kirchhoff's Voltage Law (KVL)** — The sum of all voltage drops in a closed loop equals the total electromotive force, based on the conservation of energy.
* **Nodal Analysis** — A method to determine the voltage at each node relative to a reference node, simplifying complex circuit calculations.
* **Mesh Analysis** — A technique using KVL to calculate loop currents in planar circuits, useful for circuits with multiple loops.
* **Thevenin's Theorem** — Any linear circuit can be simplified to an equivalent circuit with a single voltage source and series resistor.
* **Norton's Theorem** — Any linear circuit can be simplified to an equivalent circuit with a single current source and parallel resistor.
* **Superposition** — In a linear circuit, the total effect of multiple sources is the sum of the effects of each source acting alone.
* **Capacitor & Inductor Behavior** — Understanding how capacitors resist changes in voltage and inductors resist changes in current (I=C(dV/dt), V=L(dI/dt)).
* **AC Circuit Analysis** — Analyzing circuits with sinusoidal sources using phasors and complex impedance for resistors, capacitors, and inductors.
* **Frequency Response** — Studying how a circuit's output changes with the frequency of the input signal, including concepts of resonance and filters.`
  },
  { name: "Photography", icon: Camera, url: "https://www.instagram.com/photographic_harsh_213?igsh=MWprdm95YXllaHd4ZQ==" },
  { 
    name: "Flutter", 
    icon: Smartphone,
    details: `### 📘 10 Core Concepts of Flutter Development
* **Cross-Platform Development** — Build natively compiled applications for mobile (iOS/Android), web, and desktop from a single codebase.
* **Widget-Based UI** — Everything is a widget. Create complex UIs by composing simple, customizable widgets like \`Row\`, \`Column\`, and \`Container\`.
* **Stateful vs. Stateless Widgets** — Understand the difference between widgets that hold mutable state (\`StatefulWidget\`) and those that don't (\`StatelessWidget\`).
* **Hot Reload & Hot Restart** — Instantly view code changes in your app without losing state, leading to faster development and iteration cycles.
* **Layout System** — Use a flexible layout system based on Flexbox (Rows and Columns) to arrange widgets and create responsive designs.
* **Navigation and Routing** — Manage different screens and user flows using a \`Navigator\` and defining routes for your application.
* **Asynchronous Programming** — Utilize \`async\`, \`await\`, and \`Future\` to handle long-running operations like network requests without blocking the UI.
* **State Management** — Manage application state effectively using solutions like Provider, BLoC, or Riverpod to keep your UI in sync with your data.
* **Package Ecosystem** — Leverage a rich ecosystem of packages and plugins on pub.dev to add functionality like maps, charts, and device API access.
* **Platform Channels** — Communicate with platform-specific code (Swift/Kotlin) to access native features not available in Dart directly.`
  },
  { 
    name: "Dart", 
    icon: Code,
    details: `### 📘 10 Essential Features of Dart
* **Type System with Sound Null Safety** — A robust type system that prevents null reference errors, making code more reliable and easier to reason about.
* **Optimized for UI** — Designed for building user interfaces, with features like asynchronous programming that are crucial for responsive apps.
* **Multi-Platform Compiler** — Compiles to fast, native ARM/x64 code for mobile/desktop and to JavaScript for web applications.
* **Productive and Familiar Syntax** — Offers a flexible syntax that is easy for developers from languages like Java, C#, or JavaScript to learn.
* **Asynchronous Programming Support** — Built-in support for \`Future\` and \`Stream\` objects, along with \`async\` and \`await\` keywords, simplifies handling asynchronous operations.
* **Isolates for Concurrency** — Dart is single-threaded but uses isolates (independent workers with their own memory) to perform concurrent operations without shared-memory issues.
* **Rich Standard Library** — Comes with a comprehensive core library that provides essential utilities for collections, async, math, and more.
* **JIT and AOT Compilation** — Supports Just-In-Time (JIT) compilation for fast development (Hot Reload) and Ahead-Of-Time (AOT) compilation for optimized, fast-starting production code.
* **Object-Oriented** — Every value is an object, and every class (except \`Null\`) descends from the \`Object\` class.
* **Extensive Tooling** — Comes with powerful tools like a package manager (\`pub\`), a code formatter (\`dart format\`), and an analyzer to ensure code quality.`
  },
  { 
    name: "UI/UX Design", 
    icon: PenTool,
    details: `### 📘 10 Principles of UI/UX Design
* **User-Centricity** — Focus on understanding user behaviors, needs, and motivations through research and personas to build intuitive products.
* **Consistency and Standards** — Ensure that elements and interactions behave consistently throughout the app, following platform conventions to reduce user confusion.
* **Visual Hierarchy** — Guide the user's attention to the most important elements on the screen using size, color, contrast, and placement.
* **Feedback and Response** — Provide immediate and clear feedback for user actions (e.g., button clicks, form submissions) to confirm the action was received.
* **Simplicity and Clarity** — Strive for clean, uncluttered interfaces that make it easy for users to achieve their goals without cognitive overload.
* **Accessibility** — Design for everyone, including users with disabilities, by following WCAG guidelines (e.g., color contrast, screen reader support).
* **Flexibility and Efficiency** — Provide shortcuts and accelerators for expert users while still being easy for novices to navigate.
* **Aesthetic and Minimalist Design** — Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with the relevant units.
* **Error Prevention and Forgiveness** — Design interfaces that prevent users from making common errors, and provide easy ways to undo actions.
* **Wireframing & Prototyping** — Create low and high-fidelity mockups to visualize user flows and test design concepts before writing code.`
  },
  { 
    name: "App Navigation", 
    icon: Navigation,
    details: `### 📘 10 Core Concepts of App Navigation
* **User Flow Mapping** — Planning and visualizing the path a user takes through an app to complete a specific task or achieve a goal.
* **Navigation Patterns** — Implementing standard UI patterns like bottom navigation bars, tabs, hamburger menus (drawers), and stacks for a familiar user experience.
* **Stack-Based Navigation** — A common model where screens are pushed onto and popped from a stack, creating a "last-in, first-out" history.
* **Stateful Navigation** — Managing the app's navigation state to handle complex scenarios like nested navigators or restoring state after the app is closed.
* **Deep Linking** — Allowing users to navigate directly to specific content or screens within an app from an external link (e.g., a website or push notification).
* **Declarative vs. Imperative Navigation** — Understanding the difference between describing the navigation stack (declarative, e.g., Navigator 2.0 in Flutter) and issuing commands to navigate (imperative).
* **Route Guarding** — Protecting routes based on certain conditions, such as requiring a user to be authenticated before accessing a profile screen.
* **Passing Arguments to Routes** — Sending data from one screen to another during a navigation event (e.g., passing a product ID to a product details screen).
* **Animated Transitions** — Using smooth and meaningful animations between screen transitions to provide context and improve the user experience.
* **Accessibility in Navigation** — Ensuring all navigation elements are clearly labeled and accessible to users with disabilities, including screen reader support.`
  },
  { 
    name: "Debugging", 
    icon: Bug,
    details: `### 📘 10 Effective Debugging Techniques
* **Systematic Problem Identification** — A methodical approach to identifying, isolating, and fixing issues in code, starting with reproducing the bug consistently.
* **Using Breakpoints** — Pausing code execution at specific lines to inspect the current state of variables, the call stack, and program flow.
* **Reading and Analyzing Logs** — Effectively using \`console.log\`, \`print\`, or structured logging to trace the execution path and variable values at different points in the code.
* **Reproducing Bugs Reliably** — Creating a minimal, repeatable test case that triggers the bug, which is crucial for understanding its root cause.
* **Version Control for Bisecting** — Using tools like \`git bisect\` to efficiently search through commit history and pinpoint the exact commit that introduced a bug.
* **Rubber Duck Debugging** — Explaining the code and the problem, line by line, to an inanimate object (or a colleague). This often helps reveal logical flaws.
* **Inspecting Network Requests** — Using browser or app developer tools to inspect API requests and responses, checking for incorrect data, headers, or status codes.
* **Understanding Error Messages** — Carefully reading and understanding stack traces and error messages, as they often point directly to the source of the problem.
* **Static Analysis Tools** — Utilizing linters and static analyzers to catch common errors and code smells before the code is even run.
* **Isolating the Problem** — Commenting out or simplifying parts of the code to narrow down which section is causing the issue.`
  },
  { 
    name: "Adaptability", 
    icon: RefreshCw,
    details: `### 📘 10 Traits of Adaptability in Tech
* **Flexible Mindset** — Being open to new ideas, changing project requirements, and different ways of thinking without resistance.
* **Embracing Change** — Viewing shifts in technology, priorities, or team structure as opportunities for growth rather than disruptions.
* **Continuous Learning** — Proactively acquiring new skills, tools, and technologies to stay relevant in a fast-paced and evolving industry.
* **Creative Problem Solving** — Adjusting strategies and finding innovative solutions when faced with unexpected challenges or constraints.
* **Resilience Under Pressure** — Maintaining performance, a positive attitude, and focus during times of uncertainty or high stress.
* **Effective Collaboration** — Seamlessly working with different teams, personalities, and roles to achieve a common goal, even as team dynamics change.
* **Learning from Failure** — Treating mistakes and setbacks as valuable learning experiences and iterating based on feedback.
* **Resourcefulness** — Finding ways to be effective and achieve goals even with limited resources or incomplete information.
* **Situational Awareness** — Quickly understanding and adjusting to new environments, team dynamics, or project contexts.
* **Proactive Communication** — Clearly communicating to manage expectations and ensure alignment when priorities or plans change.`
  },
  { 
    name: "Eager to Learn", 
    icon: Sparkles,
    details: `### 📘 10 Ways to Demonstrate Eagerness to Learn
* **Innate Curiosity** — Actively seeking out new knowledge, asking insightful questions, and exploring topics beyond the immediate scope of a task.
* **Proactive Learning** — Independently exploring new technologies, frameworks, or concepts through documentation, tutorials, and personal projects.
* **Seeking and Applying Feedback** — Viewing constructive criticism as a valuable opportunity for growth and actively implementing suggestions for improvement.
* **Putting Knowledge into Practice** — Building personal projects or contributing to open source to apply newly learned skills in a real-world context.
* **Staying Current with Industry Trends** — Following tech news, blogs, and thought leaders to stay informed about the latest developments and best practices.
* **Engaging with the Community** — Participating in forums, attending meetups, or joining online communities to learn from and share knowledge with others.
* **Asking for Challenges** — Showing enthusiasm for taking on new and more difficult tasks that push personal boundaries and expand skill sets.
* **Taking Ownership of Knowledge Gaps** — Honestly identifying areas of weakness and creating a plan to address them through targeted learning.
* **Experimentation and Tinkering** — Having a passion for playing with code, breaking things, and learning by doing, even without a specific goal.
* **Teaching Others** — Solidifying one's own understanding by explaining concepts to others, whether through pair programming, writing articles, or giving presentations.`
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
        certificateUrl: "https://www.linkedin.com/posts/harshad-shewale-5189b428a_genai-aiinanalytics-dataanalytics-activity-7398620806236291072-kg17?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=share_via",
    },
    {
        year: "2025",
        company: "Bootcamp",
        title: "Full Stack AI Development",
        description: "Comprehensive bootcamp covering the entire stack of AI application development, from backend models to frontend interfaces.",
        certificateUrl: "https://www.linkedin.com/posts/kumarmajethia_join-our-2nd-in-person-full-stack-ai-bootcamp-activity-7350215846272630786-dhiw?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAEZFZOQBuT5l1pOw_DuSRnMu77_NBxH__Mk&utm_campaign=copy_link",
    },
];

export type Project = {
  name: string;
  description: string;
  imageId: string;
  tags?: string[];
  liveDemoUrl?: string;
}

export const projects: Project[] = [
  { name: "Trustyatra App", description: "A travel companion app focused on safety and reliability.", imageId: "project1", tags: ["Flutter", "Dart", "Firebase"] },
  { name: "UPI QR Generator", description: "A web tool to quickly generate UPI payment QR codes.", imageId: "project2", liveDemoUrl: "https://adityashewale.vercel.app", tags: ["Next.js", "React", "Tailwind CSS"] },
  { name: "Graphic Design Portfolio", description: "A website showcasing various graphic design projects.", imageId: "project3", tags: ["HTML", "CSS", "JavaScript"] },
  { name: "Flower Selling Website", description: "An e-commerce platform for a local floral business.", imageId: "project4", liveDemoUrl: "https://studioflowers.vercel.app", tags: ["React", "CSS", "E-commerce"] },
  { name: "University Event Website", description: "A portal for managing and promoting university events.", imageId: "project5", tags: ["Next.js", "Firebase", "Events"] },
  { name: "Chatbot App", description: "A conversational AI application for customer support.", imageId: "project6", tags: ["Flutter", "Dialogflow", "AI"] },
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
    { href: "#contact", label: "Contact" },
];

export const socialLinks = [
  { name: "GitHub", url: "#", icon: "Github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/harshad-shewale-5189b428a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: "Linkedin" }
];
