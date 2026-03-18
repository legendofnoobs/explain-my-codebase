import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const handleAiError = (error: any, context: string) => {
  console.error(`${context} Error:`, error);
  const message = error.message || '';
  
  if (message.includes('API_KEY_INVALID') || message.includes('invalid api key')) {
    throw new Error('INVALID_API_KEY');
  }
  if (message.includes('429') || message.includes('quota') || message.includes('Rate limit')) {
    throw new Error('RATE_LIMIT_EXCEEDED');
  }
  if (message.includes('expired')) {
    throw new Error('API_KEY_EXPIRED');
  }
  
  throw new Error(`${context} failed: ${message}`);
};

export const generateFolderExplanation = async (repoName: string, path: string, files: string[], apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Analyze the following folder in the repository "${repoName}".
    Path: ${path}
    Files in this folder: ${files.join(', ')}

    Provide a concise, professional explanation of the purpose of this folder and how it fits into the overall architecture.
    Use markdown formatting (bold, lists).
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    handleAiError(error, 'AI Folder Explanation');
  }
};

export const generateFileExplanation = async (repoName: string, path: string, content: string, apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Analyze the following file in the repository "${repoName}".
    Path: ${path}
    
    File Content:
    \`\`\`
    ${content.slice(0, 15000)} // Limiting content size to avoid token limits
    \`\`\`

    Provide a concise, professional explanation of the purpose of this file, its main functions or classes, and how it fits into the overall architecture.
    Use markdown formatting (bold, lists, code snippets if necessary).
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    handleAiError(error, 'AI File Explanation');
  }
};

export const generateArchitectureSummary = async (fileTree: any[], techStack: string[], modelContents: string = '', dependencyContents: string = '', apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are a senior software engineer and system architect. Your task is to analyze the provided repository and generate a professional architecture summary suitable for a staff-level design review.

    REPO STRUCTURE:
    ${JSON.stringify(fileTree.slice(0, 100))}

    DETECTED TECH (Initial Heuristic): ${techStack.join(', ')}

    ${dependencyContents ? `DEPENDENCY MANIFESTS (package.json, requirements.txt, etc.):
    ${dependencyContents}` : ''}

    ${modelContents ? `DATA MODEL DEFINITIONS:
    ${modelContents}` : ''}

    Guidelines:
    1. This summary must work for any repo, regardless of language or framework.
    2. Abstract technical patterns while being specific enough to understand system behavior.
    3. Use Markdown for formatting values inside the JSON strings.
    4. Provide a Mermaid Entity Relationship Diagram (ERD).
    5. Use the DEPENDENCY MANIFESTS to precisely determine the tech stack.

    STRICT MERMAID ERD RULES:
    - Start ONLY with the keyword 'erDiagram'.
    - Do NOT wrap code in markdown blocks.
    - Entities: Singular, capitalized (e.g. User).
    - Attributes: 'type name [key] ["comment"]' (e.g. string email UK "User email").
    - Supported Keys: PK, FK, UK only.
    - NO COMPOSITE KEYS: Do not use PK(col1, col2) or similar. Identify multiple FKs individually.
    - NO COMMAS or PARENTHESES: Attributes must NOT contain , ( ) [ ] { }.
    - Simplified Types: string, int, boolean, datetime, ObjectId. Use string[] for arrays.
    - Labels: Use double quotes (e.g. : "owns").
    - Cardinality: ||, |o, o|, }o, o{, }|, |{
    - Identifiers: -- (solid), .. (dashed)
    - Example valid line: User ||--o{ Project : "owns"

    Your response must be a valid JSON object with the following structure. 
    IMPORTANT: For fields labeled "line by line", provide a single STRING with each point on a new line (using \\n), NOT a JSON array.

    {
      "projectType": "Brief descriptive type (e.g. Full-stack React/Node app)",
      "summary": "High-level overview of system intent",
      "runtimeDataFlow": "Lifecycle of requests and data movement between components (line by line and numbered (1,2,3...) - return as a single STRING with \\n)",
      "domainModel": "Main entities and their relationships (as a regular paragraph explaining what are the entities and their relationships) - return as a single STRING",
      "mermaidErd": "Mermaid.js code for an Entity Relationship Diagram (erDiagram). Follow the STRICT MERMAID ERD RULES above. Return as a single STRING.",
      "apiDesign": "Main endpoints, resource structure, and error conventions (line by line - return as a single STRING with \\n (every endpoint is a line. Example: POST /api/auth/register: Registers a new user. \\n GET /api/auth/login: Logs in a user. \\n GET /api/users/:id: Retrieves a user by ID. \\n))",
      "componentArchitecture": "Frontend/Backend structure breakdown (line by line - return as a single STRING with \\n)",
      "designPatterns": ["List of identified patterns (MVC, Hexagonal, etc.) - return as an ARRAY of strings (beside each pattern, write in short where it is used)"],
      "externalServices": "Integration details with AI, APIs, or 3rd parties (line by line - return as a single STRING with \\n)",
      "stateManagement": "Client and server-side state strategies - return as a single STRING",
      "securityPosture": "Auth, data handling, and validation strategy - return as a single STRING",
      "scalabilityPerformance": "Bottlenecks and scaling opportunities (line by line - return as a single STRING with \\n)",
      "observability": "Logging and monitoring strategy - return as a single STRING",
      "architecturalTradeoffs": [
        { "choice": "Technical choice", "pros": "Benefit", "cons": "Drawback" }
      ],
      "infrastructureDeployment": "CI/CD, build tools, and hosting - return as a single STRING",
      "techStack": ["Specific list of tech components - return as an ARRAY of strings (eg. ['React', 'Node.js', 'MongoDB'] - do not include any other text in the array, no quotes or comments around the tech it self -> do not write 'React (v18.3.1): Frontend UI library)' instead write 'React')"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonStr);

    // Sanitize Mermaid ERD if present
    if (data.mermaidErd) {
      data.mermaidErd = data.mermaidErd
        .replace(/^mermaid\n/i, '')
        .replace(/^mermaid\s+/i, '')
        .replace(/```mermaid\n?/g, '') // Remove any markdown code block starts
        .replace(/```\n?/g, '') // Remove any markdown code block ends
        .trim();
      
      // Ensure erDiagram is present at the start if missing (safety)
      if (!data.mermaidErd.toLowerCase().startsWith('erdiagram')) {
        data.mermaidErd = 'erDiagram\n' + data.mermaidErd;
      }
    }

    // Dynamic Sanitization: Convert any accidental arrays back to strings for expected string fields
    const stringFields = [
      'runtimeDataFlow', 
      'domainModel', 
      'apiDesign', 
      'componentArchitecture', 
      'externalServices', 
      'stateManagement', 
      'securityPosture', 
      'scalabilityPerformance', 
      'observability', 
      'infrastructureDeployment'
    ];

    stringFields.forEach(field => {
      if (Array.isArray(data[field])) {
        data[field] = data[field].join('\n');
      }
    });

    return data;
  } catch (error: any) {
    handleAiError(error, 'AI Architecture Summary');
  }
};
