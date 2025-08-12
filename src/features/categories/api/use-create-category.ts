import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Category } from "../types";

interface CategoryPayload {
  name: string;
  image: string | File;
  status: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  message: string;
  data: Category;
}
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, CategoryPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`/categories`, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  return mutation;
};
