import type { Request, Response } from 'express';
import { Repository } from '../models/Repository.js';
import { Explanation } from '../models/Explanation.js';
import User from '../models/User.js';
import * as githubService from '../services/githubService.js';
import * as repoAnalyzer from '../services/repoAnalyzer.js';
import * as aiService from '../services/aiService.js';

interface AuthRequest extends Request {
  user?: any;
}

const mapAiError = (error: any, res: Response) => {
  const msg = error.message;
  if (msg === 'INVALID_API_KEY') {
    return res.status(401).json({ error: 'Invalid Gemini API Key. Please update it in settings.' });
  }
  if (msg === 'RATE_LIMIT_EXCEEDED') {
    return res.status(429).json({ error: 'Gemini API rate limit reached. Try again in a minute.' });
  }
  if (msg === 'API_KEY_EXPIRED') {
    return res.status(401).json({ error: 'Gemini API Key has expired. Please provide a new one.' });
  }
  return res.status(500).json({ error: msg });
};

export const importRepository = async (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  const userId = req.user?._id;

  try {
    const { owner, repo } = githubService.parseGitHubUrl(url);

    // Check if already exists FOR THIS USER
    let repository = await Repository.findOne({ repoUrl: url, userId });
    if (repository) {
      return res.json(repository);
    }

    const githubTree = await githubService.getRepoTree(owner, repo);
    const fileTree = repoAnalyzer.buildFileTree(githubTree);
    const techStack = repoAnalyzer.detectTechStack(githubTree);

    // Fetch Model Contents
    const modelFiles = repoAnalyzer.findModelFiles(githubTree);
    let modelContents = '';
    for (const file of modelFiles) {
      try {
        const content = await githubService.getFileContent(owner, repo, file.path);
        modelContents += `\n--- File: ${file.path} ---\n${content}\n`;
      } catch (err) {
        console.error(`Error fetching model ${file.path}:`, err);
      }
    }

    // Fetch Dependency Files
    const dependencyFiles = repoAnalyzer.findDependencyFiles(githubTree);
    let dependencyContents = '';
    for (const file of dependencyFiles) {
      try {
        const content = await githubService.getFileContent(owner, repo, file.path);
        dependencyContents += `\n--- Manifest: ${file.path} ---\n${content}\n`;
      } catch (err) {
        console.error(`Error fetching dependency file ${file.path}:`, err);
      }
    }

    // Generate Architecture Summary
    const user = await User.findById(userId);
    if (!user || !user.geminiApiKey) {
        return res.status(400).json({ error: 'Gemini API Key is required. Please update your profile.' });
    }

    const architectureSummary = await aiService.generateArchitectureSummary(githubTree, techStack, modelContents, dependencyContents, user.geminiApiKey);

    repository = new Repository({
      userId,
      repoUrl: url,
      owner,
      name: repo,
      fileTree,
      architectureSummary,
    });

    await repository.save();
    res.status(201).json(repository);
  } catch (error: any) {
    console.error('Import Repository Error:', error);
    mapAiError(error, res);
  }
};

export const getRepository = async (req: AuthRequest, res: Response) => {
  try {
    const repository = await Repository.findOne({ _id: req.params.id, userId: req.user?._id });
    if (!repository) return res.status(404).json({ error: 'Repository not found or access denied' });
    res.json(repository);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRepositories = async (req: AuthRequest, res: Response) => {
  try {
    const repositories = await Repository.find({ userId: req.user?._id }, {
      _id: 1,
      repoUrl: 1,
      owner: 1,
      name: 1,
      'architectureSummary.projectType': 1,
      'architectureSummary.summary': 1,
      'architectureSummary.techStack': 1,
      createdAt: 1
    }).sort({ createdAt: -1 });

    res.json(repositories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFolderExplanation = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { path } = req.query;
  const userId = req.user?._id;

  try {
    const repository = await Repository.findOne({ _id: id, userId });
    if (!repository) return res.status(404).json({ error: 'Repository not found or access denied' });

    let explanation = await Explanation.findOne({ repositoryId: id, path: path as string });
    if (explanation) return res.json(explanation);

    const node = githubService.findNodeInTree(repository.fileTree, path as string);
    const fileNames = node?.children?.filter((c: any) => c.type === 'file').map((c: any) => c.name) || [];

    const aiText = await aiService.generateFolderExplanation(repository.name, path as string, fileNames, (req.user as any).geminiApiKey);

    explanation = new Explanation({
      repositoryId: id,
      path: path as string,
      explanation: aiText
    });

    await explanation.save();
    res.json(explanation);
  } catch (error: any) {
    mapAiError(error, res);
  }
};

export const getFileContent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { path } = req.query;
  const userId = req.user?._id;

  try {
    const repository = await Repository.findOne({ _id: id, userId });
    if (!repository) return res.status(404).json({ error: 'Repository not found or access denied' });

    const content = await githubService.getFileContent(repository.owner, repository.name, path as string);
    res.json({ content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllExplanationsForRepo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const repository = await Repository.findOne({ _id: id, userId });
    if (!repository) return res.status(404).json({ error: 'Repository not found or access denied' });

    const explanations = await Explanation.find({ repositoryId: id });
    res.json(explanations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFileExplanation = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { path } = req.query;
  const userId = req.user?._id;

  try {
    const repository = await Repository.findOne({ _id: id, userId });
    if (!repository) return res.status(404).json({ error: 'Repository not found or access denied' });

    let explanation = await Explanation.findOne({ repositoryId: id, path: path as string });
    if (explanation) return res.json(explanation);

    const content = await githubService.getFileContent(repository.owner, repository.name, path as string);
    const explanationText = await aiService.generateFileExplanation(repository.name, path as string, content || '', (req.user as any).geminiApiKey);

    explanation = new Explanation({
      repositoryId: id,
      path: path as string,
      explanation: explanationText
    });
    await explanation.save();

    res.json(explanation);
  } catch (error: any) {
    mapAiError(error, res);
  }
};

export const deleteRepository = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;

  try {
    const repository = await Repository.findOne({ _id: id, userId });
    
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found or access denied' });
    }

    // Delete associated explanations first
    await Explanation.deleteMany({ repositoryId: id });
    
    // Delete the repository itself
    await Repository.findByIdAndDelete(id);

    res.json({ message: 'Repository and associated data deleted successfully' });
  } catch (error: any) {
    console.error('Delete Repository Error:', error);
    res.status(500).json({ error: error.message });
  }
};
