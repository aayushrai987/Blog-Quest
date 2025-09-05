
// Fix: Corrected React import for useState and useEffect
import React, { useState, useEffect } from 'react';
import type { Post, User } from './types';
import { Header } from './components/Header';
import { FeaturedPost } from './components/FeaturedPost';
import { BlogPostCard } from './components/BlogPostCard';
import { Footer } from './components/Footer';
import { PostEditorModal } from './components/PostEditorModal';
import { BlogPostViewerModal } from './components/BlogPostViewerModal';
import { AuthModal } from './components/AuthModal';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      return savedPosts ? JSON.parse(savedPosts) : [];
    } catch (error) {
      console.error("Could not load posts from local storage", error);
      return [];
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
        const savedUsers = localStorage.getItem('blogUsers');
        return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
        console.error("Could not load users from local storage", error);
        return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
      try {
          const savedUser = localStorage.getItem('currentUser');
          return savedUser ? JSON.parse(savedUser) : null;
      } catch (error) {
          console.error("Could not load current user from local storage", error);
          return null;
      }
  });
  
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    } catch (error) {
      console.error("Could not save posts to local storage", error);
    }
  }, [posts]);

  useEffect(() => {
    try {
        localStorage.setItem('blogUsers', JSON.stringify(users));
    } catch (error) {
        console.error("Could not save users to local storage", error);
    }
  }, [users]);

  useEffect(() => {
    try {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    } catch (error) {
        console.error("Could not save current user to local storage", error);
    }
  }, [currentUser]);

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setIsEditorModalOpen(true);
  };

  const handleOpenEditModal = (post: Post) => {
    setEditingPost(post);
    setIsEditorModalOpen(true);
  };

  const handleCloseEditorModal = () => {
    setIsEditorModalOpen(false);
    setEditingPost(null);
  };

  const handleViewPost = (post: Post) => {
    setViewingPost(post);
  }

  const handleCloseViewer = () => {
    setViewingPost(null);
  }

  const handleSavePost = (postData: { title: string; imageUrl: string; content: string; }) => {
    if (!currentUser) {
        alert("You must be logged in to create or edit a post.");
        return;
    }
    const excerpt = postData.content.split(' ').slice(0, 30).join(' ') + (postData.content.split(' ').length > 30 ? '...' : '');
    
    if (editingPost) {
      setPosts(currentPosts => currentPosts.map(p => p.id === editingPost.id ? { ...editingPost, ...postData, excerpt } : p));
    } else {
      const newPost: Post = {
        id: new Date().toISOString(),
        ...postData,
        excerpt,
        author: currentUser,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setPosts(currentPosts => [ newPost, ...currentPosts]);
    }
    handleCloseEditorModal();
  };
  
  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
    }
  };

  const handleEditFromViewer = (post: Post) => {
    handleCloseViewer();
    handleOpenEditModal(post);
  };

  const handleDeleteFromViewer = (postId: string) => {
    handleCloseViewer();
    handleDeletePost(postId);
  }

  const handleSignup = (credentials: { name: string; password?: string }) => {
      if (users.find(u => u.name === credentials.name)) {
          setAuthError("A user with this name already exists.");
          return;
      }
      const newUserId = `user_${new Date().getTime()}`;
      const newUser: User = {
          id: newUserId,
          name: credentials.name,
          password: credentials.password, // In a real app, this would be hashed
          avatarUrl: `https://i.pravatar.cc/150?u=${newUserId}`
      }
      setUsers(currentUsers => [...currentUsers, newUser]);
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
      setAuthError(null);
  };

  const handleLogin = (credentials: { name: string; password?: string }) => {
      const user = users.find(u => u.name === credentials.name && u.password === credentials.password);
      if (user) {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
          setAuthError(null);
      } else {
          setAuthError("Invalid name or password.");
      }
  };

  const handleLogout = () => {
      setCurrentUser(null);
  };

  const showPosts = currentUser && posts.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentUser={currentUser} onAuthClick={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!showPosts ? (
            <div className="text-center py-20 px-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
                    Welcome to BlogQuest
                </h1>
                
                {currentUser ? (
                  <>
                    <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                      Where stories unfold and ideas ignite. Start your quest by creating your first post.
                    </p>
                    <button
                        onClick={handleOpenCreateModal}
                        className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-text-on-primary bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                    >
                        Create Your First Post
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                      Please log in to view and create posts. Join the quest and share your story!
                    </p>
                    <div className="mt-8">
                        <button onClick={() => setIsAuthModalOpen(true)} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-text-on-primary bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                            Login / Sign Up to Begin
                        </button>
                    </div>
                  </>
                )}
            </div>
          ) : (
            <>
              <FeaturedPost post={posts[0]} onView={() => handleViewPost(posts[0])} />
              {posts.length > 1 && (
                <div className="mt-16 grid gap-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                  {posts.slice(1).map(post => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post}
                      currentUser={currentUser}
                      onEdit={() => handleOpenEditModal(post)}
                      onDelete={() => handleDeletePost(post.id)}
                      onView={() => handleViewPost(post)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
        {currentUser && (
          <button
            onClick={handleOpenCreateModal}
            className="fixed bottom-8 right-8 bg-primary text-text-on-primary p-4 rounded-full hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all z-40"
            aria-label="Create new post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </button>
        )}
      <Footer />
      {isEditorModalOpen && (
        <PostEditorModal
          post={editingPost}
          onSave={handleSavePost}
          onClose={handleCloseEditorModal}
        />
      )}
      {viewingPost && (
        <BlogPostViewerModal 
          post={viewingPost}
          currentUser={currentUser}
          onClose={handleCloseViewer}
          onEdit={() => handleEditFromViewer(viewingPost)}
          onDelete={() => handleDeleteFromViewer(viewingPost.id)}
        />
      )}
      {isAuthModalOpen && (
        <AuthModal
            onLogin={handleLogin}
            onSignup={handleSignup}
            onClose={() => {
                setIsAuthModalOpen(false);
                setAuthError(null);
            }}
            loginError={authError}
        />
      )}
    </div>
  );
};

export default App;