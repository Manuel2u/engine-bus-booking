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
