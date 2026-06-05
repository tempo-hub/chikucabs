"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicleType?: string;
};

const normalizeVehicleType = (v: string): string => {
  const lower = v.toLowerCase();
  if (
    lower.includes("sedan") ||
    lower.includes("dzire") ||
    lower.includes("etios")
  ) {
    return "Sedan (4+1 Seater)";
  }
  if (
    lower.includes("suv") ||
    lower.includes("ertiga") ||
    lower.includes("marazzo")
  ) {
    return "SUV (6+1 Seater)";
  }
  if (lower.includes("innova") || lower.includes("crysta")) {
    return "Innova (7+1 Seater)";
  }
  if (
    lower.includes("9-seater") ||
    lower.includes("9 seater") ||
    lower === "9s" ||
    lower === "9"
  ) {
    return "9-Seater (Best for families)";
  }
  if (
    lower.includes("12-seater") ||
    lower.includes("12 seater") ||
    lower === "12s" ||
    lower === "12"
  ) {
    if (lower.includes("urbania")) return "12-Seater Urbania";
    return "12-Seater (Popular for pilgrimages)";
  }
  if (
    lower.includes("13-seater") ||
    lower.includes("13 seater") ||
    lower === "13s" ||
    lower === "13"
  ) {
    return "13-Seater (Popular for pilgrimages)";
  }
  if (
    lower.includes("15-seater") ||
    lower.includes("15 seater") ||
    lower === "15s" ||
    lower === "15"
  ) {
    return "15-Seater (Comfortable group)";
  }
  if (
    lower.includes("16-seater") ||
    lower.includes("16 seater") ||
    lower === "16s" ||
    lower === "16"
  ) {
    return "16-Seater";
  }
  if (
    lower.includes("17-seater") ||
    lower.includes("17 seater") ||
    lower === "17s" ||
    lower === "17"
  ) {
    if (lower.includes("urbania")) return "17-Seater Urbania";
    return "17-Seater";
  }
  if (
    lower.includes("20-seater") ||
    lower.includes("20 seater") ||
    lower === "20s" ||
    lower === "20"
  ) {
    return "20-Seater (Large groups)";
  }
  if (
    lower.includes("21-seater") ||
    lower.includes("21 seater") ||
    lower === "21s" ||
    lower === "21"
  ) {
    return "21-Seater (Large groups)";
  }
  if (
    lower.includes("24-seater") ||
    lower.includes("24 seater") ||
    lower === "24s" ||
    lower === "24"
  ) {
    return "24-Seater (Large groups)";
  }
  if (
    lower.includes("26-seater") ||
    lower.includes("26 seater") ||
    lower === "26s" ||
    lower === "26"
  ) {
    return "26-Seater (Wedding/Baraat special)";
  }
  if (lower.includes("urbania")) {
    if (lower.includes("17")) return "17-Seater Urbania";
    return "12-Seater Urbania";
  }
  if (lower.includes("minibus") || lower.includes("bus")) {
    return "Minibus";
  }
  return "9-Seater (Best for families)";
};

const getEstimatedFare = (vehicle: string) => {
  const v = vehicle.toLowerCase();
  if (v.includes("sedan") || v.includes("dzire") || v.includes("etios"))
    return "₹9/km";
  if (v.includes("suv") || v.includes("ertiga") || v.includes("marazzo"))
    return "₹12/km";
  if (v.includes("innova")) return "₹15/km";
  return "₹9/km";
};

