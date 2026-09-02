"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

function ThemeToggleWrapper() {
  return <ThemeToggle />;
}

export default ThemeToggleWrapper;