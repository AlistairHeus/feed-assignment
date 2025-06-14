import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { SignInModal, SignUpModal } from "../components/auth";
import RichTextEditor from "../components/ui/RichTextEditor";
import PostCard from "../components/ui/PostCard";

const FeedPage: React.FC = () => {
  const { authState, modalState, openModal, closeModal } = useAuth();
  const { user, isAuthenticated } = authState;
  const [posts, setPosts] = useState<
    Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
      avatar?: string;
    }>
  >([
    {
      id: 1,
      author: "Theresa Webb",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 😊",
      timestamp: "5 mins ago",
      avatar: "/theresa.jpg",
    },
    {
      id: 2,
      author: "John Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 👍",
      timestamp: "5 mins ago",
      avatar: "/johndoe.jpg",
    },
    {
      id: 3,
      author: "Jane Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 💀",
      timestamp: "5 mins ago",
      avatar: "/janedoe.jpg",
    },
  ]);
  const [newPostContent, setNewPostContent] = useState("");

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      openModal("signin");
    } else {
      alert(`${action} functionality not implemented yet`);
    }
  };

  const handlePublishPost = () => {
    if (!isAuthenticated) {
      openModal("signin");
      return;
    }

    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: user?.username || user?.email || "Anonymous",
        content: newPostContent,
        timestamp: "Just now",
        avatar: undefined,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Rich Text Editor */}
        <div className="mb-8">
          <RichTextEditor
            value={newPostContent}
            onChange={setNewPostContent}
            onSubmit={handlePublishPost}
            placeholder="How are you feeling today?"
          />
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              author={post.author}
              timestamp={post.timestamp}
              content={post.content}
              avatar={post.avatar}
              onLike={() => handleAuthRequired("Like")}
              onComment={() => handleAuthRequired("Comment")}
              onShare={() => handleAuthRequired("Share")}
            />
          ))}
        </div>

        {/* Auth Modals */}
        <SignInModal
          isOpen={modalState.isOpen && modalState.type === "signin"}
          onClose={closeModal}
        />
        <SignUpModal
          isOpen={modalState.isOpen && modalState.type === "signup"}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default FeedPage;
