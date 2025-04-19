import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { LandingPageNavLinks, WidgetConfig } from "./types";

// NavLinks for landing page
export const NavLinks: LandingPageNavLinks[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Jobs",
    href: "/job",
  },
  {
    name: "Features",
    href: "/#features",
  },
  { name: "Pricing", href: "/#pricing" },

  {
    name: "Contact",
    href: "#",
  },
];

export const JobSeekerPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for job seekers",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "1 resumes", available: true },
      createResumeAI: { value: "Not Available", available: false },
      customizeResume: { value: "Not Available", available: false },
      mockVoiceInterview: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Current Plan",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Advanced features for serious job seekers",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "5 resumes", available: true },
      createResumeAI: { value: "Available", available: true },
      customizeResume: { value: "Not Available", available: false },
      mockVoiceInterview: { value: "Not Available", available: false },
    },
    popular: true,
    buttonText: "Upgrade to Pro",
  },
  {
    name: "Elite",
    price: "$19.99",
    description: "Premium features for career professionals",
    features: {
      applyJob: { value: "Unlimited", available: true },
      createResume: { value: "Unlimited", available: true },
      createResumeAI: { value: "Available", available: true },
      customizeResume: { value: "Available", available: true },
      mockVoiceInterview: { value: "Available", available: true },
    },
    popular: false,
    buttonText: "Upgrade to Elite",
  },
];
export const CompanyPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for company",
    features: {
      createJob: { value: "5 Job Posting", available: true },
      getAIFeatures: { value: "Not Available", available: false },
      generateJobEmbeddings: { value: "Not Available", available: false },
      customizeJobEmbeddings: { value: "Not Available", available: false },
      getResumeSummarization: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Current Plan",
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Advanced features for company to manage job postings",
    features: {
      createJob: { value: "10 Job Posting", available: true },
      getAIFeatures: { value: "Available", available: true },
      generateJobEmbeddings: { value: "Available", available: true },
      customizeJobEmbeddings: { value: "Not Available", available: false },
      getResumeSummarization: { value: "Not Available", available: false },
    },
    popular: false,
    buttonText: "Upgrade to Pro",
  },
  {
    name: "Elite",
    price: "$19.99",
    description:
      "Premium features for company to manage job postings and get best hiring solutions",
    features: {
      createJob: { value: "Unlimited Job Posting", available: true },
      getAIFeatures: { value: "Available", available: true },
      generateJobEmbeddings: { value: "Available", available: true },
      customizeJobEmbeddings: { value: "Available", available: true },
      getResumeSummarization: { value: "Available", available: true },
    },
    popular: true,
    buttonText: "Upgrade to Elite",
  },
];

export const JobSeekerProFeatures = [
  {
    name: "Apply Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Create Resume",
    value: "5 resumes",
    avaliable: true,
  },

  {
    name: "Get AI Features",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Resume",
    value: "Not Available",
    avaliable: false,
  },
  {
    name: "Take Mock Voice Interview",
    value: "Not Available",
    avaliable: false,
  },
];
export const CompanyProFeatures = [
  {
    name: "Create Job",
    value: "5 Job",
    avaliable: true,
  },
  {
    name: "Get AI Features",
    value: "Avaliable",
    avaliable: true,
  },
  {
    name: "Get Job Embeddings",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Get Resume Summarization",
    value: "Not Available",
    avaliable: false,
  },
  {
    name: "Customize Job Embeddings",
    value: "Not Available",
    avaliable: false,
  },
];

export const JobSeekerEliteFeatures = [
  {
    name: "Apply Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Create Resume",
    value: "Unlimited",
    avaliable: true,
  },

  {
    name: "Get AI Features",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Resume",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Take Mock Voice Interview",
    value: "Available",
    avaliable: true,
  },
];
export const CompanyEliteFeatures = [
  {
    name: "Create Job",
    value: "Unlimited",
    avaliable: true,
  },
  {
    name: "Get AI Features",
    value: "Avaliable",
    avaliable: true,
  },
  {
    name: "Get Job Embeddings",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Get Resume Summarization",
    value: "Available",
    avaliable: true,
  },
  {
    name: "Customize Job Embeddings",
    value: "Available",
    avaliable: true,
  },
];

export const DEFAULT_EMBED_SETTINGS: WidgetConfig = {
  primaryColor: "#f97316",
  secondaryColor: "black",
  accentColor: "#FFF5E6",
  borderRadius: 8,
  showLogo: true,
  showApplyButton: true,
  note: "",
  showBranding: true,
  containerId: "jobverse-widget",
};

export type ResumeTemplateType = {
  id: string;
  name: string;
  image: string;
};

export const RESUME_TEMPLATE: ResumeTemplateType[] = [
  {
    id: "modern",
    name: "Modern",
    image: "/resume-template-photo/Modern.jpg",
  },
  {
    id: "professional",
    name: "Professional",
    image: "/resume-template-photo/Professional.jpg",
  },
];

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience. Shall we start?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};
