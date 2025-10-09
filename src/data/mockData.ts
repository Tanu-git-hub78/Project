import { Student, Admin, Examiner, Submission, Department, ProjectTopic, Payment, Notification, EvaluationRecord } from '../types';

// Secure credentials
const CREDENTIALS = {
  students: [
    { username: 'tanu', password: 'Babaji78@@', userId: '1' }
  ],
  admins: [
    { username: 'Tanu@', password: 'Babaji@@', userId: 'admin1' }
  ],
  examiners: [
    { username: 'examiner1', password: 'exam123', userId: 'exam1' },
    { username: 'examiner2', password: 'exam123', userId: 'exam2' }
  ]
};

export const validateCredentials = (username: string, password: string): { isValid: boolean; userId?: string; role?: 'student' | 'admin' | 'examiner' } => {
  const student = CREDENTIALS.students.find(s => s.username === username && s.password === password);
  if (student) {
    return { isValid: true, userId: student.userId, role: 'student' };
  }
  
  const admin = CREDENTIALS.admins.find(a => a.username === username && a.password === password);
  if (admin) {
    return { isValid: true, userId: admin.userId, role: 'admin' };
  }
  
  const examiner = CREDENTIALS.examiners.find(e => e.username === username && e.password === password);
  if (examiner) {
    return { isValid: true, userId: examiner.userId, role: 'examiner' };
  }
  
  return { isValid: false };
};

export const admins: Admin[] = [
  {
    id: 'admin1',
    username: 'Tanu@',
    role: 'admin',
    name: 'Dr. Tanu Sharma',
    email: 'admin@university.edu',
    college: 'Main Campus',
    department: 'Administration'
  }
];

export const examiners: Examiner[] = [
  {
    id: 'exam1',
    username: 'examiner1',
    role: 'examiner',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@university.edu',
    department: 'Computer Science',
    college: 'Main Campus',
    assignedClasses: ['B.Sc. Computer Science'],
    evaluationHistory: [
      {
        id: 'eval1',
        studentId: 'student1',
        studentName: 'Tanu Sharma',
        rollNumber: 'CS2021001',
        projectTitle: 'Cybersecurity Awareness Project',
        vivaMarks: 85,
        feedback: 'Very good understanding of concepts',
        comments: 'Needs improvement in presentation skills',
        evaluationDate: '2024-03-15'
      },
      {
        id: 'eval2',
        studentId: 'student2',
        studentName: 'Raj Patel',
        rollNumber: 'CS2021002',
        projectTitle: 'Cybersecurity Awareness Project',
        vivaMarks: 78,
        feedback: 'Good effort and technical clarity',
        comments: 'Could add more examples',
        evaluationDate: '2024-03-16'
      },
      {
        id: 'eval3',
        studentId: 'student3',
        studentName: 'Shakshi Verma',
        rollNumber: 'CS2021003',
        projectTitle: 'Cybersecurity Awareness Project',
        vivaMarks: 90,
        feedback: 'Excellent project explanation',
        comments: 'Outstanding performance',
        evaluationDate: '2024-03-17'
      },
      {
        id: 'eval4',
        studentId: 'student4',
        studentName: 'Veer Singh',
        rollNumber: 'CS2021004',
        projectTitle: 'Cybersecurity Awareness Project',
        vivaMarks: 70,
        feedback: 'Average performance',
        comments: 'Revise theoretical concepts',
        evaluationDate: '2024-03-18'
      },
      {
        id: 'eval5',
        studentId: 'student5',
        studentName: 'Shifa Khan',
        rollNumber: 'CS2021005',
        projectTitle: 'Cybersecurity Awareness Project',
        vivaMarks: 82,
        feedback: 'Good depth of research',
        comments: 'Improve time management during viva',
        evaluationDate: '2024-03-19'
      }
    ],
    assignedClasses: ['CS2021', 'CS2022'],
    evaluationHistory: []
  },
  {
    id: 'exam2',
    username: 'examiner2',
    role: 'examiner',
    name: 'Dr. Priya Verma',
    email: 'priya@university.edu',
    department: 'Commerce',
    college: 'Main Campus',
    assignedClasses: ['COM2021', 'COM2022'],
    evaluationHistory: []
  }
];

// Categories for project submission
export const categories = [
  'Research Project',
  'Field Study',
  'Internship Report',
  'Workshop Project',
  'Technical Project',
  'Literature Review',
  'Case Study',
  'Survey Analysis'
];

// Analytics data for degrees
export const degrees = [
  { id: 'bsc-honors', name: 'BSc Honors', shortName: 'BSc Honors' },
  { id: 'bsc-cs', name: 'BSc Computer Science', shortName: 'BSc CS' },
  { id: 'bsc-physics', name: 'BSc Physics', shortName: 'BSc Physics' },
  { id: 'bca', name: 'Bachelor of Computer Applications', shortName: 'BCA' },
  { id: 'bcom-honors', name: 'BCom Honors', shortName: 'BCom Honors' },
  { id: 'bcom', name: 'Bachelor of Commerce', shortName: 'BCom' },
  { id: 'bba', name: 'Bachelor of Business Administration', shortName: 'BBA' },
  { id: 'finance', name: 'Finance', shortName: 'Finance' },
  { id: 'sanskrit', name: 'Sanskrit', shortName: 'Sanskrit' },
  { id: 'mathematics', name: 'Mathematics', shortName: 'Mathematics' }
];

