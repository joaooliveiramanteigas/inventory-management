import TransactionModel from "@/models/Transaction";
import {
  CustomChartData,
  ProductData,
  TransactionProduct,
  generateRandomColor,
} from "../ProductSales/ProductSales";
import ProductModel from "@/models/Product";
import PartySalesPie from "./PartySalesPie";
import PartyModel from "@/models/Party";
const fetchPartySales = async (): Promise<CustomChartData> => {
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

export default async function PartySales() {
  const productData = await fetchPartySales();

  return (
    <div className="flex justify-center items-center h-full">
      {productData.datasets.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-2">No sales to show</p>
        </div>
      ) : (
        <PartySalesPie productData={productData} />
      )}
    </div>
  );
}
