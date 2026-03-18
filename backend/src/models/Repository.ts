import mongoose, { Schema, Document } from 'mongoose';

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

export interface IRepository extends Document {
  userId: mongoose.Types.ObjectId;
  repoUrl: string;
  owner: string;
  name: string;
  fileTree: IFileNode[];
  architectureSummary?: IArchitectureSummary;
  createdAt: Date;
}

const FileNodeSchema = new Schema<IFileNode>({
  path: { type: String, required: true },
  type: { type: String, enum: ['file', 'dir'], required: true },
  name: { type: String, required: true },
  sha: { type: String },
});

FileNodeSchema.add({
  children: [FileNodeSchema]
});

const RepositorySchema = new Schema<IRepository>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  repoUrl: { type: String, required: true },
  owner: { type: String, required: true },
  name: { type: String, required: true },
  fileTree: [FileNodeSchema],
  architectureSummary: {
    projectType: String,
    summary: String,
    runtimeDataFlow: String,
    domainModel: String,
    mermaidErd: String,
    apiDesign: String,
    componentArchitecture: String,
    designPatterns: [String],
    externalServices: String,
    stateManagement: String,
    securityPosture: String,
    scalabilityPerformance: String,
    observability: String,
    architecturalTradeoffs: [{ choice: String, pros: String, cons: String }],
    infrastructureDeployment: String,
    techStack: [String]
  },
  createdAt: { type: Date, default: Date.now },
});

// Unique repository per user
RepositorySchema.index({ userId: 1, repoUrl: 1 }, { unique: true });

export const Repository = mongoose.model<IRepository>('Repository', RepositorySchema);
