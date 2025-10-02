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

export const students: Student[] = [
  {
    id: '1',
    username: 'tanu',
    role: 'student',
    name: 'Tanu Singh',
    email: 'tanu@university.edu',
    college: 'Main Campus',
    course: 'Computer Science',
    year: 3,
    department: 'Computer Science',
    rollNumber: 'CS2021001',
    paymentStatus: 'pending'
  }
];

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

export const departments: Department[] = [
  {
    id: 'agriculture-science',
    name: 'Agriculture Science',
    shortName: 'Agriculture Science',
    topics: [
      {
        id: 'precision-farming',
        title: 'Precision Farming with IoT Sensors',
        description: 'Implement IoT sensors for monitoring soil moisture, temperature, and nutrient levels to optimize crop yield.',
        department: 'Agriculture Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['IoT hardware setup', 'Data collection', 'Analysis report']
      },
      {
        id: 'organic-fertilizer',
        title: 'Organic Fertilizer Impact Study',
        description: 'Study the effectiveness of organic fertilizers on crop growth compared to chemical alternatives.',
        department: 'Agriculture Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Field experiments', 'Soil testing', 'Comparative analysis']
      },
      {
        id: 'drone-crop-monitoring',
        title: 'Drone-based Crop Health Monitoring',
        description: 'Use drone technology and image analysis to monitor crop health and detect diseases early.',
        department: 'Agriculture Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Drone operation', 'Image processing', 'Health assessment']
      },
      {
        id: 'sustainable-farming-workshop',
        title: 'Teaching & Workshop: Sustainable Farming Practices and Agri-Tech Awareness',
        description: 'Conduct workshops on sustainable farming practices and modern agricultural technology awareness.',
        department: 'Agriculture Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Workshop planning', 'Community engagement', 'Educational materials']
      }
    ]
  },
  {
    id: 'ancient-history',
    name: 'Ancient History',
    shortName: 'Ancient History',
    topics: [
      {
        id: 'digital-archiving-gis',
        title: 'Digital Archiving with GIS and 3D Models',
        description: 'Create digital archives of historical sites using GIS mapping and 3D modeling techniques.',
        department: 'Ancient History',
        type: 'field-based',
        duration: '4 months',
        requirements: ['GIS software', '3D modeling', 'Digital documentation']
      },
      {
        id: 'oral-history-documentation',
        title: 'Oral History Project',
        description: 'Document and preserve oral histories from elderly community members and local historians.',
        department: 'Ancient History',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Interviews', 'Audio recording', 'Transcription']
      },
      {
        id: 'ai-text-recognition',
        title: 'AI-based Text Recognition for Ancient Scripts',
        description: 'Develop AI models to recognize and digitize ancient scripts and manuscripts.',
        department: 'Ancient History',
        type: 'field-based',
        duration: '3 months',
        requirements: ['AI/ML knowledge', 'Script analysis', 'Digital processing']
      },
      {
        id: 'heritage-awareness-workshop',
        title: 'Teaching & Workshop: Heritage Awareness and Digital History Tools',
        description: 'Conduct workshops on cultural heritage awareness and modern digital history tools.',
        department: 'Ancient History',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Workshop design', 'Digital tools training', 'Heritage education']
      }
    ]
  },
  {
    id: 'botany',
    name: 'Botany',
    shortName: 'Botany',
    topics: [
      {
        id: 'medicinal-plant-survey',
        title: 'Medicinal Plant Survey & Phytochemical Screening',
        description: 'Conduct comprehensive survey of medicinal plants and perform phytochemical analysis.',
        department: 'Botany',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Field survey', 'Lab analysis', 'Chemical screening']
      },
      {
        id: 'plant-tissue-culture',
        title: 'Plant Tissue Culture',
        description: 'Develop plant tissue culture techniques for rapid propagation of important plant species.',
        department: 'Botany',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Sterile techniques', 'Culture media preparation', 'Growth monitoring']
      },
      {
        id: 'climate-impact-flora',
        title: 'Climate Impact on Flora',
        description: 'Study the effects of climate change on local plant species and biodiversity.',
        department: 'Botany',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Climate data analysis', 'Species monitoring', 'Impact assessment']
      },
      {
        id: 'medicinal-plants-workshop',
        title: 'Teaching & Workshop: Awareness of Medicinal Plants and Lab Techniques',
        description: 'Conduct workshops on medicinal plant awareness and modern laboratory techniques.',
        department: 'Botany',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Educational content', 'Lab demonstrations', 'Community outreach']
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    topics: [
      {
        id: 'biodegradable-plastic',
        title: 'Biodegradable Plastic Synthesis',
        description: 'Synthesize and test biodegradable plastics from natural polymers.',
        department: 'Chemistry',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Polymer synthesis', 'Biodegradability testing', 'Material characterization']
      },
      {
        id: 'water-purification-nano',
        title: 'Water Purification with Nano-materials',
        description: 'Develop water purification systems using nanomaterials and test their efficiency.',
        department: 'Chemistry',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Nanomaterial synthesis', 'Purification testing', 'Efficiency analysis']
      },
      {
        id: 'green-catalysts',
        title: 'Green Catalysts',
        description: 'Develop environmentally friendly catalysts for chemical reactions.',
        department: 'Chemistry',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Catalyst synthesis', 'Reaction testing', 'Environmental impact assessment']
      },
      {
        id: 'green-chemistry-workshop',
        title: 'Teaching & Workshop: Green Chemistry and Modern Lab Safety',
        description: 'Conduct workshops on green chemistry principles and modern laboratory safety practices.',
        department: 'Chemistry',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Safety protocols', 'Green chemistry education', 'Lab demonstrations']
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    shortName: 'Commerce',
    topics: [
      {
        id: 'consumer-behavior-ecommerce',
        title: 'Consumer Behavior in E-Commerce',
        description: 'Analyze consumer behavior patterns in e-commerce platforms and digital marketplaces.',
        department: 'Commerce',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Data collection', 'Behavioral analysis', 'Market research']
      },
      {
        id: 'fintech-adoption',
        title: 'FinTech Adoption',
        description: 'Study the adoption and impact of financial technology solutions in local markets.',
        department: 'Commerce',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Technology assessment', 'User surveys', 'Adoption analysis']
      },
      {
        id: 'digital-marketing-analytics',
        title: 'Digital Marketing Analytics',
        description: 'Analyze digital marketing campaigns and their effectiveness using data analytics.',
        department: 'Commerce',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Analytics tools', 'Campaign analysis', 'Performance metrics']
      },
      {
        id: 'financial-literacy-workshop',
        title: 'Teaching & Workshop: Financial Literacy and Digital Business Skills',
        description: 'Conduct workshops on financial literacy and modern digital business skills.',
        department: 'Commerce',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Financial education', 'Digital skills training', 'Business awareness']
      }
    ]
  },
  {
    id: 'earth-science',
    name: 'Earth Science',
    shortName: 'Earth Science',
    topics: [
      {
        id: 'groundwater-mapping',
        title: 'Groundwater Mapping',
        description: 'Create detailed groundwater maps using GIS and geological survey techniques.',
        department: 'Earth Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['GIS mapping', 'Geological surveys', 'Water table analysis']
      },
      {
        id: 'earthquake-risk-modeling',
        title: 'Earthquake Risk Modeling',
        description: 'Develop earthquake risk models for local regions using seismic data analysis.',
        department: 'Earth Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Seismic data analysis', 'Risk modeling', 'Geological assessment']
      },
      {
        id: 'soil-erosion-mapping',
        title: 'Soil Erosion Mapping',
        description: 'Map and analyze soil erosion patterns using satellite imagery and field studies.',
        department: 'Earth Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Satellite imagery', 'Field surveys', 'Erosion analysis']
      },
      {
        id: 'disaster-preparedness-workshop',
        title: 'Teaching & Workshop: Disaster Preparedness and Earth Science Awareness',
        description: 'Conduct workshops on disaster preparedness and earth science awareness.',
        department: 'Earth Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Disaster education', 'Preparedness training', 'Community awareness']
      }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    shortName: 'Economics',
    topics: [
      {
        id: 'digital-payment-impact',
        title: 'Digital Payment Impact',
        description: 'Study the economic impact of digital payment systems on local businesses and consumers.',
        department: 'Economics',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Economic surveys', 'Data analysis', 'Impact assessment']
      },
      {
        id: 'inflation-impact-study',
        title: 'Inflation Impact Study',
        description: 'Analyze the impact of inflation on different economic sectors and consumer behavior.',
        department: 'Economics',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Economic data collection', 'Statistical analysis', 'Sector comparison']
      },
      {
        id: 'microfinance-effectiveness',
        title: 'Microfinance Effectiveness',
        description: 'Evaluate the effectiveness of microfinance institutions in rural economic development.',
        department: 'Economics',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Field surveys', 'Financial analysis', 'Development assessment']
      },
      {
        id: 'economic-awareness-workshop',
        title: 'Teaching & Workshop: Economic Awareness and Data-Driven Decision Making',
        description: 'Conduct workshops on economic awareness and data-driven decision making.',
        department: 'Economics',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Economic education', 'Data analysis training', 'Decision-making tools']
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    shortName: 'English',
    topics: [
      {
        id: 'ai-textual-analysis',
        title: 'AI-Assisted Textual Analysis',
        description: 'Use AI tools to analyze literary texts for themes, sentiment, and linguistic patterns.',
        department: 'English',
        type: 'field-based',
        duration: '3 months',
        requirements: ['AI tools', 'Literary analysis', 'Data interpretation']
      },
      {
        id: 'shakespeare-adaptations',
        title: 'Shakespeare Adaptations',
        description: 'Study modern adaptations of Shakespeare works across different media and cultures.',
        department: 'English',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Comparative analysis', 'Media studies', 'Cultural research']
      },
      {
        id: 'sentiment-analysis-literature',
        title: 'Sentiment Analysis of Literature',
        description: 'Apply sentiment analysis techniques to study emotional patterns in literary works.',
        department: 'English',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Text processing', 'Sentiment tools', 'Literary interpretation']
      },
      {
        id: 'communication-skills-workshop',
        title: 'Teaching & Workshop: Communication Skills and AI Tools in Literature',
        description: 'Conduct workshops on communication skills and AI applications in literary studies.',
        department: 'English',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Communication training', 'AI tool demonstrations', 'Literary education']
      }
    ]
  },
  {
    id: 'environment-science',
    name: 'Environment Science',
    shortName: 'Environment Science',
    topics: [
      {
        id: 'air-water-quality-monitoring',
        title: 'Air & Water Quality Monitoring',
        description: 'Monitor and analyze air and water quality using modern sensing technologies.',
        department: 'Environment Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Environmental sensors', 'Data collection', 'Quality analysis']
      },
      {
        id: 'waste-recycling-study',
        title: 'Waste Recycling Study',
        description: 'Study waste recycling processes and develop improved recycling methodologies.',
        department: 'Environment Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Waste analysis', 'Recycling processes', 'Efficiency testing']
      },
      {
        id: 'renewable-energy-feasibility',
        title: 'Renewable Energy Feasibility',
        description: 'Assess the feasibility of renewable energy solutions for local communities.',
        department: 'Environment Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Energy assessment', 'Feasibility analysis', 'Community surveys']
      },
      {
        id: 'environmental-awareness-workshop',
        title: 'Teaching & Workshop: Environmental Awareness and Sustainable Practices',
        description: 'Conduct workshops on environmental awareness and sustainable living practices.',
        department: 'Environment Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Environmental education', 'Sustainability training', 'Community engagement']
      }
    ]
  },
  {
    id: 'forensic-science',
    name: 'Forensic Science',
    shortName: 'Forensic Science',
    topics: [
      {
        id: 'digital-forensics',
        title: 'Digital Forensics',
        description: 'Learn digital forensics techniques for investigating cybercrimes and data recovery.',
        department: 'Forensic Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Digital tools', 'Investigation techniques', 'Evidence analysis']
      },
      {
        id: 'crime-scene-reconstruction-vr',
        title: 'Crime Scene Reconstruction with VR',
        description: 'Use virtual reality technology to reconstruct and analyze crime scenes.',
        department: 'Forensic Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['VR technology', '3D modeling', 'Scene analysis']
      },
      {
        id: 'fingerprint-analysis',
        title: 'Fingerprint Analysis',
        description: 'Advanced fingerprint analysis techniques using modern identification systems.',
        department: 'Forensic Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Fingerprint systems', 'Pattern analysis', 'Database management']
      },
      {
        id: 'cyber-safety-workshop',
        title: 'Teaching & Workshop: Cyber Safety and Forensic Awareness',
        description: 'Conduct workshops on cyber safety and forensic science awareness.',
        department: 'Forensic Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Cyber safety education', 'Forensic demonstrations', 'Awareness campaigns']
      }
    ]
  },
  {
    id: 'indic-studies',
    name: 'Indic Studies',
    shortName: 'Indic Studies',
    topics: [
      {
        id: 'digitization-manuscripts',
        title: 'Digitization of Manuscripts',
        description: 'Digitize ancient manuscripts and create searchable digital archives.',
        department: 'Indic Studies',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Digital scanning', 'Archive creation', 'Metadata management']
      },
      {
        id: 'ai-cultural-data-mining',
        title: 'AI-based Cultural Data Mining',
        description: 'Use AI techniques to mine and analyze cultural data from historical texts.',
        department: 'Indic Studies',
        type: 'field-based',
        duration: '4 months',
        requirements: ['AI/ML tools', 'Text processing', 'Cultural analysis']
      },
      {
        id: 'comparative-literature-analysis',
        title: 'Comparative Literature Analysis',
        description: 'Comparative analysis of Indic literature across different periods and regions.',
        department: 'Indic Studies',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Literary research', 'Comparative methods', 'Historical context']
      },
      {
        id: 'cultural-heritage-workshop',
        title: 'Teaching & Workshop: Cultural Heritage and Indic Knowledge Awareness',
        description: 'Conduct workshops on cultural heritage preservation and Indic knowledge systems.',
        department: 'Indic Studies',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Heritage education', 'Knowledge preservation', 'Cultural awareness']
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Institute of Computer Science',
    shortName: 'Computer Science',
    topics: [
      {
        id: 'cybersecurity-threat-hunting',
        title: 'Cybersecurity Threat Hunting',
        description: 'Develop threat hunting capabilities and cybersecurity defense mechanisms.',
        department: 'Institute of Computer Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Security tools', 'Threat analysis', 'Defense strategies']
      },
      {
        id: 'ai-chatbot',
        title: 'AI Chatbot',
        description: 'Develop intelligent chatbots for customer service and information assistance.',
        department: 'Institute of Computer Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['AI/ML programming', 'Natural language processing', 'User interface design']
      },
      {
        id: 'blockchain-records',
        title: 'Blockchain Records',
        description: 'Implement blockchain technology for secure record keeping and verification.',
        department: 'Institute of Computer Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Blockchain development', 'Cryptography', 'System design']
      },
      {
        id: 'coding-cybersecurity-workshop',
        title: 'Teaching & Workshop: Coding, Cybersecurity, and AI for Beginners',
        description: 'Conduct workshops on basic coding, cybersecurity awareness, and AI concepts.',
        department: 'Institute of Computer Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Programming tutorials', 'Security education', 'AI demonstrations']
      }
    ]
  },
  {
    id: 'iips',
    name: 'International Institute of Professional Studies',
    shortName: 'IIPS',
    topics: [
      {
        id: 'career-recommendation-ai',
        title: 'Career Recommendation AI',
        description: 'Develop AI systems for personalized career recommendations based on skills and interests.',
        department: 'International Institute of Professional Studies',
        type: 'field-based',
        duration: '4 months',
        requirements: ['AI development', 'Career analysis', 'Recommendation algorithms']
      },
      {
        id: 'business-simulation-game',
        title: 'Business Simulation Game',
        description: 'Create interactive business simulation games for professional skill development.',
        department: 'International Institute of Professional Studies',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Game development', 'Business modeling', 'User experience design']
      },
      {
        id: 'ai-resume-screener',
        title: 'AI Resume Screener',
        description: 'Develop AI-powered resume screening systems for recruitment processes.',
        department: 'International Institute of Professional Studies',
        type: 'field-based',
        duration: '3 months',
        requirements: ['AI/ML development', 'Text processing', 'Recruitment analysis']
      },
      {
        id: 'professional-skills-workshop',
        title: 'Teaching & Workshop: Professional Skills and Technology Awareness',
        description: 'Conduct workshops on professional skills development and technology awareness.',
        department: 'International Institute of Professional Studies',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Skills training', 'Technology education', 'Professional development']
      }
    ]
  },
  {
    id: 'library-science',
    name: 'JNIBM Library and Information Science',
    shortName: 'Library Science',
    topics: [
      {
        id: 'smart-digital-library',
        title: 'Smart Digital Library',
        description: 'Develop smart digital library systems with AI-powered search and recommendation.',
        department: 'JNIBM Library and Information Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Digital systems', 'AI integration', 'User interface design']
      },
      {
        id: 'qr-based-access',
        title: 'QR-Based Access',
        description: 'Implement QR code-based access systems for library resources and services.',
        department: 'JNIBM Library and Information Science',
        type: 'field-based',
        duration: '2 months',
        requirements: ['QR technology', 'Access control', 'System integration']
      },
      {
        id: 'book-recommendation-ai',
        title: 'Book Recommendation AI',
        description: 'Create AI-powered book recommendation systems based on user preferences.',
        department: 'JNIBM Library and Information Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Recommendation algorithms', 'User profiling', 'Content analysis']
      },
      {
        id: 'digital-literacy-workshop',
        title: 'Teaching & Workshop: Digital Literacy and Smart Library Tools',
        description: 'Conduct workshops on digital literacy and modern library technology tools.',
        department: 'JNIBM Library and Information Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Digital education', 'Library tools training', 'Technology awareness']
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    shortName: 'Mathematics',
    topics: [
      {
        id: 'epidemic-spread-modeling',
        title: 'Epidemic Spread Modeling',
        description: 'Develop mathematical models to predict and analyze epidemic spread patterns.',
        department: 'Mathematics',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Mathematical modeling', 'Statistical analysis', 'Simulation software']
      },
      {
        id: 'cryptography',
        title: 'Cryptography',
        description: 'Study and implement advanced cryptographic algorithms for data security.',
        department: 'Mathematics',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Algorithm development', 'Security analysis', 'Implementation testing']
      },
      {
        id: 'machine-learning-math',
        title: 'Machine Learning Math',
        description: 'Explore the mathematical foundations of machine learning algorithms.',
        department: 'Mathematics',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Linear algebra', 'Statistics', 'Algorithm analysis']
      },
      {
        id: 'applied-math-workshop',
        title: 'Teaching & Workshop: Applied Math in Real-World Problems',
        description: 'Conduct workshops on applying mathematical concepts to solve real-world problems.',
        department: 'Mathematics',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Problem-solving techniques', 'Mathematical applications', 'Practical demonstrations']
      }
    ]
  },
  {
    id: 'microbiology-foodtech',
    name: 'Microbiology and Foodtech',
    shortName: 'Microbiology',
    topics: [
      {
        id: 'probiotic-food-development',
        title: 'Probiotic Food Development',
        description: 'Develop probiotic food products and test their health benefits.',
        department: 'Microbiology and Foodtech',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Microbial cultivation', 'Food processing', 'Health testing']
      },
      {
        id: 'antimicrobial-resistance-study',
        title: 'Antimicrobial Resistance Study',
        description: 'Study antimicrobial resistance patterns in local bacterial populations.',
        department: 'Microbiology and Foodtech',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Bacterial isolation', 'Resistance testing', 'Data analysis']
      },
      {
        id: 'ai-food-spoilage-detection',
        title: 'AI Food Spoilage Detection',
        description: 'Develop AI systems to detect food spoilage using image analysis.',
        department: 'Microbiology and Foodtech',
        type: 'field-based',
        duration: '3 months',
        requirements: ['AI/ML development', 'Image processing', 'Food analysis']
      },
      {
        id: 'food-safety-workshop',
        title: 'Teaching & Workshop: Food Safety and Microbiology Awareness',
        description: 'Conduct workshops on food safety practices and microbiology awareness.',
        department: 'Microbiology and Foodtech',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Food safety education', 'Microbiology demonstrations', 'Public health awareness']
      }
    ]
  },
  {
    id: 'political-science',
    name: 'Political Science',
    shortName: 'Political Science',
    topics: [
      {
        id: 'social-media-voting-study',
        title: 'Social Media & Voting Study',
        description: 'Analyze the influence of social media on voting behavior and political opinions.',
        department: 'Political Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Social media analysis', 'Survey research', 'Statistical analysis']
      },
      {
        id: 'public-opinion-survey',
        title: 'Public Opinion Survey',
        description: 'Conduct comprehensive public opinion surveys on current political issues.',
        department: 'Political Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Survey design', 'Data collection', 'Opinion analysis']
      },
      {
        id: 'policy-analysis',
        title: 'Policy Analysis',
        description: 'Analyze the effectiveness and impact of government policies on society.',
        department: 'Political Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Policy research', 'Impact assessment', 'Comparative analysis']
      },
      {
        id: 'democracy-awareness-workshop',
        title: 'Teaching & Workshop: Democracy Awareness and Political Technology',
        description: 'Conduct workshops on democratic processes and political technology applications.',
        department: 'Political Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Civic education', 'Technology demonstrations', 'Democratic awareness']
      }
    ]
  },
  {
    id: 'public-administration',
    name: 'Public Administration',
    shortName: 'Public Administration',
    topics: [
      {
        id: 'e-governance-dashboard',
        title: 'E-Governance Dashboard',
        description: 'Develop e-governance dashboards for transparent public service delivery.',
        department: 'Public Administration',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Dashboard development', 'Data visualization', 'User interface design']
      },
      {
        id: 'complaint-management',
        title: 'Complaint Management',
        description: 'Create digital complaint management systems for public grievance redressal.',
        department: 'Public Administration',
        type: 'field-based',
        duration: '3 months',
        requirements: ['System development', 'Workflow design', 'User experience']
      },
      {
        id: 'service-delivery-efficiency',
        title: 'Service Delivery Efficiency',
        description: 'Analyze and improve the efficiency of public service delivery systems.',
        department: 'Public Administration',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Efficiency analysis', 'Process improvement', 'Performance metrics']
      },
      {
        id: 'good-governance-workshop',
        title: 'Teaching & Workshop: Good Governance and Public Service Awareness',
        description: 'Conduct workshops on good governance principles and public service awareness.',
        department: 'Public Administration',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Governance education', 'Public service training', 'Civic awareness']
      }
    ]
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    shortName: 'Sanskrit',
    topics: [
      {
        id: 'neural-machine-translation',
        title: 'Neural Machine Translation',
        description: 'Develop neural machine translation systems for Sanskrit to modern languages.',
        department: 'Sanskrit',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Machine learning', 'Language processing', 'Translation algorithms']
      },
      {
        id: 'digital-sanskrit-dictionary',
        title: 'Digital Sanskrit Dictionary',
        description: 'Create comprehensive digital Sanskrit dictionaries with search capabilities.',
        department: 'Sanskrit',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Database design', 'Search algorithms', 'User interface']
      },
      {
        id: 'sanskrit-chatbot',
        title: 'Chatbot',
        description: 'Develop chatbots capable of understanding and responding in Sanskrit.',
        department: 'Sanskrit',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Natural language processing', 'Sanskrit linguistics', 'AI development']
      },
      {
        id: 'sanskrit-awareness-workshop',
        title: 'Teaching & Workshop: Sanskrit Awareness and Modern Computational Tools',
        description: 'Conduct workshops on Sanskrit language awareness and computational tools.',
        department: 'Sanskrit',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Language education', 'Technology demonstrations', 'Cultural awareness']
      }
    ]
  },
  {
    id: 'sanskrit-jyotirvigyan',
    name: 'Sanskrit Jyotirvigyan Ved',
    shortName: 'Jyotirvigyan',
    topics: [
      {
        id: 'astrological-data-analysis',
        title: 'Astrological Data Analysis',
        description: 'Analyze astrological data using modern statistical and computational methods.',
        department: 'Sanskrit Jyotirvigyan Ved',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Data analysis', 'Statistical methods', 'Astrological knowledge']
      },
      {
        id: 'ml-horoscope-trends',
        title: 'ML Horoscope Trends',
        description: 'Use machine learning to identify patterns and trends in horoscope data.',
        department: 'Sanskrit Jyotirvigyan Ved',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Machine learning', 'Pattern recognition', 'Data processing']
      },
      {
        id: 'cultural-study',
        title: 'Cultural Study',
        description: 'Study the cultural and historical significance of Jyotirvigyan in Indian tradition.',
        department: 'Sanskrit Jyotirvigyan Ved',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Cultural research', 'Historical analysis', 'Traditional knowledge']
      },
      {
        id: 'jyotirvigyan-awareness-workshop',
        title: 'Teaching & Workshop: Jyotirvigyan Awareness and Data Science Applications',
        description: 'Conduct workshops on Jyotirvigyan awareness and data science applications.',
        department: 'Sanskrit Jyotirvigyan Ved',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Traditional education', 'Data science training', 'Cultural awareness']
      }
    ]
  },
  {
    id: 'engineering-technology',
    name: 'School of Engineering And Technology',
    shortName: 'Engineering',
    topics: [
      {
        id: 'smart-campus-iot',
        title: 'Smart Campus IoT',
        description: 'Develop IoT solutions for creating smart campus infrastructure and management.',
        department: 'School of Engineering And Technology',
        type: 'field-based',
        duration: '4 months',
        requirements: ['IoT development', 'Sensor networks', 'System integration']
      },
      {
        id: 'robotics',
        title: 'Robotics',
        description: 'Design and build robots for specific applications like cleaning, delivery, or assistance.',
        department: 'School of Engineering And Technology',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Robotics programming', 'Hardware design', 'Control systems']
      },
      {
        id: 'ai-traffic-management',
        title: 'AI Traffic Management',
        description: 'Develop AI-powered traffic management systems for urban transportation.',
        department: 'School of Engineering And Technology',
        type: 'field-based',
        duration: '4 months',
        requirements: ['AI development', 'Traffic analysis', 'System optimization']
      },
      {
        id: 'robotics-iot-workshop',
        title: 'Teaching & Workshop: Robotics, IoT, and Smart Engineering Awareness',
        description: 'Conduct workshops on robotics, IoT, and smart engineering awareness.',
        department: 'School of Engineering And Technology',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Technology demonstrations', 'Engineering education', 'Innovation awareness']
      }
    ]
  },
  {
    id: 'zoology-biotech',
    name: 'Zoology and Biotech',
    shortName: 'Zoology',
    topics: [
      {
        id: 'dna-barcoding',
        title: 'DNA Barcoding',
        description: 'Use DNA barcoding techniques for species identification and biodiversity studies.',
        department: 'Zoology and Biotech',
        type: 'field-based',
        duration: '3 months',
        requirements: ['DNA extraction', 'PCR techniques', 'Sequence analysis']
      },
      {
        id: 'climate-impact-animals',
        title: 'Climate Impact on Animals',
        description: 'Study the impact of climate change on local animal populations and behavior.',
        department: 'Zoology and Biotech',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Field surveys', 'Behavioral studies', 'Climate data analysis']
      },
      {
        id: 'genetic-sequence-bioinformatics',
        title: 'Genetic Sequence Bioinformatics',
        description: 'Apply bioinformatics tools to analyze genetic sequences and evolutionary patterns.',
        department: 'Zoology and Biotech',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Bioinformatics software', 'Sequence analysis', 'Evolutionary studies']
      },
      {
        id: 'biodiversity-conservation-workshop',
        title: 'Teaching & Workshop: Biodiversity Conservation and Biotech Awareness',
        description: 'Conduct workshops on biodiversity conservation and biotechnology awareness.',
        department: 'Zoology and Biotech',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Conservation education', 'Biotech demonstrations', 'Environmental awareness']
      }
    ]
  }
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

