import { Schema, model, SchemaTypes, CallbackError, Model } from "mongoose";
import { ISudoAdminModel, ISudoAdminSchema } from "../types/user";
import bcrypt from "bcrypt";

const SudoAdminSchema = new Schema<ISudoAdminSchema>(
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
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    role: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  { timestamps: true }
);

SudoAdminSchema.pre("save", async function (next) {
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

SudoAdminSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const SudoAdminModel = model<ISudoAdminSchema, ISudoAdminModel>(
  "SudoAdmin",
  SudoAdminSchema
);

export default SudoAdminModel;
