"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyToClipboard = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={copyText}
      className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-sm text-gray-600 text-sm"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

export default CopyToClipboard;
