
import React, { useState } from 'react';

interface AuthModalProps {
  onLogin: (credentials: { name: string; password?: string }) => void;
  onSignup: (credentials: { name: string; password?: string }) => void;
  onClose: () => void;
  loginError: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onSignup, onClose, loginError }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
        alert("Please enter a name and password.");
        return;
    }
    if (isLoginView) {
      onLogin({ name, password });
    } else {
      onSignup({ name, password });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg p-8 w-full max-w-md border border-border-color relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-3xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-2">{isLoginView ? 'Login' : 'Sign Up'}</h2>
        <p className="text-center text-text-secondary mb-6">
          {isLoginView ? "Welcome back!" : "Create an account to start writing."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border-border-color border rounded-md p-3 text-text-primary focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border-border-color border rounded-md p-3 text-text-primary focus:ring-primary focus:border-primary"
              required
            />
          </div>
          {loginError && <p className="text-rose-500 text-sm text-center">{loginError}</p>}
          <div className="pt-2">
            <button type="submit" className="w-full px-6 py-3 bg-primary text-text-on-primary rounded-md hover:bg-primary-hover transition-colors font-semibold">
              {isLoginView ? 'Login' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-primary hover:underline">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};