declare global {
  namespace Express {
    interface User {
      id: string;
      hospitalId: string;
      role: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
