"use client";

import PageLoader from "@/components/page-loader";
import { useGetProducts } from "@/features/products/api/use-get-products";
import { useGetSuppliers } from "@/features/suppliers/api/use-get-suppliers";
import { CreatePurchaseForm } from "./create-purchase-form";

export const CreatePurchaseFormWrapper = () => {
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
  const { data: suppliers, isLoading: isLoadingSuppliers } = useGetSuppliers();
  const isLoading = isLoadingProducts || isLoadingSuppliers;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <CreatePurchaseForm products={products.data} suppliers={suppliers.data} />
    </div>
  );
};
