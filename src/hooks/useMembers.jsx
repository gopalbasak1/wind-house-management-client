import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useMembers = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery(['members'], async () => {
    const { data } = await axiosSecure.get('/members');
    return data;
  });
};

export default useMembers;
