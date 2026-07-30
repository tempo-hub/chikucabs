"use client";

import React, { useState, useEffect, useRef } from "react";
import BookingModal from "./BookingModal";

interface BlogContentWithBookingProps {
  content: string;
}

export default function BlogContentWithBooking({
  content,
}: BlogContentWithBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processedContent, setProcessedContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Step 1: Replace [BOOK_NOW] / [WHATSAPP_CHAT] shortcodes / legacy HTML ── */
  useEffect(() => {
    /* ---- Book Now button ---- */
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

    /* ---- WhatsApp Chat button (real <a> — opens WhatsApp directly) ---- */
    const waMessage = encodeURIComponent("Hi ChikuCabs, I'd like to enquire about a cab booking.");
    const waUrl = `https://wa.me/918448445504?text=${waMessage}`;
    const whatsappHtml = `
  <div class="my-8 text-left">
    <a
      href="${waUrl}"
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-link="true"
      class="chiku-whatsapp-btn inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.35 22.616c-.392 1.1-1.938 2.016-3.16 2.282-.838.18-1.934.322-5.624-1.208-4.718-1.958-7.756-6.744-7.994-7.058-.228-.314-1.912-2.546-1.912-4.858 0-2.312 1.21-3.45 1.64-3.92.392-.428 1.028-.626 1.636-.626.196 0 .374.01.534.018.47.02.706.048 1.016.786.388.926 1.332 3.244 1.45 3.48.118.238.236.556.078.87-.148.322-.278.466-.516.738-.238.27-.464.478-.702.77-.22.254-.466.528-.198.998.268.466 1.194 1.966 2.562 3.186 1.762 1.572 3.248 2.058 3.71 2.288.47.236.742.198 1.016-.118.278-.318 1.186-1.382 1.502-1.856.314-.47.632-.392 1.066-.236.436.158 2.756 1.298 3.226 1.534.47.236.784.354.9.548.118.196.118 1.128-.274 2.228z"/>
      </svg>
      💬 Chat on WhatsApp
    </a>
  </div>
`;

    let newContent = content;

    /* [BOOK_NOW] shortcode */
    newContent = newContent.replace(/\[BOOK_NOW\]/g, buttonHtml);

    /* [WHATSAPP_CHAT] shortcode */
    newContent = newContent.replace(/\[WHATSAPP_CHAT\]/g, whatsappHtml);

    /* Legacy book-now-btn class patterns */
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

  /* ── Step 2: After content renders, directly attach click listeners to Book Now buttons ──
     WhatsApp <a href="https://wa.me/..."> links are NOT touched — they work natively. */
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const bookBtns = container.querySelectorAll<HTMLElement>(
      ".chiku-book-btn, .book-now-btn",
    );

    const handleBookClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
    };

    bookBtns.forEach((btn) => {
      btn.addEventListener("click", handleBookClick);
    });

    /* Cleanup when content changes */
    return () => {
      bookBtns.forEach((btn) => {
        btn.removeEventListener("click", handleBookClick);
      });
    };
  }, [processedContent]);

  return (
    <>
      <div
        ref={contentRef}
        className="blog-content max-w-none overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: processedContent || content }}
      />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
