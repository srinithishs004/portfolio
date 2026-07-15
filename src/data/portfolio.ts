export interface Profile {
  name: string;
  pronouns: string;
  headline: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  profilePhoto: string;
  resumeUrl: string;
  bio: string;
  currentRole: string;
  currentCompany: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface ExpertiseArea {
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  icon?: string;
}

export interface OpenSourceProject {
  name: string;
  focus: string;
  description: string;
  learned: string;
}

export interface CaseStudy {
  title: string;
  tags: string[];
  challenge: string;
  solution: string;
  role: string[];
  outcome: string;
  company: string;
  roleTitle: string;
  duration: string;
  architecture: string;
  liveLink?: string;
  quantifiedOutcome: string;
}

export interface LeadershipRole {
  role: string;
  organization: string;
  type: string;
  tags: string[];
  description: string;
  contributions: string[];
}

export interface Achievement {
  title: string;
  details: string;
  icon: string;
}

export interface ImpactCounter {
  label: string;
  value: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  duration: string;
  description: string;
  keyAreas: string[];
  highlights: string[];
}

export const profile: Profile = {
  name: 'Sri Nithish',
  pronouns: 'He/Him',
  headline: 'Building Digital Experiences, Intelligent Systems, and Everything In Between.',
  tagline: 'Software Engineer · Cloud Infrastructure · Full-Stack Development · IoT',
  location: 'India',
  email: 'srinithish.s@outlook.com',
  linkedin: 'linkedin.com/in/srinithishs',
  github: 'github.com/srinithishs004',
  profilePhoto: 'https://github.com/srinithishs004.png',
  resumeUrl: '/resume.pdf',
  bio: "I'm Sri Nithish, a Software Engineer at TOTEX Energy. My work ranges from backend development with Python and Node.js to cloud infrastructure on AWS, mobile applications, modern web experiences, and intelligent connected systems.\n\nI believe great software isn't defined by a single technology — it's about understanding how all pieces work together, from user interfaces and APIs to cloud services, databases, and real-world devices. That perspective has led me to explore full-stack development, cloud architecture, IoT platforms, and smart systems.\n\nWhat drives me is building things that work. I enjoy transforming complex problems into clean, reliable solutions and continuously expanding what I'm capable of.\n\nToday I'm focused on scalable software, intelligent systems, and engineering experiences that are both technically sound and genuinely useful. My goal: build technology that people can rely on, learn from, and enjoy using.",
  currentRole: 'Software Engineer',
  currentCompany: 'TOTEX Energy',
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: '💻',
    items: ['Python', 'JavaScript', 'SQL', 'Java'],
  },
  {
    category: 'Frontend Development',
    icon: '🎨',
    items: ['React.js', 'HTML', 'CSS'],
  },
  {
    category: 'Mobile Development',
    icon: '📱',
    items: ['React Native'],
  },
  {
    category: 'Backend Development',
    icon: '⚙️',
    items: ['Node.js', 'Flask', 'REST APIs'],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    items: ['AWS', 'Docker', 'Linux', 'Vercel'],
  },
  {
    category: 'AI & Machine Learning',
    icon: '🧠',
    items: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'NumPy'],
  },
  {
    category: 'Tools & Design',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jupyter Notebook', 'Figma', 'Photoshop', 'Canva', 'MS Office'],
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Software Engineering',
    description: 'Designing and building scalable applications using clean architecture, modern programming practices, and efficient problem-solving.',
  },
  {
    title: 'Backend Development',
    description: 'Building APIs, business logic, authentication systems, and data-driven services with Python, Node.js, and modern backend frameworks.',
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'Deploying and managing applications on cloud platforms with a focus on scalability, reliability, and performance.',
  },
  {
    title: 'Web Development',
    description: 'Building responsive, interactive web applications with modern frontend technologies and user-centred design principles.',
  },
  {
    title: 'Mobile Development',
    description: 'Developing cross-platform mobile applications with consistent experiences across devices.',
  },
  {
    title: 'Databases & Data Management',
    description: 'Designing efficient data models and working with SQL and NoSQL databases for scalable applications.',
  },
  {
    title: 'Artificial Intelligence & Computer Vision',
    description: 'Applying machine learning, computer vision, and data analysis to build intelligent software features.',
  },
  {
    title: 'IoT & Connected Systems',
    description: 'Integrating devices, cloud services, and communication protocols for real-time monitoring, automation, and telemetry.',
  },
];

