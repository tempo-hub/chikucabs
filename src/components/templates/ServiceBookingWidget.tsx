"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";

export default function ServiceBookingWidget({ vehicle }: { vehicle: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetEstimate = () => {
    if (!pickupLocation || !dropLocation || !travelDate || !travelTime) {
      toast.error("Please fill all fields");
      return;
    }

    const message = `
🚖 Fare Estimate Request

📍 Pickup: ${pickupLocation}
🎯 Drop: ${dropLocation}
📅 Date: ${travelDate}
⏰ Time: ${travelTime}
🚘 Vehicle: ${vehicle}
`;

    const whatsappUrl = `https://wa.me/919818022327?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${period}`;
  });

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-gray-900 text-white shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">🎁</span>
                  <span className="font-bold">Use Code:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-800 px-3 py-1 rounded font-mono text-yellow-400">
                      CHIKUCABS10
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("CHIKUCABS10");
                        toast.success("Promo code copied!");
                      }}
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="text-sm opacity-90">
                  to get{" "}
                  <span className="font-bold text-yellow-400">10% OFF</span>
                </div>
              </div>

              <a
                href="tel:+919818022327"
                className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
              >
                📞 Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
        <h3 className="text-2xl font-bold mb-4">Book Your {vehicle}</h3>
        <p className="text-gray-600 mb-6">
          Get instant confirmation &amp; best price
        </p>

        <form className="space-y-5">
          <div className="relative">
            <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />
            <input
              type="text"
              value={pickupLocation}
              onChange={(event) => setPickupLocation(event.target.value)}
              placeholder="Enter Pickup Location"
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
            />
          </div>

          <div className="relative">
            <TbTargetArrow className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg" />
            <input
              type="text"
              value={dropLocation}
              onChange={(event) => setDropLocation(event.target.value)}
              placeholder="Enter Drop Location"
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <SlCalender className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base" />
              <input
                type="date"
                value={travelDate}
                onChange={(event) => setTravelDate(event.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
              />
            </div>

            <div className="relative">
              <FaRegClock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-base" />
              <select
                value={travelTime}
                onChange={(event) => setTravelTime(event.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl"
              >
                <option value="">Select Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGetEstimate}
            className="group w-full h-14 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              Get Fare Estimate
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 pt-1">
            <span>✓ No Booking Fee</span>
            <span>•</span>
            <span>✓ Easy Cancellation</span>
            <span>•</span>
            <span>✓ 24×7 Support</span>
          </div>
        </form>
      </div>
    </>
  );
}