export const updateProjectSubmission = (
  studentId: string, 
  topicId: string, 
  projectId: string, 
  fileData: { name: string; type: string; uploadDate: string }
) => {
  if (!studentSubmissions[studentId]) {
    studentSubmissions[studentId] = {
      studentId,
      topicSubmissions: {}
    };
  }
  
  const key = `${topicId}-${projectId}`;
  studentSubmissions[studentId].topicSubmissions[key] = {
    status: 'Submitted',
    uploadedFile: fileData,
    aiFeedback: []
  };
};

export const generateAIFeedback = (projectName: string, fileName: string): string[] => {
  const feedbackOptions = [
    `Great work on "${projectName}"! Consider adding more detailed methodology section.`,
    `Your project shows good understanding. Try to include more recent references and citations.`,
    `Excellent choice of topic. The analysis could benefit from additional data visualization.`,
    `Well-structured project. Consider expanding the conclusion with practical implications.`,
    `Good research approach. Adding case studies would strengthen your arguments.`,
    `Impressive work! Consider including a section on limitations and future scope.`
  ];
  
  const formatFeedback = [
    `File "${fileName}" is well-formatted. Ensure consistent font sizes throughout.`,
    `Document structure looks good. Consider adding page numbers and proper headers.`,
    `Good use of headings. Make sure all images have proper captions and references.`
  ];
  
  return [
    feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)],
    formatFeedback[Math.floor(Math.random() * formatFeedback.length)]
  ];
};

