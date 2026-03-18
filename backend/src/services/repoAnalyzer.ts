import type { IFileNode } from "../models/Repository.ts";

export const buildFileTree = (githubTree: any[]): IFileNode[] => {
    const root: any = [];
    const map: Record<string, any> = {};

    githubTree.forEach((node) => {
        const parts = node.path.split('/');
        let currentLevel = root;
        let currentPath = '';

        parts.forEach((part: string, index: number) => {
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            if (!map[currentPath]) {
                const newNode: any = {
                    name: part,
                    path: currentPath,
                    type: index === parts.length - 1 ? (node.type === 'tree' ? 'dir' : 'file') : 'dir',
                    sha: index === parts.length - 1 ? node.sha : undefined,
                    children: []
                };
                map[currentPath] = newNode;
                currentLevel.push(newNode);
            }

            currentLevel = map[currentPath].children;
        });
    });

    return root;
};

export const parseImports = (content: string): string[] => {
    const imports: string[] = [];
    // Basic regex for JS/TS imports
    const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
};

export const filterSourceFiles = (githubTree: any[]) => {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    return githubTree.filter(node =>
        node.type === 'blob' &&
        extensions.some(ext => node.path.endsWith(ext)) &&
        !node.path.includes('node_modules') &&
        !node.path.includes('.next') &&
        !node.path.includes('dist')
    );
};
export const detectTechStack = (githubTree: any[]): string[] => {
  const stack: string[] = [];
  const paths = githubTree.map(n => n.path.toLowerCase());

  if (paths.some(p => p.includes('package.json'))) stack.push('Node.js');
  if (paths.some(p => p.includes('next.config'))) stack.push('Next.js');
  if (paths.some(p => p.includes('vite.config'))) stack.push('Vite');
  if (paths.some(p => p.endsWith('.tsx') || p.endsWith('.jsx'))) stack.push('React');
  if (paths.some(p => p.includes('tailwind'))) stack.push('TailwindCSS');
  if (paths.some(p => p.includes('mongoose') || p.includes('mongodb'))) stack.push('MongoDB');
  if (paths.some(p => p.includes('express'))) stack.push('Express');
  if (paths.some(p => p.endsWith('.ts') || p.endsWith('.tsx'))) stack.push('TypeScript');
  if (paths.some(p => p.includes('docker'))) stack.push('Docker');
  if (paths.some(p => p.includes('prisma'))) stack.push('Prisma');
  
  return stack.length > 0 ? stack : ['Unknown Stack'];
};

export const findModelFiles = (githubTree: any[]) => {
    // Look for files in folders like 'models', 'schemas', 'entities', 'entities'
    // or files suffixed with .model.ts, .schema.ts, etc.
    const modelKeywords = ['model', 'schema', 'entity', 'database', 'table'];
    const extensions = ['.ts', '.js', '.prisma', '.sql'];
    
    return githubTree.filter(node => 
        node.type === 'blob' &&
        extensions.some(ext => node.path.endsWith(ext)) &&
        modelKeywords.some(keyword => node.path.toLowerCase().includes(keyword)) &&
        !node.path.includes('node_modules') &&
        !node.path.includes('.next') &&
        !node.path.includes('dist')
    ).slice(0, 15); // Limit to top 15 model files to avoid token bloat
};

export const findDependencyFiles = (githubTree: any[]) => {
    const manifestFiles = [
        'package.json',
        'go.mod',
        'pom.xml',
        'build.gradle',
        'requirements.txt',
        'pyproject.toml',
        'gemfile',
        'cargo.toml',
        'composer.json'
    ];
    
    return githubTree.filter(node => 
        node.type === 'blob' &&
        manifestFiles.includes(node.path.split('/').pop()?.toLowerCase() || '') &&
        !node.path.includes('node_modules') &&
        !node.path.includes('vendor')
    );
};
