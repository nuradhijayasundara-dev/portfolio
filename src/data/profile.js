// Central profile data — edit this file to update name, roles, links, and hero copy.
const profile = {
  name: 'Wiyathma Anuradhi Jayasundara',
  firstName: 'Wiyathma',
  initial: 'W',
  role: 'Computer Science (Hons) Undergraduate',
  roleSecondary: 'Cybersecurity & Software Development Enthusiast',
  location: 'Colombo, Sri Lanka',
  email: 'nuradhijayasundara@gmail.com',
  github: 'https://github.com/nuradhijayasundara-dev',
  linkedin: 'https://www.linkedin.com/in/wiyathma-anuradhi-948375308',
  // Add a resume file to /public and update this path when ready.
  cvUrl: '/cv/wiyathma-anuradhi-jayasundara-cv.pdf',

  heroStatement:
    'I build practical software, explore how systems work at scale, and learn by turning ideas into working technology.',

  heroFocusAreas: [
    'FULL-STACK DEVELOPMENT',
    'MICROSERVICES',
    'CLOUD',
    'DEVOPS',
    'AI / ML',
    'CYBERSECURITY',
  ],

  // Dominant About-section headline. emphasisWords render in the accent blue.
  aboutHeadline: [
    { words: ['I', 'build', 'systems'] },
    { words: ['then', 'learn', 'how'] },
    { words: ['to'], emphasisWords: ['secure', 'them.'] },
  ],

  aboutIntro:
    "I'm a Computer Science (Hons) undergraduate building practical experience alongside my studies.",

  aboutParagraphs: [
    "I'm currently pursuing a BSc (Hons) in Computer Science at the University of Sri Jayewardenepura while building hands-on experience through employment and independent software projects.",
    "My work has focused on full-stack development with React on the frontend and Java with Spring Boot on the backend. I'm particularly interested in how software systems are designed built and operated at scale including microservices cloud infrastructure and DevOps.",
    "Cybersecurity is becoming a major focus of my learning. I'm developing my understanding of security principles ethical security practices and practical security techniques using Kali Linux. I'm interested in understanding how systems can be analysed protected and made more resilient against security threats.",
    "Alongside cybersecurity I'm continuing to deepen my knowledge of cloud computing AI/ML and modern software engineering practices.",
    "I enjoy solving problems methodically exploring how systems work and turning what I learn into practical software.",
  ],

  // The About section's dedicated cybersecurity moment.
  securityStatement: {
    lines: ['Security', 'is part of', 'the system.'],
    tags: ['Cybersecurity', 'Kali Linux', 'Ethical security', 'System analysis', 'Security fundamentals'],
  },

  // Content hierarchy — communicated through typography and spacing, not cards.
  focusHierarchy: [
    {
      index: '01',
      label: 'Cybersecurity',
      description: 'A major current area of learning and interest.',
    },
    {
      index: '02',
      label: 'Software engineering',
      description: 'React, Java, Spring Boot and practical software development.',
    },
    {
      index: '03',
      label: 'Systems',
      description: 'Microservices, APIs, cloud infrastructure and DevOps.',
    },
    {
      index: '04',
      label: 'Cloud',
      description: 'Developing practical cloud computing knowledge.',
    },
    {
      index: '05',
      label: 'AI / ML',
      description: 'Continuing to explore AI and machine learning.',
    },
  ],
}

export default profile
