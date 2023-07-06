import { Schema, SchemaTypes, model } from "mongoose";
import { ICodeModel, ICodeSchema } from "../types/code";

const codeSchema = new Schema<ICodeSchema>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    code: {
      type: SchemaTypes.Number,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expires: "1h" },
    },
  },
  { timestamps: true }
);

const codeModel = model<ICodeSchema, ICodeModel>("Code", codeSchema);

export default codeModel;
