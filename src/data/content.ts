// Central content store — the single source of truth for everything on the
// page. Adding a project or changing a title is a one-file edit; no JSX
// needs to be touched.
//
// Synced against Aniruddha_HD_Resume.pdf (Google Drive, modified 17 Aug 2026).
// If the résumé changes again, this file is what needs to follow it.

export const profile = {
  name: 'Aniruddha HD',
  firstName: 'Aniruddha',
  lastName: 'HD',
  title: 'AI/ML Engineer — Generative AI, Agentic Systems & MLOps',
  role: ['AI/ML Engineer', 'Generative AI & Agentic Systems', 'MLOps Practitioner'],
  tagline:
    'I build agentic AI systems that run locally and deep learning pipelines that survive production — from multi-agent orchestration and RAG through Docker, SageMaker and the tracking that keeps them honest.',
  shortTagline: 'Agentic AI, RAG systems, and the MLOps pipelines that put them in production.',
  location: 'Bengaluru, Karnataka',
  email: 'aniruddhahdkedlaya@gmail.com',
  phone: '+91 9980645715',
  linkedin: 'https://linkedin.com/in/aniruddha-hd',
  github: 'https://github.com/Ani-2003-HD',
  // Points at the public Google Drive file rather than a copy in /public, so
  // replacing the PDF in Drive updates the live site with no redeploy. If the
  // file's sharing is ever set back to private this link breaks for visitors —
  // that's the trade for not carrying a stale copy in the repo.
  resumePdf: 'https://drive.google.com/file/d/1NH3A0DF5CfIBVSCOr9vZhaZTatRa8X-a/view',
  availability: 'Open to AI/ML engineering roles',
};

/**
 * Hero stat strip.
 *
 * Deliberately no project count. A number next to "projects" invites the
 * reader to weigh the figure instead of the work, and any number small enough
 * to be honest is small enough to read as a limitation — the Work section
 * below shows the projects themselves, which argues better than a tally does.
 *
 * Every figure here is stated elsewhere on the page: the internship duration
 * and the accuracy gain in `experience`, the specialization and course counts
 * are the lengths of the `certifications` array and its courses.
 */
export const stats = [
  { value: 8, suffix: ' mo', label: 'Industry internship' },
  { value: 20, suffix: '%', label: 'Model accuracy gain' },
  { value: 3, suffix: '', label: 'Specializations' },
  { value: 11, suffix: '', label: 'Certified courses' },
];

export const about = {
  paragraphs: [
    "I'm an AI/ML Engineer working across generative AI, agentic systems and MLOps, with a Bachelor's in Artificial Intelligence and Machine Learning from Jyothy Institute of Technology, Bengaluru.",
    'Most of what I build runs locally by design — multi-agent pipelines and RAG systems on Ollama rather than hosted APIs, so there is no per-token cost and no data leaving the machine. The other half of the work is making sure models survive contact with production: containerised, tracked, and reproducible.',
  ],
  highlights: [
    {
      icon: 'Bot',
      title: 'Generative AI & Agents',
      description:
        'Multi-agent CrewAI pipelines, agentic RAG, and local LLM deployment on Ollama with Llama 3.2 and Mistral.',
    },
    {
      icon: 'Brain',
      title: 'Deep Learning',
      description:
        'Computer vision and sequence models — CNNs, transformers, YOLOv8 detection, LoRA/QLoRA fine-tuning.',
    },
    {
      icon: 'Cloud',
      title: 'MLOps & Deployment',
      description:
        'Docker, AWS SageMaker and EC2 workflows with MLflow tracking, Optuna tuning and versioned pipelines.',
    },
  ],
};

export const experience = {
  title: 'Deep Learning & MLOps Intern',
  company: 'BPVA Pvt. Ltd.',
  duration: 'May 2024 – Dec 2024',
  location: 'Bengaluru, Karnataka',
  summary:
    'Built computer-vision models that classify patient disease from tongue images and generate diagnostic reports automatically — then stood up the MLOps pipeline that keeps them trainable and deployable.',
  achievements: [
    'Built computer vision models classifying patient diseases from tongue images with automated diagnostic report generation',
    'Engineered containerised MLOps pipelines on AWS SageMaker — 20% accuracy improvement via custom CNN design and automated hyperparameter tuning',
    'Standardised ETL pipelines across a 2,700+ image medical dataset, cutting training latency by 15%',
    'Established versioned workflows on AWS EC2 with MLflow tracking, reducing production deployment failures by 25%',
  ],
  stack: ['CNN', 'YOLOv8', 'AWS SageMaker', 'AWS EC2', 'MLflow', 'Docker', 'Python'],
};

