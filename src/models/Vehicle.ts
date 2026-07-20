import mongoose, { Schema, models, model } from "mongoose";

const VehicleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    hero: {
      badge: String,
      title: String,
      description: String,
      image: String,
    },

    features: [String],

    stats: [
      {
        title: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Vehicle || model("Vehicle", VehicleSchema);