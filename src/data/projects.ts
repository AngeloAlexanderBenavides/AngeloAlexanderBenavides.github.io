export interface Project {
  id: string;
  title: string;
  category: 'AI' | 'BACKEND' | 'FRONTEND' | 'ROBOTICS';
  description: string;
  contribution: string; // Aporte personal
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'Online' | 'Live' | 'Prototype' | 'Active' | 'Completed';
}

export const projects: Project[] = [
  {
    id: 'biostride',
    title: 'BIOSTRIDE',
    category: 'ROBOTICS',
    description: 'Proyecto enfocado en movilidad biónica asequible para humanos y animales, combinando conocimientos médicos y de computación.',
    contribution: 'Investigué e implementé algoritmos de control cinemático y adaptabilidad para prótesis biónicas de bajo costo, buscando soluciones viables y accesibles.',
    tech: ['C++', 'Arduino', '3D Printing', 'ROS2', 'Biomedicina'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/BIOSTRIDE',
    status: 'Active'
  },
  {
    id: 'llmrag',
    title: 'LLMRAG',
    category: 'AI',
    description: 'Proyecto enfocado en integrar modelos de lenguaje con recuperación de información/documentos (RAG) para asistentes precisos y contextuales.',
    contribution: 'Diseñé la arquitectura de recuperación semántica, integrando bases de datos vectoriales y embeddings para reducir alucinaciones en modelos GPT.',
    tech: ['Python', 'LangChain', 'ChromaDB', 'OpenAI API', 'Vector Search'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/LLMRAG',
    status: 'Live'
  },
  {
    id: 'websocket',
    title: 'websocket',
    category: 'BACKEND',
    description: 'Proyecto relacionado con comunicación bidireccional y en tiempo real utilizando WebSockets.',
    contribution: 'Implementé un servidor de mensajería asíncrona capaz de mantener conexiones persistentes de baja latencia con manejo de concurrencia.',
    tech: ['Node.js', 'WebSockets', 'JavaScript', 'Express'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/websocket',
    status: 'Online'
  },
  {
    id: 'hello-python',
    title: 'Hello-Python-Angelo',
    category: 'BACKEND',
    description: 'Curso y repositorio de aprendizaje completo para dominar Python desde cero con práctica, proyectos y fundamentos.',
    contribution: 'Estructuré lecciones interactivas cubriendo programación orientada a objetos, decoradores, generadores y resolución de problemas prácticos.',
    tech: ['Python', 'Algoritmos', 'OOP', 'Testing'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/Hello-Python-Angelo',
    status: 'Completed'
  },
  {
    id: 'ai-beginners',
    title: 'AI-For-Beginners',
    category: 'AI',
    description: 'Repositorio de aprendizaje y práctica sobre los fundamentos teóricos y prácticos de la Inteligencia Artificial.',
    contribution: 'Estudié y documenté redes neuronales básicas, algoritmos de búsqueda heurística y lógica difusa, desarrollando demostraciones prácticas en código.',
    tech: ['Python', 'TensorFlow', 'Jupyter Notebook', 'Math'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/AI-For-Beginners',
    status: 'Active'
  },
  {
    id: 'ml-beginners',
    title: 'ML-For-Beginners',
    category: 'AI',
    description: 'Proyecto orientado al aprendizaje de machine learning clásico, con lecciones, regresiones y algoritmos predictivos.',
    contribution: 'Implementé modelos de regresión lineal, árboles de decisión y KNN desde cero y usando Scikit-Learn para comprender la base analítica.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/ML-For-Beginners',
    status: 'Completed'
  },
  {
    id: 'fotografia-web',
    title: 'fotografiaWeb',
    category: 'FRONTEND',
    description: 'Sitio web interactivo dedicado a la exhibición y gestión de galerías fotográficas digitales.',
    contribution: 'Creé un diseño web responsivo de alta fidelidad con galerías fluidas, efectos de carga optimizados e interactividad elegante.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Grid & Flexbox'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/fotografiaWeb',
    status: 'Live'
  },
  {
    id: 'hello-git',
    title: 'hello-git-angelo',
    category: 'BACKEND',
    description: 'Guía y curso interactivo diseñado para aprender el control de versiones con Git y flujos de trabajo en GitHub.',
    contribution: 'Sinteticé conceptos complejos de ramificación (branching), resolución de conflictos y rebase en guías accesibles paso a paso.',
    tech: ['Git', 'GitHub', 'Markdown', 'CLI'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/hello-git-angelo',
    status: 'Completed'
  },
  {
    id: 'shopify-page',
    title: 'pageShopify',
    category: 'FRONTEND',
    description: 'Interfaz moderna inspirada en e-commerce con catálogo interactivo y emulación de carrito de compras.',
    contribution: 'Diseñé componentes interactivos para selección de productos y simulación del flujo de checkout con una estética premium.',
    tech: ['React', 'CSS Modules', 'State Management'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/pageShopify',
    status: 'Prototype'
  },
  {
    id: 'claurst',
    title: 'claurst',
    category: 'BACKEND',
    description: 'Herramienta de terminal desarrollada en Rust orientada al análisis estático y métricas de software de bajo nivel.',
    contribution: 'Aproveché las garantías de concurrencia y seguridad de memoria de Rust para construir un parser CLI ultrarrápido y robusto.',
    tech: ['Rust', 'Cargo', 'CLI Parser', 'Systems Programming'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/claurst',
    status: 'Active'
  },
  {
    id: 'smart-plant',
    title: 'Smart Plant Pot',
    category: 'ROBOTICS',
    description: 'Maceta inteligente equipada con sensores IoT para monitoreo de humedad y sistema automático de riego.',
    contribution: 'Diseñé el circuito electrónico y programé el microcontrolador para gestionar ciclos de riego basados en lecturas de humedad en tiempo real.',
    tech: ['C++', 'Arduino', 'Sensores de Humedad', 'Física Electrónica'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/plantAnalizate',
    status: 'Prototype'
  },
  {
    id: 'estadistica',
    title: 'Estadística Aplicada',
    category: 'AI',
    description: 'Análisis de datos cuantitativos y modelado estadístico enfocado en la fundamentación matemática para IA.',
    contribution: 'Escribí scripts para análisis de distribuciones, pruebas de hipótesis y visualización de correlaciones probabilísticas.',
    tech: ['Python', 'Matplotlib', 'SciPy', 'Estadística Descriptiva'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/estadistica',
    status: 'Completed'
  },
  {
    id: 'camera-discord',
    title: 'CamaraMobilParaDiscord',
    category: 'BACKEND',
    description: 'Script interactivo que permite utilizar la cámara del teléfono móvil como fuente de video streaming para Discord.',
    contribution: 'Configuré el canal de transmisión de red y redirección de puertos RTSP/virtual webcam para acoplar la cámara del dispositivo móvil.',
    tech: ['Python', 'RTSP Protocol', 'OBS Studio API', 'Discord SDK'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/UsarCamaraDelMobilParaDiscord',
    status: 'Active'
  },
  {
    id: 'logica-aplicada',
    title: 'Lógica Aplicada',
    category: 'BACKEND',
    description: 'Colección de algoritmos prácticos para resolver desafíos lógicos comunes en aplicaciones empresariales y de datos.',
    contribution: 'Desarrollé implementaciones optimizadas de búsqueda, ordenamiento y estructuras de datos dinámicas en Python.',
    tech: ['Python', 'Algoritmos', 'Estructuras de Datos'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/logica-aplicada-angelo',
    status: 'Completed'
  },
  {
    id: 'deviathon',
    title: 'DevIAThon',
    category: 'AI',
    description: 'Proyecto y prototipo rápido desarrollado durante una hackathon nacional centrada en innovaciones con Inteligencia Artificial.',
    contribution: 'Participé activamente en la codificación express de la interfaz e integración de la API del LLM bajo presión de tiempo.',
    tech: ['Next.js', 'FastAPI', 'OpenAI API', 'Rapid Prototyping'],
    githubUrl: 'https://github.com/AngeloAlexanderBenavides/DevIAThon',
    status: 'Completed'
  }
];
