import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage, getMessage } from "@/lib/utils";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}
interface ResponseType {
  // Response HTTP status (e.g., 200)
  status: number; // Your API's custom status
  token: string; // The authentication token
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(`auth/admin-login`, payload);
      if (response.status !== 200 || response.data.status !== 1) {
        throw new Error(
          response.status !== 200
            ? getErrorMessage(response)
            : getMessage(response.data)
        );
      }
      if (response.data.user.isAdmin) {
        return response.data;
      } else {
        throw new Error("You are not authorized person ");
      }
    },
    onSuccess: (data) => {
      const { token } = data;
      const user = {
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
      };

      Cookies.set("userToken", token, {
        expires: 365, // Expires in 7 days
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      Cookies.set("authUser", JSON.stringify(user), {
        expires: 365, // Expires in 7 days
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      toast.success("Logged In Successfully!");
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });

  return mutation;
};
