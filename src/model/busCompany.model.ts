import { Schema, SchemaTypes, model } from "mongoose";
import { IbusCompanyModel, IbusCompanySchema } from "../types/busCompany";

const busCompanySchema = new Schema<IbusCompanySchema>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  mobileNumber: {
    type: SchemaTypes.String,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  users: [
    {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  companyDocuments: {
    type: SchemaTypes.String,
    required: true,
  },
  contactPersonEmail: {
    type: SchemaTypes.String,
    required: true,
  },
  contactPersonName: {
    type: SchemaTypes.String,
    required: true,
  },
  contactPersonPhone: {
    type: SchemaTypes.String,
    required: true,
  },
  contactPersonPosition: {
    type: SchemaTypes.String,
    required: true,
  },
  socials: {
    type: [
      new Schema({
        name: {
          type: SchemaTypes.String,
          required: false,
        },
        link: {
          type: SchemaTypes.String,
          required: false,
        },
      }),
    ],
    required: false,
  },
  tagline: {
    type: SchemaTypes.String,
    required: false,
  },
  logo: {
    type: SchemaTypes.String,
    required: false,
  },
  address: {
    type: new Schema({
      country: {
        type: SchemaTypes.String,
        required: false,
      },
      state: {
        type: SchemaTypes.String,
        required: false,
      },
      city: {
        type: SchemaTypes.String,
        required: false,
      },
      street: {
        type: SchemaTypes.String,
        required: false,
      },
    }),
    required: false,
  },
  note: {
    type: SchemaTypes.String,
    required: false,
  },
  Buses: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Bus",
      required: true,
    },
  ],
  Drivers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Driver",
      required: true,
    },
  ],

  Trips: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Trip",
      required: true,
    },
  ],
  Bookings: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Booking",
      required: true,
    },
  ],
  status: {
    type: SchemaTypes.String,
    enum: ["APPROVED", "REJECTED", "PENDING"],
    required: true,
  },
});

const busCompanyModel = model<IbusCompanySchema, IbusCompanyModel>(
  "BusCompany",
  busCompanySchema
);

export default busCompanyModel;
