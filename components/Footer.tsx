
import React from 'react';
import { TwitterIcon, GithubIcon } from './IconComponents';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent border-t border-border-color mt-24">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mt-8">
                    <p className="text-center text-base text-text-secondary">
                        &copy; {new Date().getFullYear()} Blog Quest. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};