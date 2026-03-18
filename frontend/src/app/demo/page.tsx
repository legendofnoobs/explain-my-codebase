'use client';

import { useState } from 'react';
import { FileTree } from '../../components/FileTree';
import { ArchitectureSummary } from '../../components/ArchitectureSummary';
import { CodeModal } from '../../components/CodeModal';
import { ExplanationSidebar } from '../../components/ExplanationSidebar';
import { IRepository } from '../../types';
import { Sparkles, Code2, ArrowLeft, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DEMO_REPO_DATA: IRepository = {
  "_id": "69bb11ade23ca022c6fcf680",
  "repoUrl": "https://github.com/legendofnoobs/explain-my-codebase",
  "owner": "legendofnoobs",
  "name": "RepoLens",
  "fileTree": [
    {
      "path": "Preview.png",
      "type": "file",
      "name": "Preview.png",
      "sha": "61644448fc1b68591bdc160ece2902597ae10456",
      "children": []
    },
    {
      "path": "README.md",
      "type": "file",
      "name": "README.md",
      "sha": "44bc5369b1bd9c80487b77e0a63d625f031df217",
      "children": []
    },
    {
      "path": "backend",
      "type": "dir",
      "name": "backend",
      "sha": "b285c76927476f34ec4271af7ba1e5db9d4c3ced",
      "children": [
        {
          "path": "backend/api",
          "type": "dir",
          "name": "api",
          "sha": "146939f02784034539279a5cff10bb2bc26cb480",
          "children": [
            {
              "path": "backend/api/index.ts",
              "type": "file",
              "name": "index.ts",
              "sha": "36fdf65fe6c3d8509e4277c28db260d10358b149",
              "children": []
            }
          ]
        },
        {
          "path": "backend/package-lock.json",
          "type": "file",
          "name": "package-lock.json",
          "sha": "c85300c71e0b76b22343e4afb4a975f71d3141c2",
          "children": []
        },
        {
          "path": "backend/package.json",
          "type": "file",
          "name": "package.json",
          "sha": "3ff64c6eb3d6e4a757552bc02e616813cb8d8b0e",
          "children": []
        },
        {
          "path": "backend/src",
          "type": "dir",
          "name": "src",
          "sha": "0fdb6ab76f8bc33b09f6b2e2966cd45ca845228d",
          "children": [
            {
              "path": "backend/src/controllers",
              "type": "dir",
              "name": "controllers",
              "sha": "faabcdb92710743c1adcdfab567feeb1c169837b",
              "children": [
                {
                  "path": "backend/src/controllers/authController.ts",
                  "type": "file",
                  "name": "authController.ts",
                  "sha": "4cf48c311c7701b62cead0a078e69afce5bf903a",
                  "children": []
                },
                {
                  "path": "backend/src/controllers/repoController.ts",
                  "type": "file",
                  "name": "repoController.ts",
                  "sha": "917e1abbb406c89cd26fb4a519c45a896b29b934",
                  "children": []
                }
              ]
            },
            {
              "path": "backend/src/index.ts",
              "type": "file",
              "name": "index.ts",
              "sha": "88755dabbc4232ef6e784a58877a5f77c0eedfb2",
              "children": []
            },
            {
              "path": "backend/src/middleware",
              "type": "dir",
              "name": "middleware",
              "sha": "e472638df751371c86923af610c76d274a132e60",
              "children": [
                {
                  "path": "backend/src/middleware/authMiddleware.ts",
                  "type": "file",
                  "name": "authMiddleware.ts",
                  "sha": "a0ee9a869a769bf61bf8a13038d69b0111318f87",
                  "children": []
                }
              ]
            },
            {
              "path": "backend/src/models",
              "type": "dir",
              "name": "models",
              "sha": "0b78ef0fecab6129edb7dd8a2c321d6178521b06",
              "children": [
                {
                  "path": "backend/src/models/Explanation.ts",
                  "type": "file",
                  "name": "Explanation.ts",
                  "sha": "0feef16df1797a9ba2ca89bc4955d339062a2eca",
                  "children": []
                },
                {
                  "path": "backend/src/models/Repository.ts",
                  "type": "file",
                  "name": "Repository.ts",
                  "sha": "bbceb9071166ad375f83dbe48de3de6d4babce6c",
                  "children": []
                },
                {
                  "path": "backend/src/models/User.ts",
                  "type": "file",
                  "name": "User.ts",
                  "sha": "b8bce139cb60387d52035932474669d2a6d5f7f0",
                  "children": []
                }
              ]
            },
            {
              "path": "backend/src/routes",
              "type": "dir",
              "name": "routes",
              "sha": "cce350d8798b929312ae268b353e77d5385986bf",
              "children": [
                {
                  "path": "backend/src/routes/authRoutes.ts",
                  "type": "file",
                  "name": "authRoutes.ts",
                  "sha": "5faa1a346a312ed1a2d7a4b2822b7ccae4d5fe1b",
                  "children": []
                },
                {
                  "path": "backend/src/routes/repoRoutes.ts",
                  "type": "file",
                  "name": "repoRoutes.ts",
                  "sha": "72a0eb69c4a5d910a65cbf3ff28b87f5bfb95ed8",
                  "children": []
                }
              ]
            },
            {
              "path": "backend/src/services",
              "type": "dir",
              "name": "services",
              "sha": "f7d1753da07ddeaccf538a3437fc67e0a512617e",
              "children": [
                {
                  "path": "backend/src/services/aiService.ts",
                  "type": "file",
                  "name": "aiService.ts",
                  "sha": "c9868aa091b17cf13659f5fd87b7db67b8ec1b4f",
                  "children": []
                },
                {
                  "path": "backend/src/services/githubService.ts",
                  "type": "file",
                  "name": "githubService.ts",
                  "sha": "62830f226d0163e282942cf8d906078f7aa4f0c1",
                  "children": []
                },
                {
                  "path": "backend/src/services/repoAnalyzer.ts",
                  "type": "file",
                  "name": "repoAnalyzer.ts",
                  "sha": "b12b61d2181458fcc06c46acb49fc3ea0cc514eb",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "path": "backend/tsconfig.json",
          "type": "file",
          "name": "tsconfig.json",
          "sha": "acbd4c440aaece5c9096bb8bfc22117d855f1274",
          "children": []
        },
        {
          "path": "backend/vercel.json",
          "type": "file",
          "name": "vercel.json",
          "sha": "d4a663b65bdc735c310389ec6179d9d47c322570",
          "children": []
        }
      ]
    },
    {
      "path": "frontend",
      "type": "dir",
      "name": "frontend",
      "sha": "c67826ca045951f1039d0554263f8169ea494f2d",
      "children": [
        {
          "path": "frontend/next-env.d.ts",
          "type": "file",
          "name": "next-env.d.ts",
          "sha": "1b3be0840f3f6a2bc663b53f4b17d05d2d924df6",
          "children": []
        },
        {
          "path": "frontend/package-lock.json",
          "type": "file",
          "name": "package-lock.json",
          "sha": "2ffe60439f76bbc341fea824bf9aeb8f1dc47d61",
          "children": []
        },
        {
          "path": "frontend/package.json",
          "type": "file",
          "name": "package.json",
          "sha": "4e15418e5840334d5b1490ee4f93af64a23ee08c",
          "children": []
        },
        {
          "path": "frontend/postcss.config.mjs",
          "type": "file",
          "name": "postcss.config.mjs",
          "sha": "5f042935e6de5960a2157754a741bd92d7fab93d",
          "children": []
        },
        {
          "path": "frontend/public",
          "type": "dir",
          "name": "public",
          "sha": "a5bc89a8d088dd196f6466ceec4a46554b3e8bea",
          "children": [
            {
              "path": "frontend/public/Preview.png",
              "type": "file",
              "name": "Preview.png",
              "sha": "61644448fc1b68591bdc160ece2902597ae10456",
              "children": []
            }
          ]
        },
        {
          "path": "frontend/src",
          "type": "dir",
          "name": "src",
          "sha": "f07364d673c3e71406b3afd378ecbd2efa329d99",
          "children": [
            {
              "path": "frontend/src/app",
              "type": "dir",
              "name": "app",
              "sha": "7863d20d36c6ddbb9f24a984b5387f1c5e838dad",
              "children": [
                {
                  "path": "frontend/src/app/dashboard",
                  "type": "dir",
                  "name": "dashboard",
                  "sha": "cae45d774504cc09812c976ca5a4782b3007eac3",
                  "children": [
                    {
                      "path": "frontend/src/app/dashboard/[id]",
                      "type": "dir",
                      "name": "[id]",
                      "sha": "e215e7523e23387e4d0f7575648e87b29d0095eb",
                      "children": [
                        {
                          "path": "frontend/src/app/dashboard/[id]/page.tsx",
                          "type": "file",
                          "name": "page.tsx",
                          "sha": "d8110a813d894566a9b1056a12d2ab383626c7d7",
                          "children": []
                        }
                      ]
                    },
                    {
                      "path": "frontend/src/app/dashboard/page.tsx",
                      "type": "file",
                      "name": "page.tsx",
                      "sha": "7b8158ca9821e59680b9b28ed5e896271b24368d",
                      "children": []
                    }
                  ]
                },
                {
                  "path": "frontend/src/app/globals.css",
                  "type": "file",
                  "name": "globals.css",
                  "sha": "dea2443f5abbc9c996316997df38d95ea0b9a5f7",
                  "children": []
                },
                {
                  "path": "frontend/src/app/layout.tsx",
                  "type": "file",
                  "name": "layout.tsx",
                  "sha": "6b204000ee1eb04c80a3e56b0c61fceaea38080f",
                  "children": []
                },
                {
                  "path": "frontend/src/app/login",
                  "type": "dir",
                  "name": "login",
                  "sha": "33fe83c7b54c825227375f675d029594a14af62b",
                  "children": [
                    {
                      "path": "frontend/src/app/login/page.tsx",
                      "type": "file",
                      "name": "page.tsx",
                      "sha": "9307947e5c930dcec0d1b8092ed0fa7853c1a25f",
                      "children": []
                    }
                  ]
                },
                {
                  "path": "frontend/src/app/page.tsx",
                  "type": "file",
                  "name": "page.tsx",
                  "sha": "c41958cadb5c46d41f7865399c948efdebd5d777",
                  "children": []
                },
                {
                  "path": "frontend/src/app/register",
                  "type": "dir",
                  "name": "register",
                  "sha": "2a09e320b649b0c0dee4aea3f78109e950ec1c47",
                  "children": [
                    {
                      "path": "frontend/src/app/register/page.tsx",
                      "type": "file",
                      "name": "page.tsx",
                      "sha": "520121e17df04f979689c3bd1414b8ddba7a2f7f",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "path": "frontend/src/components",
              "type": "dir",
              "name": "components",
              "sha": "9b6f485a6a04b1292997bc53d7d4bc32bf01854b",
              "children": [
                {
                  "path": "frontend/src/components/ArchitectureSummary.tsx",
                  "type": "file",
                  "name": "ArchitectureSummary.tsx",
                  "sha": "1efcff693cc6c5fc29e74c8824df891fdc92f58f",
                  "children": []
                },
                {
                  "path": "frontend/src/components/CodeModal.tsx",
                  "type": "file",
                  "name": "CodeModal.tsx",
                  "sha": "0766aa3b9d04ed0f7f08a62c97ce7866701233b7",
                  "children": []
                },
                {
                  "path": "frontend/src/components/DeleteConfirmModal.tsx",
                  "type": "file",
                  "name": "DeleteConfirmModal.tsx",
                  "sha": "d517d35f2933204d2d506fb14ecdadf00c1f216e",
                  "children": []
                },
                {
                  "path": "frontend/src/components/ExplanationSidebar.tsx",
                  "type": "file",
                  "name": "ExplanationSidebar.tsx",
                  "sha": "ac8fdb5548db62dea7731177cf23410dccd80756",
                  "children": []
                },
                {
                  "path": "frontend/src/components/FileTree.tsx",
                  "type": "file",
                  "name": "FileTree.tsx",
                  "sha": "8edeb1f85f2ef73bc6a88b45bd6f94b5acb9d238",
                  "children": []
                },
                {
                  "path": "frontend/src/components/RepositoryCard.tsx",
                  "type": "file",
                  "name": "RepositoryCard.tsx",
                  "sha": "03dfac3eedbc03adbcf5ebfad147514394f3024a",
                  "children": []
                },
                {
                  "path": "frontend/src/components/SettingsModal.tsx",
                  "type": "file",
                  "name": "SettingsModal.tsx",
                  "sha": "4b7f5ce1a6aa432172539ff8532bcf2856ad6524",
                  "children": []
                },
                {
                  "path": "frontend/src/components/SmoothScroll.tsx",
                  "type": "file",
                  "name": "SmoothScroll.tsx",
                  "sha": "f3165dde03a097eca3d107729bdebabc1ac8f9f0",
                  "children": []
                }
              ]
            },
            {
              "path": "frontend/src/context",
              "type": "dir",
              "name": "context",
              "sha": "5fc423b117c7a7ee528b0bf1fec8793e966f1d77",
              "children": [
                {
                  "path": "frontend/src/context/AuthContext.tsx",
                  "type": "file",
                  "name": "AuthContext.tsx",
                  "sha": "1bd8a006317aa68a0ddbcaf36123e9211691fd9c",
                  "children": []
                }
              ]
            },
            {
              "path": "frontend/src/lib",
              "type": "dir",
              "name": "lib",
              "sha": "255458eff308d9b293e14b360face9755d991e03",
              "children": [
                {
                  "path": "frontend/src/lib/api.ts",
                  "type": "file",
                  "name": "api.ts",
                  "sha": "d2540aceb3952cb01a336f385206c218c1ffcfee",
                  "children": []
                }
              ]
            },
            {
              "path": "frontend/src/types",
              "type": "dir",
              "name": "types",
              "sha": "fbffca50288b74bcedd79c6a955daa1db41c1846",
              "children": [
                {
                  "path": "frontend/src/types/index.ts",
                  "type": "file",
                  "name": "index.ts",
                  "sha": "b2a9edbdc31ada13fdc9eb464d89816fb3a90c05",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "path": "frontend/tsconfig.json",
          "type": "file",
          "name": "tsconfig.json",
          "sha": "cafab87bb50c4aec6fcc074596d86e704d4268ac",
          "children": []
        }
      ]
    }
  ],
  "architectureSummary": {
    "projectType": "Full-stack web application for AI-powered codebase explanation",
    "summary": "The 'RepoLens' application enables users to register, log in, and submit GitHub repository URLs for AI-driven analysis. It fetches repository file structures, generates comprehensive architectural summaries, and provides on-demand explanations for specific files or code paths within a given repository.",
    "runtimeDataFlow": "1. User accesses the frontend application (Next.js).\n2. For authentication, the frontend sends user credentials (email, password) to the backend's `/api/auth/register` or `/api/auth/login` endpoint.\n3. The backend (Express.js) validates credentials, hashes passwords (for registration), and issues a JSON Web Token (JWT) on successful authentication.\n4. The frontend stores the JWT and includes it in subsequent requests to authenticated backend endpoints.\n5. User submits a GitHub repository URL to the frontend via a dedicated form.\n6. The frontend sends this URL to the backend's `/api/repos` endpoint.\n7. The backend, using `githubService`, interacts with the GitHub API (Octokit) to fetch the repository's file tree and initial metadata.\n8. The backend then utilizes `repoAnalyzer` and `aiService` to process the repository contents.\n9. `aiService` communicates with the Google Generative AI (Gemini) API using the user's stored API key to generate a high-level architectural summary of the codebase.",
    "domainModel": "The core domain model revolves around **Users**, **Repositories**, and **Explanations**. A `User` represents an authenticated individual, identified by a unique email, name, and a hashed password, and stores their `geminiApiKey`. Each `User` can own multiple `Repositories`. A `Repository` entity represents a GitHub project submitted by a user, containing details like its `repoUrl`, owner, name, a hierarchical `fileTree` of its contents, and an optional `architectureSummary` generated by AI.",
    "mermaidErd": "erDiagram\n    User ||--o{ Repository : \"owns\"\n    Repository ||--o{ Explanation : \"has\"\n\n    User {\n        ObjectId _id PK\n        string name\n        string email UK \"User email address\"\n        string password\n        string geminiApiKey \"Google Gemini API key\"\n        datetime createdAt\n        datetime updatedAt\n    }\n\n    Repository {\n        ObjectId _id PK\n        ObjectId userId FK \"Reference to User\"\n        string repoUrl UK \"Unique GitHub repository URL per user\"\n        string owner\n        string name\n        string fileTree \"JSON array of file/directory nodes\"\n        string architectureSummary_projectType \"AI-generated project type\"\n        string architectureSummary_summary \"AI-generated high-level summary\"\n        string architectureSummary_runtimeDataFlow \"AI-generated runtime data flow description\"\n        string architectureSummary_domainModel \"AI-generated domain model description\"\n        string architectureSummary_mermaidErd \"AI-generated Mermaid ERD for codebase\"\n        string architectureSummary_apiDesign \"AI-generated API design description\"\n        string architectureSummary_componentArchitecture \"AI-generated component architecture description\"\n        string[] architectureSummary_designPatterns \"AI-generated list of design patterns\"\n        string architectureSummary_externalServices \"AI-generated external services description\"\n        string architectureSummary_stateManagement \"AI-generated state management description\"\n        string architectureSummary_securityPosture \"AI-generated security posture description\"\n        string architectureSummary_scalabilityPerformance \"AI-generated scalability and performance description\"\n        string architectureSummary_observability \"AI-generated observability description\"\n        string[] architectureSummary_architecturalTradeoffs \"AI-generated list of architectural tradeoffs\"\n        string architectureSummary_infrastructureDeployment \"AI-generated infrastructure and deployment description\"\n        string[] architectureSummary_techStack \"AI-generated list of technologies\"\n        datetime createdAt\n    }\n\n    Explanation {\n        ObjectId _id PK\n        ObjectId repositoryId FK \"Reference to Repository\"\n        string path \"File path within repository\"\n        string explanation \"AI-generated code explanation\"\n        datetime createdAt\n    }",
    "apiDesign": "POST /api/auth/register: Registers a new user.\nPOST /api/auth/login: Authenticates a user.\nGET /api/repos: Retrieves user repositories.\nPOST /api/repos: Initiates repository analysis.\nGET /api/repos/:id: Retrieves repository details.\nPOST /api/repos/:id/explain: Generates AI explanation for a path.",
    "componentArchitecture": "Frontend (Next.js):\n- Pages: Defines routes and main views.\n- Components: Reusable UI elements (`RepositoryCard`, `FileTree`, `ArchitectureSummary`).\n- Context: Global auth state management.\n- API Client: Centralized axios instance for backend requests.\n\nBackend (Node.js/Express):\n- Entry Point: Server initialization and route mounting.\n- Routes: Authentication and repository endpoint definitions.\n- Controllers: Core business logic handlers.\n- Models: Mongoose schemas for User, Repository, and Explanation.\n- Services: External API integrations (GitHub, Gemini) and analysis logic.",
    "designPatterns": [
      "MVC (Model-View-Controller)",
      "Service Layer",
      "Middleware Pattern",
      "Repository Pattern"
    ],
    "externalServices": "GitHub API (Octokit), Google Generative AI (Gemini), MongoDB (Mongoose).",
    "stateManagement": "Frontend: Context API for auth, React Hook state for UI. Backend: Stateless JWT-based authentication.",
    "securityPosture": "Bcrypt password hashing, JWT protected routes, Gemini API keys managed per user.",
    "scalabilityPerformance": "Asynchronous repo analysis, modular service architecture, NoSQL flexibility for complex file trees.",
    "observability": "Standard console logging for errors and operational tracking.",
    "architecturalTradeoffs": [
      {
        "choice": "Monolithic Backend Service (Node.js/Express)",
        "pros": "Simplifies initial development and deployment, easier local setup and debugging, unified codebase management for an MVP.",
        "cons": "Can become a single point of failure, harder to scale individual components (e.g., AI processing) independently, potential for tightly coupled services if not designed with clear boundaries."
      },
      {
        "choice": "AI-driven Code Explanation",
        "pros": "Automates complex code understanding, provides dynamic and context-aware explanations, reduces manual effort for documentation.",
        "cons": "Reliance on external AI services introduces network latency and variable costs, explanations may sometimes be inaccurate or 'hallucinated', requires users to provide their own API key."
      },
      {
        "choice": "MongoDB NoSQL Database",
        "pros": "Flexible schema for evolving data structures, well-suited for rapid development and handling semi-structured data like nested file trees.",
        "cons": "Less ideal for complex relational queries without additional tools, potential for data consistency trade-offs, requires careful indexing and schema design."
      },
      {
        "choice": "Client-side JWT Authentication",
        "pros": "Stateless server design improves scalability, tokens can be easily used by multiple clients, no server-side session management overhead.",
        "cons": "Requires secure client-side storage of tokens, token revocation can be challenging without additional mechanisms, token size can slightly increase request headers."
      }
    ],
    "infrastructureDeployment": "Designed for Vercel with serverless backend functions and MongoDB managed service.",
    "techStack": [
      "Node.js", "Express.js", "React", "Next.js", "TypeScript", "MongoDB", "Mongoose", "Tailwind CSS", "Gemini AI", "Octokit", "JWT", "Mermaid.js"
    ]
  },
  "createdAt": "2026-03-18T20:57:17.881Z",
};

export default function DemoPage() {
  const router = useRouter();
  const [repo] = useState(DEMO_REPO_DATA);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [explanations, setExplanations] = useState<Record<string, string>>({
    'backend/src/index.ts': 'This is the main entry point of the backend application. It initializes the Express server, sets up middleware (CORS, JSON parsing), and connects to the MongoDB database. It also mounts the authentication and repository routes.',
    'frontend/src/app/page.tsx': 'The landing page of RepoLens. It features a hero section with a call to action, an AI Insight image, pain point analysis, and a modern footer. Built with Next.js and Tailwind CSS.',
  });
  const [activeExplainPath, setActiveExplainPath] = useState<string>('');
  const [loadingExpl, setLoadingExpl] = useState('');

  const [codeModal, setCodeModal] = useState({
    isOpen: false,
    filename: '',
    fullPath: '',
    content: '',
    isLoading: false
  });

  const handleFolderClick = (path: string) => {
    console.log("Demo: Toggled folder:", path);
  };

  const handleExplainClick = (path: string) => {
    setActiveExplainPath(path);
    setIsSidebarOpen(true);
    
    if (!explanations[path]) {
      setLoadingExpl(path);
      setTimeout(() => {
        setExplanations(prev => ({
          ...prev,
          [path]: `[DEMO MODE] This is a pre-generated insight for ${path}. In the full version of RepoLens, this would be a deep architectural analysis generated by the Gemini 2.5 Flash model based on the actual source code of the file.`
        }));
        setLoadingExpl('');
      }, 800);
    }
  };

  const handleFileClick = (path: string) => {
    const filename = path.split('/').pop() || '';
    setCodeModal({
      isOpen: true,
      filename,
      fullPath: path,
      content: `// [DEMO MODE] File content preview for ${filename}\n\n/**\n * In the live production environment, clicking this file would\n * fetch the live source code from GitHub and display it here\n * with full syntax highlighting.\n */\n\nfunction demo() {\n  console.log("Welcome to RepoLens Demo!");\n}`,
      isLoading: false
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-slate-100 font-sans">
      {/* Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1600px] z-30">
        <nav className="glass rounded-lg border border-white/10 px-8 h-20 flex items-center justify-between shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/legendofnoobs/explain-my-codebase" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-text-body hover:text-text-hero transition-colors"
              title="View on GitHub"
            >
              <Github size={20} />
            </a>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-accent-action rounded-lg flex items-center justify-center shadow-lg shadow-accent-action/20 group-hover:scale-110 transition-transform">
              <Code2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-hero">RepoLens <span className="text-[10px] bg-accent-ai/20 text-accent-ai px-2 py-0.5 rounded ml-2 uppercase tracking-widest">Demo</span></span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="/" className="text-xs font-bold text-text-body hover:text-text-hero transition-all uppercase tracking-widest pt-1">Exit Demo</a>
            <a href="/dashboard" className="text-xs font-bold text-white bg-accent-action px-6 py-2 rounded-lg hover:bg-accent-action/90 transition-all shadow-lg shadow-accent-action/20 uppercase tracking-widest">Get Started</a>
          </div>
        </nav>
      </div>

      <main className="w-full px-4 sm:px-8 mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 relative max-w-[1600px] mx-auto items-start">
        {/* Left Column: File Tree */}
        <div className="lg:col-span-3 space-y-6 relative z-10 lg:sticky lg:top-32">
          <FileTree
            tree={repo.fileTree}
            onFolderClick={handleFolderClick}
            onExplainClick={handleExplainClick}
            onFileClick={handleFileClick}
            loadingExplainPath={loadingExpl}
          />
        </div>

        {/* Right Column: Insights */}
        <div className="lg:col-span-9 space-y-8 relative z-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-card/50 border border-border-clean rounded-lg p-6 flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Demo Instance</span>
               </div>
               <h2 className="text-xl font-bold text-text-hero tracking-tight">legendofnoobs/repolens</h2>
               <p className="text-[10px] text-text-body font-bold uppercase tracking-widest mt-1 opacity-50">Explaining itself</p>
            </div>

            <div className="flex items-center gap-4 bg-accent-ai/5 border border-accent-ai/20 p-6 rounded-lg">
               <div className="w-12 h-12 bg-accent-ai/20 rounded-xl flex-shrink-0 flex items-center justify-center text-accent-ai">
                  <Sparkles size={24} />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-text-hero">Pre-calculated AI Analysis</h3>
                  <p className="text-[11px] text-text-body leading-relaxed mt-1">This overview was generated by Gemini 2.5 Flash after analyzing the entire RepoLens codebase.</p>
               </div>
            </div>
          </div>
          {repo.architectureSummary && (
            <ArchitectureSummary summary={repo.architectureSummary} />
          )}
        </div>
      </main>

      <CodeModal
        isOpen={codeModal.isOpen}
        onClose={() => setCodeModal(prev => ({ ...prev, isOpen: false }))}
        filename={codeModal.filename}
        fullPath={codeModal.fullPath}
        repoId="demo"
        content={codeModal.content}
        isLoading={codeModal.isLoading}
      />

      <ExplanationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        explanations={explanations}
        activePath={activeExplainPath}
        onSelectPath={setActiveExplainPath}
        isLoadingFile={loadingExpl}
      />
    </div>
  );
}
