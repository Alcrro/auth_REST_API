import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./infrastructure/db/mongoDB";
import helmet from "helmet";
import passport from "passport";
// Import passport configuration
import session from "express-session";

connectDB();
const server = express();

//load routes files
import { authJwt } from "./helpers/jwt";
import { errorHandler } from "./helpers/error-handler";
import auth from "./infrastructure/routes/Auth.route";
import userRouter from "./infrastructure/routes/User.route";
import categoryRouter from "./infrastructure/routes/Categories.route";
// import productRouter from "./infrastructure/routes/Product.route";
import productRouter from "./routes/productRoutes";

// import { externalAuthRoute } from "./routes/ExtAuth.route";

//middleware
server.use(bodyParser.json());
server.use(express.json());
server.use(errorHandler);
server.use(morgan("tiny"));
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    },
  })
);
server.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
server.use(passport.initialize());
server.use(passport.session());
server.use("/api/v1", productRouter);
server.use(authJwt());

// Enable CORS for communication between frontend (Next.js) and backend
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

// server.use("/api/v1", externalAuthRoute);
server.use("/api/v1", auth);
server.use("/api/v1", userRouter);
server.use("/api/v1", categoryRouter);

server.listen(process.env.PORT_API, () => {
  console.log(
    `server running at host: ${process.env.HOST_API}:${process.env.PORT_API}`
  );
});
