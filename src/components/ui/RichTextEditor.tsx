import {
  Bold,
  Mic,
  Code,
  Italic,
  List,
  ListOrdered,
  Video,
  Plus,
  Quote,
  SendHorizonal,
  Smile,
  Underline,
} from "lucide-react";
import React from "react";
import Button from "./Button";
import Select from "./Select";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "How are you feeling today?",
}) => {
  const handleFormatClick = (_format: string) => {
    alert("Function not implemented");
  };

  const handleMediaClick = (_type: string) => {
    alert("Function not implemented");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <Select
            options={[
              { value: "paragraph", label: "Paragraph" },
              { value: "heading1", label: "Heading 1" },
              { value: "heading2", label: "Heading 2" },
            ]}
            value="paragraph"
            onValueChange={(value) => handleFormatClick(value)}
            className="w-32"
          />

          <div className="w-px h-4 bg-gray-300 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("bold")}
          >
            <Bold size={14} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("italic")}
          >
            <Italic size={14} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("underline")}
          >
            <Underline size={14} />
          </Button>

          <div className="w-px h-4 bg-gray-300 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("bulletList")}
          >
            <List size={14} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("orderedList")}
          >
            <ListOrdered size={14} />
          </Button>

          <div className="w-px h-4 bg-gray-300 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("quote")}
          >
            <Quote size={14} />
          </Button>
          <div className="w-px h-4 bg-gray-300 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-muted-foreground hover:bg-gray-100"
            onClick={() => handleFormatClick("code")}
          >
            <Code size={14} />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-red-500 hover:bg-red-50"
          onClick={() => handleFormatClick("delete")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
          </svg>
        </Button>
      </div>

      <div className="">
        <div className="p-4 flex items-start gap-3">
          <div className="flex items-center text-foreground">
            <Smile size={20} />
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 resize-none border-none outline-none text-gray-800 placeholder-gray-400 text-sm leading-relaxed min-h-[80px]"
            style={{ fontFamily: "inherit" }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 border-t-1 border-border">
          <div className="p-1 flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                onClick={() => handleMediaClick("add")}
              >
                <Plus size={18} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                onClick={() => handleMediaClick("camera")}
              >
                <Mic size={18} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                onClick={() => handleMediaClick("attachment")}
              >
                <Video size={18} />
              </Button>
            </div>

            <Button variant="ghost" onClick={onSubmit} disabled={!value.trim()}>
              <SendHorizonal
                size={25}
                fill="#5a67d8"
                stroke="white"
                strokeWidth={1}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
