import ProductSalesPie from "./ProductSalesPie";
import { fetchProductSales } from "@/utils/services";

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