// Topic cards for student dashboard
export const topicCards = [
  {
    id: 'environmental-studies',
    title: 'Environmental Studies',
    description: 'Sustainability and conservation projects',
    icon: '🌱',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'waste-management',
        name: 'Waste Management Project',
        description: 'Develop sustainable waste management solutions for local communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on practical implementation', 'Include cost-benefit analysis'],
        guidance: ['Research current waste management practices', 'Identify key stakeholders', 'Propose innovative solutions']
      },
      {
        id: 'renewable-energy',
        name: 'Renewable Energy Assessment',
        description: 'Assess renewable energy potential in rural areas.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'renewable-energy-guidelines.pdf',
        comments: ['Consider multiple energy sources', 'Include feasibility study'],
        guidance: ['Study solar and wind potential', 'Analyze energy consumption patterns', 'Calculate return on investment']
      }
    ]
  },
  {
    id: 'public-health',
    title: 'Public Health',
    description: 'Community health and wellness initiatives',
    icon: '🏥',
    color: 'bg-red-100 hover:bg-red-200 text-red-800',
    projects: [
      {
        id: 'health-awareness',
        name: 'Health Awareness Campaign',
        description: 'Design and implement health awareness campaigns for rural communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Target specific health issues', 'Measure campaign effectiveness'],
        guidance: ['Identify priority health issues', 'Design engaging materials', 'Plan community outreach events']
      },
      {
        id: 'nutrition-study',
        name: 'Nutrition Assessment Study',
        description: 'Conduct nutritional assessment in local schools.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'nutrition-assessment-template.pdf',
        comments: ['Use standardized assessment tools', 'Include dietary recommendations'],
        guidance: ['Learn assessment techniques', 'Collect comprehensive data', 'Provide actionable recommendations']
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Sustainable farming and agricultural innovation',
    icon: '🌾',
    color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
    projects: [
      {
        id: 'organic-farming',
        name: 'Organic Farming Initiative',
        description: 'Promote organic farming practices among local farmers.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Document farmer feedback', 'Compare yield differences'],
        guidance: ['Research organic methods', 'Connect with local farmers', 'Monitor implementation progress']
      },
      {
        id: 'crop-monitoring',
        name: 'Smart Crop Monitoring',
        description: 'Implement IoT-based crop monitoring systems.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'iot-agriculture-guide.pdf',
        comments: ['Focus on cost-effective solutions', 'Include technical specifications'],
        guidance: ['Learn IoT basics', 'Design monitoring system', 'Test with real crops']
      }
    ]
  },
  {
    id: 'veterinary',
    title: 'Veterinary Hospital',
    description: 'Animal health and veterinary services',
    icon: '🐕',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    projects: [
      {
        id: 'animal-health-survey',
        name: 'Animal Health Survey',
        description: 'Conduct health surveys of livestock in rural areas.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include vaccination records', 'Document common diseases'],
        guidance: ['Learn basic veterinary assessment', 'Coordinate with local vets', 'Create health database']
      },
      {
        id: 'pet-care-awareness',
        name: 'Pet Care Awareness Program',
        description: 'Educate communities about proper pet care and hygiene.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'pet-care-guidelines.pdf',
        comments: ['Include practical demonstrations', 'Focus on preventive care'],
        guidance: ['Research pet care best practices', 'Prepare educational materials', 'Organize community sessions']
      }
    ]
  },
  {
    id: 'banking',
    title: 'Banking',
    description: 'Financial literacy and banking services',
    icon: '🏦',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    projects: [
      {
        id: 'financial-literacy',
        name: 'Financial Literacy Program',
        description: 'Conduct financial literacy workshops for rural communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use simple, practical examples', 'Include digital banking basics'],
        guidance: ['Understand basic financial concepts', 'Design interactive workshops', 'Create easy-to-understand materials']
      },
      {
        id: 'digital-banking',
        name: 'Digital Banking Adoption',
        description: 'Help communities adopt digital banking services.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'digital-banking-tutorial.pdf',
        comments: ['Address security concerns', 'Provide hands-on training'],
        guidance: ['Learn digital banking platforms', 'Identify user barriers', 'Provide step-by-step guidance']
      }
    ]
  },
  {
    id: 'social-work',
    title: 'Social Work',
    description: 'Community development and social welfare',
    icon: '🤝',
    color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800',
    projects: [
      {
        id: 'community-development',
        name: 'Community Development Project',
        description: 'Identify and address key community development needs.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Involve community members in planning', 'Focus on sustainable solutions'],
        guidance: ['Conduct community needs assessment', 'Build local partnerships', 'Develop action plans']
      },
      {
        id: 'elderly-care',
        name: 'Elderly Care Initiative',
        description: 'Develop support systems for elderly community members.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'elderly-care-framework.pdf',
        comments: ['Include family involvement strategies', 'Address healthcare access'],
        guidance: ['Assess elderly population needs', 'Design support programs', 'Train community volunteers']
      }
    ]
  },
  {
    id: 'teaching',
    title: 'Teaching',
    description: 'Educational initiatives and skill development',
    icon: '📚',
    color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
    projects: [
      {
        id: 'adult-literacy',
        name: 'Adult Literacy Program',
        description: 'Teach basic literacy skills to adults in rural communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use culturally relevant materials', 'Track learning progress'],
        guidance: ['Assess current literacy levels', 'Develop appropriate curriculum', 'Use engaging teaching methods']
      },
      {
        id: 'skill-development',
        name: 'Skill Development Workshop',
        description: 'Conduct workshops to teach practical skills for employment.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'skill-development-modules.pdf',
        comments: ['Focus on market-relevant skills', 'Include certification process'],
        guidance: ['Identify in-demand skills', 'Design practical training modules', 'Connect with potential employers']
      }
    ]
  }
];

