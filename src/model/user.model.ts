import { Schema, model, SchemaTypes, CallbackError, Model } from "mongoose";
import { IUserModel, IUserSchema } from "../types/user";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUserSchema>(
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
    isPhoneNumberVerified: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    isEmailVerified: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    googleID: {
      type: SchemaTypes.String,
    },
    faceBookID: {
      type: SchemaTypes.String,
    },
    appleID: {
      type: SchemaTypes.String,
    },
    Bookings: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Bookings",
      },
    ],
    Tickets: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Tickets",
      },
    ],
    role: {
      type: SchemaTypes.String,
      enum: ["USER"],
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
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

UserSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = model<IUserSchema, IUserModel>("User", UserSchema);

export default UserModel;
