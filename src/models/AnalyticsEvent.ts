import mongoose, { Schema, models, model } from "mongoose";

const AnalyticsEventSchema = new Schema(
  {
    eventType: {
      type: String,
      enum: [
        "page_view",
        "book_now",
        "call_now",
        "whatsapp",
        "form_open",
        "form_submit",
      ],
      required: true,
    },

    pageUrl: {
      type: String,
      required: true,
    },

    pageTitle: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    locality: {
      type: String,
      default: "",
    },

    vehicle: {
      type: String,
      default: "",
    },

    referrer: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "",
    },

    medium: {
      type: String,
      default: "",
    },

    campaign: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "unknown",
    },

    sessionId: {
      type: String,
      default: "",
    },

    // User provides these voluntarily through a form
    userName: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    bookingDetails: {
      from: {
        type: String,
        default: "",
      },

      to: {
        type: String,
        default: "",
      },

      date: {
        type: String,
        default: "",
      },

      time: {
        type: String,
        default: "",
      },

      passengers: {
        type: Number,
        default: 0,
      },
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const AnalyticsEvent =
  models.AnalyticsEvent ||
  model("AnalyticsEvent", AnalyticsEventSchema);

export default AnalyticsEvent;