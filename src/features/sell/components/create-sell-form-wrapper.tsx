"use client";

import PageLoader from "@/components/page-loader";
import { useGetProducts } from "@/features/products/api/use-get-products";
import { CreateSellForm } from "./create-sell-form";

export const CreateSellFormWrapper = () => {
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const isLoading = isLoadingProducts;

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div>
      <CreateSellForm products={products.data} />
    </div>
  );
};
