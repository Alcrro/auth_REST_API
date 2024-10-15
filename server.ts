import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./configs/mongoDB";
import { authJwt } from "./helpers/jwt";
import { errorHandler } from "./helpers/error-handler";
import { auth } from "./routes/Auth.route";
import { userRouter } from "./routes/User.route";
import { categoryRouter } from "./routes/Categories.route";
import { productRouter } from "./routes/Product.route";
import helmet from "helmet";

connectDB();
const server = express();

//load routes files

//middleware
server.use(bodyParser.json());
server.use(express.json());
server.use(morgan("tiny"));
server.use(errorHandler);
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
server.use(authJwt());

server.use("/api/v1", auth);
server.use("/api/v1", userRouter);
server.use("/api/v1", categoryRouter);
server.use("/api/v1", productRouter);

server.listen(process.env.PORT_API, () => {
  console.log(
    `server running at host: ${process.env.HOST_API}:${process.env.PORT_API}`
  );
});
