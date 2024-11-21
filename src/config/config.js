import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongodb: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRE || "1d",
  },
};