interface EducationEntry {
  icon: string;
  degree: string;
  school: string;
  period: string;
  detail?: string;
}

// Explicit element type: without it TS infers a union of two differently
// shaped object literals (only one entry carries `detail`), and reading
// `item.detail` in the section would fail to type-check.
export const education: EducationEntry[] = [
  {
    icon: 'GraduationCap',
    degree: 'B.E. in Artificial Intelligence & Machine Learning',
    school: 'Jyothy Institute of Technology, Bengaluru',
    period: '2021 – 2025',
    detail: 'CGPA 7.74 / 10',
  },
  {
    icon: 'BookOpen',
    degree: 'Pre-University Course in Computer Science',
    school: 'Vidyabharathi PU College, Shivamogga',
    period: '2019 – 2021',
  },
];

export interface Project {
  title: string;
  /** One-line positioning used on the collapsed card. */
  blurb: string;
  year: string;
  category: string;
  tech: string[];
  description: string;
  highlights: string[];
  /** Marks the two projects that get the wide, top-row treatment. */
  featured?: boolean;
  /**
   * Public repository URL. OPTIONAL AND DELIBERATELY SO: the card renders a
   * "View code" link only when this is set, so a project without public code
   * simply has no link rather than a broken promise.
   *
   * The rule is worth stating plainly, because breaking it is expensive. An
   * engineer who reads "shipped as a working system, not a notebook", clicks
   * through, and finds nothing does not conclude the repo is private — they
   * conclude the project isn't real, and that doubt spreads to every other
   * card on the page. Never point this at a repo that doesn't exist yet, and
   * never point it at the profile root as a stand-in.
   */
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'agentfrailty',
    blurb:
      'Heal an agent\u2019s history and it never picks the wrong record. Corrupt it and it does so half the time \u2014 on the same prompt length.',
    year: '2026',
    category: 'Agent Evaluation \u00b7 Research',
    featured: true,
    repo: 'https://github.com/Ani-2003-HD/agentfrailty',
    tech: ['Python', 'Qwen2.5', 'Ollama', 'Tool-Use Agents', 'Statistical Testing', 'Matplotlib'],
    description:
      'A controlled study of why agent success rates decay, run over 7,560 episodes and probes across three model sizes on an 8 GB MacBook Air. Sinha et al. (NeurIPS 2025) showed that agents condition on their own errors but called the controlled version on real agentic tasks \u201cintractable\u201d; with a ground-truth oracle at every step it is tractable, and this measures both the frequency and the location axes they could not.',
    highlights: [
      'Self-conditioning on real tool calls: with history healed, the wrong-record rate is 0.00 across all three models \u2014 0 in 200 every time; fully corrupted it is 0.24\u20130.54, with context length held to within 0.4% so length cannot explain it',
      'The damage is a recency effect: at a 25% error rate, moving the same errors from early to late in the history is worth 27 accuracy points \u2014 old mistakes are nearly free',
      'Difficulty is lexical. One task instance, identical graph and numbers, only six five-letter words changed across 40 draws: success spans the full 0.00\u20131.00 range, bimodal, with nothing in [0.4, 0.6) and ICC = 0.717 \u2014 vocabulary alone carries 72% of the variance',
      'Bigger models quit earlier: on a perfectly healed history, premature submits rise 5% \u2192 27.5% \u2192 68% from 0.5B to 3B \u2014 a stopping prior, not a navigation failure',
      'Four competing mechanisms tested and ruled out, and the recovery hypothesis rejected on evidence: only 8\u201312% of wrong targets are canonical records, so agents are not jumping back to the true path',
    ],
  },
  {
    title: 'quantcost',
    blurb: 'Everyone measures how fast quantized models run. Nobody measured whether they were still right.',
    year: '2026',
    category: 'LLM Evaluation · Benchmarking',
    featured: true,
    repo: 'https://github.com/Ani-2003-HD/quantcost',
    tech: ['Python', 'llama.cpp', 'Apple MLX', 'GGUF', 'Matplotlib', 'Statistical Testing'],
    description:
      'An open benchmark measuring output-quality degradation across quantization levels for local LLM inference on consumer Apple Silicon — the first public dataset pairing accuracy with throughput in a field that had only ever published speed. 24,600 generations across three tasks, three runtimes and four models on an 8 GB MacBook Air, all programmatically scored with no LLM-as-judge.',
    highlights: [
      'Found that quantization damage is not uniform: at 2-bit, JSON schema conformance holds at 100% while GSM8K arithmetic falls from 56.5% to 19.0% — models fail in the dimension users do not check',
      'Showed Q4 significantly outperforms Q8 on Qwen2.5-1.5B in two independent runtimes (p=0.044, p=0.015), and that the effect reverses on Qwen2.5-0.5B — quantization safety does not generalise across model sizes',
      'Built a swap-aware harness that quarantines runs contaminated by macOS paging, so throughput figures measure inference rather than the OS',
      'Used McNemar exact tests on paired observations rather than unpaired intervals, which surfaced an effect that confidence intervals hid entirely',
    ],
  },
  {
    title: 'Agentic AI News Summarizer',
    blurb: 'Three agents, one local machine, zero cloud cost.',
    year: '2026',
    category: 'Agentic AI · LLM',
    tech: ['Python', 'CrewAI', 'Ollama', 'Llama 3.2', 'Serper API', 'Streamlit'],
    description:
      'A three-agent CrewAI pipeline — Researcher, Analyst, Writer — that runs entirely locally on Ollama, grounded in live web results from the Serper API. It turns any topic into a structured, source-cited brief in under three minutes without a single hosted API call.',
    highlights: [
      'Researcher → Analyst → Writer handoff, each agent with its own role and tools',
      'Runs fully on-device via Ollama: no cloud cost, and no data leaves the machine',
      'Serper API grounding on live web results, which is what keeps hallucinations down',
      'Streamlit UI delivers a structured, source-cited brief in under three minutes',
    ],
  },
  {
    title: 'ML Experiment Tracker',
    blurb: 'Bayesian tuning that replaced the trial-and-error I was doing by hand.',
    year: '2026',
    category: 'MLOps · Optimisation',
    tech: ['Python', 'MLflow', 'Optuna', 'Scikit-learn'],
    description:
      'A dataset-agnostic experimentation framework built to kill the manual hyperparameter-tuning bottleneck I hit tuning object detection models during my MLOps internship — turning trial and error into systematic optimisation.',
    highlights: [
      'Tracks params, metrics and artifacts across 50+ automated runs in MLflow',
      'One-click promotion into the model registry',
      'Optuna Bayesian optimisation replacing a grid-search baseline',
      '18% F1 improvement across 5-fold cross-validation on benchmark classification datasets',
      'Reusable across datasets rather than wired to one problem',
    ],
  },
  {
    title: 'PDF Question-Answering RAG Chatbot',
    blurb: 'A retrieval pipeline that cites its sources and never leaves your laptop.',
    year: '2026',
    category: 'RAG · Document AI',
    tech: ['Python', 'LlamaIndex', 'ChromaDB', 'Ollama', 'PyMuPDF'],
    description:
      'A fully local RAG pipeline over PDF, TXT and Markdown: LlamaIndex and PyMuPDF for ingestion, all-MiniLM-L6-v2 embeddings in a persisted ChromaDB index, and llama3.2:3b on Ollama for on-device generation at zero API cost.',
    highlights: [
      '256-token chunks with 30-token overlap via SentenceSplitter',
      '384-dimension embeddings stored in ChromaDB using cosine similarity over an HNSW index, persisted to disk',
      'Top-5 retrieval with per-chunk citations — filename, page and score',
      'Live pipeline-stats tab: retrieval latency (sub-200 ms on a warm index in testing), vector count, embedding dimensions, LLM status',
    ],
  },
  {
    title: 'Real-Time Sentiment Analysis API',
    blurb: 'RoBERTa behind FastAPI, under 200 ms p95 on plain CPU.',
    year: '2026',
    category: 'NLP · Serving',
    tech: ['Python', 'HuggingFace', 'FastAPI', 'Docker', 'Plotly'],
    description:
      'A pre-trained RoBERTa model (cardiffnlp/twitter-roberta-base-sentiment-latest) served through a FastAPI endpoint for three-class sentiment classification, with a dashboard for both single-text and batch CSV inference.',
    highlights: [
      'Three-class classification — positive, negative, neutral — over a /predict endpoint',
      'Live single-text and batch CSV inference with real-time Plotly charts',
      'Docker multi-stage build keeping the runtime image lean',
      'Async request handling delivering under 200 ms p95 latency on CPU hardware',
    ],
  },
  {
    title: 'RAG HR Chatbot',
    blurb: 'Retrieval with re-ranking and a cache, shipped as two published Docker images.',
    year: '2025',
    category: 'RAG \u00b7 Production',
    repo: 'https://github.com/Ani-2003-HD/rag-hr-chatbot',
    tech: ['Python', 'FAISS', 'BM25', 'Gemini', 'FastAPI', 'Streamlit', 'Redis', 'Docker'],
    description:
      'A question-answering system over HR policy PDFs, built as a complete retrieval stack rather than a single embedding lookup: ingestion, chunking, dense retrieval, a re-ranking pass, a cache, an API and a UI \u2014 with both services published to Docker Hub.',
    highlights: [
      'FAISS dense retrieval with a BM25 / TF-IDF re-ranking pass on top, so lexical matches the embeddings miss still surface',
      'Redis-backed query cache that avoids paying for repeated LLM calls on the questions people actually repeat',
      'PDF ingestion and chunking with sentence-transformer embeddings',
      'FastAPI backend and Streamlit chat interface, both containerised and pushed to Docker Hub',
    ],
  },
  {
    title: 'RD Sharma Question Extraction',
    blurb: 'OCR into an LLM into LaTeX \u2014 with a confidence score on every question it pulls.',
    year: '2025',
    category: 'Document AI \u00b7 OCR',
    repo: 'https://github.com/Ani-2003-HD/rd-sharma-question-extraction',
    tech: ['Python', 'Tesseract OCR', 'LLM Extraction', 'LaTeX', 'Flask'],
    description:
      'A pipeline that turns scanned Class 12 textbook pages into structured, correctly typeset mathematics. Text extraction falls back to OCR when the PDF layer is unreliable, an LLM identifies and refines question boundaries, and the output is emitted as LaTeX rather than lossy plain text.',
    highlights: [
      'Confidence scoring on every extracted question, so low-quality pulls are flagged rather than silently mixed in',
      'Topic- and chapter-level extraction instead of whole-book dumps',
      'LaTeX generation preserving mathematical notation that plain-text OCR destroys',
      'Deduplication pass, plus a web interface with live progress and one-click download',
    ],
  },
];

