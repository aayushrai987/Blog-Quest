
import React from 'react';
import type { Post, User } from '../types';

interface BlogPostCardProps {
  post: Post;
  currentUser: User | null;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, currentUser, onEdit, onDelete, onView }) => {

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  }

  return (
    <div 
      className="bg-surface rounded-2xl overflow-hidden group transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col cursor-pointer border border-border-color hover:border-gray-600"
      onClick={onView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView()}
    >
      {post.imageUrl && (
        <div className="relative overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          {currentUser && currentUser.id === post.author.id && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button onClick={handleEditClick} className="px-4 py-2 bg-primary text-text-on-primary rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors">Edit</button>
                  <button onClick={handleDeleteClick} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors">Delete</button>
              </div>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="block mt-2">
            <p className="text-xl font-semibold text-text-primary transition-colors duration-300">{post.title}</p>
            <p className="mt-3 text-base text-text-secondary">{post.excerpt}</p>
          </span>
        </div>
        <div className="mt-6 flex items-center">
          <div>
            <p className="text-sm font-medium text-text-primary">
              <a href="#" onClick={(e) => e.stopPropagation()} className="hover:underline">{post.author.name}</a>
            </p>
            <div className="flex space-x-1 text-sm text-text-secondary">
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};