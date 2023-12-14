import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { STATUS_CODES } from "http";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

//PRODUCTS
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put(
  "/product/:id",
  body("name").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/product",
  [body("name").exists().isString(), handleInputErrors],
  createProduct
);
router.delete("/product/:id", deleteProduct);

//UPDATES
router.get("/update", getUpdates);
router.get("/update/:id", getUpdateById);
router.put(
  "/update/:id",
  [
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status").isIn(["IN_PROGRRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    handleInputErrors,
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputErrors,
  ],
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

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
