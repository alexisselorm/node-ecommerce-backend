import { Router } from "express";
import { body, validationResult } from "express-validator";
import { STATUS_CODES } from "http";

const router = Router();

//PRODUCTS
router.get("/product", (req, res) => {
  res.json({ message: "doggy" });
});
router.get("/product/:id", (req, res) => {});
router.put("/product/:id", body("name").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    console.log(errors);
    res.json({ errors: errors.array() });
  }
});
router.post("/product", (req, res) => {
  if (!req.body.name) {
  }
});
router.delete("/product/:id", (req, res) => {});

//UPDATES
router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.put("/update/:id", (req, res) => {});
router.post("/update", (req, res) => {});
router.delete("/update/:id", (req, res) => {});

//Update Point
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put("/updatepoint/:id", (req, res) => {});
router.post("/updatepoint", (req, res) => {});
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
