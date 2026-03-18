export interface IFileNode {
    path: string;
    type: 'file' | 'dir';
    name: string;
    sha?: string;
    children?: IFileNode[];
}

export interface IArchitectureSummary {
  projectType: string;
  summary: string;
  runtimeDataFlow: string;
  domainModel: string;
  mermaidErd?: string;
  apiDesign: string;
  componentArchitecture: string;
  designPatterns: string[];
  externalServices: string;
  stateManagement: string;
  securityPosture: string;
  scalabilityPerformance: string;
  observability: string;
  architecturalTradeoffs: { choice: string; pros: string; cons: string }[];
  infrastructureDeployment: string;
  techStack: string[];
}

export interface IRepository {
    _id: string;
    repoUrl: string;
    owner: string;
    name: string;
    fileTree: IFileNode[];
    architectureSummary?: IArchitectureSummary;
    createdAt: string;
}

export interface IExplanation {
    _id: string;
    repositoryId: string;
    path: string;
    explanation: string;
    createdAt: string;
}