// AI Project Ideas and Recommendations
export const aiProjectIdeas: AIProjectIdea[] = [
  {
    id: 'ai-1',
    title: 'Smart Campus Management System',
    description: 'Develop an AI-powered system to manage campus resources, student attendance, and facility optimization.',
    degree: 'BSc CS',
    difficulty: 'Intermediate',
    estimatedDuration: '3-4 months',
    technologies: ['Python', 'Machine Learning', 'IoT', 'Database Management']
  },
  {
    id: 'ai-2',
    title: 'Automated Essay Grading System',
    description: 'Create an NLP-based system that can automatically grade essays and provide feedback.',
    degree: 'BSc CS',
    difficulty: 'Advanced',
    estimatedDuration: '4-5 months',
    technologies: ['Natural Language Processing', 'Python', 'TensorFlow', 'Machine Learning']
  },
  {
    id: 'ai-3',
    title: 'Personal Finance Tracker',
    description: 'Build a mobile app that helps users track expenses, set budgets, and provide financial insights.',
    degree: 'BCA',
    difficulty: 'Beginner',
    estimatedDuration: '2-3 months',
    technologies: ['React Native', 'JavaScript', 'Database', 'API Integration']
  }
];

export const getAIProjectRecommendations = (degree: string, preferences: string[]): AIProjectIdea[] => {
  return aiProjectIdeas.filter(project => 
    project.degree === degree || 
    preferences.some(pref => 
      project.technologies?.some(tech => 
        tech.toLowerCase().includes(pref.toLowerCase())
      ) || 
      project.title.toLowerCase().includes(pref.toLowerCase()) ||
      project.description.toLowerCase().includes(pref.toLowerCase())
    )
  );
};

// Analytics data
export const getAnalyticsData = () => {
  const analyticsData = degrees.map(degree => {
    const students = generateStudentsForDegree(degree.shortName, 50);
    const submitted = Math.floor(Math.random() * 30) + 10; // Random between 10-40
    const total = students.length;
    const pending = total - submitted;
    const percentage = Math.round((submitted / total) * 100);
    
    return {
      degree: degree.shortName,
      submitted,
      pending,
      total,
      percentage
    };
  });
  
  return analyticsData;
};

// Colleges data
export const colleges = [
  {
    id: 'main-campus',
    name: 'Main Campus',
    location: 'University City',
    students: 2500,
    established: '1985'
  },
  {
    id: 'north-campus',
    name: 'North Campus',
    location: 'North District',
    students: 1800,
    established: '1995'
  },
  {
    id: 'south-campus',
    name: 'South Campus',
    location: 'South District',
    students: 2200,
    established: '1990'
  }
];


export const submissions: Submission[] = [];

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

export const addSubmission = (submission: Omit<Submission, 'id'>) => {
  const newSubmission: Submission = {
    ...submission,
    id: Date.now().toString()
  };
  submissions.push(newSubmission);
  return newSubmission;
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