export const skills: Record<string, string[]> = {
  genai: ['LangChain', 'CrewAI', 'Agentic RAG', 'Llama 3.2', 'Mistral 7B', 'Ollama', 'Prompt Engineering'],
  ml: ['PyTorch', 'Scikit-learn', 'CNNs', 'Transformers', 'YOLOv8', 'LoRA/QLoRA'],
  mlops: ['AWS SageMaker', 'AWS EC2', 'Docker', 'MLflow', 'Optuna', 'FastAPI'],
  data: ['Python', 'Pandas', 'NumPy', 'SQLAlchemy', 'ETL Pipelines'],
  retrieval: ['ChromaDB', 'FAISS', 'LlamaIndex', 'HuggingFace'],
  tools: ['Git', 'GitHub', 'Docker', 'Jupyter', 'VS Code'],
};

export const skillCategoryMeta: Record<string, { icon: string; label: string }> = {
  genai: { icon: 'Bot', label: 'Generative AI & Agents' },
  ml: { icon: 'Brain', label: 'Machine Learning' },
  mlops: { icon: 'GitBranch', label: 'MLOps & Cloud' },
  data: { icon: 'Database', label: 'Data Engineering' },
  retrieval: { icon: 'Layers', label: 'Retrieval & Vectors' },
  tools: { icon: 'Terminal', label: 'Developer Tools' },
};

