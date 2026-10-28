const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div
        className="
          bg-cyan-500/10
          border
          border-cyan-500/20
          rounded-2xl
          px-4
          py-3
          flex
          items-center
          gap-2
        "
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>

        <span
          className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>

        <span
          className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
};

export default TypingIndicator;