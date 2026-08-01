"use client";

import { ArrowUp, Sparkles } from "lucide-react";

import { useState } from "react";
export default function SearchBar({
  placeholder = "Ask Himesh AI about my projects, experience, or skills...",
  onSearch,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = query.trim();
    if (!value) return;

    onSearch?.(value);
    console.log(value);

    // setQuery(""); // Uncomment if you want to clear after submit
  };

  return (
    <div className="w-full max-w-5xl">
      <form onSubmit={handleSubmit}>
       <div
  className="
    flex items-center
    rounded-full
    border border-[--line]
    bg-[--panel]
    px-4 py-1
    transition-all duration-200
    focus-within:border-[--accent]
    focus-within:shadow-[0_0_20px_rgba(45,243,163,0.12)]
"
>
  {/* AI Icon */}
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[--chip-bg] border border-[--line]">
    <Sparkles className="h-4 w-4 text-[--accent]" />
  </div>

  <input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder={placeholder}
    className="
      flex-1
      bg-transparent
      px-3
      text-sm
      outline-none
      border-none
      ring-0
      focus:outline-none
      focus:ring-0
      placeholder:text-[--muted]
    "
  />

  <button
    type="submit"
    className="
      flex h-9 w-9 items-center justify-center
      rounded-full
      bg-[--accent]
      text-black
      transition-all
      hover:scale-105
      active:scale-95
    "
  >
    <ArrowUp className="h-4 w-4" />
  </button>
</div>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {[
          "Tell me about yourself",
          "Show AI Projects",
          "Experience",
          "Resume",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setQuery(item)}
            className="rounded-full border border-[--line] px-3 py-1 text-xs text-[--muted] transition hover:border-[--accent] hover:text-[--page-fg]"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}