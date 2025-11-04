import express from "express";
import MongoDBConnection from "./db.js";
import "dotenv/config";
import cors from "cors";

// import routers
import registrationRouter from "./routes/registration.js";
import loginRouter from "./routes/login.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import blogRouter from "./routes/blog.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed request headers
}));



app.get("/", verifyToken ,(req, res) => {
 res.status(200).json({ message: 'Protected route accessed' });
});

app.use("/", registrationRouter);
app.use("/",loginRouter);
app.use("/blog",verifyToken, blogRouter);


MongoDBConnection()
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log("Server is running on " + process.env.PORT || port);
    });
  })
  .catch((error) => {
    // If the DB connection failed, log and exit the process
    console.error("Server startup failed: DB connection error.");
    process.exit(1);
  });
