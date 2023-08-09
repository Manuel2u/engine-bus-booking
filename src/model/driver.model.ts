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
    profilePicture: {
      type: SchemaTypes.String,
    },
  },
  { timestamps: true }
);

const driverModel = model<IDriverSchema, IDriverModel>("Driver", driverSchema);

export default driverModel;
