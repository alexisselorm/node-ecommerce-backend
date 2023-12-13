import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { STATUS_CODES } from "http";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

//PRODUCTS
router.get("/product", (req, res) => {
  res.json({ message: "doggy" });
});
router.get("/product/:id", (req, res) => {});
router.put(
  "/product/:id",
  body("name").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  [body("name").exists().isString(), handleInputErrors],
  (req, res) => {
    if (!req.body.name) {
    }
  }
);
router.delete("/product/:id", (req, res) => {});

//UPDATES
router.get("/update", (req, res) => {});
router.get("/update/:id", (req, res) => {});
router.put(
  "/update/:id",
  [
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status").isIn(["IN_PROGRRESS", "SHIPPED", "DEPRECATED"]),
    body("version").optional(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("status").isIn(["IN_PROGRRESS", "SHIPPED", "DEPRECATED"]),
    body("version").exists(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.delete("/update/:id", (req, res) => {});

//Update Point
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.post(
  "/updatepoint",
  [
    body("name").exists().isString(),
    body("description").exists().isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
