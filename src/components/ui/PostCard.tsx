import { Heart, MessageSquareMore, Send } from "lucide-react";
import React from "react";
import Button from "./Button";
import Avatar from "./Avatar";

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
  onShare,
}) => {
  // Function to render content with emoji support
  const renderContent = (text: string) => {
    // Simple emoji replacement for common ones in the prototype
    return text
      .replace(/:\)/g, "😊")
      .replace(/:\(/g, "😢")
      .replace(/:D/g, "😃")
      .replace(/:\|/g, "😐")
      .replace(/skull/g, "💀")
      .replace(/thumbs_up/g, "👍");
  };

  return (
    <div className="mb-4">
      <div className="bg-gray-50 rounded-2xl shadow-md border  border-border p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 ">
            <Avatar src={avatar} alt={author} className="rounded-lg" size="md" fallback={author} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">{author}</h3>
            <p className="text-muted text-xs">{timestamp}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-lg">😊</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 text-sm leading-relaxed">
              {renderContent(content)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className="flex items-center gap-2 text-foreground hover:text-red-500 transition-colors group p-0 h-auto"
        >
          <Heart
            size={18}
            strokeWidth={1}
            className="group-hover:fill-current"
          />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center gap-2 text-foreground hover:text-blue-500 transition-colors p-0 h-auto"
        >
          <MessageSquareMore size={18} strokeWidth={1} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-2 text-foreground hover:text-green-500 transition-colors p-0 h-auto"
        >
          <Send size={18} strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
