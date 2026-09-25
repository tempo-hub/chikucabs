import { Phone, MessageCircle } from "lucide-react";

interface Props {
  city: string;
}

export default function TempoFareCTA({ city }: Props) {
  const whatsappNumber = "916280820037";

  const whatsappMessage = encodeURIComponent(
    `Hello Chiku Cabs, I want to book a Tempo Traveller in ${city}. Please share the available vehicles, price and booking details.`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="bg-black/80 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-black text-white md:text-5xl">
          Ready to Book a Tempo Traveller in{" "}
          <span className="text-primary">
            {city}
          </span>
          ?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          Share your group size and travel requirement to
          get the applicable Tempo Traveller price.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#22c55e] px-7 py-3 font-bold text-white transition hover:bg-[#16a34a]"
          >
            <MessageCircle size={18} />
            Get Instant Quote
          </a>

          {/* Call */}
          <a
            href="tel:+918448445504"
            className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-primary transition hover:bg-gray-100"
          >
            <Phone size={18} />
            Call Us
          </a>

        </div>

      </div>
    </section>
  );
}