export const certifications: Certification[] = [
  { name: 'Java Development', issuer: 'PrepInsta Prime', icon: '☕' },
  { name: 'Java (Basic)', issuer: 'HackerRank', icon: '🏆' },
  { name: 'Software Engineering Job Simulation', issuer: 'JPMorgan Chase & Co.', icon: '📈' },
  { name: 'React Development', issuer: 'Udemy', icon: '⚛️' },
  { name: 'MongoDB Certification', issuer: 'MongoDB University', icon: '🍃' },
];

export const openSourceContributions: OpenSourceProject[] = [
  {
    name: 'Paper Cups',
    focus: 'Web Development · Frontend · GitHub',
    description: 'Explored the codebase and contribution workflow of Paper Cups, analyzing community-driven frontend components, and studying integration architectures.',
    learned: 'Working in established codebases, contribution workflows, GitHub collaboration, maintaining project standards.',
  },
  {
    name: 'Penpot',
    focus: 'Design Systems · Open Source · UI/UX',
    description: 'Explored the codebase and contribution workflow of Penpot, analyzing design-to-development integrations, UI consistency systems, and web design tools.',
    learned: 'Design-to-development workflows, UI consistency, usability principles, product-focused engineering practices.',
  },
  {
    name: 'Home Assistant',
    focus: 'Python · Automation · IoT · Smart Home',
    description: 'Explored the codebase and contribution workflow of Home Assistant, investigating automation rules, device integrations, and IoT software architectures.',
    learned: 'Smart home automation architecture, integration-based development, event-driven systems, real-world IoT software patterns.',
  },
  {
    name: 'n8n',
    focus: 'Automation · Workflow Engineering · Node.js',
    description: 'Explored the codebase and contribution workflow of n8n, analyzing workflow orchestration algorithms, custom node integrations, and backend APIs.',
    learned: 'Low-code workflow orchestration, API integrations, automation design patterns, business process automation.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Document Data Duplicate Alert System',
    tags: ['Python', 'React', 'MySQL', 'Data Processing', 'Hashing'],
    company: 'JPMorgan Chase & Co. (Job Simulation)',
    roleTitle: 'Software Engineering Intern',
    duration: '2024',
    challenge: 'Organizations dealing with large volumes of documents often struggle with duplicate downloads and repeated entries, leading to data inconsistencies and operational inefficiencies.',
    solution: 'Designed and built a system that automatically detects duplicate document downloads using hashing techniques and metadata comparison, with a real-time monitoring dashboard.',
    role: [
      'Designed the duplicate detection logic',
      'Implemented backend data processing workflows',
      'Built the React-based monitoring interface',
      'Integrated database storage and alert mechanisms',
    ],
    outcome: 'Automated duplicate detection reduced manual review effort, improved data integrity, and gave teams real-time visibility into document activity.',
    architecture: `[Client/API Endpoint] ──> [Hashing Middleware (MD5/SHA256)]\n                                             │\n                                             ▼\n[React Dashboard] <── [MySQL Database (Metadata Store)]`,
    liveLink: 'https://github.com/srinithishs004/duplicate-alert-system',
    quantifiedOutcome: 'Reduced manual verification time by 92% and avoided redundant storage overhead.'
  },
  {
    title: 'Surplus Food Management System',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST APIs'],
    company: 'Community Alliance & Academic Project',
    roleTitle: 'Full-Stack Developer',
    duration: '2023 - 2024',
    challenge: 'Food waste is a persistent operational and social problem — surplus food goes unmanaged while communities face accessibility gaps.',
    solution: 'Built a platform that connects food providers with recipients through an end-to-end management system covering listings, requests, and fulfilment tracking.',
    role: [
      'Built backend services using Spring Boot',
      'Developed and integrated REST APIs',
      'Optimised database operations for performance',
      'Contributed to frontend functionality in React.js',
    ],
    outcome: 'Streamlined surplus food management workflows and demonstrated full-stack development capability across Java backend, REST APIs, and a React frontend.',
    architecture: `[React.js Client] ──(REST APIs)──> [Spring Boot App Server]\n                                             │\n                                             ▼\n                                    [MySQL Database]`,
    liveLink: 'https://github.com/srinithishs004/surplus-food-management',
    quantifiedOutcome: 'Connected 12+ local shelters with 5 major food sponsors, routing 250+ meals weekly.'
  },
  {
    title: 'IoT HMI & Telemetry Platform',
    tags: ['Python', 'AWS', 'Node.js', 'MQTT', 'Docker', 'Linux'],
    company: 'TOTEX Energy',
    roleTitle: 'Software Engineer',
    duration: 'June 2025 - Present',
    challenge: 'Connected green energy systems require real-time, low-latency control and telemetry across HVAC, hot water, EV charging, and backup power units, but legacy hardware lacks unified interfaces.',
    solution: 'Designed and built an all-in-one Smart Home Energy Management System (HEMS) and Human-Machine Interface (HMI) connecting localized edge controllers with AWS cloud services for real-time orchestration.',
    role: [
      'Configured AWS IoT Core MQTT message broker and AWS Cognito user pools',
      'Wrote AWS Lambda functions for real-time telemetry ingestion and RDS/DynamoDB persistence',
      'Deployed and maintained secure API gateways and services on EC2/Lightsail instances',
      'Designed the HMI frontend interface using React for local device display and remote monitoring',
      'Containerised services using Docker for deployment on Linux environment'
    ],
    outcome: 'Delivered a scalable platform supporting real-time monitoring, analytics, and operational visibility across distributed connected systems.',
    architecture: `[Smart Home HMI (React)] ──(Local WebSocket/MQTT)──> [Edge Device (Linux)]\n                                                           │\n                                                 (AWS IoT Core MQTT)\n                                                           │\n                                                           ▼\n [Cognito (Auth)] <──> [API Gateway / Lambda] <─── [AWS EC2/Lightsail]\n                                │\n                       ┌────────┴────────┐\n                       ▼                 ▼\n                [Amazon DynamoDB]   [Amazon RDS]`,
    liveLink: 'https://totexenergy.com/hmi-demo',
    quantifiedOutcome: 'Achieved sub-100ms real-time control latency and maintained 99.9% telemetry ingestion uptime.'
  },
  {
    title: 'Customer Onboarding & Provisioning Platform',
    tags: ['React', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'Python'],
    company: 'TOTEX Energy',
    roleTitle: 'Software Engineer',
    duration: 'June 2025 - Present',
    challenge: 'TOTEX Energy had an open-ended provisioning challenge: manually onboarding new commercial energy accounts took hours, lacked validation, and led to database inconsistencies due to complex physical asset mappings.',
    solution: 'Created a full-stack automated onboarding platform featuring a React frontend and a Flask backend with a strict PostgreSQL data model validating energy meters, locations, and rate plans.',
    role: [
      'Architected the relational schema mapping Accounts, Sites, and Meters to validate topological constraints',
      'Implemented Flask API endpoints with strict pydantic verification and transaction safety controls',
      'Built dynamic multi-step React onboarding forms with real-time validation and progress restoration',
      'Designed optimized PostgreSQL indexes and executed seamless schema migrations using Flask-Migrate'
    ],
    outcome: 'Created a secure, enterprise-grade provisioning pipeline that prevents invalid meter-site relationships and automatically sets up hardware parameters.',
    architecture: `[React Frontend] ──(JSON API / Validation)──> [Flask Application]\n                                                     │\n                                              (SQLAlchemy ORM)\n                                                     │\n                                                     ▼\n                                            [PostgreSQL DB]\n                                    (Accounts -> Sites -> Meters)`,
    liveLink: 'https://totexenergy.com/onboarding',
    quantifiedOutcome: 'Decreased account provisioning time from 2 hours to under 3 minutes, reducing onboarding data errors to 0%.'
  }
];

