"use client";

import React from "react";

interface BrowserChromeProps {
  title?: string;
  url?: string;
  children: React.ReactNode;
}

export default function BrowserChrome({
  title = "",
  url = "",
  children,
}: BrowserChromeProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      {/* Gradient border effect */}
      <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-teal-400 p-[1px] rounded-2xl">
        {/* Inner shell */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Title bar */}
          <div className="bg-gray-800 h-10 flex items-center px-4 relative">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FF5F57" }}
                aria-hidden="true"
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FFBD2E" }}
                aria-hidden="true"
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#27C93F" }}
                aria-hidden="true"
              />
            </div>
            {/* Centered title */}
            {title && (
              <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 pointer-events-none select-none">
                {title}
              </span>
            )}
          </div>

          {/* URL bar */}
          {url && (
            <div className="px-3 py-1.5">
              <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 truncate select-none">
                {url}
              </div>
            </div>
          )}

          {/* Content area */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
