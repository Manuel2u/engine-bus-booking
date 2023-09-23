import { Router } from "express";
import path from "path";
import { UPLOAD_FILES } from "../controllers/file.controller";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".pdf"];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const extname = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extname)) {
      return cb(
        new Error("Only .png, .jpg, .jpeg, and .pdf files are allowed")
      );
    }

    if (file.size > maxFileSize) {
      return cb(new Error("File size exceeds 10MB"));
    }

    cb(null, true);
  },
});

router.post("/files", upload.any(), UPLOAD_FILES);

export default router;
