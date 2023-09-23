import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

interface FileData {
  [fieldName: string]: {
    fileName: string;
    url: string;
  }[];
}

export const UPLOAD_FILES = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filesData: FileData = {};

    const files = Array.isArray(req.files) ? req.files : [req.file];

    for (const file of files || []) {
      const fieldName = file?.fieldname;
      const fileBuffer = file?.buffer;
      const originalName = file?.originalname;
      const mimeType = file?.mimetype;

      if (fieldName && fileBuffer && originalName && mimeType) {
        // Use the fieldName as the folder name
        const folderName = fieldName;

        const url = await req.context.services?.firebaseStorage.uploadFile({
          file: fileBuffer,
          fileName: originalName,
          folderName: folderName,
          mimeType: mimeType,
        });

        if (!filesData[fieldName]) {
          filesData[fieldName] = [];
        }

        filesData[fieldName].push({
          fileName: originalName,
          url: url!,
        });
      }
    }

    return res.status(201).json({
      status: "success",
      data: filesData,
    });
  } catch (e) {
    next(e);
  }
};
