import { Request, Response } from "express";

const testConnection = (req: Request, res: Response): void => {
  const referer = req.get("referer") || req.headers.referer;
  const origin = req.get("origin") || req.headers.origin;

  res.send(
    `Express + TypeScript Server Reached.\nEndpoint "/api/test/" hit by:\nReferer: ${referer}\nOrigin: ${origin}`
  );
};

export { testConnection };