/** Flat list for the marquee ticker. */
export const techTicker = [
  'Python',
  'CrewAI',
  'LangChain',
  'LlamaIndex',
  'Ollama',
  'Llama 3.2',
  'Mistral 7B',
  'Agentic RAG',
  'ChromaDB',
  'FAISS',
  'PyTorch',
  'Transformers',
  'YOLOv8',
  'LoRA/QLoRA',
  'HuggingFace',
  'Scikit-learn',
  'Optuna',
  'MLflow',
  'FastAPI',
  'Docker',
  'AWS SageMaker',
  'AWS EC2',
  'Pandas',
  'NumPy',
];

export const certifications = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI — Andrew Ng',
    verifyUrl: 'https://coursera.org/verify/specialization/QPXD6BKQXNKP',
    courses: [
      'Neural Networks and Deep Learning',
      'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
      'Structuring Machine Learning Projects',
      'Convolutional Neural Networks',
      'Sequence Models',
    ],
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University & DeepLearning.AI',
    verifyUrl: 'https://coursera.org/verify/specialization/ZQKA433GBLPY',
    courses: [
      'Supervised Machine Learning: Regression and Classification',
      'Advanced Learning Algorithms',
      'Unsupervised Learning, Recommenders, Reinforcement Learning',
    ],
  },
  {
    title: 'Mathematics for Machine Learning & Data Science',
    issuer: 'DeepLearning.AI — Luis Serrano',
    verifyUrl: 'https://coursera.org/verify/specialization/UOMEK7K6OE2T',
    courses: [
      'Linear Algebra for Machine Learning and Data Science',
      'Calculus for Machine Learning and Data Science',
      'Probability & Statistics for Machine Learning & Data Science',
    ],
  },
];

/** Drives the nav, the section rail and the scroll-spy, in document order. */
export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;
