import { useState } from "react";
import { Copy, Check } from "lucide-react";

type CopyButtonProps = {
  text: string;
};

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copyMessage}
      disabled={copied}
      className="
        text-xs
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:text-green-400
        enabled:text-cyan-400
        enabled:hover:text-cyan-300
      "
    >
      <span className="flex items-center gap-1">
        {copied ? (
          <>
            <Check size={14} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy
          </>
        )}
      </span>
    </button>
  );
};

export default CopyButton;