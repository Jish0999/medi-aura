import ReactMarkdown from "react-markdown"
import CopyButton from "./CopyButton";
import { RotateCcw } from "lucide-react";

type ChatBubbleProps = {
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
  isLastMessage: boolean;
  onRegenerate: () => void;
  isTyping: boolean;
};
const markdownComponents = {
              p: ({ children }) => (
                <p className="mb-2 leading-7">
                  {children}
                </p>
              ),

              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-3 mt-2 text-cyan-300">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2 mt-3 text-cyan-200">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-base font-semibold mb-2 mt-2 text-cyan-100">
                  {children}
                </h3>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="leading-7">
                  {children}
                </li>
              ),

              code: ({ children, className }) => {
                const isCodeBlock = className?.startsWith("language-");

                if (isCodeBlock) {
                  return (
                    <code className={className}>
                      {children}
                    </code>
                  );
                }

                return (
                  <code
                    className="
                      bg-slate-800
                      text-cyan-300
                      px-1.5
                      py-0.5
                      rounded
                      text-sm
                      font-mono
                    "
                  >
                    {children}
                  </code>
                );
              },

              pre: ({ children }) => (
              <pre
                className="
                  bg-slate-900
                  border
                  border-cyan-500/20
                  rounded-lg
                  p-4
                  overflow-x-auto
                  my-4
                "
              >
                {children}
              </pre>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-cyan-400
                  underline
                  hover:text-cyan-300
                  transition-colors
                "
              >
                {children}
              </a>
            ),
          }

const ChatBubble = ({
  sender,
  text,
  timestamp,
  isLastMessage,
  onRegenerate,
  isTyping,
}: ChatBubbleProps) => {

  const formattedTime = timestamp.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  });

  return (
    <div
      className={`flex mb-4 ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          p-4
          rounded-2xl
          max-w-[80%]
          ${
            sender === "ai"
              ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
              : "bg-cyan-500 text-white"
          }
        `}
      >
        {/* Message */}
        <div
          className="
            prose
            prose-invert
            max-w-none
            break-words
          "
        >
          <ReactMarkdown
            components={markdownComponents}
          >
            {text}
          </ReactMarkdown>
        </div>

        {/* Timestamp */}
        <div className="mt-2 flex items-center justify-between">

            {sender === "ai" && (
              <div className="flex items-center gap-3">
                <CopyButton text={text} />

                {isLastMessage && (
                  <button
                    onClick={onRegenerate}
                    disabled={isTyping}
                    className="
                      text-xs
                      transition-colors
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      text-cyan-400
                      hover:text-cyan-300
                      disabled:hover:text-cyan-400
                    "
                  >
                    <span className="flex items-center gap-1">
                      <RotateCcw
                        className={`
                          w-3.5
                          h-3.5
                          ${isTyping ? "animate-spin" : ""}
                        `}
                      />

                      {isTyping ? "Regenerating..." : "Regenerate"}
                    </span>
              </button>
            )}
          </div>
        )}

          <p
            className={`text-[10px] ${
              sender === "user"
                ? "text-cyan-100"
                : "text-gray-400"
            }`}
          >
            {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;