import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateRole = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation(
    async (email) => {
      await axiosSecure.put('/user/role', { email });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('members');
      },
    }
  );
};

export default useUpdateRole;