// Department Folders with Projects
export const departmentFolders = [
  {
    id: 'agriculture-science',
    name: 'Agriculture Science',
    icon: '🌾',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'precision-farming-iot',
        name: 'Precision Farming with IoT Sensors',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-6 months',
        description: 'Develop an IoT-based precision farming system using sensors to monitor soil moisture, temperature, and crop health for optimized agricultural practices.',
        objectives: [
          'Design and deploy IoT sensor networks in agricultural fields',
          'Develop data collection and analysis systems for crop monitoring',
          'Create automated irrigation and fertilization systems',
          'Implement machine learning for crop yield prediction',
          'Evaluate the economic impact of precision farming techniques'
        ],
        tools: ['Arduino', 'Raspberry Pi', 'IoT Sensors', 'Python', 'Machine Learning', 'Database Management'],
        facultyGuide: {
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@university.edu',
          department: 'Agriculture Science'
        },
        guidance: [
          'Start with basic sensor integration and data collection',
          'Focus on real-world agricultural challenges in your region',
          'Collaborate with local farmers for practical insights',
          'Document cost-benefit analysis for implementation'
        ]
      },
      {
        id: 'organic-fertilizer-study',
        name: 'Organic Fertilizer Impact Study',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Conduct comprehensive research on the effectiveness of organic fertilizers compared to chemical alternatives in various crop types.',
        objectives: [
          'Compare organic vs chemical fertilizer effectiveness',
          'Analyze soil health improvements over time',
          'Study impact on crop yield and quality',
          'Evaluate environmental benefits and sustainability',
          'Develop recommendations for farmers'
        ],
        tools: ['Soil Testing Kits', 'Laboratory Equipment', 'Statistical Software', 'Field Research Tools'],
        facultyGuide: {
          name: 'Dr. Priya Sharma',
          email: 'priya.sharma@university.edu',
          department: 'Agriculture Science'
        },
        guidance: [
          'Design controlled experiments with proper sample sizes',
          'Maintain detailed records of all measurements',
          'Consider seasonal variations in your analysis',
          'Include economic analysis in your recommendations'
        ]
      },
      {
        id: 'drone-crop-monitoring',
        name: 'Drone-based Crop Health Monitoring',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop a drone-based system for monitoring crop health using aerial imagery and AI-powered analysis for early disease detection.',
        objectives: [
          'Build and program agricultural monitoring drones',
          'Implement computer vision for crop health analysis',
          'Develop disease detection algorithms',
          'Create real-time monitoring dashboards',
          'Test system effectiveness in real agricultural settings'
        ],
        tools: ['Drones', 'Computer Vision', 'Python', 'TensorFlow', 'Image Processing', 'GPS Systems'],
        facultyGuide: {
          name: 'Dr. Amit Patel',
          email: 'amit.patel@university.edu',
          department: 'Agriculture Science'
        },
        guidance: [
          'Start with basic drone operation and safety protocols',
          'Focus on image quality and data consistency',
          'Validate AI models with expert agricultural knowledge',
          'Consider weather and lighting conditions in your design'
        ]
      },
      {
        id: 'sustainable-farming-workshop',
        name: 'Teaching & Workshop: Sustainable Farming Practices',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Comprehensive workshop on sustainable farming practices, modern agricultural techniques, and environmental conservation in agriculture.',
        objectives: [
          'Learn sustainable farming principles and practices',
          'Understand modern agricultural technologies',
          'Explore organic farming methods and benefits',
          'Study water conservation and soil management',
          'Develop awareness about climate-smart agriculture'
        ],
        tools: ['Workshop Materials', 'Field Visit Equipment', 'Presentation Tools', 'Sample Collection Kits'],
        facultyGuide: {
          name: 'Dr. Sunita Verma',
          email: 'sunita.verma@university.edu',
          department: 'Agriculture Science'
        },
        guidance: [
          'Participate actively in field demonstrations',
          'Take detailed notes during expert sessions',
          'Engage with local farmers and practitioners',
          'Document best practices for future reference'
        ]
      }
    ]
  },
  {
    id: 'ancient-history',
    name: 'Ancient History',
    icon: '🏛️',
    color: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
    projects: [
      {
        id: 'digital-archiving-gis',
        name: 'Digital Archiving with GIS and 3D Models',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Create digital archives of historical sites using GIS mapping and 3D modeling technologies for preservation and educational purposes.',
        objectives: [
          'Develop GIS-based mapping of historical sites',
          'Create detailed 3D models of ancient structures',
          'Build digital archive systems for historical data',
          'Implement virtual reality experiences for education',
          'Establish preservation protocols for digital heritage'
        ],
        tools: ['GIS Software', '3D Modeling Tools', 'VR Technology', 'Database Systems', 'Photography Equipment'],
        facultyGuide: {
          name: 'Dr. Meera Gupta',
          email: 'meera.gupta@university.edu',
          department: 'Ancient History'
        },
        guidance: [
          'Start with detailed site surveys and documentation',
          'Learn professional 3D scanning and modeling techniques',
          'Collaborate with archaeologists and historians',
          'Focus on accuracy and historical authenticity'
        ]
      },
      {
        id: 'oral-history-documentation',
        name: 'Oral History Documentation',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Collect, document, and preserve oral histories from elderly community members to maintain cultural heritage and historical knowledge.',
        objectives: [
          'Conduct interviews with elderly community members',
          'Document traditional stories and historical accounts',
          'Create digital archives of oral histories',
          'Analyze patterns and themes in collected narratives',
          'Develop preservation strategies for oral traditions'
        ],
        tools: ['Audio Recording Equipment', 'Transcription Software', 'Interview Guides', 'Digital Archive Systems'],
        facultyGuide: {
          name: 'Dr. Ravi Chandra',
          email: 'ravi.chandra@university.edu',
          department: 'Ancient History'
        },
        guidance: [
          'Develop respectful interview techniques',
          'Ensure proper consent and ethical considerations',
          'Focus on accuracy in transcription and translation',
          'Validate stories with multiple sources when possible'
        ]
      },
      {
        id: 'ai-ancient-text-recognition',
        name: 'AI-based Ancient Text Recognition',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop AI systems to recognize and translate ancient texts and inscriptions using machine learning and computer vision technologies.',
        objectives: [
          'Build OCR systems for ancient scripts and languages',
          'Train machine learning models for text recognition',
          'Develop translation algorithms for historical texts',
          'Create user-friendly interfaces for researchers',
          'Validate accuracy with expert historians and linguists'
        ],
        tools: ['Python', 'TensorFlow', 'Computer Vision', 'OCR Technology', 'Natural Language Processing'],
        facultyGuide: {
          name: 'Dr. Kavita Singh',
          email: 'kavita.singh@university.edu',
          department: 'Ancient History'
        },
        guidance: [
          'Start with well-documented ancient scripts',
          'Collaborate with linguists and historians for accuracy',
          'Build comprehensive training datasets',
          'Test with various historical document types'
        ]
      },
      {
        id: 'heritage-awareness-workshop',
        name: 'Teaching & Workshop: Heritage Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop focusing on cultural heritage preservation, historical awareness, and the importance of maintaining our historical legacy.',
        objectives: [
          'Understand the importance of cultural heritage preservation',
          'Learn about local and national historical sites',
          'Explore modern techniques in heritage conservation',
          'Develop awareness about historical research methods',
          'Create community engagement strategies for heritage protection'
        ],
        tools: ['Educational Materials', 'Site Visit Equipment', 'Documentation Tools', 'Presentation Software'],
        facultyGuide: {
          name: 'Dr. Anjali Mehta',
          email: 'anjali.mehta@university.edu',
          department: 'Ancient History'
        },
        guidance: [
          'Participate actively in heritage site visits',
          'Document observations and learnings systematically',
          'Engage with local historians and community leaders',
          'Develop personal heritage conservation action plans'
        ]
      }
    ]
  },
  {
    id: 'botany',
    name: 'Botany',
    icon: '🌿',
    color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
    projects: [
      {
        id: 'medicinal-plant-survey',
        name: 'Medicinal Plant Survey',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Conduct comprehensive surveys of medicinal plants in local ecosystems, documenting their properties, uses, and conservation status.',
        objectives: [
          'Identify and catalog medicinal plants in local areas',
          'Document traditional uses and modern applications',
          'Analyze phytochemical properties of selected plants',
          'Assess conservation status and threats',
          'Create digital herbarium and database'
        ],
        tools: ['Field Collection Equipment', 'Microscopes', 'Plant Identification Guides', 'Laboratory Equipment', 'Database Software'],
        facultyGuide: {
          name: 'Dr. Sushma Rao',
          email: 'sushma.rao@university.edu',
          department: 'Botany'
        },
        guidance: [
          'Learn proper plant collection and preservation techniques',
          'Collaborate with traditional healers and practitioners',
          'Maintain detailed field notes and photographs',
          'Follow ethical guidelines for plant collection'
        ]
      },
      {
        id: 'plant-tissue-culture',
        name: 'Plant Tissue Culture Experiment',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop plant tissue culture techniques for propagation of rare and economically important plant species under sterile laboratory conditions.',
        objectives: [
          'Master sterile tissue culture techniques',
          'Develop protocols for different plant species',
          'Optimize growth media and environmental conditions',
          'Study plant regeneration and multiplication',
          'Evaluate commercial applications and scalability'
        ],
        tools: ['Tissue Culture Laboratory', 'Sterile Equipment', 'Growth Media', 'Microscopes', 'Environmental Chambers'],
        facultyGuide: {
          name: 'Dr. Prakash Joshi',
          email: 'prakash.joshi@university.edu',
          department: 'Botany'
        },
        guidance: [
          'Maintain strict sterile conditions throughout experiments',
          'Keep detailed records of all procedures and observations',
          'Start with easier species before attempting difficult ones',
          'Focus on reproducibility and protocol standardization'
        ]
      },
      {
        id: 'climate-change-flora-impact',
        name: 'Climate Change Impact on Flora',
        type: 'research',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Study the effects of climate change on local plant communities, including species distribution, phenology, and adaptation strategies.',
        objectives: [
          'Monitor plant species distribution changes over time',
          'Study phenological shifts in flowering and fruiting',
          'Analyze adaptation mechanisms in different species',
          'Model future impacts under climate scenarios',
          'Develop conservation strategies for vulnerable species'
        ],
        tools: ['Environmental Monitoring Equipment', 'GIS Software', 'Statistical Analysis Tools', 'Climate Data', 'Field Research Equipment'],
        facultyGuide: {
          name: 'Dr. Neha Agarwal',
          email: 'neha.agarwal@university.edu',
          department: 'Botany'
        },
        guidance: [
          'Establish long-term monitoring protocols',
          'Use historical data for baseline comparisons',
          'Collaborate with climate scientists and ecologists',
          'Focus on statistically significant trends and patterns'
        ]
      },
      {
        id: 'modern-lab-techniques-workshop',
        name: 'Teaching & Workshop: Modern Lab Techniques',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Hands-on workshop covering modern laboratory techniques in botany, including microscopy, molecular biology, and plant analysis methods.',
        objectives: [
          'Learn advanced microscopy techniques',
          'Master plant specimen preparation methods',
          'Understand molecular biology applications in botany',
          'Practice modern analytical techniques',
          'Develop laboratory safety and protocol awareness'
        ],
        tools: ['Laboratory Equipment', 'Microscopes', 'Molecular Biology Tools', 'Safety Equipment', 'Analysis Software'],
        facultyGuide: {
          name: 'Dr. Rajesh Sharma',
          email: 'rajesh.sharma@university.edu',
          department: 'Botany'
        },
        guidance: [
          'Practice techniques repeatedly for mastery',
          'Maintain detailed laboratory notebooks',
          'Follow all safety protocols strictly',
          'Ask questions and seek clarification when needed'
        ]
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '⚗️',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    projects: [
      {
        id: 'biodegradable-plastics-development',
        name: 'Biodegradable Plastics Development',
        type: 'research',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Research and develop biodegradable plastic alternatives using natural polymers and sustainable materials for environmental conservation.',
        objectives: [
          'Synthesize biodegradable polymers from natural sources',
          'Test mechanical and chemical properties of developed materials',
          'Evaluate biodegradation rates under different conditions',
          'Compare performance with conventional plastics',
          'Assess commercial viability and environmental impact'
        ],
        tools: ['Polymer Synthesis Equipment', 'Testing Instruments', 'Spectroscopy', 'Laboratory Chemicals', 'Analysis Software'],
        facultyGuide: {
          name: 'Dr. Vikram Singh',
          email: 'vikram.singh@university.edu',
          department: 'Chemistry'
        },
        guidance: [
          'Start with well-established polymer synthesis methods',
          'Focus on safety protocols when handling chemicals',
          'Document all synthesis procedures and modifications',
          'Test materials under realistic environmental conditions'
        ]
      },
      {
        id: 'water-purification-experiment',
        name: 'Water Purification Experiment',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Develop and test innovative water purification methods using chemical processes, nanomaterials, and sustainable filtration techniques.',
        objectives: [
          'Design novel water purification systems',
          'Test effectiveness against various contaminants',
          'Optimize purification processes for efficiency',
          'Evaluate cost-effectiveness and scalability',
          'Compare with existing purification technologies'
        ],
        tools: ['Water Testing Kits', 'Filtration Equipment', 'Nanomaterials', 'Analytical Instruments', 'Laboratory Setup'],
        facultyGuide: {
          name: 'Dr. Priya Nair',
          email: 'priya.nair@university.edu',
          department: 'Chemistry'
        },
        guidance: [
          'Test with real water samples from different sources',
          'Maintain consistent experimental conditions',
          'Document all parameters and variables carefully',
          'Consider practical implementation challenges'
        ]
      },
      {
        id: 'green-catalysts-research',
        name: 'Green Catalysts Research',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Research and develop environmentally friendly catalysts for chemical reactions, focusing on sustainability and reduced environmental impact.',
        objectives: [
          'Synthesize eco-friendly catalysts from sustainable materials',
          'Test catalytic activity and selectivity',
          'Optimize reaction conditions for maximum efficiency',
          'Study catalyst recyclability and stability',
          'Evaluate environmental benefits and applications'
        ],
        tools: ['Catalyst Synthesis Equipment', 'Reaction Monitoring Systems', 'Spectroscopic Analysis', 'Green Chemistry Protocols'],
        facultyGuide: {
          name: 'Dr. Arun Kumar',
          email: 'arun.kumar@university.edu',
          department: 'Chemistry'
        },
        guidance: [
          'Follow green chemistry principles throughout research',
          'Focus on catalyst reusability and longevity',
          'Compare performance with traditional catalysts',
          'Consider industrial applications and scalability'
        ]
      },
      {
        id: 'green-chemistry-awareness-workshop',
        name: 'Teaching & Workshop: Green Chemistry Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on green chemistry principles, sustainable chemical practices, and environmental responsibility in chemical sciences.',
        objectives: [
          'Understand green chemistry principles and applications',
          'Learn about sustainable chemical processes',
          'Explore eco-friendly alternatives to traditional methods',
          'Develop environmental consciousness in chemistry',
          'Practice green chemistry techniques in laboratory'
        ],
        tools: ['Green Chemistry Materials', 'Laboratory Equipment', 'Educational Resources', 'Safety Equipment'],
        facultyGuide: {
          name: 'Dr. Sunita Reddy',
          email: 'sunita.reddy@university.edu',
          department: 'Chemistry'
        },
        guidance: [
          'Actively participate in hands-on experiments',
          'Question traditional methods and seek alternatives',
          'Document environmental benefits of green approaches',
          'Develop personal commitment to sustainable practices'
        ]
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    icon: '💼',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    projects: [
      {
        id: 'ecommerce-consumer-behavior',
        name: 'E-Commerce Consumer Behavior Study',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Analyze consumer behavior patterns in e-commerce platforms, studying purchasing decisions, preferences, and digital shopping trends.',
        objectives: [
          'Study online consumer purchasing patterns',
          'Analyze factors influencing buying decisions',
          'Examine the impact of digital marketing on consumer behavior',
          'Compare online vs offline shopping preferences',
          'Develop recommendations for e-commerce businesses'
        ],
        tools: ['Survey Tools', 'Data Analysis Software', 'Statistical Packages', 'Online Analytics', 'Research Methodologies'],
        facultyGuide: {
          name: 'Dr. Rohit Agarwal',
          email: 'rohit.agarwal@university.edu',
          department: 'Commerce'
        },
        guidance: [
          'Design comprehensive surveys with proper sampling',
          'Use multiple data collection methods for validation',
          'Focus on current market trends and technologies',
          'Include demographic and psychographic analysis'
        ]
      },
      {
        id: 'fintech-adoption-research',
        name: 'FinTech Adoption Research',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Research the adoption patterns of financial technology solutions, analyzing barriers, benefits, and future trends in digital finance.',
        objectives: [
          'Study FinTech adoption rates across different demographics',
          'Identify barriers to financial technology acceptance',
          'Analyze benefits and risks of digital financial services',
          'Examine regulatory impacts on FinTech growth',
          'Predict future trends in financial technology'
        ],
        tools: ['Financial Data Analysis', 'Survey Platforms', 'Statistical Software', 'Market Research Tools', 'Interview Guides'],
        facultyGuide: {
          name: 'Dr. Meera Jain',
          email: 'meera.jain@university.edu',
          department: 'Commerce'
        },
        guidance: [
          'Stay updated with latest FinTech developments',
          'Include both quantitative and qualitative research methods',
          'Consider regulatory and security aspects',
          'Focus on practical implications for businesses and consumers'
        ]
      },
      {
        id: 'digital-marketing-case-study',
        name: 'Digital Marketing Case Study',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Conduct comprehensive case studies of successful digital marketing campaigns, analyzing strategies, execution, and measurable outcomes.',
        objectives: [
          'Analyze successful digital marketing campaigns',
          'Study various digital marketing channels and their effectiveness',
          'Examine ROI and performance metrics',
          'Compare traditional vs digital marketing approaches',
          'Develop best practices and recommendations'
        ],
        tools: ['Digital Analytics Tools', 'Social Media Analytics', 'Campaign Analysis Software', 'Survey Tools', 'Case Study Templates'],
        facultyGuide: {
          name: 'Dr. Kavita Sharma',
          email: 'kavita.sharma@university.edu',
          department: 'Commerce'
        },
        guidance: [
          'Select diverse campaigns across different industries',
          'Focus on measurable outcomes and data-driven insights',
          'Include both successful and failed campaign analysis',
          'Consider ethical aspects of digital marketing'
        ]
      },
      {
        id: 'financial-literacy-workshop',
        name: 'Teaching & Workshop: Financial Literacy',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Comprehensive workshop on financial literacy, covering personal finance management, investment basics, and digital financial tools.',
        objectives: [
          'Understand basic financial concepts and terminology',
          'Learn personal budgeting and financial planning',
          'Explore investment options and risk management',
          'Understand digital financial tools and services',
          'Develop practical financial management skills'
        ],
        tools: ['Financial Planning Software', 'Educational Materials', 'Calculators', 'Case Study Examples', 'Interactive Tools'],
        facultyGuide: {
          name: 'Dr. Rajesh Gupta',
          email: 'rajesh.gupta@university.edu',
          department: 'Commerce'
        },
        guidance: [
          'Practice with real-world financial scenarios',
          'Use financial planning tools and calculators',
          'Ask questions about personal financial situations',
          'Develop personal financial goals and plans'
        ]
      }
    ]
  },
  {
    id: 'earth-science',
    name: 'Earth Science',
    icon: '🌍',
    color: 'bg-teal-100 hover:bg-teal-200 text-teal-800',
    projects: [
      {
        id: 'groundwater-mapping-gis',
        name: 'Groundwater Mapping with GIS',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Use GIS technology to map groundwater resources, analyze water table levels, and assess groundwater quality in local regions.',
        objectives: [
          'Create detailed groundwater maps using GIS technology',
          'Analyze water table fluctuations and trends',
          'Assess groundwater quality and contamination risks',
          'Model groundwater flow and recharge patterns',
          'Develop water resource management recommendations'
        ],
        tools: ['GIS Software', 'GPS Equipment', 'Water Testing Kits', 'Geological Survey Tools', 'Database Systems'],
        facultyGuide: {
          name: 'Dr. Suresh Patel',
          email: 'suresh.patel@university.edu',
          department: 'Earth Science'
        },
        guidance: [
          'Learn GIS software thoroughly before field work',
          'Collect accurate GPS coordinates for all sampling points',
          'Maintain consistent data collection protocols',
          'Validate findings with existing geological data'
        ]
      },
      {
        id: 'earthquake-modeling',
        name: 'Earthquake Modeling',
        type: 'research',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop mathematical and computer models to predict earthquake patterns, analyze seismic data, and assess earthquake risks in different regions.',
        objectives: [
          'Analyze historical seismic data and patterns',
          'Develop earthquake prediction models',
          'Study fault systems and tectonic activity',
          'Assess earthquake risks for different regions',
          'Create early warning system prototypes'
        ],
        tools: ['Seismic Data Analysis Software', 'Mathematical Modeling Tools', 'Statistical Software', 'Geological Maps', 'Computer Simulation'],
        facultyGuide: {
          name: 'Dr. Anita Singh',
          email: 'anita.singh@university.edu',
          department: 'Earth Science'
        },
        guidance: [
          'Start with well-documented historical earthquake data',
          'Understand geological context of study regions',
          'Validate models with known earthquake events',
          'Consider limitations and uncertainties in predictions'
        ]
      },
      {
        id: 'soil-erosion-conservation',
        name: 'Soil Erosion and Conservation Project',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Study soil erosion patterns, causes, and effects, while developing and testing soil conservation strategies for different landscapes.',
        objectives: [
          'Measure and analyze soil erosion rates',
          'Identify factors contributing to soil loss',
          'Test various soil conservation techniques',
          'Evaluate effectiveness of conservation methods',
          'Develop site-specific conservation recommendations'
        ],
        tools: ['Soil Sampling Equipment', 'Erosion Measurement Tools', 'Laboratory Analysis Equipment', 'Field Research Tools', 'Data Loggers'],
        facultyGuide: {
          name: 'Dr. Ramesh Kumar',
          email: 'ramesh.kumar@university.edu',
          department: 'Earth Science'
        },
        guidance: [
          'Select study sites with different erosion conditions',
          'Use standardized measurement techniques',
          'Consider seasonal variations in erosion patterns',
          'Include economic analysis of conservation methods'
        ]
      },
      {
        id: 'disaster-preparedness-workshop',
        name: 'Teaching & Workshop: Disaster Preparedness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on natural disaster preparedness, risk assessment, and community resilience building for various geological hazards.',
        objectives: [
          'Understand different types of natural disasters',
          'Learn disaster risk assessment techniques',
          'Develop emergency preparedness plans',
          'Study community resilience strategies',
          'Practice disaster response and recovery procedures'
        ],
        tools: ['Educational Materials', 'Simulation Tools', 'Emergency Equipment', 'Communication Devices', 'Planning Templates'],
        facultyGuide: {
          name: 'Dr. Pooja Mehta',
          email: 'pooja.mehta@university.edu',
          department: 'Earth Science'
        },
        guidance: [
          'Participate actively in disaster simulation exercises',
          'Learn from real disaster case studies',
          'Develop personal and family emergency plans',
          'Engage with local emergency management officials'
        ]
      }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📊',
    color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800',
    projects: [
      {
        id: 'digital-payments-economy-impact',
        name: 'Impact of Digital Payments on Local Economy',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Analyze the economic impact of digital payment systems on local businesses, consumer behavior, and overall economic growth.',
        objectives: [
          'Study adoption rates of digital payment systems',
          'Analyze impact on small and medium businesses',
          'Examine changes in consumer spending patterns',
          'Evaluate effects on financial inclusion',
          'Assess overall economic benefits and challenges'
        ],
        tools: ['Economic Data Analysis', 'Survey Tools', 'Statistical Software', 'Financial Data', 'Interview Guides'],
        facultyGuide: {
          name: 'Dr. Ashok Verma',
          email: 'ashok.verma@university.edu',
          department: 'Economics'
        },
        guidance: [
          'Collect data from diverse business sectors',
          'Use both quantitative and qualitative research methods',
          'Consider regional and demographic variations',
          'Include policy implications in your analysis'
        ]
      },
      {
        id: 'inflation-consumer-trends',
        name: 'Inflation and Consumer Trends Study',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Comprehensive study of inflation patterns and their effects on consumer behavior, purchasing power, and economic decision-making.',
        objectives: [
          'Analyze historical inflation trends and patterns',
          'Study consumer response to price changes',
          'Examine impact on different income groups',
          'Evaluate effectiveness of inflation control measures',
          'Predict future inflation trends and consumer adaptations'
        ],
        tools: ['Economic Databases', 'Statistical Analysis Software', 'Econometric Tools', 'Survey Platforms', 'Data Visualization'],
        facultyGuide: {
          name: 'Dr. Sanjay Joshi',
          email: 'sanjay.joshi@university.edu',
          department: 'Economics'
        },
        guidance: [
          'Use reliable economic data sources',
          'Apply appropriate econometric techniques',
          'Consider multiple factors affecting inflation',
          'Include international comparisons where relevant'
        ]
      },
      {
        id: 'microfinance-case-study',
        name: 'Microfinance Case Study',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Detailed case study analysis of microfinance institutions, their impact on poverty alleviation, and effectiveness in promoting financial inclusion.',
        objectives: [
          'Analyze microfinance institution operations and models',
          'Study impact on borrower livelihoods and businesses',
          'Examine repayment rates and sustainability',
          'Evaluate social and economic outcomes',
          'Compare different microfinance approaches'
        ],
        tools: ['Case Study Templates', 'Financial Analysis Tools', 'Survey Methods', 'Interview Guides', 'Impact Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Rekha Sharma',
          email: 'rekha.sharma@university.edu',
          department: 'Economics'
        },
        guidance: [
          'Select diverse microfinance institutions for comparison',
          'Include both successful and challenging cases',
          'Focus on measurable social and economic impacts',
          'Consider ethical aspects of microfinance practices'
        ]
      },
      {
        id: 'economic-awareness-workshop',
        name: 'Teaching & Workshop: Economic Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on basic economic principles, current economic issues, and data-driven decision making for everyday life.',
        objectives: [
          'Understand fundamental economic concepts',
          'Learn to interpret economic data and indicators',
          'Explore current economic issues and policies',
          'Develop critical thinking about economic decisions',
          'Practice data analysis and economic reasoning'
        ],
        tools: ['Educational Resources', 'Economic Data Sources', 'Analysis Software', 'Case Studies', 'Interactive Tools'],
        facultyGuide: {
          name: 'Dr. Vijay Kumar',
          email: 'vijay.kumar@university.edu',
          department: 'Economics'
        },
        guidance: [
          'Connect economic theory to real-world examples',
          'Practice interpreting economic news and data',
          'Engage in discussions about current economic issues',
          'Develop personal economic decision-making skills'
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📚',
    color: 'bg-rose-100 hover:bg-rose-200 text-rose-800',
    projects: [
      {
        id: 'ai-textual-analysis',
        name: 'AI-driven Textual Analysis',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Use artificial intelligence and natural language processing to analyze literary texts, identify patterns, themes, and stylistic elements.',
        objectives: [
          'Develop AI models for literary text analysis',
          'Identify themes, motifs, and stylistic patterns',
          'Compare writing styles across different authors',
          'Analyze sentiment and emotional content in literature',
          'Create tools for literary research and education'
        ],
        tools: ['Python', 'Natural Language Processing', 'Machine Learning', 'Text Analysis Software', 'Literary Databases'],
        facultyGuide: {
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@university.edu',
          department: 'English'
        },
        guidance: [
          'Start with well-annotated literary texts',
          'Combine computational methods with literary theory',
          'Validate AI findings with traditional literary analysis',
          'Consider ethical implications of AI in humanities'
        ]
      },
      {
        id: 'shakespeare-adaptations',
        name: 'Modern Shakespeare Adaptations',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Study and create modern adaptations of Shakespeare\'s works, analyzing how classical themes translate to contemporary contexts.',
        objectives: [
          'Analyze modern adaptations of Shakespeare\'s plays',
          'Study translation of classical themes to modern contexts',
          'Create original modern adaptation concepts',
          'Examine cultural and social relevance',
          'Evaluate effectiveness of different adaptation strategies'
        ],
        tools: ['Literary Analysis Tools', 'Video Production Equipment', 'Script Writing Software', 'Research Databases', 'Performance Spaces'],
        facultyGuide: {
          name: 'Dr. Michael Brown',
          email: 'michael.brown@university.edu',
          department: 'English'
        },
        guidance: [
          'Study both successful and unsuccessful adaptations',
          'Consider target audience and cultural context',
          'Maintain core themes while updating presentation',
          'Include practical performance or production elements'
        ]
      },
      {
        id: 'literature-sentiment-analysis',
        name: 'Sentiment Analysis of Literature',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Apply computational sentiment analysis techniques to literary works, studying emotional patterns, character development, and narrative arcs.',
        objectives: [
          'Develop sentiment analysis models for literary texts',
          'Track emotional patterns throughout narratives',
          'Analyze character development through sentiment',
          'Compare emotional content across different genres',
          'Create visualization tools for literary sentiment'
        ],
        tools: ['Sentiment Analysis Software', 'Python Programming', 'Data Visualization', 'Literary Corpora', 'Statistical Analysis'],
        facultyGuide: {
          name: 'Dr. Emily Davis',
          email: 'emily.davis@university.edu',
          department: 'English'
        },
        guidance: [
          'Understand limitations of computational sentiment analysis',
          'Combine quantitative results with qualitative interpretation',
          'Consider cultural and historical context of texts',
          'Validate findings with traditional literary criticism'
        ]
      },
      {
        id: 'communication-skills-workshop',
        name: 'Teaching & Workshop: Communication Skills',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Comprehensive workshop on effective communication skills, including writing, speaking, and digital communication in academic and professional contexts.',
        objectives: [
          'Develop effective written communication skills',
          'Improve public speaking and presentation abilities',
          'Learn digital communication best practices',
          'Practice academic and professional writing',
          'Build confidence in various communication contexts'
        ],
        tools: ['Presentation Software', 'Writing Tools', 'Recording Equipment', 'Feedback Systems', 'Communication Exercises'],
        facultyGuide: {
          name: 'Dr. Jennifer Wilson',
          email: 'jennifer.wilson@university.edu',
          department: 'English'
        },
        guidance: [
          'Practice regularly with diverse communication scenarios',
          'Seek feedback and implement improvements',
          'Focus on clarity, conciseness, and audience awareness',
          'Develop personal communication style and confidence'
        ]
      }
    ]
  },
  {
    id: 'environment-science',
    name: 'Environment Science',
    icon: '🌱',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'air-water-quality-testing',
        name: 'Air and Water Quality Testing',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Conduct comprehensive testing and monitoring of air and water quality in local environments, analyzing pollution levels and sources.',
        objectives: [
          'Monitor air quality parameters and pollutants',
          'Test water quality in various local sources',
          'Identify pollution sources and patterns',
          'Analyze health and environmental impacts',
          'Develop recommendations for quality improvement'
        ],
        tools: ['Air Quality Monitors', 'Water Testing Kits', 'Laboratory Equipment', 'Data Loggers', 'Analysis Software'],
        facultyGuide: {
          name: 'Dr. Ravi Patel',
          email: 'ravi.patel@university.edu',
          department: 'Environment Science'
        },
        guidance: [
          'Establish consistent monitoring protocols',
          'Collect samples from diverse locations and times',
          'Compare results with environmental standards',
          'Consider seasonal and weather-related variations'
        ]
      },
      {
        id: 'waste-recycling-solutions',
        name: 'Waste Recycling Solutions',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop innovative waste recycling solutions, studying waste management systems and creating sustainable approaches to waste reduction.',
        objectives: [
          'Analyze current waste management practices',
          'Develop innovative recycling technologies',
          'Test effectiveness of waste reduction strategies',
          'Study economic viability of recycling solutions',
          'Create implementation plans for communities'
        ],
        tools: ['Waste Analysis Equipment', 'Recycling Technology', 'Laboratory Setup', 'Economic Analysis Tools', 'Project Management Software'],
        facultyGuide: {
          name: 'Dr. Sunita Agarwal',
          email: 'sunita.agarwal@university.edu',
          department: 'Environment Science'
        },
        guidance: [
          'Focus on locally relevant waste management challenges',
          'Consider both technical and social aspects of solutions',
          'Include cost-benefit analysis in your research',
          'Engage with local communities and stakeholders'
        ]
      },
      {
        id: 'renewable-energy-models',
        name: 'Renewable Energy Models',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Design and test renewable energy systems, analyzing their efficiency, environmental impact, and potential for sustainable energy production.',
        objectives: [
          'Design renewable energy system models',
          'Test efficiency and performance of different technologies',
          'Analyze environmental impact and benefits',
          'Study economic feasibility and scalability',
          'Develop optimization strategies for energy systems'
        ],
        tools: ['Renewable Energy Equipment', 'Modeling Software', 'Data Acquisition Systems', 'Analysis Tools', 'Simulation Software'],
        facultyGuide: {
          name: 'Dr. Amit Sharma',
          email: 'amit.sharma@university.edu',
          department: 'Environment Science'
        },
        guidance: [
          'Start with small-scale prototypes and models',
          'Consider local climate and resource conditions',
          'Include lifecycle analysis in your evaluation',
          'Focus on practical implementation possibilities'
        ]
      },
      {
        id: 'environmental-awareness-workshop',
        name: 'Teaching & Workshop: Environmental Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on environmental awareness, sustainability practices, and individual actions for environmental protection.',
        objectives: [
          'Understand current environmental challenges',
          'Learn about sustainable living practices',
          'Explore renewable energy and conservation',
          'Develop environmental consciousness',
          'Create personal environmental action plans'
        ],
        tools: ['Educational Materials', 'Environmental Monitoring Tools', 'Sustainability Guides', 'Interactive Demonstrations', 'Action Planning Templates'],
        facultyGuide: {
          name: 'Dr. Priya Singh',
          email: 'priya.singh@university.edu',
          department: 'Environment Science'
        },
        guidance: [
          'Participate actively in field activities and demonstrations',
          'Connect learning to personal lifestyle choices',
          'Engage with local environmental initiatives',
          'Develop practical skills for environmental monitoring'
        ]
      }
    ]
  },
  {
    id: 'forensic-science',
    name: 'Forensic Science',
    icon: '🔍',
    color: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    projects: [
      {
        id: 'digital-forensics-project',
        name: 'Digital Forensics Project',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop digital forensics capabilities for investigating cybercrimes, recovering digital evidence, and analyzing electronic devices.',
        objectives: [
          'Learn digital evidence collection and preservation',
          'Master forensic analysis tools and techniques',
          'Study cybercrime investigation procedures',
          'Develop skills in data recovery and analysis',
          'Understand legal aspects of digital forensics'
        ],
        tools: ['Forensic Software', 'Hardware Analysis Tools', 'Data Recovery Equipment', 'Network Analysis Tools', 'Legal Documentation'],
        facultyGuide: {
          name: 'Dr. Rajesh Singh',
          email: 'rajesh.singh@university.edu',
          department: 'Forensic Science'
        },
        guidance: [
          'Follow strict evidence handling protocols',
          'Maintain detailed documentation of all procedures',
          'Stay updated with latest forensic technologies',
          'Understand legal requirements and limitations'
        ]
      },
      {
        id: 'vr-crime-scene-recreation',
        name: 'VR Crime Scene Recreation',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Use virtual reality technology to recreate crime scenes for investigation, training, and courtroom presentation purposes.',
        objectives: [
          'Develop VR crime scene reconstruction techniques',
          'Create immersive investigation environments',
          'Build training simulations for forensic students',
          'Design courtroom presentation tools',
          'Evaluate effectiveness of VR in forensic education'
        ],
        tools: ['VR Equipment', '3D Modeling Software', 'Crime Scene Photography', 'Computer Graphics', 'Simulation Software'],
        facultyGuide: {
          name: 'Dr. Neha Gupta',
          email: 'neha.gupta@university.edu',
          department: 'Forensic Science'
        },
        guidance: [
          'Focus on accuracy and attention to detail',
          'Collaborate with law enforcement professionals',
          'Consider ethical implications of crime scene recreation',
          'Test usability with different user groups'
        ]
      },
      {
        id: 'fingerprint-dna-analysis',
        name: 'Fingerprint and DNA Analysis',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Advanced study of fingerprint and DNA analysis techniques, including pattern recognition, genetic profiling, and evidence interpretation.',
        objectives: [
          'Master fingerprint classification and analysis',
          'Learn DNA extraction and profiling techniques',
          'Study pattern recognition and comparison methods',
          'Understand statistical interpretation of evidence',
          'Practice quality control and validation procedures'
        ],
        tools: ['Microscopy Equipment', 'DNA Analysis Kits', 'Laboratory Instruments', 'Pattern Analysis Software', 'Statistical Tools'],
        facultyGuide: {
          name: 'Dr. Arun Kumar',
          email: 'arun.kumar@university.edu',
          department: 'Forensic Science'
        },
        guidance: [
          'Maintain strict laboratory protocols and safety',
          'Practice with known samples before unknown evidence',
          'Understand limitations and potential errors',
          'Focus on reproducibility and quality assurance'
        ]
      },
      {
        id: 'cyber-safety-awareness-workshop',
        name: 'Teaching & Workshop: Cyber Safety Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on cyber safety, digital security, and awareness of online threats and protection strategies.',
        objectives: [
          'Understand common cyber threats and vulnerabilities',
          'Learn digital security best practices',
          'Develop awareness of online privacy issues',
          'Practice safe internet and social media usage',
          'Create personal cyber security action plans'
        ],
        tools: ['Educational Software', 'Security Tools', 'Simulation Platforms', 'Awareness Materials', 'Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Kavita Joshi',
          email: 'kavita.joshi@university.edu',
          department: 'Forensic Science'
        },
        guidance: [
          'Practice identifying and avoiding online threats',
          'Learn to use security tools and software',
          'Stay updated with latest cyber security trends',
          'Develop habits for safe digital behavior'
        ]
      }
    ]
  },
  {
    id: 'indic-studies',
    name: 'Indic Studies',
    icon: '🕉️',
    color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
    projects: [
      {
        id: 'manuscript-digitization',
        name: 'Manuscript Digitization',
        type: 'technical',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Digitize ancient manuscripts and texts, creating searchable digital archives for preservation and research purposes.',
        objectives: [
          'Digitize ancient manuscripts using proper techniques',
          'Create searchable digital databases',
          'Develop metadata standards for manuscript cataloging',
          'Implement preservation protocols for digital archives',
          'Build user-friendly access interfaces for researchers'
        ],
        tools: ['High-resolution Scanners', 'Digital Cameras', 'Database Software', 'Metadata Standards', 'Archive Management Systems'],
        facultyGuide: {
          name: 'Dr. Ramesh Chandra',
          email: 'ramesh.chandra@university.edu',
          department: 'Indic Studies'
        },
        guidance: [
          'Handle manuscripts with extreme care and proper protocols',
          'Maintain consistent digitization standards',
          'Collaborate with librarians and manuscript experts',
          'Focus on long-term preservation and accessibility'
        ]
      },
      {
        id: 'cultural-data-mining',
        name: 'Cultural Data Mining',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Apply data mining techniques to analyze cultural patterns, traditions, and historical trends in Indic civilization and literature.',
        objectives: [
          'Apply data mining to cultural and historical datasets',
          'Identify patterns in traditional practices and beliefs',
          'Analyze evolution of cultural elements over time',
          'Create visualization tools for cultural data',
          'Develop insights for cultural preservation efforts'
        ],
        tools: ['Data Mining Software', 'Statistical Analysis Tools', 'Cultural Databases', 'Visualization Software', 'Machine Learning'],
        facultyGuide: {
          name: 'Dr. Sushma Rao',
          email: 'sushma.rao@university.edu',
          department: 'Indic Studies'
        },
        guidance: [
          'Ensure cultural sensitivity in data analysis',
          'Validate findings with cultural experts',
          'Consider multiple perspectives and interpretations',
          'Focus on meaningful cultural insights'
        ]
      },
      {
        id: 'literature-analysis-ai',
        name: 'Literature Analysis with AI',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Use artificial intelligence to analyze classical Indic literature, identifying themes, styles, and cultural elements across different texts.',
        objectives: [
          'Develop AI models for analyzing classical texts',
          'Identify recurring themes and motifs',
          'Compare literary styles across different periods',
          'Extract cultural and philosophical insights',
          'Create tools for literary research and education'
        ],
        tools: ['Natural Language Processing', 'Machine Learning', 'Text Analysis Software', 'Literary Databases', 'AI Development Tools'],
        facultyGuide: {
          name: 'Dr. Prakash Joshi',
          email: 'prakash.joshi@university.edu',
          department: 'Indic Studies'
        },
        guidance: [
          'Combine computational analysis with traditional scholarship',
          'Understand linguistic and cultural context',
          'Validate AI findings with expert knowledge',
          'Consider ethical implications of AI in humanities'
        ]
      },
      {
        id: 'cultural-heritage-awareness-workshop',
        name: 'Teaching & Workshop: Cultural Heritage Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on Indic cultural heritage, traditions, and the importance of preserving cultural knowledge and practices.',
        objectives: [
          'Understand the richness of Indic cultural heritage',
          'Learn about traditional practices and their significance',
          'Explore methods of cultural preservation',
          'Develop appreciation for cultural diversity',
          'Create personal cultural engagement plans'
        ],
        tools: ['Cultural Materials', 'Educational Resources', 'Traditional Artifacts', 'Multimedia Presentations', 'Interactive Activities'],
        facultyGuide: {
          name: 'Dr. Anjali Sharma',
          email: 'anjali.sharma@university.edu',
          department: 'Indic Studies'
        },
        guidance: [
          'Engage respectfully with cultural traditions',
          'Ask questions and seek deeper understanding',
          'Participate actively in cultural activities',
          'Develop personal connections to cultural heritage'
        ]
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Institute of Computer Science',
    icon: '💻',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    projects: [
      {
        id: 'cybersecurity-project',
        name: 'Cybersecurity Project',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop comprehensive cybersecurity solutions including threat detection, vulnerability assessment, and security monitoring systems.',
        objectives: [
          'Build threat detection and monitoring systems',
          'Develop vulnerability assessment tools',
          'Implement security protocols and best practices',
          'Create incident response procedures',
          'Test and validate security measures'
        ],
        tools: ['Security Software', 'Network Analysis Tools', 'Penetration Testing Tools', 'Monitoring Systems', 'Programming Languages'],
        facultyGuide: {
          name: 'Dr. Vikram Singh',
          email: 'vikram.singh@university.edu',
          department: 'Computer Science'
        },
        guidance: [
          'Follow ethical hacking and security testing guidelines',
          'Stay updated with latest security threats and solutions',
          'Practice on controlled environments and test systems',
          'Document all security procedures and findings'
        ]
      },
      {
        id: 'ai-chatbot-development',
        name: 'AI Chatbot Development',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Design and develop intelligent chatbots using natural language processing and machine learning for various applications.',
        objectives: [
          'Develop natural language understanding capabilities',
          'Implement machine learning for conversation flow',
          'Create domain-specific knowledge bases',
          'Build user-friendly chat interfaces',
          'Test and optimize chatbot performance'
        ],
        tools: ['Python', 'Natural Language Processing', 'Machine Learning Frameworks', 'Chatbot Platforms', 'Database Systems'],
        facultyGuide: {
          name: 'Dr. Priya Nair',
          email: 'priya.nair@university.edu',
          department: 'Computer Science'
        },
        guidance: [
          'Start with simple conversation flows before complex AI',
          'Focus on user experience and natural interactions',
          'Train models with diverse and representative data',
          'Implement proper error handling and fallback responses'
        ]
      },
      {
        id: 'blockchain-solution',
        name: 'Blockchain-based Solution',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop blockchain-based applications for various use cases such as supply chain, voting systems, or digital identity management.',
        objectives: [
          'Understand blockchain technology and principles',
          'Develop smart contracts and decentralized applications',
          'Implement security and consensus mechanisms',
          'Create user interfaces for blockchain applications',
          'Test and deploy blockchain solutions'
        ],
        tools: ['Blockchain Platforms', 'Smart Contract Languages', 'Cryptocurrency Tools', 'Development Frameworks', 'Testing Tools'],
        facultyGuide: {
          name: 'Dr. Arun Kumar',
          email: 'arun.kumar@university.edu',
          department: 'Computer Science'
        },
        guidance: [
          'Start with understanding blockchain fundamentals',
          'Practice with test networks before mainnet deployment',
          'Focus on security and best practices in smart contracts',
          'Consider scalability and performance implications'
        ]
      },
      {
        id: 'coding-skills-workshop',
        name: 'Teaching & Workshop: Coding Skills',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Comprehensive workshop on programming fundamentals, coding best practices, and introduction to various programming languages.',
        objectives: [
          'Learn programming fundamentals and logic',
          'Practice with multiple programming languages',
          'Understand software development best practices',
          'Develop problem-solving and debugging skills',
          'Create simple applications and projects'
        ],
        tools: ['Programming IDEs', 'Online Coding Platforms', 'Version Control Systems', 'Development Tools', 'Project Templates'],
        facultyGuide: {
          name: 'Dr. Sunita Reddy',
          email: 'sunita.reddy@university.edu',
          department: 'Computer Science'
        },
        guidance: [
          'Practice coding regularly and consistently',
          'Start with simple problems and gradually increase complexity',
          'Focus on understanding concepts rather than memorizing syntax',
          'Collaborate with peers and seek help when needed'
        ]
      }
    ]
  },
  {
    id: 'iips',
    name: 'IIPS (International Institute of Professional Studies)',
    icon: '🎓',
    color: 'bg-violet-100 hover:bg-violet-200 text-violet-800',
    projects: [
      {
        id: 'ai-career-counseling',
        name: 'AI for Career Counseling',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop AI-powered career counseling systems that provide personalized career guidance based on skills, interests, and market trends.',
        objectives: [
          'Build AI models for career recommendation',
          'Analyze job market trends and requirements',
          'Create personality and skill assessment tools',
          'Develop personalized career path suggestions',
          'Implement user-friendly counseling interfaces'
        ],
        tools: ['Machine Learning', 'Data Analysis', 'Career Databases', 'Assessment Tools', 'Web Development'],
        facultyGuide: {
          name: 'Dr. Rohit Agarwal',
          email: 'rohit.agarwal@university.edu',
          department: 'IIPS'
        },
        guidance: [
          'Research current career counseling methodologies',
          'Collect diverse career and skills data for training',
          'Validate recommendations with career counseling experts',
          'Focus on practical and actionable career advice'
        ]
      },
      {
        id: 'business-process-simulation',
        name: 'Business Process Simulation',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Create business process simulation games and tools for training students in real-world business scenarios and decision-making.',
        objectives: [
          'Design realistic business simulation scenarios',
          'Implement decision-making and consequence systems',
          'Create interactive learning experiences',
          'Develop performance assessment metrics',
          'Test effectiveness with student groups'
        ],
        tools: ['Simulation Software', 'Game Development Tools', 'Business Analytics', 'User Interface Design', 'Database Systems'],
        facultyGuide: {
          name: 'Dr. Meera Jain',
          email: 'meera.jain@university.edu',
          department: 'IIPS'
        },
        guidance: [
          'Base simulations on real business cases and scenarios',
          'Include multiple business domains and industries',
          'Focus on educational value and learning outcomes',
          'Get feedback from business professionals and educators'
        ]
      },
      {
        id: 'resume-screening-ai',
        name: 'Resume Screening with AI',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop AI systems for automated resume screening and candidate evaluation, helping streamline recruitment processes.',
        objectives: [
          'Build AI models for resume parsing and analysis',
          'Develop skill and experience matching algorithms',
          'Create bias-free evaluation criteria',
          'Implement ranking and recommendation systems',
          'Test with real recruitment scenarios'
        ],
        tools: ['Natural Language Processing', 'Machine Learning', 'Resume Databases', 'Text Analysis', 'Evaluation Metrics'],
        facultyGuide: {
          name: 'Dr. Kavita Sharma',
          email: 'kavita.sharma@university.edu',
          department: 'IIPS'
        },
        guidance: [
          'Ensure fairness and avoid bias in AI models',
          'Collaborate with HR professionals for validation',
          'Test with diverse resume formats and styles',
          'Focus on accuracy and practical applicability'
        ]
      },
      {
        id: 'professional-skills-workshop',
        name: 'Teaching & Workshop: Professional Skills',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Comprehensive workshop on professional skills development, including communication, leadership, teamwork, and career planning.',
        objectives: [
          'Develop professional communication skills',
          'Learn leadership and teamwork principles',
          'Practice interview and presentation skills',
          'Understand workplace etiquette and professionalism',
          'Create personal professional development plans'
        ],
        tools: ['Presentation Tools', 'Communication Exercises', 'Assessment Instruments', 'Role-playing Scenarios', 'Planning Templates'],
        facultyGuide: {
          name: 'Dr. Rajesh Gupta',
          email: 'rajesh.gupta@university.edu',
          department: 'IIPS'
        },
        guidance: [
          'Practice professional scenarios and situations',
          'Seek feedback and work on improvement areas',
          'Network with professionals and industry experts',
          'Develop personal brand and professional presence'
        ]
      }
    ]
  },
  {
    id: 'library-science',
    name: 'Library Science',
    icon: '📖',
    color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800',
    projects: [
      {
        id: 'smart-digital-library',
        name: 'Smart Digital Library System',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop a comprehensive digital library system with smart features like AI-powered search, personalized recommendations, and automated cataloging.',
        objectives: [
          'Build digital library management system',
          'Implement AI-powered search and discovery',
          'Create personalized recommendation engines',
          'Develop automated cataloging and metadata systems',
          'Design user-friendly interfaces for different user types'
        ],
        tools: ['Database Systems', 'Web Development', 'AI/ML Tools', 'Digital Asset Management', 'User Interface Design'],
        facultyGuide: {
          name: 'Dr. Suresh Patel',
          email: 'suresh.patel@university.edu',
          department: 'Library Science'
        },
        guidance: [
          'Study existing digital library standards and protocols',
          'Focus on user experience and accessibility',
          'Implement proper metadata standards',
          'Test with real library collections and users'
        ]
      },
      {
        id: 'qr-book-access',
        name: 'QR-based Book Access',
        type: 'technical',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Implement QR code-based systems for book access, lending, and inventory management in libraries.',
        objectives: [
          'Develop QR code generation and scanning systems',
          'Create mobile applications for book access',
          'Implement inventory tracking and management',
          'Build user authentication and lending systems',
          'Test system reliability and user adoption'
        ],
        tools: ['QR Code Technology', 'Mobile App Development', 'Database Systems', 'Inventory Management', 'User Authentication'],
        facultyGuide: {
          name: 'Dr. Anita Singh',
          email: 'anita.singh@university.edu',
          department: 'Library Science'
        },
        guidance: [
          'Design for ease of use by library staff and patrons',
          'Ensure system reliability and error handling',
          'Consider integration with existing library systems',
          'Test with different types of mobile devices'
        ]
      },
      {
        id: 'book-recommendation-ai',
        name: 'Book Recommendation AI',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Create AI-powered book recommendation systems that suggest relevant books based on user preferences, reading history, and content analysis.',
        objectives: [
          'Develop machine learning models for book recommendations',
          'Analyze user reading patterns and preferences',
          'Implement content-based and collaborative filtering',
          'Create personalized recommendation interfaces',
          'Evaluate recommendation accuracy and user satisfaction'
        ],
        tools: ['Machine Learning', 'Recommendation Algorithms', 'Data Analysis', 'Book Databases', 'User Interface Design'],
        facultyGuide: {
          name: 'Dr. Ramesh Kumar',
          email: 'ramesh.kumar@university.edu',
          department: 'Library Science'
        },
        guidance: [
          'Collect diverse book and user data for training',
          'Balance different recommendation approaches',
          'Consider user privacy and data protection',
          'Test recommendations with real library users'
        ]
      },
      {
        id: 'digital-literacy-workshop',
        name: 'Teaching & Workshop: Digital Literacy',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on digital literacy skills, including information searching, evaluation, and effective use of digital library resources.',
        objectives: [
          'Develop digital information searching skills',
          'Learn to evaluate online information credibility',
          'Practice using digital library resources effectively',
          'Understand digital rights and responsibilities',
          'Create personal digital learning strategies'
        ],
        tools: ['Digital Library Platforms', 'Search Tools', 'Evaluation Frameworks', 'Educational Resources', 'Practice Exercises'],
        facultyGuide: {
          name: 'Dr. Pooja Mehta',
          email: 'pooja.mehta@university.edu',
          department: 'Library Science'
        },
        guidance: [
          'Practice with various digital information sources',
          'Develop critical thinking about information quality',
          'Learn to use advanced search techniques',
          'Understand ethical use of digital information'
        ]
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'bg-red-100 hover:bg-red-200 text-red-800',
    projects: [
      {
        id: 'mathematical-modeling-real-world',
        name: 'Mathematical Modelling of Real-world Problems',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Apply mathematical modeling techniques to solve real-world problems in areas like population dynamics, economics, or environmental science.',
        objectives: [
          'Identify real-world problems suitable for mathematical modeling',
          'Develop appropriate mathematical models and equations',
          'Use computational tools for model simulation',
          'Validate models with real data and observations',
          'Interpret results and provide practical recommendations'
        ],
        tools: ['Mathematical Software', 'Statistical Analysis', 'Simulation Tools', 'Data Analysis', 'Computational Mathematics'],
        facultyGuide: {
          name: 'Dr. Ashok Verma',
          email: 'ashok.verma@university.edu',
          department: 'Mathematics'
        },
        guidance: [
          'Start with well-defined problems with available data',
          'Validate mathematical assumptions with domain experts',
          'Use appropriate mathematical techniques for the problem type',
          'Focus on practical applicability of solutions'
        ]
      },
      {
        id: 'cryptography-number-theory',
        name: 'Cryptography using Number Theory',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Explore cryptographic algorithms and security systems based on number theory principles, including RSA, elliptic curves, and modern encryption.',
        objectives: [
          'Study number theory foundations of cryptography',
          'Implement classical and modern encryption algorithms',
          'Analyze security properties and vulnerabilities',
          'Develop new cryptographic protocols or improvements',
          'Test implementations for security and performance'
        ],
        tools: ['Programming Languages', 'Cryptographic Libraries', 'Mathematical Software', 'Security Testing Tools', 'Algorithm Analysis'],
        facultyGuide: {
          name: 'Dr. Sanjay Joshi',
          email: 'sanjay.joshi@university.edu',
          department: 'Mathematics'
        },
        guidance: [
          'Understand mathematical foundations before implementation',
          'Follow established cryptographic standards and practices',
          'Test security properties rigorously',
          'Consider both theoretical and practical aspects'
        ]
      },
      {
        id: 'ai-ml-algorithms',
        name: 'AI & Machine Learning Algorithms',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Study and implement mathematical foundations of AI and machine learning algorithms, focusing on optimization, statistics, and linear algebra.',
        objectives: [
          'Understand mathematical foundations of ML algorithms',
          'Implement algorithms from scratch using mathematical principles',
          'Analyze algorithm performance and complexity',
          'Optimize algorithms for specific applications',
          'Compare different approaches and their mathematical trade-offs'
        ],
        tools: ['Programming Languages', 'Mathematical Libraries', 'ML Frameworks', 'Optimization Tools', 'Statistical Software'],
        facultyGuide: {
          name: 'Dr. Rekha Sharma',
          email: 'rekha.sharma@university.edu',
          department: 'Mathematics'
        },
        guidance: [
          'Focus on understanding mathematical intuition behind algorithms',
          'Implement algorithms from mathematical first principles',
          'Validate implementations with known datasets',
          'Analyze computational complexity and efficiency'
        ]
      },
      {
        id: 'fun-mathematics-workshop',
        name: 'Teaching & Workshop: Fun with Mathematics',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Engaging workshop that makes mathematics fun and accessible through games, puzzles, and real-world applications.',
        objectives: [
          'Discover the fun and beauty in mathematical concepts',
          'Solve mathematical puzzles and brain teasers',
          'Explore mathematics in art, nature, and everyday life',
          'Develop problem-solving and logical thinking skills',
          'Build confidence and positive attitude towards mathematics'
        ],
        tools: ['Mathematical Games', 'Puzzle Collections', 'Interactive Software', 'Visual Aids', 'Hands-on Activities'],
        facultyGuide: {
          name: 'Dr. Vijay Kumar',
          email: 'vijay.kumar@university.edu',
          department: 'Mathematics'
        },
        guidance: [
          'Approach mathematics with curiosity and playfulness',
          'Don\'t be afraid to make mistakes and learn from them',
          'Look for patterns and connections in mathematical concepts',
          'Apply mathematical thinking to everyday situations'
        ]
      }
    ]
  },
  {
    id: 'microbiology-foodtech',
    name: 'Microbiology & Food Technology',
    icon: '🦠',
    color: 'bg-lime-100 hover:bg-lime-200 text-lime-800',
    projects: [
      {
        id: 'probiotic-development',
        name: 'Probiotic Development',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Research and develop probiotic products, studying beneficial microorganisms and their applications in food and health.',
        objectives: [
          'Isolate and characterize beneficial microorganisms',
          'Study probiotic properties and health benefits',
          'Develop probiotic food products and supplements',
          'Test stability and viability of probiotic cultures',
          'Evaluate safety and efficacy through controlled studies'
        ],
        tools: ['Microbiology Laboratory', 'Culture Media', 'Microscopy', 'Biochemical Tests', 'Food Processing Equipment'],
        facultyGuide: {
          name: 'Dr. Ravi Patel',
          email: 'ravi.patel@university.edu',
          department: 'Microbiology & Food Technology'
        },
        guidance: [
          'Maintain strict sterile techniques throughout research',
          'Follow safety protocols for handling microorganisms',
          'Document all procedures and observations carefully',
          'Validate results with multiple testing methods'
        ]
      },
      {
        id: 'antimicrobial-resistance-study',
        name: 'Antimicrobial Resistance Study',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Study antimicrobial resistance patterns in foodborne pathogens and develop strategies to combat resistant microorganisms.',
        objectives: [
          'Isolate and identify antimicrobial-resistant pathogens',
          'Study resistance mechanisms and genetic factors',
          'Test effectiveness of different antimicrobial agents',
          'Develop alternative control strategies',
          'Assess public health implications and recommendations'
        ],
        tools: ['Antimicrobial Testing', 'Molecular Biology Tools', 'Genetic Analysis', 'Laboratory Equipment', 'Data Analysis Software'],
        facultyGuide: {
          name: 'Dr. Sunita Agarwal',
          email: 'sunita.agarwal@university.edu',
          department: 'Microbiology & Food Technology'
        },
        guidance: [
          'Follow biosafety protocols when handling resistant pathogens',
          'Use standardized testing methods for consistency',
          'Collaborate with medical and public health professionals',
          'Consider ethical implications of resistance research'
        ]
      },
      {
        id: 'ai-food-quality-detection',
        name: 'AI Food Quality Detection',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop AI-powered systems for detecting food quality, spoilage, and contamination using computer vision and sensor technologies.',
        objectives: [
          'Develop computer vision systems for food quality assessment',
          'Train AI models to detect spoilage and contamination',
          'Integrate multiple sensor technologies for comprehensive analysis',
          'Create user-friendly interfaces for food industry applications',
          'Validate system accuracy with real food samples'
        ],
        tools: ['Computer Vision', 'Machine Learning', 'Sensors', 'Image Processing', 'Food Analysis Equipment'],
        facultyGuide: {
          name: 'Dr. Amit Sharma',
          email: 'amit.sharma@university.edu',
          department: 'Microbiology & Food Technology'
        },
        guidance: [
          'Collect diverse food samples for training AI models',
          'Validate AI predictions with traditional testing methods',
          'Consider practical implementation in food industry settings',
          'Focus on accuracy, speed, and cost-effectiveness'
        ]
      },
      {
        id: 'food-safety-awareness-workshop',
        name: 'Teaching & Workshop: Food Safety Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on food safety principles, hygiene practices, and awareness of foodborne illnesses and prevention strategies.',
        objectives: [
          'Understand food safety principles and HACCP',
          'Learn proper food handling and storage techniques',
          'Recognize foodborne illness symptoms and prevention',
          'Practice hygiene and sanitation procedures',
          'Develop food safety awareness for home and workplace'
        ],
        tools: ['Food Safety Materials', 'Testing Kits', 'Demonstration Equipment', 'Educational Resources', 'Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Priya Singh',
          email: 'priya.singh@university.edu',
          department: 'Microbiology & Food Technology'
        },
        guidance: [
          'Practice proper food handling techniques regularly',
          'Learn to identify potential food safety hazards',
          'Understand the importance of temperature control',
          'Develop habits for safe food preparation and storage'
        ]
      }
    ]
  },
  {
    id: 'political-science',
    name: 'Political Science',
    icon: '🏛️',
    color: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    projects: [
      {
        id: 'social-media-voting-impact',
        name: 'Social Media Impact on Voting',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Study the influence of social media platforms on voting behavior, political opinions, and democratic processes.',
        objectives: [
          'Analyze social media usage patterns during elections',
          'Study correlation between social media exposure and voting behavior',
          'Examine the spread of political information and misinformation',
          'Evaluate the role of social media in political mobilization',
          'Assess implications for democratic processes and governance'
        ],
        tools: ['Social Media Analytics', 'Survey Tools', 'Data Analysis Software', 'Statistical Methods', 'Research Methodologies'],
        facultyGuide: {
          name: 'Dr. Rajesh Singh',
          email: 'rajesh.singh@university.edu',
          department: 'Political Science'
        },
        guidance: [
          'Use ethical methods for social media data collection',
          'Consider privacy and consent issues in research',
          'Analyze data from multiple social media platforms',
          'Include diverse demographic groups in your study'
        ]
      },
      {
        id: 'public-opinion-case-study',
        name: 'Public Opinion Case Study',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Conduct comprehensive case studies of public opinion formation, measurement, and its influence on policy-making processes.',
        objectives: [
          'Study public opinion formation on specific policy issues',
          'Analyze factors influencing public opinion changes',
          'Examine the relationship between public opinion and policy outcomes',
          'Evaluate different methods of measuring public opinion',
          'Assess the role of media and political communication'
        ],
        tools: ['Polling Software', 'Survey Design Tools', 'Statistical Analysis', 'Interview Guides', 'Data Visualization'],
        facultyGuide: {
          name: 'Dr. Neha Gupta',
          email: 'neha.gupta@university.edu',
          department: 'Political Science'
        },
        guidance: [
          'Design representative and unbiased surveys',
          'Use multiple data collection methods for validation',
          'Consider temporal changes in public opinion',
          'Analyze both quantitative and qualitative data'
        ]
      },
      {
        id: 'ai-policy-data-analysis',
        name: 'AI for Policy Data Analysis',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Apply artificial intelligence and machine learning techniques to analyze policy data, predict policy outcomes, and support evidence-based governance.',
        objectives: [
          'Develop AI models for policy data analysis',
          'Predict policy outcomes using machine learning',
          'Analyze large datasets of government and policy information',
          'Create visualization tools for policy insights',
          'Support evidence-based policy making with AI tools'
        ],
        tools: ['Machine Learning', 'Data Analysis', 'Policy Databases', 'Visualization Software', 'Statistical Tools'],
        facultyGuide: {
          name: 'Dr. Arun Kumar',
          email: 'arun.kumar@university.edu',
          department: 'Political Science'
        },
        guidance: [
          'Understand policy context before applying AI techniques',
          'Validate AI predictions with policy experts',
          'Consider ethical implications of AI in governance',
          'Focus on interpretable and actionable insights'
        ]
      },
      {
        id: 'democracy-awareness-workshop',
        name: 'Teaching & Workshop: Democracy Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on democratic principles, civic engagement, and the role of technology in modern democratic processes.',
        objectives: [
          'Understand fundamental principles of democracy',
          'Learn about civic rights and responsibilities',
          'Explore the role of technology in democratic participation',
          'Develop critical thinking about political information',
          'Practice civic engagement and democratic participation'
        ],
        tools: ['Educational Materials', 'Simulation Tools', 'Discussion Platforms', 'Civic Engagement Resources', 'Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Kavita Joshi',
          email: 'kavita.joshi@university.edu',
          department: 'Political Science'
        },
        guidance: [
          'Engage actively in democratic discussions and debates',
          'Practice critical evaluation of political information',
          'Participate in civic activities and community engagement',
          'Develop informed opinions on political and social issues'
        ]
      }
    ]
  },
  {
    id: 'public-administration',
    name: 'Public Administration',
    icon: '🏢',
    color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
    projects: [
      {
        id: 'e-governance-dashboard',
        name: 'E-Governance Dashboard',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Develop comprehensive e-governance dashboards for monitoring government services, citizen satisfaction, and administrative efficiency.',
        objectives: [
          'Design user-friendly e-governance interfaces',
          'Implement real-time monitoring and reporting systems',
          'Create citizen service portals and feedback mechanisms',
          'Develop analytics for government performance measurement',
          'Ensure security and accessibility in digital governance'
        ],
        tools: ['Web Development', 'Database Systems', 'Analytics Tools', 'User Interface Design', 'Security Frameworks'],
        facultyGuide: {
          name: 'Dr. Suresh Patel',
          email: 'suresh.patel@university.edu',
          department: 'Public Administration'
        },
        guidance: [
          'Study existing e-governance systems and best practices',
          'Focus on user experience for both citizens and administrators',
          'Ensure data security and privacy protection',
          'Test with real government processes and stakeholders'
        ]
      },
      {
        id: 'complaint-management-system',
        name: 'Public Complaint Management System',
        type: 'technical',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Create digital systems for managing public complaints, tracking resolution progress, and improving government responsiveness.',
        objectives: [
          'Build complaint submission and tracking systems',
          'Implement automated routing and assignment mechanisms',
          'Create progress monitoring and notification systems',
          'Develop analytics for complaint pattern analysis',
          'Design feedback and satisfaction measurement tools'
        ],
        tools: ['Web Development', 'Database Management', 'Workflow Systems', 'Communication Tools', 'Analytics Software'],
        facultyGuide: {
          name: 'Dr. Anita Singh',
          email: 'anita.singh@university.edu',
          department: 'Public Administration'
        },
        guidance: [
          'Design for ease of use by citizens of all backgrounds',
          'Implement transparent tracking and communication',
          'Consider integration with existing government systems',
          'Focus on accountability and response time improvement'
        ]
      },
      {
        id: 'service-efficiency-research',
        name: 'Service Efficiency Research',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Research government service delivery efficiency, identify bottlenecks, and propose improvements for better public service delivery.',
        objectives: [
          'Analyze current government service delivery processes',
          'Identify inefficiencies and bottlenecks in service delivery',
          'Study citizen satisfaction and service quality metrics',
          'Propose process improvements and optimization strategies',
          'Evaluate impact of digital transformation on service efficiency'
        ],
        tools: ['Process Analysis Tools', 'Survey Platforms', 'Statistical Software', 'Performance Metrics', 'Research Methodologies'],
        facultyGuide: {
          name: 'Dr. Ramesh Kumar',
          email: 'ramesh.kumar@university.edu',
          department: 'Public Administration'
        },
        guidance: [
          'Use both quantitative and qualitative research methods',
          'Engage with government officials and citizens for insights',
          'Focus on measurable improvements and practical solutions',
          'Consider resource constraints and implementation feasibility'
        ]
      },
      {
        id: 'good-governance-workshop',
        name: 'Teaching & Workshop: Good Governance Practices',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on principles of good governance, transparency, accountability, and citizen participation in democratic governance.',
        objectives: [
          'Understand principles and practices of good governance',
          'Learn about transparency and accountability mechanisms',
          'Explore citizen participation in governance processes',
          'Study anti-corruption measures and ethical governance',
          'Develop awareness of public service values and ethics'
        ],
        tools: ['Educational Resources', 'Case Studies', 'Simulation Exercises', 'Discussion Platforms', 'Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Pooja Mehta',
          email: 'pooja.mehta@university.edu',
          department: 'Public Administration'
        },
        guidance: [
          'Engage actively in governance discussions and case studies',
          'Learn from both successful and failed governance examples',
          'Develop understanding of citizen rights and responsibilities',
          'Practice ethical decision-making in governance scenarios'
        ]
      }
    ]
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    icon: '🕉️',
    color: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
    projects: [
      {
        id: 'neural-machine-translation-sanskrit',
        name: 'Neural Machine Translation of Sanskrit',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop neural machine translation systems for translating Sanskrit texts to modern languages and vice versa.',
        objectives: [
          'Build neural networks for Sanskrit-to-English translation',
          'Create large datasets of parallel Sanskrit-English texts',
          'Implement attention mechanisms for better translation quality',
          'Handle Sanskrit grammar and linguistic complexities',
          'Evaluate translation accuracy and cultural preservation'
        ],
        tools: ['Deep Learning Frameworks', 'Natural Language Processing', 'Sanskrit Corpora', 'Translation Tools', 'Linguistic Analysis'],
        facultyGuide: {
          name: 'Dr. Ramesh Chandra',
          email: 'ramesh.chandra@university.edu',
          department: 'Sanskrit'
        },
        guidance: [
          'Collaborate with Sanskrit scholars for linguistic accuracy',
          'Understand Sanskrit grammar and syntax thoroughly',
          'Validate translations with expert Sanskrit knowledge',
          'Consider cultural and contextual aspects of translation'
        ]
      },
      {
        id: 'digital-sanskrit-dictionary',
        name: 'Digital Sanskrit Dictionary',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Create comprehensive digital Sanskrit dictionaries with advanced search, etymology, and cross-referencing capabilities.',
        objectives: [
          'Digitize and organize Sanskrit vocabulary and meanings',
          'Implement advanced search and filtering capabilities',
          'Add etymology and word origin information',
          'Create cross-references and related word connections',
          'Build user-friendly interfaces for scholars and students'
        ],
        tools: ['Database Systems', 'Web Development', 'Search Algorithms', 'Linguistic Databases', 'User Interface Design'],
        facultyGuide: {
          name: 'Dr. Sushma Rao',
          email: 'sushma.rao@university.edu',
          department: 'Sanskrit'
        },
        guidance: [
          'Ensure accuracy and completeness of Sanskrit entries',
          'Include multiple meanings and contextual usage',
          'Design for both beginners and advanced Sanskrit scholars',
          'Validate entries with authoritative Sanskrit sources'
        ]
      },
      {
        id: 'ai-sanskrit-chatbot',
        name: 'AI-powered Sanskrit Chatbot',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop AI chatbots that can understand and respond in Sanskrit, helping users learn the language and access Sanskrit knowledge.',
        objectives: [
          'Build natural language understanding for Sanskrit',
          'Create conversational AI that responds in Sanskrit',
          'Implement Sanskrit grammar and syntax checking',
          'Develop educational features for Sanskrit learning',
          'Test chatbot effectiveness with Sanskrit learners'
        ],
        tools: ['Natural Language Processing', 'Chatbot Frameworks', 'Sanskrit Language Models', 'Machine Learning', 'Educational Technology'],
        facultyGuide: {
          name: 'Dr. Prakash Joshi',
          email: 'prakash.joshi@university.edu',
          department: 'Sanskrit'
        },
        guidance: [
          'Start with basic Sanskrit conversation patterns',
          'Include educational and cultural context in responses',
          'Validate Sanskrit accuracy with language experts',
          'Focus on helping users learn and appreciate Sanskrit'
        ]
      },
      {
        id: 'sanskrit-awareness-workshop',
        name: 'Teaching & Workshop: Sanskrit Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on Sanskrit language, literature, and its relevance in modern times, combined with computational tools for Sanskrit study.',
        objectives: [
          'Understand the importance and beauty of Sanskrit language',
          'Learn basic Sanskrit vocabulary and grammar',
          'Explore Sanskrit literature and philosophical texts',
          'Discover modern computational tools for Sanskrit study',
          'Develop appreciation for Sanskrit cultural heritage'
        ],
        tools: ['Sanskrit Learning Materials', 'Digital Sanskrit Tools', 'Educational Software', 'Cultural Resources', 'Interactive Exercises'],
        facultyGuide: {
          name: 'Dr. Anjali Sharma',
          email: 'anjali.sharma@university.edu',
          department: 'Sanskrit'
        },
        guidance: [
          'Approach Sanskrit learning with patience and respect',
          'Practice pronunciation and basic grammar regularly',
          'Explore the philosophical and cultural richness of Sanskrit',
          'Use modern tools to enhance traditional learning methods'
        ]
      }
    ]
  },
  {
    id: 'sanskrit-jyotirvigyan-ved',
    name: 'Sanskrit Jyotirvigyan Ved',
    icon: '⭐',
    color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
    projects: [
      {
        id: 'astrological-data-analysis',
        name: 'Astrological Data Analysis',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Apply data science techniques to analyze astrological patterns, planetary movements, and their correlations with various phenomena.',
        objectives: [
          'Collect and organize astrological and astronomical data',
          'Analyze patterns in planetary movements and positions',
          'Study correlations between celestial events and terrestrial phenomena',
          'Apply statistical methods to astrological predictions',
          'Create data visualizations for astrological insights'
        ],
        tools: ['Data Analysis Software', 'Astronomical Databases', 'Statistical Tools', 'Visualization Software', 'Astrological Calculations'],
        facultyGuide: {
          name: 'Dr. Ashok Verma',
          email: 'ashok.verma@university.edu',
          department: 'Sanskrit Jyotirvigyan Ved'
        },
        guidance: [
          'Combine traditional astrological knowledge with modern data science',
          'Use accurate astronomical data and calculations',
          'Apply rigorous statistical methods to pattern analysis',
          'Respect both scientific and traditional perspectives'
        ]
      },
      {
        id: 'ml-horoscope-prediction',
        name: 'Machine Learning Horoscope Prediction',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop machine learning models for horoscope generation and astrological predictions based on traditional Vedic astrology principles.',
        objectives: [
          'Build ML models based on Vedic astrology principles',
          'Train algorithms on historical astrological data',
          'Develop automated horoscope generation systems',
          'Create prediction models for various life aspects',
          'Validate predictions using traditional astrological methods'
        ],
        tools: ['Machine Learning', 'Astrological Software', 'Data Mining', 'Prediction Algorithms', 'Vedic Astrology Tools'],
        facultyGuide: {
          name: 'Dr. Sanjay Joshi',
          email: 'sanjay.joshi@university.edu',
          department: 'Sanskrit Jyotirvigyan Ved'
        },
        guidance: [
          'Study traditional Vedic astrology principles thoroughly',
          'Ensure ML models respect astrological traditions',
          'Validate predictions with experienced astrologers',
          'Consider ethical implications of automated predictions'
        ]
      },
      {
        id: 'cultural-study-jyotirvigyan',
        name: 'Cultural Study on Jyotirvigyan',
        type: 'research',
        difficulty: 'Intermediate',
        duration: '3-4 months',
        description: 'Study the cultural and historical significance of Jyotirvigyan (Vedic astrology) in Indian civilization and its modern relevance.',
        objectives: [
          'Research historical development of Jyotirvigyan',
          'Study cultural significance in Indian traditions',
          'Analyze modern applications and adaptations',
          'Examine the relationship between astronomy and astrology',
          'Document preservation efforts and contemporary relevance'
        ],
        tools: ['Historical Research', 'Cultural Analysis', 'Interview Methods', 'Documentation Tools', 'Comparative Studies'],
        facultyGuide: {
          name: 'Dr. Rekha Sharma',
          email: 'rekha.sharma@university.edu',
          department: 'Sanskrit Jyotirvigyan Ved'
        },
        guidance: [
          'Approach the subject with cultural sensitivity and respect',
          'Use multiple sources and perspectives in research',
          'Interview practitioners and scholars for insights',
          'Balance historical accuracy with cultural appreciation'
        ]
      },
      {
        id: 'jyotirvigyan-awareness-workshop',
        name: 'Teaching & Workshop: Jyotirvigyan Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on Jyotirvigyan (Vedic astrology) principles, astronomical foundations, and applications of data science in traditional knowledge.',
        objectives: [
          'Understand basic principles of Jyotirvigyan',
          'Learn about astronomical foundations of Vedic astrology',
          'Explore the cultural and historical significance',
          'Discover modern data science applications',
          'Develop appreciation for traditional knowledge systems'
        ],
        tools: ['Educational Materials', 'Astronomical Software', 'Cultural Resources', 'Data Analysis Tools', 'Interactive Demonstrations'],
        facultyGuide: {
          name: 'Dr. Vijay Kumar',
          email: 'vijay.kumar@university.edu',
          department: 'Sanskrit Jyotirvigyan Ved'
        },
        guidance: [
          'Approach traditional knowledge with open mind and respect',
          'Learn basic astronomical concepts and calculations',
          'Understand cultural context and significance',
          'Explore connections between ancient wisdom and modern science'
        ]
      }
    ]
  },
  {
    id: 'engineering-technology',
    name: 'Engineering & Technology',
    icon: '⚙️',
    color: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    projects: [
      {
        id: 'smart-campus-iot',
        name: 'Smart Campus IoT Project',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop comprehensive IoT systems for smart campus management, including energy monitoring, security, and facility management.',
        objectives: [
          'Design and deploy IoT sensor networks across campus',
          'Implement energy monitoring and optimization systems',
          'Create security and access control systems',
          'Develop facility management and maintenance tracking',
          'Build centralized monitoring and control dashboards'
        ],
        tools: ['IoT Devices', 'Sensors', 'Microcontrollers', 'Wireless Communication', 'Cloud Platforms', 'Mobile Apps'],
        facultyGuide: {
          name: 'Dr. Vikram Singh',
          email: 'vikram.singh@university.edu',
          department: 'Engineering & Technology'
        },
        guidance: [
          'Start with pilot implementations in specific areas',
          'Focus on scalability and system integration',
          'Consider security and privacy in IoT deployments',
          'Test system reliability and maintenance requirements'
        ]
      },
      {
        id: 'robotics-implementation',
        name: 'Robotics Implementation',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Design and build robotic systems for various applications such as automation, assistance, or educational purposes.',
        objectives: [
          'Design robotic systems for specific applications',
          'Implement mechanical, electrical, and software components',
          'Program robot behavior and autonomous functions',
          'Test robot performance and safety features',
          'Evaluate practical applications and user interaction'
        ],
        tools: ['Robotics Kits', 'Microcontrollers', 'Sensors', 'Actuators', 'Programming Languages', '3D Printing'],
        facultyGuide: {
          name: 'Dr. Priya Nair',
          email: 'priya.nair@university.edu',
          department: 'Engineering & Technology'
        },
        guidance: [
          'Start with clear requirements and use cases',
          'Focus on safety and reliability in robot design',
          'Test extensively in controlled environments',
          'Consider user interaction and interface design'
        ]
      },
      {
        id: 'ai-traffic-management',
        name: 'AI-based Traffic Management',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Develop AI-powered traffic management systems for optimizing traffic flow, reducing congestion, and improving transportation efficiency.',
        objectives: [
          'Analyze traffic patterns and congestion data',
          'Develop AI algorithms for traffic optimization',
          'Implement real-time traffic monitoring systems',
          'Create adaptive traffic signal control systems',
          'Test system effectiveness in simulation and real environments'
        ],
        tools: ['Computer Vision', 'Machine Learning', 'Traffic Simulation', 'Sensor Networks', 'Data Analytics', 'Control Systems'],
        facultyGuide: {
          name: 'Dr. Arun Kumar',
          email: 'arun.kumar@university.edu',
          department: 'Engineering & Technology'
        },
        guidance: [
          'Study existing traffic management systems and challenges',
          'Use real traffic data for algorithm training and validation',
          'Consider safety and reliability in system design',
          'Test with traffic simulation before real-world deployment'
        ]
      },
      {
        id: 'robotics-awareness-workshop',
        name: 'Teaching & Workshop: Robotics Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on robotics fundamentals, applications, and hands-on experience with building and programming simple robots.',
        objectives: [
          'Understand robotics principles and applications',
          'Learn basic robot construction and programming',
          'Explore different types of robots and their uses',
          'Practice hands-on robot building and testing',
          'Develop interest in robotics and automation'
        ],
        tools: ['Robotics Kits', 'Programming Software', 'Construction Materials', 'Educational Resources', 'Demonstration Robots'],
        facultyGuide: {
          name: 'Dr. Sunita Reddy',
          email: 'sunita.reddy@university.edu',
          department: 'Engineering & Technology'
        },
        guidance: [
          'Start with simple robot construction and programming',
          'Learn through hands-on experimentation and testing',
          'Collaborate with peers on robot building projects',
          'Explore creative applications and problem-solving with robots'
        ]
      }
    ]
  },
  {
    id: 'zoology-biotechnology',
    name: 'Zoology & Biotechnology',
    icon: '🧬',
    color: 'bg-teal-100 hover:bg-teal-200 text-teal-800',
    projects: [
      {
        id: 'dna-barcoding-project',
        name: 'DNA Barcoding Project',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Use DNA barcoding techniques to identify and classify animal species, contributing to biodiversity research and conservation efforts.',
        objectives: [
          'Collect animal samples for DNA analysis',
          'Extract and amplify DNA using PCR techniques',
          'Sequence DNA barcodes for species identification',
          'Compare sequences with existing databases',
          'Contribute to biodiversity mapping and conservation'
        ],
        tools: ['DNA Extraction Kits', 'PCR Equipment', 'Sequencing Technology', 'Bioinformatics Software', 'Microscopy'],
        facultyGuide: {
          name: 'Dr. Ravi Patel',
          email: 'ravi.patel@university.edu',
          department: 'Zoology & Biotechnology'
        },
        guidance: [
          'Follow proper protocols for sample collection and preservation',
          'Maintain sterile conditions during DNA extraction',
          'Validate results with morphological identification',
          'Contribute data to global biodiversity databases'
        ]
      },
      {
        id: 'climate-change-animals-impact',
        name: 'Climate Change Impact on Animals',
        type: 'research',
        difficulty: 'Advanced',
        duration: '4-5 months',
        description: 'Study the effects of climate change on animal populations, behavior, and ecosystems, developing conservation strategies.',
        objectives: [
          'Monitor animal population changes over time',
          'Study behavioral adaptations to climate change',
          'Analyze habitat loss and ecosystem disruption',
          'Model future impacts under different climate scenarios',
          'Develop conservation and mitigation strategies'
        ],
        tools: ['Field Research Equipment', 'Climate Data', 'Population Monitoring Tools', 'GIS Software', 'Statistical Analysis'],
        facultyGuide: {
          name: 'Dr. Sunita Agarwal',
          email: 'sunita.agarwal@university.edu',
          department: 'Zoology & Biotechnology'
        },
        guidance: [
          'Use long-term datasets for trend analysis',
          'Consider multiple species and ecosystem types',
          'Collaborate with climate scientists and ecologists',
          'Focus on actionable conservation recommendations'
        ]
      },
      {
        id: 'genetic-bioinformatics-research',
        name: 'Genetic Bioinformatics Research',
        type: 'technical',
        difficulty: 'Advanced',
        duration: '5-6 months',
        description: 'Apply bioinformatics tools and techniques to analyze genetic data, study evolutionary relationships, and understand genetic diversity.',
        objectives: [
          'Analyze genetic sequences using bioinformatics tools',
          'Study evolutionary relationships and phylogeny',
          'Investigate genetic diversity and population genetics',
          'Identify genetic markers and functional elements',
          'Develop computational methods for genetic analysis'
        ],
        tools: ['Bioinformatics Software', 'Sequence Databases', 'Phylogenetic Tools', 'Statistical Software', 'Programming Languages'],
        facultyGuide: {
          name: 'Dr. Amit Sharma',
          email: 'amit.sharma@university.edu',
          department: 'Zoology & Biotechnology'
        },
        guidance: [
          'Learn bioinformatics tools and databases thoroughly',
          'Validate computational results with biological knowledge',
          'Collaborate with geneticists and molecular biologists',
          'Focus on biologically meaningful interpretations'
        ]
      },
      {
        id: 'biodiversity-awareness-workshop',
        name: 'Teaching & Workshop: Biodiversity Awareness',
        type: 'workshop',
        difficulty: 'Beginner',
        duration: '2-3 weeks',
        description: 'Educational workshop on biodiversity conservation, biotechnology applications, and the importance of protecting animal species and ecosystems.',
        objectives: [
          'Understand the importance of biodiversity conservation',
          'Learn about threats to animal species and ecosystems',
          'Explore biotechnology applications in conservation',
          'Develop awareness of conservation strategies',
          'Create personal action plans for biodiversity protection'
        ],
        tools: ['Educational Materials', 'Field Guides', 'Conservation Resources', 'Interactive Activities', 'Assessment Tools'],
        facultyGuide: {
          name: 'Dr. Priya Singh',
          email: 'priya.singh@university.edu',
          department: 'Zoology & Biotechnology'
        },
        guidance: [
          'Participate actively in field activities and observations',
          'Learn to identify local animal species and their habitats',
          'Understand connections between human activities and biodiversity',
          'Develop personal commitment to conservation actions'
        ]
      }
    ]
  }
];

// src/data/mockData.ts

// Mock submitted projects with PDF files
export let submittedProjects: Submission[] = [
  {
    id: 'sub-001',
    studentId: 'student-001',
    studentName: 'Tanu Sharma',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    title: 'AI Chatbot Development for Student Support',
    description: 'Developed an intelligent chatbot using natural language processing to assist students with academic queries, course information, and general support. The system uses machine learning algorithms to improve response accuracy over time.',
    facultyName: 'Dr. Priya Singh',
    fileName: 'AI_Chatbot_Project_Tanu_Sharma.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-01-15T10:30:00Z',
    status: 'approved' as const,
    feedback: 'Excellent implementation of NLP concepts. The chatbot shows good understanding of context and provides relevant responses. Well-documented code and comprehensive testing.',
    examinerComments: 'Strong technical implementation with good user interface design. Demonstrates solid understanding of AI concepts.',
    vivaMarks: 85,
    totalScore: 88,
    paymentStatus: 'paid' as const,
    category: 'AI & Machine Learning',
    degree: 'BSc CS'
  },
  {
    id: 'sub-002',
    studentId: 'student-002',
    studentName: 'Raj Patel',
    rollNumber: 'BOT2021002',
    department: 'Botany',
    title: 'Medicinal Plant Survey and Documentation',
    description: 'Comprehensive survey of medicinal plants in the local region, documenting their properties, traditional uses, and potential pharmaceutical applications. Includes detailed botanical analysis and chemical composition studies.',
    facultyName: 'Dr. Meera Gupta',
    fileName: 'Medicinal_Plants_Survey_Raj_Patel.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-01-20T14:15:00Z',
    status: 'approved' as const,
    feedback: 'Thorough research with excellent field work. The documentation is comprehensive and the analysis of medicinal properties is well-researched. Good use of botanical classification.',
    examinerComments: 'Impressive field work and documentation. Shows deep understanding of plant biology and medicinal applications.',
    vivaMarks: 82,
    totalScore: 85,
    paymentStatus: 'paid' as const,
    category: 'Research Project',
    degree: 'BSc Botany'
  },
  {
    id: 'sub-003',
    studentId: 'student-003',
    studentName: 'Shakshi Verma',
    rollNumber: 'CHEM2021003',
    department: 'Chemistry',
    title: 'Biodegradable Plastics Development',
    description: 'Research and development of biodegradable plastic alternatives using natural polymers. Conducted extensive testing for durability, decomposition rates, and environmental impact assessment.',
    facultyName: 'Dr. Amit Kumar',
    fileName: 'Biodegradable_Plastics_Shakshi_Verma.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-01-25T09:45:00Z',
    status: 'pending' as const,
    feedback: '',
    examinerComments: '',
    vivaMarks: undefined,
    totalScore: undefined,
    paymentStatus: 'paid' as const,
    category: 'Research Project',
    degree: 'BSc Chemistry'
  },
  {
    id: 'sub-004',
    studentId: 'student-004',
    studentName: 'Veer Singh',
    rollNumber: 'ECO2021004',
    department: 'Economics',
    title: 'Impact of Digital Payments on Local Economy',
    description: 'Comprehensive analysis of how digital payment systems have affected local businesses and consumer behavior. Includes statistical analysis of transaction patterns and economic impact assessment.',
    facultyName: 'Dr. Sunita Rao',
    fileName: 'Digital_Payments_Impact_Veer_Singh.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-02-01T16:20:00Z',
    status: 'approved' as const,
    feedback: 'Well-structured economic analysis with good use of statistical methods. The research methodology is sound and conclusions are well-supported by data.',
    examinerComments: 'Strong analytical skills demonstrated. Good understanding of economic principles and their practical applications.',
    vivaMarks: 78,
    totalScore: 81,
    paymentStatus: 'paid' as const,
    category: 'Research Project',
    degree: 'BA Economics'
  },
  {
    id: 'sub-005',
    studentId: 'student-005',
    studentName: 'Shifa Khan',
    rollNumber: 'ENV2021005',
    department: 'Environment Science',
    title: 'Air and Water Quality Testing Project',
    description: 'Systematic monitoring and analysis of air and water quality in urban areas. Implemented testing protocols, collected samples, and analyzed pollution levels with recommendations for improvement.',
    facultyName: 'Dr. Rajesh Sharma',
    fileName: 'Air_Water_Quality_Testing_Shifa_Khan.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-02-05T11:30:00Z',
    status: 'rejected' as const,
    feedback: 'The project shows good effort in data collection, but the analysis needs improvement. Please provide more detailed statistical analysis and clearer conclusions. Resubmission recommended.',
    examinerComments: 'Good field work but analysis could be more thorough. Needs better interpretation of results.',
    vivaMarks: 65,
    totalScore: 68,
    paymentStatus: 'paid' as const,
    category: 'Research Project',
    degree: 'BSc Environmental Science'
  }
];

// Update the existing submissions array to use the new submittedProjects
export const submissions = submittedProjects;

// Function to add new submission
export const addSubmission = (submission: Omit<Submission, 'id'>) => {
  const newSubmission: Submission = {
    ...submission,
    id: `sub-${Date.now()}`,
  };
  submittedProjects.push(newSubmission);
  return newSubmission;
};

// Function to update submission status
export const updateSubmissionStatus = (id: string, status: 'pending' | 'approved' | 'rejected', feedback?: string, examinerComments?: string, vivaMarks?: number) => {
  const submissionIndex = submittedProjects.findIndex(s => s.id === id);
  if (submissionIndex !== -1) {
    submittedProjects[submissionIndex] = {
      ...submittedProjects[submissionIndex],
      status,
      feedback: feedback || submittedProjects[submissionIndex].feedback,
      examinerComments: examinerComments || submittedProjects[submissionIndex].examinerComments,
      vivaMarks: vivaMarks || submittedProjects[submissionIndex].vivaMarks,
      totalScore: vivaMarks ? Math.round(vivaMarks * 1.05) : submittedProjects[submissionIndex].totalScore
    };
  }
};

// Function to get submissions by department (for examiners)
export const getSubmissionsByDepartment = (department: string) => {
  return submittedProjects.filter(s => s.department === department);
};

// Function to get submissions by student
export const getSubmissionsByStudent = (studentId: string) => {
  return submittedProjects.filter(s => s.studentId === studentId);
};

// Update students array to include the mock students
export const students: Student[] = [
  {
    id: 'student-001',
    username: 'tanu2021',
    role: 'student' as const,
    name: 'Tanu Sharma',
    email: 'tanu.sharma@university.edu',
    department: 'Computer Science',
    rollNumber: 'CS2021001',
    college: 'University College of Science',
    course: 'Bachelor of Science',
    year: 3,
    paymentStatus: 'paid' as const,
    paymentDate: '2024-01-10',
    totalScore: 88,
    degree: 'BSc CS'
  },
  {
    id: 'student-002',
    username: 'raj2021',
    role: 'student' as const,
    name: 'Raj Patel',
    email: 'raj.patel@university.edu',
    department: 'Botany',
    rollNumber: 'BOT2021002',
    college: 'University College of Science',
    course: 'Bachelor of Science',
    year: 3,
    paymentStatus: 'paid' as const,
    paymentDate: '2024-01-15',
    totalScore: 85,
    degree: 'BSc Botany'
  },
  {
    id: 'student-003',
    username: 'shakshi2021',
    role: 'student' as const,
    name: 'Shakshi Verma',
    email: 'shakshi.verma@university.edu',
    department: 'Chemistry',
    rollNumber: 'CHEM2021003',
    college: 'University College of Science',
    course: 'Bachelor of Science',
    year: 3,
    paymentStatus: 'paid' as const,
    paymentDate: '2024-01-20',
    totalScore: undefined,
    degree: 'BSc Chemistry'
  },
  {
    id: 'student-004',
    username: 'veer2021',
    role: 'student' as const,
    name: 'Veer Singh',
    email: 'veer.singh@university.edu',
    department: 'Economics',
    rollNumber: 'ECO2021004',
    college: 'University College of Arts',
    course: 'Bachelor of Arts',
    year: 3,
    paymentStatus: 'paid' as const,
    paymentDate: '2024-01-25',
    totalScore: 81,
    degree: 'BA Economics'
  },
];

// Update analytics to use live data
export const getAnalyticsData = () => {
  // Calculate analytics based on actual submissions and students
  const degreeStats = degrees.map(degree => {
    const degreeStudents = students.filter(s => s.degree === degree.shortName);
    const degreeSubmissions = submittedProjects.filter(s => s.degree === degree.shortName);
    const approvedSubmissions = degreeSubmissions.filter(s => s.status === 'approved');
    const pendingSubmissions = degreeSubmissions.filter(s => s.status === 'pending');
    
    return {
      degree: degree.shortName,
      total: degreeStudents.length,
      submitted: degreeSubmissions.length,
      approved: approvedSubmissions.length,
      pending: pendingSubmissions.length,
      percentage: degreeStudents.length > 0 ? Math.round((degreeSubmissions.length / degreeStudents.length) * 100) : 0
    };
  });
  
  return degreeStats;
};

// Topic Cards for the new UI
export const topicCards = departmentFolders.map(dept => ({
  id: dept.id,
  title: dept.name,
  icon: dept.icon,
  description: `Explore ${dept.projects.length} projects in ${dept.name}`,
  color: dept.color,
  projects: dept.projects
}));

// Generate students for each degree
export const generateStudentsForDegree = (degreeName: string, count: number = 50): Student[] => {
  const students: Student[] = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 1; i <= count; i++) {
    const rollNumber = `${degreeName.replace(/\s+/g, '').toUpperCase()}${currentYear}${String(i).padStart(3, '0')}`;
    const student: Student = {
      id: `${degreeName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      username: `student${i}`,
      role: 'student',
      name: `Student ${i} ${degreeName}`,
      email: `student${i}.${degreeName.toLowerCase().replace(/\s+/g, '')}@university.edu`,
      college: 'Main Campus',
      course: degreeName,
      year: Math.floor(Math.random() * 4) + 1,
      department: degreeName,
      rollNumber: rollNumber,
      paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
      degree: degreeName
    };
    students.push(student);
  }
  
  return students;
};

// Student submission tracking
export const studentSubmissions: { [studentId: string]: StudentSubmissionStatus } = {};

export const getStudentSubmissionStatus = (studentId: string): StudentSubmissionStatus | undefined => {
  return studentSubmissions[studentId];
};

  // For demo purposes, return Computer Science students for Mrs. Ekta Bisht
  const csStudents = [
    {
      id: 'student1',
      name: 'Tanu Sharma',
      rollNumber: 'CS2021001',
      department: 'Computer Science',
      assignedProject: 'Cybersecurity Awareness Project',
      status: 'Pending Viva'
    },
    {
      id: 'student2', 
      name: 'Raj Patel',
      rollNumber: 'CS2021002',
      department: 'Computer Science',
      assignedProject: 'Cybersecurity Awareness Project',
      status: 'Pending Viva'
    },
    {
      id: 'student3',
      name: 'Shakshi Verma', 
      rollNumber: 'CS2021003',
      department: 'Computer Science',
      assignedProject: 'Cybersecurity Awareness Project',
      status: 'Pending Viva'
    }
  ];
  
  return csStudents;

    
    workshop: 'Teaching & Workshop: Sustainable Farming Practices and Agri-Tech Awareness'
  },
  {
    id: 'ancient-history',
    name: 'Ancient History',
    shortName: 'History',
    topics: [],
    projects: [
      'Digital Archiving with GIS and 3D Models',
      'Oral History Documentation',
      'AI-based Text Recognition for Ancient Scripts'
    ],
    workshop: 'Teaching & Workshop: Heritage Awareness and Digital History Tools'
  },
  {
    id: 'botany',
    name: 'Botany',
    shortName: 'Botany',
    topics: [],
    projects: [
      'Medicinal Plant Survey & Phytochemical Screening',
      'Plant Tissue Culture',
      'Climate Impact on Flora'
    ],
    workshop: 'Teaching & Workshop: Awareness of Medicinal Plants and Lab Techniques'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    topics: [],
    projects: [
      'Biodegradable Plastic Synthesis',
      'Water Purification with Nano-materials',
      'Green Catalysts'
    ],
    workshop: 'Teaching & Workshop: Green Chemistry and Modern Lab Safety'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    shortName: 'Commerce',
    topics: [],
    projects: [
      'Consumer Behavior in E-Commerce',
      'FinTech Adoption',
      'Digital Marketing Analytics'
    ],
    workshop: 'Teaching & Workshop: Financial Literacy and Digital Business Skills'
  }
];

export const payments: Payment[] = [];

  export const notifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Project Submission Deadline Extended',
    message: 'The final project submission deadline has been extended to May 20th, 2024. Payment of ₹50 is mandatory before submission.',
    type: 'deadline',
    targetRole: 'student',
    isImportant: true,
    createdDate: '2024-01-25',
    isActive: true
  },
  {
    id: 'notif2',
    title: 'Payment Gateway Now Active',
    message: 'Students can now make payments of ₹50 for project submissions. Payment is required before uploading projects.',
    type: 'payment',
    targetRole: 'student',
    isImportant: true,
    createdDate: '2024-01-22',
    isActive: true
  }
];

// 👇 Instead of referencing `notifications`, make a separate export
export const adminNotifications: Notification[] = [
  {
    id: 'adminNotif1',
    title: 'Faculty Meeting Scheduled',
    message: 'All examiners are requested to attend the faculty meeting on May 5th, 2024.',
    type: 'meeting',
    targetRole: 'admin',
    isImportant: true,
    createdDate: '2024-01-20',
    isActive: true
  },
  {
    id: 'adminNotif2',
    title: 'Evaluation Deadline',
    message: 'Examiners must submit all project evaluations by May 25th, 2024.',
    type: 'deadline',
    targetRole: 'admin',
    isImportant: true,
    createdDate: '2024-01-18',
    isActive: true
  }
];

// Helper functions
export const getDepartmentTopics = (departmentId: string): ProjectTopic[] => {
  const department = departments.find(d => d.id === departmentId);
  return department ? department.topics : [];
};

export const getStudentPaymentStatus = (studentId: string): 'pending' | 'paid' => {
  const student = students.find(s => s.id === studentId);
  return student ? student.paymentStatus : 'pending';
};

export const updatePaymentStatus = (studentId: string, status: 'paid' | 'pending') => {
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.paymentStatus = status;
    if (status === 'paid') {
      student.paymentDate = new Date().toISOString();
    }
  }
};

export const getStudentSubmissions = (studentId: string): Submission[] => {
  return submissions.filter(s => s.studentId === studentId);
};

export const addEvaluationRecord = (examinerId: string, record: Omit<EvaluationRecord, 'id'>) => {
  const examiner = examiners.find(e => e.id === examinerId);
  if (examiner) {
    const newRecord: EvaluationRecord = {
      ...record,
      id: Date.now().toString()
    };
    examiner.evaluationHistory.push(newRecord);
    
    // Update submission with viva marks
    const submission = submissions.find(s => s.studentId === record.studentId);
    if (submission) {
      submission.vivaMarks = record.vivaMarks;
      submission.examinerComments = record.comments;
      submission.totalScore = record.vivaMarks; // Can be enhanced with other components
    }
    
    return newRecord;
  }
  return null;
};