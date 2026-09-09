"use client";

export default function TestAnalyticsPage() {
  const testAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics/event", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          eventType: "book_now",

          pageUrl: window.location.pathname,

          pageTitle: document.title,

          city: "Noida",

          locality: "Noida Extension",

          vehicle: "Innova Crysta",

          device: "desktop",

          source: "test",

          metadata: {
            buttonText: "Test Book Now",
          },
        }),
      });

      const data = await response.json();

      console.log("Analytics response:", data);

      if (data.success) {
        alert("Analytics saved successfully!");
      } else {
        alert("Analytics failed!");
      }
    } catch (error) {
      console.error("Analytics test error:", error);

      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={testAnalytics}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Test Analytics
      </button>
    </div>
  );
}