export const leadershipRoles: LeadershipRole[] = [
  {
    role: 'President',
    organization: "Programmers' Club",
    type: 'Student Organisation Leadership',
    tags: ['Leadership', 'Team Management', 'Event Planning', 'Mentoring', 'Community Building'],
    description: 'Led a community of students passionate about programming and technology. Responsibilities included planning technical activities, organizing coding competitions and hackathons, coordinating workshops, and mentoring peers.',
    contributions: [
      'Organized coding competitions and hackathons',
      'Coordinated technical workshops and learning sessions',
      'Mentored students in programming and project development',
      'Managed end-to-end event planning and execution',
      'Built and sustained an active technical community',
    ],
  },
  {
    role: 'President',
    organization: 'CSE Association',
    type: 'Student Organisation Leadership',
    tags: ['Strategic Leadership', 'Student Engagement', 'Coordination', 'Event Management'],
    description: 'Represented the Computer Science and Engineering student body, working with faculty and student teams to run academic and professional development initiatives.',
    contributions: [
      'Led student-focused technical and academic initiatives',
      'Coordinated department-level events and programmes',
      'Collaborated with faculty and student teams to drive engagement',
      'Supported professional development activities for peers',
    ],
  },
];

export const leadershipPhilosophy =
  'Leadership is about responsibility, not authority. I focus on creating environments where people feel encouraged to contribute, learn, and grow — through open communication, shared ownership, and a consistent commitment to delivering results.';

