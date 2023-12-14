import prisma from "../db";

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

//Get by id
export const getProductById = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: { id, userId: req.user.id },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.update({
    where: { id, userId: req.user.id },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

export const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: { id: req.params.id, userId: req.user.id },
  });

  res.json({ data: product });
};
