declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        email: string;
      };
      requestId?: string;
      log?: {
        error: (context: unknown, message?: string) => void;
      };
    }
  }
}

export {};
