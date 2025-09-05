
import React from 'react';
import type { Post, User } from '../types';

interface BlogPostViewerModalProps {
  post: Post;
  currentUser: User | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const BlogPostViewerModal: React.FC<BlogPostViewerModalProps> = ({ post, currentUser, onClose, onEdit, onDelete }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-border-color relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-text-primary bg-surface/50 rounded-full p-2 hover:bg-border-color transition-colors z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {post.imageUrl && (
          <div className="relative">
            <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-t-2xl" />
          </div>
        )}
        <div className="p-8 overflow-y-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2">{post.title}</h1>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <div>
                  <p className="text-sm font-medium text-text-primary">{post.author.name}</p>
                  <div className="flex space-x-2 text-sm text-text-secondary">
                      <time dateTime={post.date}>{post.date}</time>
                  </div>
              </div>
            </div>
            {currentUser && currentUser.id === post.author.id && (
                <div className="flex space-x-2">
                    <button onClick={onEdit} className="px-4 py-2 bg-primary text-text-on-primary rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors">Edit</button>
                    <button onClick={onDelete} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors">Delete</button>
                </div>
            )}
          </div>

          <div className="mt-8 text-lg leading-relaxed prose prose-invert max-w-none whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};