import { Request, Response, NextFunction } from "express";
import path from "path";

export const fileUploadValidator = (
  allowedExtensions: string[],
  maxFileSize: number
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files = Array.isArray(req.files)
      ? req.files
      : [req.file]?.filter(Boolean);

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "No files uploaded",
      });
    }

    for (const file of files) {
      // Use optional chaining to safely access file properties
      const fileSize = file?.size;
      const extname = path.extname(file?.originalname || "").toLowerCase();

      // Check file size (10MB limit)
      if (fileSize && fileSize > maxFileSize) {
        return res.status(400).json({
          status: "failed",
          message: "File size exceeds 10MB",
        });
      }

      // Check file extension
      if (!allowedExtensions.includes(extname)) {
        return res.status(400).json({
          status: "failed",
          message: "Only .png, .jpg, .jpeg, and .pdf files are allowed",
        });
      }
    }

    const { folder } = req.body;
    if (!folder) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fields are correct",
      });
    }

    next();
  };
};
