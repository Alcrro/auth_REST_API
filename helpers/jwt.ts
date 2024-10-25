import { expressjwt } from "express-jwt";
import { NextFunction, Request, Response } from "express";

export const authJwt = () => {
  const secret = process.env.JWT_SECRET!;
  const api = process.env.API_URL!;

  return (req: Request, res: Response, next: NextFunction) => {
    expressjwt({
      secret,
      algorithms: ["HS256"],
      isRevoked,
    }).unless({
      path: [
        { url: /\/api\/v1\/users(.*)/, methods: ["GET", "OPTIONS"] },
        `${api}/login`,
        `${api}/register`,
        `${api}/categories`,
        `${api}/products`,
        `${api}/profile`,
        `${api}/auth/google`,
        `${api}/auth/github`,
        `${api}/auth/user`,
        `${api}/auth/google/callback`,
        `${api}/auth/github/callback`,

        `/favicon.ico`,
        { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
      ],
    })(req, res, next); // Call the express-jwt middleware with req, res, next
  };
};

async function isRevoked(req: any, token: any) {
  if (!token.payload.isAdmin) {
    return true;
  }

  return false;
}
