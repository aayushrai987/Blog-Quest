
import React, { useState, useEffect } from 'react';
import type { Post } from '../types';

interface PostEditorModalProps {
  post: Post | null;
  onSave: (postData: { title: string; imageUrl: string; content: string; }) => void;
  onClose: () => void;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({ post, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImageUrl(post.imageUrl || '');
      setContent(post.content);
    } else {
      setTitle('');
      setImageUrl('');
      setContent('');
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
        alert("Please fill in Title and Content.");
        return;
    }
    onSave({ title, imageUrl, content });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border-color">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary">{post ? 'Edit Post' : 'Create New Post'}</h2>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-3xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border-border-color border rounded-lg p-3 text-text-primary focus:ring-primary focus:border-primary transition"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary mb-2">Image URL (Optional)</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-background border-border-color border rounded-lg p-3 text-text-primary focus:ring-primary focus:border-primary transition"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full bg-background border-border-color border rounded-lg p-3 text-text-primary focus:ring-primary focus:border-primary transition"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-full text-text-secondary hover:bg-gray-900 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-primary text-text-on-primary rounded-full hover:bg-primary-hover transition-colors font-semibold">
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};