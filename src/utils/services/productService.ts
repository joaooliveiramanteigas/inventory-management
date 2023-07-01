import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import { Product } from "@/types";

/**
 * Retrieves a paginated list of products.
 * @param page - The page number.
 * @param limit - The number of products to fetch per page.
 * @returns A list of paginated products.
 */
export const getPaginatedProducts = async (page = 1, limit = 10) => {
  await connectDB();

  try {
    const products = await ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const parsedProducts = products.map((product) => {
      const { _id, __v, ...parsedProduct } = product;
      return { id: _id.toString(), ...parsedProduct };
    });
    return parsedProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves all products.
 * @returns A list of all products.
 */
export const getAllProducts = async () => {
  await connectDB();

  try {
    const products = await ProductModel.find().lean().exec();

    const parsedProducts = products.map((product) => {
      const { _id, __v, image, ...parsedProduct } = product;
      return {
        id: _id.toString(),
        image: image || "", // Provide a default value for image if it's undefined
        ...parsedProduct,
      } as Product;
    });
    return parsedProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves a product by its ID.
 * @param id - The ID of the product.
 * @returns The product if found, undefined otherwise.
 */
export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  await connectDB();

  try {
    const product = await ProductModel.findById(id).lean();

    if (!product) {
      return undefined;
    }

    const { _id, __v, image, ...parsedProduct } = product;
    return {
      id: _id.toString(),
      image: image || "",
      ...parsedProduct,
    } as Product;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
