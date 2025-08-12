import axiosInstance from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
interface ProductProps {
  productId: string | null;
}
export const useGetProductById = ({ productId }: ProductProps) => {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${productId}`);
      if (response.status !== 200) {
        return {
          status: response.status,
          message: getErrorMessage(response),
        };
      }
      return response.data;
    },
  });
  return query;
};
