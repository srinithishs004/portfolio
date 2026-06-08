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
  cgpa: string;
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
  email: 'srinithishs004@gmail.com',
  linkedin: 'linkedin.com/in/srinithishs',
  github: 'github.com/srinithishs004',
  profilePhoto: 'https://github.com/srinithishs004.png',
  resumeUrl: '/resume.pdf', // Local public asset
  bio: "I'm Sri Nithish, a Software Engineer and Computer Science graduate who builds across the full technology stack. My work ranges from backend development with Python and Node.js to cloud infrastructure on AWS, mobile applications, modern web experiences, and intelligent connected systems.\n\nI believe great software isn't defined by a single technology — it's about understanding how all pieces work together, from user interfaces and APIs to cloud services, databases, and real-world devices. That perspective has led me to explore full-stack development, cloud architecture, IoT platforms, and smart systems.\n\nWhat drives me is building things that work. I enjoy transforming complex problems into clean, reliable solutions and continuously expanding what I'm capable of.\n\nToday I'm focused on scalable software, intelligent systems, and engineering experiences that are both technically sound and genuinely useful. My goal: build technology that people can rely on, learn from, and enjoy using.",
  currentRole: 'Cloud Infrastructure Engineer & Full-Stack Developer',
  currentCompany: 'TOTEX ENERGY',
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    icon: '💻',
    items: ['Python', 'JavaScript', 'SQL', 'Java', 'HTML', 'CSS'],
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
    description: 'Contributed to community-driven frontend development — exploring issues, understanding project architecture, and improving platform functionality and user experience.',
    learned: 'Working in established codebases, contribution workflows, GitHub collaboration, maintaining project standards.',
  },
  {
    name: 'Penpot',
    focus: 'Design Systems · Open Source · UI/UX',
    description: 'Explored and contributed to an open-source design and prototyping platform used by designers and developers worldwide.',
    learned: 'Design-to-development workflows, UI consistency, usability principles, product-focused engineering practices.',
  },
  {
    name: 'Home Assistant',
    focus: 'Python · Automation · IoT · Smart Home',
    description: 'Worked within the Home Assistant ecosystem exploring automation, integrations, and connected device management.',
    learned: 'Smart home automation architecture, integration-based development, event-driven systems, real-world IoT software patterns.',
  },
  {
    name: 'n8n',
    focus: 'Automation · Workflow Engineering · Node.js',
    description: 'Explored workflow automation and integration-driven development through the n8n ecosystem.',
    learned: 'Low-code workflow orchestration, API integrations, automation design patterns, business process automation.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Document Data Duplicate Alert System',
    tags: ['Python', 'React', 'MySQL', 'Data Processing', 'Hashing'],
    challenge: 'Organizations dealing with large volumes of documents often struggle with duplicate downloads and repeated entries, leading to data inconsistencies and operational inefficiencies.',
    solution: 'Designed and built a system that automatically detects duplicate document downloads using hashing techniques and metadata comparison, with a real-time monitoring dashboard.',
    role: [
      'Designed the duplicate detection logic',
      'Implemented backend data processing workflows',
      'Built the React-based monitoring interface',
      'Integrated database storage and alert mechanisms',
    ],
    outcome: 'Automated duplicate detection reduced manual review effort, improved data integrity, and gave teams real-time visibility into document activity.',
  },
  {
    title: 'Surplus Food Management System',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST APIs'],
    challenge: 'Food waste is a persistent operational and social problem — surplus food goes unmanaged while communities face accessibility gaps.',
    solution: 'Built a platform that connects food providers with recipients through an end-to-end management system covering listings, requests, and fulfilment tracking.',
    role: [
      'Built backend services using Spring Boot',
      'Developed and integrated REST APIs',
      'Optimised database operations for performance',
      'Contributed to frontend functionality in React.js',
    ],
    outcome: 'Streamlined surplus food management workflows and demonstrated full-stack development capability across Java backend, REST APIs, and a React frontend.',
  },
  {
    title: 'Cloud & Connected Systems Platform',
    tags: ['Python', 'AWS', 'Node.js', 'MQTT', 'Docker', 'Linux'],
    challenge: 'Connected systems require reliable, low-latency communication between distributed devices, cloud services, and user-facing applications — with infrastructure that can scale.',
    solution: 'Worked on a cloud-connected platform that collects, processes, and visualises telemetry data from distributed IoT devices in real time.',
    role: [
      'Backend service development',
      'Cloud integration (AWS)',
      'Data pipeline implementation',
      'System troubleshooting and infrastructure support',
      'Containerisation with Docker on Linux',
    ],
    outcome: 'Delivered a scalable platform supporting real-time monitoring, analytics, and operational visibility across distributed connected systems.',
  },
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
  cgpa: '7.9 / 10',
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
