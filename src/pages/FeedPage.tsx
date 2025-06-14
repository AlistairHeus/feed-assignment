import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";
import { SignInModal, SignUpModal } from "../components/auth";
import RichTextEditor from "../components/ui/RichTextEditor";
import PostCard from "../components/ui/PostCard";
import { PageTransition } from "../components/layout";
import { motion } from "framer-motion";

const FeedPage: React.FC = () => {
  const { authState, modalState, openModal, closeModal } = useAuth();
  const { user, isAuthenticated } = authState;
  const { showToast } = useToast();
  const [posts, setPosts] = useState<
    Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
      avatar?: string;
      emoji?: string;
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
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(
    undefined
  );

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
        emoji: selectedEmoji,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setSelectedEmoji(undefined);
      showToast("Post published successfully!", "success");
    }
  };

  return (
    <PageTransition className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <RichTextEditor
            value={newPostContent}
            onChange={setNewPostContent}
            onSubmit={handlePublishPost}
            placeholder="How are you feeling today?"
            selectedEmoji={selectedEmoji}
            onEmojiChange={setSelectedEmoji}
          />
        </div>

        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
            hidden: {},
          }}
        >
          {posts.map((post, _index) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                  },
                },
              }}
            >
              <PostCard
                author={post.author}
                timestamp={post.timestamp}
                content={post.content}
                avatar={post.avatar}
                emoji={post.emoji}
                onLike={() => handleAuthRequired("Like")}
                onComment={() => handleAuthRequired("Comment")}
                onShare={() => handleAuthRequired("Share")}
              />
            </motion.div>
          ))}
        </motion.div>

        <SignInModal
          isOpen={modalState.isOpen && modalState.type === "signin"}
          onClose={closeModal}
        />
        <SignUpModal
          isOpen={modalState.isOpen && modalState.type === "signup"}
          onClose={closeModal}
        />
      </div>
    </PageTransition>
  );
};

export default FeedPage;
