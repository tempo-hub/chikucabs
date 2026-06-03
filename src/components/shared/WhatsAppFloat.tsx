"use client";

import { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

// Helper function to extract vehicle name from element text
function extractVehicleFromText(text: string): string | undefined {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes("sedan") || lowerText.includes("dzire") || lowerText.includes("etios")) {
    return "Sedan (4+1 Seater)";
  }
  if (lowerText.includes("suv") || lowerText.includes("ertiga") || lowerText.includes("marazzo")) {
    return "SUV (6+1 Seater)";
  }
  if (lowerText.includes("innova") || lowerText.includes("crysta")) {
    return "Innova (7+1 Seater)";
  }
  if (
    lowerText.includes("tempo") ||
    lowerText.includes("traveller") ||
    lowerText.includes("urbania") ||
    lowerText.includes("minibus") ||
    lowerText.includes("seater")
  ) {
    const match = lowerText.match(/(\d+)-seater/);
    if (match) {
      const seats = match[1];
      if (seats === "9") return "9-Seater (Best for families)";
      if (seats === "12") return "12-Seater (Popular for pilgrimages)";
      if (seats === "13") return "13-Seater (Popular for pilgrimages)";
      if (seats === "15") return "15-Seater (Comfortable group)";
      if (seats === "16") return "16-Seater";
      if (seats === "17") return "17-Seater";
      if (seats === "20") return "20-Seater (Large groups)";
      if (seats === "21") return "21-Seater (Large groups)";
      if (seats === "24") return "24-Seater (Large groups)";
      if (seats === "26") return "26-Seater (Wedding/Baraat special)";
    }
    
    if (lowerText.includes("9")) return "9-Seater (Best for families)";
    if (lowerText.includes("12")) return "12-Seater (Popular for pilgrimages)";
    if (lowerText.includes("13")) return "13-Seater (Popular for pilgrimages)";
    if (lowerText.includes("15")) return "15-Seater (Comfortable group)";
    if (lowerText.includes("16")) return "16-Seater";
    if (lowerText.includes("17")) return "17-Seater";
    if (lowerText.includes("20")) return "20-Seater (Large groups)";
    if (lowerText.includes("21")) return "21-Seater (Large groups)";
    if (lowerText.includes("24")) return "24-Seater (Large groups)";
    if (lowerText.includes("26")) return "26-Seater (Wedding/Baraat special)";
    
    return "9-Seater (Best for families)";
  }
  return undefined;
}

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === "A" || target.tagName === "BUTTON") {
          const href = target.getAttribute("href") || "";
          const text = (target.textContent || "").trim();
          const className = target.className || "";

          // Don't intercept if clicking inside the booking modal content
          const isInsideModal = target.closest(".booking-modal-content") || target.closest(".fixed.inset-0.z-\\[100\\]");
          if (isInsideModal) {
            return;
          }

          const hasWhatsAppText = /whatsapp/i.test(text);
          const hasBookNowText = /book\s+now/i.test(text);
          const isWhatsAppHref = href.includes("wa.me") || href.includes("api.whatsapp");
          const isCallHref = href.startsWith("tel:");
          
          let isCTA = false;
          if (isCallHref) {
            // Only intercept tel: links if they explicitly say "Book Now" (case insensitive, ignoring icon emojis/spaces)
            const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (cleanText === "booknow") {
              isCTA = true;
            } else {
              isCTA = false; // Bypass completely for phone call links
            }
          } else {
            if (isWhatsAppHref || hasWhatsAppText || className.includes("whatsapp-float") || className.includes("footer-whatsapp")) {
              isCTA = true;
            } else if (hasBookNowText) {
              isCTA = true;
            }
          }

          if (isCTA) {
            e.preventDefault();
            e.stopPropagation();

            // Try to find if this button is inside a package-card to extract the vehicle name
            let cardVehicle: string | null = null;
            const packageCard = target.closest(".package-card");
            if (packageCard) {
              const h3 = packageCard.querySelector("h3");
              if (h3) {
                cardVehicle = h3.textContent;
              }
            }

            const vehicle = extractVehicleFromText(cardVehicle || text || target.getAttribute("aria-label") || "");
            setVehicleType(vehicle);
            setOpen(true);
            return;
          }
        }
        target = target.parentElement;
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setVehicleType(undefined);
          setOpen(true);
        }}
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.35 22.616c-.392 1.1-1.938 2.016-3.16 2.282-.838.18-1.934.322-5.624-1.208-4.718-1.958-7.756-6.744-7.994-7.058-.228-.314-1.912-2.546-1.912-4.858 0-2.312 1.21-3.45 1.64-3.92.392-.428 1.028-.626 1.636-.626.196 0 .374.01.534.018.47.02.706.048 1.016.786.388.926 1.332 3.244 1.45 3.48.118.238.236.556.078.87-.148.322-.278.466-.516.738-.238.27-.464.478-.702.77-.22.254-.466.528-.198.998.268.466 1.194 1.966 2.562 3.186 1.762 1.572 3.248 2.058 3.71 2.288.47.236.742.198 1.016-.118.278-.318 1.186-1.382 1.502-1.856.314-.47.632-.392 1.066-.236.436.158 2.756 1.298 3.226 1.534.47.236.784.354.9.548.118.196.118 1.128-.274 2.228z" />
        </svg>

        <span className="whatsapp-float-label">
          Chat with us
        </span>
      </button>

      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        vehicleType={vehicleType}
      />
    </>
  );
}