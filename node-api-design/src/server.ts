import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

//Middlewares
app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "Hello from express" });
});

app.use("/api", router);

export default app;
