import PartySalesPie from "./PartySalesPie";
import { fetchPartySales } from "@/utils/services";

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
