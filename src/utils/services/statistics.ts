import { connectDB } from "@/db";
import PartyModel from "@/models/Party";
import ProductModel from "@/models/Product";
import TransactionModel from "@/models/Transaction";
import {
  CustomChartData,
  ProductData,
  Transaction,
  TransactionProduct,
} from "@/types";
import generateRandomColor from "../generateRandomColor";

/**
 * Get the total number of transactions.
 * @returns {Promise<number>} The total number of transactions.
 */
export const getTotalTransactions = async (): Promise<number> => {
  await connectDB();

  try {
    const totalTransactions = await TransactionModel.countDocuments().exec();
    return totalTransactions;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

/**
 * Get the total number of products.
 * @returns {Promise<number>} The total number of products.
 */
export const getTotalProducts = async (): Promise<number> => {
  await connectDB();

  try {
    const totalProducts = await ProductModel.countDocuments();
    return totalProducts;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

/**
 * Get the total number of parties.
 * @returns {Promise<number>} The total number of parties.
 */
export const getTotalParties = async (): Promise<number> => {
  await connectDB();

  try {
    const totalParties = await PartyModel.countDocuments();
    return totalParties;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

/**
 * Get the total revenue from all transactions.
 * @returns {Promise<number>} The total revenue.
 */
export const getTotalRevenue = async (): Promise<number> => {
  await connectDB();

  try {
    const transactions = await TransactionModel.find().exec();
    const totalRevenue = transactions.reduce(
      (sum, transaction: Transaction) => sum + transaction.totalPrice,
      0
    );
    return totalRevenue;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

/**
 * Fetch product sales data for chart visualization.
 * @returns {Promise<CustomChartData>} The product sales data.
 */
export const fetchProductSales = async (): Promise<CustomChartData> => {
  const transactions = await TransactionModel.find().exec();

  const productData: { [productId: string]: ProductData } = {};

  await Promise.all(
    transactions.map(async (transaction) => {
      await Promise.all(
        transaction.products.map(async (product: TransactionProduct) => {
          const productId = product.productId.toString();
          const quantity = product.quantity;

          const fetchedProduct = await ProductModel.findById(productId).exec();
          if (fetchedProduct) {
            const totalValue = quantity * Number(fetchedProduct.price);

            if (productData[productId]) {
              productData[productId].value += totalValue;
            } else {
              productData[productId] = {
                label: fetchedProduct.name,
                value: totalValue,
                backgroundColor: generateRandomColor(),
              };
            }
          }
        })
      );
    })
  );

  const data: CustomChartData = {
    labels: Object.values(productData).map((data) => data.label),
    datasets: [
      {
        label: "Sales €",
        data: Object.values(productData).map((data) => data.value),
        backgroundColor: Object.values(productData).map(
          (data) => data.backgroundColor
        ),
      },
    ],
  };

  return data;
};

/**
 * Fetch party sales data for chart visualization.
 * @returns {Promise<CustomChartData>} The party sales data.
 */
export const fetchPartySales = async (): Promise<CustomChartData> => {
  const transactions = await TransactionModel.find().exec();

  const productData: { [partyId: string]: ProductData } = {};

  await Promise.all(
    transactions.map(async (transaction) => {
      const partyId = transaction.partyId ? transaction.partyId.toString() : "";
      const party = await PartyModel.findById(transaction.partyId).exec();
      const partyName = party ? party.name : "No Party";

      await Promise.all(
        transaction.products.map(async (product: TransactionProduct) => {
          const productId = product.productId.toString();
          const quantity = product.quantity;

          const fetchedProduct = await ProductModel.findById(productId).exec();
          if (fetchedProduct) {
            const totalValue = quantity * Number(fetchedProduct.price);

            if (productData[partyId]) {
              productData[partyId].value += totalValue;
            } else {
              productData[partyId] = {
                label: partyName,
                value: totalValue,
                backgroundColor: generateRandomColor(),
              };
            }
          }
        })
      );
    })
  );

  const data: CustomChartData = {
    labels: Object.values(productData).map((data) => data.label),
    datasets: [
      {
        label: "Sales €",
        data: Object.values(productData).map((data) => data.value),
        backgroundColor: Object.values(productData).map(
          (data) => data.backgroundColor
        ),
      },
    ],
  };

  return data;
};
