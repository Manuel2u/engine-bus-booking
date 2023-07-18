import { Request, Response, NextFunction } from "express";

//initialize passport google strategy

export const initializeGoogleStrategy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.context.services?.oAuth.GoogleAuth();
      next();
    } catch (e) {
      throw e;
    }
  };
  