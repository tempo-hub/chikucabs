"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import BookingModal from "./BookingModal";

interface BlogContentWithBookingProps {
  content: string;
}

export default function BlogContentWithBooking({ content }: BlogContentWithBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    // Replace [BOOK_NOW] shortcode with a styled button HTML
    const buttonHtml = `
      <div class="my-8 text-center">
        <button class="chiku-book-btn inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-lg w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
          Book Now
        </button>
      </div>
    `;
    
    // Replace all occurrences of [BOOK_NOW]
    const newContent = content.replace(/\[BOOK_NOW\]/g, buttonHtml);
    
    // If no shortcode is found, optionally we could append it to the end, 
    // but it's better to let the author decide where to put it.
    setProcessedContent(newContent);
  }, [content]);

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Check if the clicked element or any of its parents have the 'chiku-book-btn' class
    if (target.closest('.chiku-book-btn')) {
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
