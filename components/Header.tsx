
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    currentUser: User | null;
    onAuthClick: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onAuthClick, onLogout }) => {
  return (
    <header className="bg-transparent sticky top-0 z-50 border-b border-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-extrabold tracking-wider text-text-primary sm:text-3xl">
            BlogQuest
            </a>
            <div>
                {currentUser ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-text-secondary font-medium hidden sm:inline">Welcome, {currentUser.name}</span>
                        <button 
                            onClick={onLogout}
                            className="px-4 py-2 border border-primary text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-text-on-primary transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={onAuthClick}
                        className="px-4 py-2 bg-primary text-text-on-primary rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors"
                    >
                        Login / Sign Up
                    </button>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};