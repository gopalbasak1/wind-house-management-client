/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRemove = async () => {
    try {
      const response = await axiosSecure.put('/user/role', { email: user.email, role: 'user' });
      if (response.data.success) {
        toast.success('User role updated successfully');
        refetch(); // Refetch users data to refresh the table
      }
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.email}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.role}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.status}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.role === 'member' && (
          <button
            onClick={handleRemove}
            className='bg-red-500 text-white px-4 py-2 rounded'
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserDataRow;
