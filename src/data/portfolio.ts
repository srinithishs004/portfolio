export interface Profile {
  name: string;
  pronouns: string;
  headline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
}

export interface SkillGroup {
  island: string;
  icon: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  highlights: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string | null;
  highlights: string[];
}

export interface TestimonialItem {
  author: string;
  role: string;
  text: string;
  image: string;
}

export const profile: Profile = {
  name: 'Sri Nithish S',
  pronouns: 'He/Him',
  headline: 'Cloud Infrastructure Engineer · Full-Stack Developer',
  location: 'India',
  email: 'srinithishs004@gmail.com',
  linkedin: 'linkedin.com/in/srinithishs',
  github: 'github.com/srinithishs',
  bio: 'Computer Engineering graduate bridging secure cloud architecture, real-time edge telemetry, and international resource management. Specialized in AWS Lambda/IAM, ESP32 gateways, and full-stack React/Node.js deployments.',
};

export const skills: SkillGroup[] = [
  {
    island: 'Cloud & Infrastructure',
    icon: '☁️',
    items: ['AWS Lambda & EC2', 'AWS IAM Security', 'API Gateway', 'DynamoDB & S3', 'Serverless Architecture', 'Docker Containers', 'Zero-Trust Networks'],
  },
  {
    island: 'Backend & Systems',
    icon: '⚙️',
    items: ['Python & Flask', 'Node.js & Express', 'REST APIs', 'Java Spring Boot', 'SQL & PostgreSQL', 'InfluxDB (Time Series)'],
  },
  {
    island: 'Frontend & Interfaces',
    icon: '🎨',
    items: ['React.js', 'Vite & TSX', 'UI Component Design', 'State Management', 'WebSockets', 'Tailwind CSS', 'Responsive Layouts'],
  },
  {
    island: 'Systems & IoT',
    icon: '📡',
    items: ['MQTT Protocol', 'CoAP Broker Setup', 'ESP32 Telemetry', 'Raspberry Pi Gateways', 'Edge Data Aggregation', 'Resource Logistical Coordination'],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'TOTEX ENERGY',
    role: 'Resource Management & Recruiting Lead / Software Engineer',
    period: 'Jun 2025 - Present',
    location: 'India & Australia (Remote)',
    tech: ['AWS', 'MQTT', 'InfluxDB', 'Python', 'React'],
    highlights: [
      'Architect end-to-end cloud computing environments and custom IoT frameworks targeting optimized industrial resource management.',
      'Staff and coordinate cross-functional engineering teams globally, with a specific focus on Melbourne, Australia.',
      'Deploy custom AWS Lambda functions mapped to dynamic API Gateways with strict IAM boundaries.'
    ],
  },
  {
    company: 'CSE Association, SVCT',
    role: 'President',
    period: 'Nov 2024 - Jun 2025',
    location: 'Chennai, India',
    tech: ['Leadership', 'Event Planning', 'Resource Coordination', 'Technical Training'],
    highlights: [
      'Spearheaded departmental segment coordinating code workshops, regional hackathons, and software design sprints.',
      'Managed internal resource logistics and directed peer-to-peer developer support groups.'
    ],
  },
  {
    company: 'Mr. Cooper',
    role: 'Graduate Intern',
    period: 'Jul 2024 - Aug 2024',
    location: 'Chennai, India',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
    highlights: [
      'Assigned to critical core backend application features under senior engineering leadership.',
      'Engineered micro-endpoints for the Surplus Food Management platform to prevent corporate waste.'
    ],
  },
  {
    company: 'Programmers Club, SVCT',
    role: 'President',
    period: 'Oct 2023 - Jun 2025',
    location: 'Chennai, India',
    tech: ['Algorithms', 'Data Structures', 'System Architecture', 'Mentoring'],
    highlights: [
      'Directed competitive coding bootcamps covering advanced data structures and algorithms.',
      'Trained 300+ students on system design patterns.'
    ],
  }
];

export const projects: ProjectItem[] = [
  {
    name: 'Surplus Food Management Platform',
    description: 'Corporate food waste reduction portal with real-time logging, allocation trackers, and secure REST endpoints.',
    tech: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
    image: '🍲',
    github: 'github.com/srinithishs',
    live: null,
    highlights: ['Corporate waste prevention', 'Sub-second API routing', 'Relational logging structure'],
  },
  {
    name: 'Smart Grid Real-Time Console',
    description: 'Cloud dashboard streaming electrical telemetry via low-overhead active WebSocket channels, bypassing HTTP database polling lag.',
    tech: ['React.js', 'Node.js', 'WebSockets', 'AWS EC2'],
    image: '⚡',
    github: 'github.com/srinithishs',
    live: null,
    highlights: ['Telemetry rendering', 'WebSocket integration', 'Reduced query overhead'],
  },
  {
    name: 'CoAP & MQTT Edge Gateway',
    description: 'Intelligent dual-protocol gateway translating local CoAP mesh requests into secure AWS-bound MQTT brokers.',
    tech: ['Python', 'MQTT', 'CoAP', 'ESP32-C6', 'Raspberry Pi'],
    image: '📡',
    github: 'github.com/srinithishs',
    live: null,
    highlights: ['Low-power mesh integration', 'Zero-trust device authentication', 'Time-series data logging'],
  },
  {
    name: 'Cost-Optimized AWS Telemetry Pipeline',
    description: 'Serverless telemetry pipeline mapping edge sensor metrics to AWS DynamoDB databases with secure cross-origin IAM roles.',
    tech: ['AWS Lambda', 'DynamoDB', 'IAM Policies', 'Python'],
    image: '☁️',
    github: 'github.com/srinithishs',
    live: null,
    highlights: ['Serverless compute', 'Dynamic partition indexing', 'Strict access boundary controls'],
  }
];

export const testimonials: TestimonialItem[] = [
  {
    author: 'Operations Director',
    role: 'Totex Energy',
    text: 'Sri brings exceptional technical depth and systems architectural competence to our remote resource staffing pipelines.',
    image: '👔',
  },
  {
    author: 'CSE Department Head',
    role: 'SVCT',
    text: 'Under Sri\'s leadership, the CSE segment organized some of the most logistically sound and technically engaging sprints in our history.',
    image: '🎓',
  },
];
