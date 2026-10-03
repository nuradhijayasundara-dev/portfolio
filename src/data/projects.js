// Centralized project data. Add GitHub URLs and future projects here.
const projects = [
  {
    id: 'backhaul-match',
    index: '01',
    layout: 'immersive',
    year: '[ADD YEAR]',
    tags: ['MICROSERVICES', 'LOGISTICS', 'ROUTE MATCHING'],
    title: ['BACKHAUL-', 'MATCH'],
    description:
      'A service-oriented logistics platform designed to connect courier operations and fleet operations through a neutral matching platform.',
    problem:
      'Courier and fleet operations need a reliable way to identify compatible vehicles for shipment requirements.',
    solution:
      'A platform that uses route-based matching and service-oriented architecture to connect the two sides without tightly coupling their databases or business systems.',
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'MySQL',
      'Microservices',
      'Docker',
      'Jenkins',
      'JWT',
      'Spring Cloud Gateway',
      'Eureka',
      'OSRM',
    ],
    features: [
      'Microservices architecture',
      'Route-based vehicle matching',
      'OSRM route calculation',
      'REST APIs',
      'Service discovery',
      'API Gateway',
      'Authentication',
      'Database-per-service',
      'Docker',
      'Jenkins CI/CD',
    ],
    architecture: {
      flow: ['Courier System', 'API Gateway', 'Matching Platform', 'Fleet System'],
      supporting: ['Authentication', 'Matching', 'GPS', 'Notification'],
    },
    github: '[ADD BACKHAUL-MATCH GITHUB URL]',
    liveUrl: null,
  },
  {
    id: 'airplane-management-system',
    index: '02',
    layout: 'split',
    year: '[ADD YEAR]',
    tags: ['JAVA PROJECT', 'INDIVIDUAL PROJECT'],
    title: ['AIRPLANE', 'MANAGEMENT', 'SYSTEM'],
    description:
      'A Java-based airplane management project developed as part of my academic/software development work.',
    technologies: ['Java', 'Object-Oriented Programming', 'Software Development'],
    features: ['[ADD FEATURES]'],
    github: '[ADD GITHUB URL]',
    liveUrl: null,
  },
  {
    id: 'farmhouse-dbms',
    index: '03',
    layout: 'split',
    tags: ['DATABASE DESIGN', 'FULL-STACK', 'TEAM PROJECT'],
    title: ['FARMHOUSE', 'DATABASE', 'MANAGEMENT', 'SYSTEM'],
    description:
      'A Farmhouse Database Management System designed and developed from the ground up as a team project, covering both the conceptual and the practical sides of database systems.',
    technologies: ['HTML', 'CSS', 'PHP', 'MySQL'],
    features: [
      'ER diagram, EER diagram and relational schema',
      'Frontend built with HTML and CSS',
      'Backend application logic in PHP',
      'MySQL database implementation',
    ],
    github: null,
    liveUrl: null,
  },
]

// Future / upcoming projects — shown as a minimal expandable list.
export const futureProjects = [
  {
    index: '04',
    name: '[PROJECT NAME]',
    year: '2027',
    description: '[ADD PROJECT DESCRIPTION]',
    technologies: ['[ADD TECHNOLOGIES]'],
    github: '[ADD GITHUB URL]',
  },
  {
    index: '05',
    name: '[PROJECT NAME]',
    year: '2027',
    description: '[ADD PROJECT DESCRIPTION]',
    technologies: ['[ADD TECHNOLOGIES]'],
    github: '[ADD GITHUB URL]',
  },
]

export default projects
