"use client";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { CustomChartData } from "./ProductSales";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  productData: CustomChartData;
};

const ProductSalesPie = ({ productData }: Props) => {
  return (
    <div className="w-full h-auto md:w-1/2 md:h-64 lg:w-1/3 lg:h-64">
      <Pie data={productData} />
    </div>
  );
};

export default ProductSalesPie;
