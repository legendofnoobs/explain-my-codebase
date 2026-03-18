import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FolderClosed, FolderOpen, FileCode, Loader2, Sparkles, FolderArchive } from 'lucide-react';
import { IFileNode } from '../types';

interface FileTreeProps {
    tree: IFileNode[];
    onFolderClick: (path: string) => void;
    onExplainClick: (path: string) => void;
    onFileClick?: (path: string) => void;
    loadingExplainPath?: string;
}

const TreeNode = ({ node, onFolderClick, onExplainClick, onFileClick, loadingExplainPath, level = 0 }: {
    node: IFileNode;
    onFolderClick: (path: string) => void;
    onExplainClick: (path: string) => void;
    onFileClick?: (path: string) => void;
    loadingExplainPath?: string;
    level?: number;
}) => {
    const [isOpen, setIsOpen] = useState(level === 0);
    const isFolder = node.type === 'dir';
    const isLoadingExplanation = loadingExplainPath === node.path;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFolder) {
            setIsOpen(!isOpen);
            onFolderClick(node.path);
        }
    };

    const handleNameClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFolder) {
            setIsOpen(!isOpen);
            onFolderClick(node.path);
        } else if (onFileClick) {
            onFileClick(node.path);
        }
    };

    const handleExplain = (e: React.MouseEvent) => {
        e.stopPropagation();
        onExplainClick(node.path);
    };

    return (
        <div className="relative">
            {/* Guide Lines for Indentation */}
            {level > 0 && (
                <div 
                    className="absolute top-0 bottom-0 border-l border-border-clean/30" 
                    style={{ left: `${(level * 16) + 6}px` }} 
                />
            )}

            <div
                className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-accent-action/10 transition-all cursor-pointer select-none"
                style={{ paddingLeft: `${(level * 16) + 8}px` }}
                onClick={handleNameClick}
            >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                    {/* Expand/Collapse Chevron */}
                    <div 
                        onClick={handleNameClick}
                        className={`w-4 h-4 flex items-center justify-center rounded-md hover:bg-surface-card transition-colors ${!isFolder ? 'invisible' : ''}`}
                    >
                        {isFolder && (
                           isOpen ? <ChevronDown size={14} className="text-text-body" /> : <ChevronRight size={14} className="text-text-body" />
                        )}
                    </div>

                    {/* File/Folder Icon */}
                    <div className="flex-shrink-0">
                        {isFolder ? (
                            isOpen ? (
                                <FolderOpen size={16} className="text-accent-action" fill="currentColor" fillOpacity={0.1} />
                            ) : (
                                <FolderClosed size={16} className="text-accent-action" fill="currentColor" fillOpacity={0.1} />
                            )
                        ) : (
                            <FileCode size={16} className="text-text-body/60" />
                        )}
                    </div>

                    {/* Name */}
                    <span className={`text-[13px] truncate font-mono ${isFolder ? 'font-bold text-text-hero' : 'text-text-body'}`}>
                        {node.name}
                    </span>
                </div>

                {/* Actions (visible on hover for folders) */}
                {isFolder && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity ml-2">
                        {isLoadingExplanation ? (
                            <span className="p-1 text-accent-ai bg-accent-ai/10 rounded animate-pulse">
                                <Loader2 size={14} className="animate-spin" />
                            </span>
                        ) : (
                            <button
                                onClick={handleExplain}
                                className="px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-accent-ai bg-accent-ai/10 hover:bg-accent-ai/20 border border-accent-ai/20 rounded-md transition-all flex items-center gap-1 shadow-sm"
                                title="Explain Folder Architecture"
                            >
                                <Sparkles size={10} /> AI
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Children Render */}
            {isFolder && isOpen && node.children && node.children.length > 0 && (
                <div className="relative">
                    {node.children.map((child, i) => (
                        <TreeNode 
                            key={`${child.path}-${i}`} 
                            node={child} 
                            onFolderClick={onFolderClick} 
                            onExplainClick={onExplainClick}
                            onFileClick={onFileClick} 
                            loadingExplainPath={loadingExplainPath}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const FileTree = ({ tree, onFolderClick, onExplainClick, onFileClick, loadingExplainPath }: FileTreeProps) => {
    return (
        <div className="bg-surface-card rounded-lg border-2 border-border-clean shadow-xl overflow-hidden flex flex-col h-[calc(100vh-160px)] min-h-[400px]">
            {/* Tree Header */}
            <div className="px-5 py-4 bg-primary-bg/50 border-b-2 border-border-clean flex items-center gap-2 select-none shrink-0">
                <FolderArchive size={16} className="text-accent-action" />
                <h3 className="text-[11px] font-black text-text-hero uppercase tracking-[0.2em]">
                    Code Index
                </h3>
            </div>
            
            {/* Tree Content */}
            <div data-lenis-prevent className="p-3 overflow-y-auto min-h-0 flex-1 custom-scrollbar scroll-smooth overscroll-contain">
                <div className="space-y-[2px] pb-4">
                    {tree.map((node, i) => (
                        <TreeNode 
                            key={`root-${i}`} 
                            node={node} 
                            onFolderClick={onFolderClick} 
                            onExplainClick={onExplainClick}
                            onFileClick={onFileClick} 
                            loadingExplainPath={loadingExplainPath} 
                            level={0}
                        />
                    ))}
                </div>
            </div>

            {/* Tree Footer */}
            <div className="px-5 py-3 bg-primary-bg/20 border-t border-border-clean/50 hidden lg:block shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    <span className="text-[9px] font-bold text-text-body/40 uppercase tracking-widest">
                        Recursive Explorer v1.0
                    </span>
                </div>
            </div>
        </div>
    );
};
