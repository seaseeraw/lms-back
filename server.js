<<<<<<< HEAD
import express from "express";
import cors from "cors";
import { config } from "./src/config/config.js";
import { connectMongoDB } from "./src/config/mongoConfig.js";
import userRouter from "./src/routes/userRouter.js";

// Express
const app = express();
const PORT = config.port;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);

// default response
app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

app.get("/api-health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

connectMongoDB()
  .then(() => {
    console.log("Connected to DB: ", config.mongodb.url);
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log(`server is runing at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to Database");
  });
=======
import express from 'express'
import { connetMongoDB } from './src/config/mongoConfig.js';
const app =express()
const PORT =process.env.PORT || 8000;

// connetMongoDB()

// Router
app.get("/",(res,req)=>{
    console.log("calling")
    res.send("docne")
})


// Listen
connetMongoDB()
.then(()=>{
    app.listen(PORT,(error)=>{
        error
        ? console.log(error)
        :console.log(`server iis running http://localhost:${PORT} `)
    });
})
.catch((error)=> console.error(error));
// app.listen(PORT,(error)=>{
//     error
//     ? console.log(error)
//     :console.log(`server iis running http://localhost:${PORT} `)
// });
>>>>>>> 8c1d449dc92e3403c1bcb75f273cf0a8337358f0
