"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    distance: "",
    tripType: "One Way",
    tempoSize: "9-Seater",
    travelDate: "",
    pickupTime: "",
    name: "",
    phone: "",
    pickupPoint: "",
    notes: "",
  });

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
      { value: formData.from, label: "From City" },
      { value: formData.to, label: "To City" },
      { value: formData.distance, label: "Distance" },
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

    const distance = Number(formData.distance || 0);
    const estimatedFare = distance * 18;

    const message = `
Hi ChikuCabs,

*New Chiku Cabs Booking Request*
──────────────────────
*Route:* ${formData.from} → ${formData.to}
*Distance:* ${formData.distance} km
*Trip Type:* ${formData.tripType}
*Tempo Size:* ${formData.tempoSize}
*Travel Date:* ${formData.travelDate}
*Pickup Time:* ${formData.pickupTime}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Pickup Point:* ${formData.pickupPoint || "To be confirmed"}
*Notes:* ${formData.notes || "None"}
──────────────────────
*Estimated Fare:* ₹${estimatedFare}

_Sent via chikucabs.com booking form_
`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=916280820037&text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Cab Traveller Booking</h2>

          <button onClick={onClose} className="text-xl font-bold">
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="from"
            placeholder="From City"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="to"
            placeholder="To City"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="distance"
            placeholder="Distance (KM)"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <select
            name="tripType"
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option>One Way</option>
            <option>Round Trip</option>
          </select>

          <select
            name="tempoSize"
            className="border p-3 rounded"
            onChange={handleChange}
          >
            <option>9-Seater</option>
            <option>12-Seater</option>
            <option>16-Seater</option>
            <option>20-Seater</option>
            <option>26-Seater</option>
          </select>

          <input
            type="date"
            name="travelDate"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="time"
            name="pickupTime"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Your Name"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="pickupPoint"
            placeholder="Pickup Point"
            className="border p-3 rounded md:col-span-2"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Special Notes"
            rows={4}
            className="border p-3 rounded md:col-span-2"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
        >
          Continue on WhatsApp
        </button>
      </div>
    </div>
  );
}
