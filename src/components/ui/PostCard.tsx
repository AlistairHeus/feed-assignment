import React from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import Button from "./Button";

interface PostCardProps {
  author: string;
  timestamp: string;
  content: string;
  avatar?: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  timestamp,
  content,
  avatar,
  onLike,
  onComment,
  onShare
}) => {
  // Function to render content with emoji support
  const renderContent = (text: string) => {
    // Simple emoji replacement for common ones in the prototype
    return text
      .replace(/:\)/g, '😊')
      .replace(/:\(/g, '😢')
      .replace(/:D/g, '😃')
      .replace(/:\|/g, '😐')
      .replace(/skull/g, '💀')
      .replace(/thumbs_up/g, '👍');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {author}
          </h3>
          <p className="text-gray-500 text-xs">
            {timestamp}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 text-sm leading-relaxed">
          {renderContent(content)}
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group p-0 h-auto"
        >
          <Heart size={16} className="group-hover:fill-current" />
          <span className="text-sm">Like</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors p-0 h-auto"
        >
          <MessageCircle size={16} />
          <span className="text-sm">Comment</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors p-0 h-auto"
        >
          <Share size={16} />
          <span className="text-sm">Share</span>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
