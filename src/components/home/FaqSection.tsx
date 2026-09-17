// components/FaqSection.tsx
import React from "react";
import { FAQS } from "@/data/chikuData";

export default function FaqSection() {
  return (
    <section className="py-12 px-4 bg-muted/20 border-t border-border" id="faq">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-black">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="p-4 rounded-xl border border-border bg-card group cursor-pointer">
              <summary className="font-bold text-sm list-none flex justify-between items-center">
                <span>{faq.q}</span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-t border-border pt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}