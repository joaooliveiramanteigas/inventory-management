import ProductModel from "@/models/Product";
import TransactionModel from "@/models/Transaction";
import ProductSalesPie from "./ProductSalesPie";

type ProductData = {
  label: string;
  value: number;
  backgroundColor: string;
};
export type CustomChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

type TransactionProduct = {
  productId: string;
  quantity: number;
};

const fetchProductSales = async (): Promise<CustomChartData> => {
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

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default async function ProductSales() {
  const productData = await fetchProductSales();

  return (
    <div className="flex justify-center items-center h-full">
      {productData.datasets.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-2">No sales to show</p>
        </div>
      ) : (
        <ProductSalesPie productData={productData} />
      )}
    </div>
  );
}
