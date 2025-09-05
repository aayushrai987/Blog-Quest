
import React from 'react';
import type { Post } from '../types';
import { ArrowRightIcon } from './IconComponents';

interface FeaturedPostProps {
  post: Post;
  onView: () => void;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onView }) => {
  return (
    <div 
      className="relative bg-surface rounded-2xl overflow-hidden group transition-shadow duration-300 cursor-pointer border border-border-color"
      onClick={onView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView()}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      {post.imageUrl ? (
        <img src={post.imageUrl} alt={post.title} className="w-full h-[500px] object-cover" />
      ) : (
        <div className="w-full h-[500px] bg-background" />
      )}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          <span className="transition-colors duration-200">{post.title}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">{post.excerpt}</p>
        <div className="mt-6 flex items-center">
            <div>
                <p className="text-sm font-medium text-white">{post.author.name}</p>
                <div className="flex space-x-1 text-sm text-gray-300">
                    <time dateTime={post.date}>{post.date}</time>
                </div>
            </div>
        </div>
        <div className="mt-8 inline-flex items-center text-text-primary font-semibold group-hover:underline">
            Read full story
            <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};