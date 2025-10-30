import express from "express";
import MongoDBConnection from "./db.js";
import "dotenv/config";

// import routers
import registrationRouter from "./routes/registration.js";
import loginRouter from "./routes/login.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/", verifyToken ,(req, res) => {
 res.status(200).json({ message: 'Protected route accessed' });
});

app.use("/", registrationRouter);
app.use("/",loginRouter);


MongoDBConnection()
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("Server is running on " + port);
    });
  })
  .catch((error) => {
    // If the DB connection failed, log and exit the process
    console.error("Server startup failed: DB connection error.");
    process.exit(1);
  });
