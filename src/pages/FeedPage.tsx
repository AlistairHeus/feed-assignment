import React, { useState, useEffect } from "react";
import type { Post } from "../types/post.types";
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
  const USER_POSTS_KEY = "user_posts";

  const DEMO_POSTS: Post[] = [
    {
      id: "demo-1",
      author: "Theresa Webb",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 😊",
      timestamp: "5 mins ago",
      createdAt: Date.now() - 5 * 60 * 1000,
      avatar: "/theresa.jpg",
      isDemoPost: true,
    },
    {
      id: "demo-2",
      author: "John Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 👍",
      timestamp: "5 mins ago",
      createdAt: Date.now() - 5 * 60 * 1000,
      avatar: "/johndoe.jpg",
      isDemoPost: true,
    },
    {
      id: "demo-3",
      author: "Jane Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. 💀",
      timestamp: "5 mins ago",
      createdAt: Date.now() - 5 * 60 * 1000,
      avatar: "/janedoe.jpg",
      isDemoPost: true,
    },
  ];

  const [posts, setPosts] = useState<Post[]>([...DEMO_POSTS]);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(
    undefined
  );

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      openModal("signin");
    } else {
      showToast(`${action} functionality not implemented yet`, "info");
    }
  };

  const getUserPostsKey = () => {
    return isAuthenticated && user?.id
      ? `${USER_POSTS_KEY}_${user.id}`
      : USER_POSTS_KEY;
  };

  const generatePostId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} mins ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return `${Math.floor(diff / 86400000)} days ago`;
  };

  useEffect(() => {
    const loadPosts = () => {
      const userPostsKey = getUserPostsKey();
      const savedPostsJson = localStorage.getItem(userPostsKey);

      if (savedPostsJson) {
        try {
          const savedPosts: Post[] = JSON.parse(savedPostsJson);
          const updatedSavedPosts = savedPosts.map((post) => ({
            ...post,
            timestamp: formatRelativeTime(post.createdAt),
          }));
          setPosts([...updatedSavedPosts, ...DEMO_POSTS]);
        } catch (error) {
          console.error("Error parsing saved posts:", error);
          setPosts([...DEMO_POSTS]);
        }
      } else {
        setPosts([...DEMO_POSTS]);
      }
    };

    loadPosts();
  }, [isAuthenticated, user?.id]);

  const handlePublishPost = () => {
    if (!isAuthenticated) {
      openModal("signin");
      return;
    }

    if (newPostContent.trim()) {
      const creationTime = Date.now();
      const newPost: Post = {
        id: generatePostId(),
        author: user?.username || user?.email || "Anonymous",
        content: newPostContent,
        timestamp: "Just now",
        createdAt: creationTime,
        avatar: undefined,
        emoji: selectedEmoji,
        userId: user?.id,
      };

      const userPostsKey = getUserPostsKey();
      const existingPostsJson = localStorage.getItem(userPostsKey) || "[]";
      let existingPosts: Post[] = [];

      try {
        existingPosts = JSON.parse(existingPostsJson);
      } catch (error) {
        console.error("Error parsing existing posts:", error);
      }

      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem(userPostsKey, JSON.stringify(updatedPosts));

      setPosts([newPost, ...posts]);

      setNewPostContent("");
      setSelectedEmoji(undefined);
      showToast("Post published successfully!", "success");
    }
  };

  const handleFeedInteraction = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      const target = e.target as HTMLElement;
      const isButton =
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.role === "button" ||
        target.getAttribute("role") === "button";

      if (!isButton) {
        openModal("signin");
      }
    }
  };

  return (
    <PageTransition className="min-h-screen bg-white">
      <div
        className="max-w-2xl mx-auto px-4 py-8"
        onClick={handleFeedInteraction}
      >
        <div className="mb-8">
          <RichTextEditor
            value={newPostContent}
            onChange={setNewPostContent}
            onSubmit={handlePublishPost}
            placeholder="How are you feeling today?"
            selectedEmoji={selectedEmoji}
            onEmojiChange={setSelectedEmoji}
            isAuthenticated={isAuthenticated}
            openAuthModal={() => openModal("signin")}
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
