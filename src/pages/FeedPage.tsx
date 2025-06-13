import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { SignInModal, SignUpModal } from "../components/auth";

const FeedPage: React.FC = () => {
  const { authState, modalState, openModal, closeModal } = useAuth();
  const { user, isAuthenticated } = authState;
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sample User 1",
      content: "This is a sample post content. In the next phase, we'll implement real post creation and display functionality.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Sample User 2", 
      content: "This is a sample post content. In the next phase, we'll implement real post creation and display functionality.",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      author: "Sample User 3",
      content: "This is a sample post content. In the next phase, we'll implement real post creation and display functionality.", 
      timestamp: "2 hours ago"
    }
  ]);
  const [newPostContent, setNewPostContent] = useState("");

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      openModal('signin');
    } else {
      alert(`${action} functionality not implemented yet`);
    }
  };

  const handlePublishPost = () => {
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }

    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: user?.username || user?.email || "Anonymous",
        content: newPostContent,
        timestamp: "Just now"
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Welcome Section */}
          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to foo-rum
            </h1>
            <p className="text-muted-foreground">
              Share your thoughts with the community
            </p>
            {user && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Logged in as: <span className="font-medium text-foreground">{user.email}</span>
                </span>
              </div>
            )}
          </div>

          {/* Post Editor */}
          <div className="bg-popover rounded-xl p-6 mb-6 border border-border">
            <h2 className="text-lg font-semibold text-popover-foreground mb-4">
              Create a Post
            </h2>
            <div className="space-y-4">
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                rows={4}
              />
              <div className="flex justify-end">
                <Button 
                  variant="primary"
                  onClick={handlePublishPost}
                >
                  Publish Post
                </Button>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Posts</h2>
            
            {/* Dynamic Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-popover rounded-xl p-6 border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-popover-foreground">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-popover-foreground mb-4">
                  {post.content}
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAuthRequired("Like")}
                  >
                    👍 Like
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAuthRequired("Comment")}
                  >
                    💬 Comment
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleAuthRequired("Share")}
                  >
                    🔗 Share
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Auth Modals */}
          <SignInModal 
            isOpen={modalState.isOpen && modalState.type === 'signin'}
            onClose={closeModal}
          />
          <SignUpModal 
            isOpen={modalState.isOpen && modalState.type === 'signup'}
            onClose={closeModal}
          />
        </div>
    </div>
  );
};

export default FeedPage;
