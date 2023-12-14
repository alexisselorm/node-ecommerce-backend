import prisma from "../db";
import logger from "../helpers/telegramLoggerExtension";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { userId: req.user.id },
    include: { updates: true },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const getUpdateById = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });

  res.json({ data: update });
};
export const createUpdate = async (req, res) => {
  logger.info("Creating update");
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    logger.error("Product not found or does not belong to you");
    res.status(404);
    return res.json({ message: "nope" });
  }
  logger.info("Found product");
  try {
    logger.info("Atttempting update");
    const update = await prisma.update.create({
      data: { updatedAt: new Date().toISOString(), ...req.body },
    });
    res.json({ data: update });
    logger.info("Update successful");
  } catch (error) {
    res.json({ error: error });
    logger.error("Error updating product", error);
  }
};
export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: { userId: req.user.id },
    include: {
      updates: true,
    },
  });

  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "Nope no match" });
  }
  const updatedUpdate = await prisma.update.update({
    where: { id: req.params.id },
    data: { updatedAt: new Date().toISOString(), ...req.body },
  });

  res.json({ data: updatedUpdate });
};
export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: { userId: req.user.id },
    include: {
      updates: true,
    },
  });

  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: "Nope no match" });
  }
  const deletedUpdate = await prisma.update.delete({
    where: { id: req.params.id },
  });

  res.json({ data: deletedUpdate });
};