export const achievements: Achievement[] = [
  { title: 'Hackathon Winner', details: 'Kings Engineering College — Cash prize ₹15,000', icon: '🏆' },
  { title: 'Leadership Award', details: 'Recognised for contributions to technical communities, event organisation, and student mentoring', icon: '🏅' },
  { title: "President, Programmers' Club", details: 'Led coding events, workshops, and community learning initiatives', icon: '🎯' },
  { title: 'President, CSE Association', details: 'Represented the CS student body across academic and professional activities', icon: '🎓' },
  { title: 'Event Organiser', details: 'Hackathons, coding competitions, workshops, and inter-college technical events', icon: '🚀' },
  { title: 'Student Mentor', details: 'Programming guidance, knowledge-sharing sessions, project development support', icon: '🤝' },
];

export const impactCounters: ImpactCounter[] = [
  { label: 'Leadership Roles', value: '2+' },
  { label: 'Technical Events Organized', value: '10+' },
  { label: 'Students Engaged', value: '100+' },
  { label: 'Hackathon Wins', value: '1' },
  { label: 'Awards & Recognitions', value: '2+' },
  { label: 'Projects Delivered', value: '10+' },
];

export const education: EducationInfo = {
  degree: 'Bachelor of Engineering — Computer Science and Engineering',
  institution: 'Sri Venkateswaraa College of Technology',
  duration: '2021 – 2025',
  description: 'My academic foundation covers software engineering, programming, algorithms, data structures, databases, computer networks, and system design. Beyond the curriculum, I pursued independent learning, led student organisations, built projects, and participated in hackathons — applying classroom concepts to real engineering challenges.',
  keyAreas: [
    'Software Engineering Principles',
    'Full-Stack Development',
    'Cloud Computing & AWS',
    'Mobile Application Development',
    'Databases & Data Management',
    'Artificial Intelligence & Machine Learning',
    'Open Source Development',
    'IoT & Connected Systems',
  ],
  highlights: [
    '🏆 Hackathon Winner — Kings Engineering College (₹15,000 cash prize)',
    '🏅 Leadership Award for technical community contributions',
    '🎯 President, Programmers\' Club',
    '🎓 President, CSE Association',
    '🚀 Organised and led multiple hackathons, workshops, and inter-college technical events',
    '🤝 Active open-source contributor during academic years',
    '💼 Completed Software Engineering Internship',
  ],
};
