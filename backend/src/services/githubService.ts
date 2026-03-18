import { Octokit } from 'octokit';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

export const getRepoTree = async (owner: string, repo: string, branch: string = 'main'): Promise<any[]> => {
    try {
        // Get the latest commit SHA for the branch
        const { data: refData } = await octokit.rest.git.getRef({
            owner,
            repo,
            ref: `heads/${branch}`
        });
        const commitSha = refData.object.sha;

        // Get the recursive tree
        const { data: treeData } = await octokit.rest.git.getTree({
            owner,
            repo,
            tree_sha: commitSha,
            recursive: 'true'
        });

        return treeData.tree;
    } catch (error: any) {
        if (error.status === 404 && branch === 'main') {
            // Try 'master' if 'main' fails
            return getRepoTree(owner, repo, 'master');
        }
        throw new Error(`Failed to fetch repo tree: ${error.message}`);
    }
};

export const getFileContent = async (owner: string, repo: string, path: string) => {
    try {
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path
        });

        if ('content' in data && typeof data.content === 'string') {
            return Buffer.from(data.content, 'base64').toString('utf-8');
        }
        throw new Error('File content is not a string');
    } catch (error: any) {
        throw new Error(`Failed to fetch file content: ${error.message}`);
    }
};

export const parseGitHubUrl = (url: string) => {
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(regex);
    if (!match) throw new Error('Invalid GitHub URL');
    return { owner: match[1], repo: match[2].replace('.git', '') };
};

export const findNodeInTree = (tree: any[], path: string): any => {
    for (const node of tree) {
        if (node.path === path) return node;
        if (node.children) {
            const found = findNodeInTree(node.children, path);
            if (found) return found;
        }
    }
    return null;
};
