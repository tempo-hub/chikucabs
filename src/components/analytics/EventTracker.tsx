"use client";

import { useEffect } from "react";

export default function EventTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Find the clicked element having data-analytics-event
      const element = target.closest(
        "[data-analytics-event]"
      ) as HTMLElement | null;

      // If clicked element doesn't have analytics attribute
      if (!element) {
        return;
      }

      const eventType =
        element.dataset.analyticsEvent;

      if (!eventType) {
        return;
      }

      const analyticsData = {
        eventType,

        // Current page
        pageUrl: window.location.pathname,

        pageTitle: document.title,

        // Page information
        city: element.dataset.city || "",

        locality: element.dataset.locality || "",

        vehicle: element.dataset.vehicle || "",

        // Traffic information
        referrer: document.referrer,

        source: element.dataset.source || "",

        medium: element.dataset.medium || "",

        campaign: element.dataset.campaign || "",

        // Device
        device: getDeviceType(),

        // Anonymous session
        sessionId: getSessionId(),

        // Extra information
        metadata: {
          buttonText:
            element.textContent?.trim() || "",
        },
      };

      console.log(
        "Analytics Event:",
        analyticsData
      );

      fetch("/api/analytics/event", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(analyticsData),

        // Important when clicking links
        keepalive: true,
      }).catch((error) => {
        console.error(
          "Analytics tracking failed:",
          error
        );
      });
    };

    // Start listening for clicks
    document.addEventListener(
      "click",
      handleClick
    );

    // Remove listener when component unmounts
    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return null;
}


// --------------------------------
// Device Detection
// --------------------------------

function getDeviceType() {
  const userAgent =
    navigator.userAgent;

  if (
    /iPad|Tablet/i.test(userAgent)
  ) {
    return "tablet";
  }

  if (
    /Mobi|Android|iPhone/i.test(userAgent)
  ) {
    return "mobile";
  }

  return "desktop";
}


// --------------------------------
// Session ID
// --------------------------------

function getSessionId() {
  let sessionId =
    sessionStorage.getItem(
      "analytics_session_id"
    );

  if (!sessionId) {
    sessionId =
      crypto.randomUUID();

    sessionStorage.setItem(
      "analytics_session_id",
      sessionId
    );
  }

  return sessionId;
}