export default function BookingModal({
  isOpen,
  onClose,
  vehicleType,
}: BookingModalProps) {

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    tripType: "One Way",
    tempoSize: vehicleType
      ? normalizeVehicleType(vehicleType)
      : "9-Seater (Best for families)",
    travelDate: "",
    pickupTime: "",
    name: "",
    phone: "",
    pickupPoint: "",
    notes: "",
  });

  useEffect(() => {
    if (vehicleType) {
      setFormData((prev) => ({
        ...prev,
        tempoSize: normalizeVehicleType(vehicleType),
      }));
    }
  }, [vehicleType]);

  const timeOptions = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;

      timeOptions.push(
        `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`,
      );
    }
  }

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      { value: formData.from, label: "Pickup City" },
      { value: formData.to, label: "Destination City" },
      { value: formData.travelDate, label: "Travel Date" },
      { value: formData.pickupTime, label: "Pickup Time" },
      { value: formData.name, label: "Name" },
      { value: formData.phone, label: "Phone Number" },
      { value: formData.pickupPoint, label: "Pickup Point" },
    ];

    const missingField = requiredFields.find((field) => !field.value.trim());

    if (missingField) {
      toast.error(`${missingField.label} is required.`);
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    const isTempo = /seater|urbania|minibus/i.test(formData.tempoSize);
    const bookingTitle = isTempo
      ? "New Tempo Traveller Booking Request"
      : "New Cab Booking Request";
    const vehicleLabel = isTempo ? "Tempo Size" : "Vehicle Type";

    const message = `
Hi ChikuCabs,

*${bookingTitle}*
──────────────────────
*Route:* ${formData.from} → ${formData.to}
*Trip Type:* ${formData.tripType}
*${vehicleLabel}:* ${formData.tempoSize}
*Travel Date:* ${formData.travelDate}
*Pickup Time:* ${formData.pickupTime}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Pickup Point:* ${formData.pickupPoint || "To be confirmed"}
*Notes:* ${formData.notes || "None"}

_Sent via chikucabs.com booking form_
`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=916280820037&text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header with Branding */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Book Your Cab Traveller
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Varanasi's most trusted group transport
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* From City - Varanasi focused */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Pickup City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="from"
                placeholder="e.g. Varanasi, Ayodhya"
                className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400"
                onChange={handleChange}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                Home city
              </span>
            </div>
          </div>

          {/* To City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Destination City <span className="text-red-500">*</span>
            </label>
            <input
              name="to"
              placeholder="e.g. Prayagraj, Ayodhya, Chitrakoot"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400"
              onChange={handleChange}
            />
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Trip Type
            </label>
            <select
              name="tripType"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 hover:border-gray-400"
              onChange={handleChange}
            >
              <option>One Way</option>
              <option>Round Trip</option>
              <option>Local Sightseeing (Varanasi)</option>
              <option>Wedding/Baraat Package</option>
              <option>Multi-Day Pilgrimage Tour</option>
            </select>
          </div>

          {/* Vehicle Type / Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Vehicle Type / Size
            </label>
            <select
              name="tempoSize"
              value={formData.tempoSize}
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 hover:border-gray-400"
              onChange={handleChange}
            >
              <option>Sedan (4+1 Seater)</option>
              <option>SUV (6+1 Seater)</option>
              <option>Innova (7+1 Seater)</option>
              <option>9-Seater (Best for families)</option>
              <option>12-Seater (Popular for pilgrimages)</option>
              <option>13-Seater (Popular for pilgrimages)</option>
              <option>15-Seater (Comfortable group)</option>
              <option>16-Seater</option>
              <option>17-Seater</option>
              <option>20-Seater (Large groups)</option>
              <option>21-Seater (Large groups)</option>
              <option>24-Seater (Large groups)</option>
              <option>26-Seater (Wedding/Baraat special)</option>
              <option>12-Seater Urbania</option>
              <option>17-Seater Urbania</option>
              <option>Minibus</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Maharaja luxury available for VIP travel
            </p>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Travel Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="travelDate"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[#FE6A01] focus:ring-2 focus:ring-[#FE6A01]/20 focus:outline-none transition-all duration-200 hover:border-gray-400"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Book 3-7 days in advance for best fare
            </p>
          </div>

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Preferred Pickup Time <span className="text-red-500">*</span>
            </label>
            <select
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 hover:border-gray-400"
            >
              <option value="">Select Pickup Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400"
              onChange={handleChange}
            />
          </div>

          {/* Phone with local hint */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              maxLength={10}
              name="phone"
              placeholder="10-digit mobile number"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              You'll receive confirmation on WhatsApp
            </p>
          </div>

          {/* Pickup Point */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Exact Pickup Location <span className="text-red-500">*</span>
            </label>
            <input
              name="pickupPoint"
              placeholder="Hotel name, Airport, Railway Station, or Home address in Varanasi"
              className="w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              ✓ Doorstep pickup & drop available
            </p>
          </div>

          {/* Special Requirements aligned with website offerings */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Special Requirements
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="e.g., Need decorated tempo for wedding, extra luggage space, wheelchair accessible, driver night stay needed, multi-day itinerary..."
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))]/20 focus:outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 resize-y"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll accommodate all requests — just let us know!
            </p>
          </div>
        </div>

        {/* Price Estimate & CTA */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="bg-[hsl(var(--primary))]/5 rounded-lg p-3 mb-4 flex justify-between items-center border border-[hsl(var(--primary))]/15">
            <div>
              <p className="text-xs text-[hsl(var(--primary))] font-medium">
                Estimated Fare (starting from)
              </p>
              <p className="text-xl font-bold text-[hsl(var(--primary))]">
                {getEstimatedFare(formData.tempoSize)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(var(--primary))]">
                Fixed price • No surge
              </p>
              <p className="text-xs text-[hsl(var(--primary))]">
                Driver charges included
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>📱</span>
            Continue on WhatsApp (60s Booking)
            <span>→</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">
            No spam calls. Our team will confirm within 4 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
