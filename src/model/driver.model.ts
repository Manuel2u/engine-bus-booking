import { Schema, SchemaTypes, model } from "mongoose";
import { IDriverModel, IDriverSchema } from "../types/driver";

const driverSchema = new Schema<IDriverSchema>(
  {
    fullName: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
    },
    mobileNumber: {
      type: SchemaTypes.String,
      required: true,
    },
    postalAddress: {
      type: SchemaTypes.String,
    },
    digitalAddress: {
      type: SchemaTypes.String,
    },
    license: {
      type: SchemaTypes.String,
      required: true,
    },
    licenseClass: {
      type: SchemaTypes.String,
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      enum: ["ACTIVE", "INACTIVE", "RETIRED"],
      required: true,
    },
    profilePicture: {
      type: SchemaTypes.String,
    },
    busCompany: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "BusCompany",
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const driverModel = model<IDriverSchema, IDriverModel>("Driver", driverSchema);

export default driverModel;
