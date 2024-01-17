import { Schema, model, SchemaTypes, CallbackError, Model } from "mongoose";
import { IAdminModel, IAdminSchema } from "../types/user";
import bcrypt from "bcrypt";

const AdminSchema = new Schema<IAdminSchema>(
  {
    fullName: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
    },
    altEmail: {
      type: SchemaTypes.String,
      required: false,
    },
    phone: {
      type: SchemaTypes.String,
      required: true,
    },
    profilePicture: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    bio: {
      type: SchemaTypes.String,
      required: false,
    },
    jobTitle: {
      type: SchemaTypes.String,
      required: false,
    },
    busCompany: {
      type: SchemaTypes.ObjectId,
      ref: "BusCompany",
      required: true,
    },
    role: {
      type: SchemaTypes.String,
      enum: ["BUS_COMPANY", "ADMIN"],
      required: true,
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

AdminSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const AdminModel = model<IAdminSchema, IAdminModel>("Admin", AdminSchema);

export default AdminModel;
