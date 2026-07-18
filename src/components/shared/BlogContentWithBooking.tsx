"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import BookingModal from "./BookingModal";

interface BlogContentWithBookingProps {
  content: string;
}

export default function BlogContentWithBooking({
  content,
}: BlogContentWithBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    // Replace [BOOK_NOW] shortcode or legacy saved button HTML with a styled button.
    const buttonHtml = `
  <div class="my-8 text-left">
    <button
      class="chiku-book-btn inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
           width="22"
           height="22"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
      🚖 Book Now
    </button>
  </div>
`;

    let newContent = content.replace(/\[BOOK_NOW\]/g, buttonHtml);

    newContent = newContent.replace(
      /<div[^>]*>\s*<a[^>]*class=["']book-now-btn["'][^>]*>[\s\S]*?<\/a>\s*<\/div>/gi,
      buttonHtml,
    );

    newContent = newContent.replace(
      /<div[^>]*>\s*<button[^>]*class=["']book-now-btn["'][^>]*>[\s\S]*?<\/button>\s*<\/div>/gi,
      buttonHtml,
    );

    newContent = newContent.replace(
      /<button[^>]*class=["']book-now-btn["'][^>]*>[\s\S]*?<\/button>/gi,
      buttonHtml,
    );

    setProcessedContent(newContent);
  }, [content]);

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Handle both the internal replacement button and legacy saved anchor markup.
    if (target.closest(".chiku-book-btn, .book-now-btn")) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className="blog-content max-w-none overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: processedContent || content }}
        onClick={handleContentClick}
      />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
