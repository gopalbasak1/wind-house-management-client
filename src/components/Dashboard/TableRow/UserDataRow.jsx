import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import UpdateUserModal from '../Modal/UpdateUserModal';

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.put(`/user/role`, { email: user?.email, role });
      return data;
    },
    onSuccess: (data) => {
      refetch();
      toast.success('User role updated successfully');
    }
  });

  const handleRemove = async () => {
    if (loggedInUser?.email === user.email) {
      toast.error("You cannot remove your own role");
      return;
    }
    try {
      await mutateAsync('user');
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const modalHandler = async (selected) => {
    if (loggedInUser?.email === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }
    try {
      await mutateAsync(selected);
      setIsOpen(false);
    } catch (err) {
      toast.error('Failed to update role');
      setIsOpen(false);
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p className={`${
            user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
          } whitespace-no-wrap`}>
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span aria-hidden='true' className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative'>Update Role</span>
        </button>
        <button onClick={handleRemove} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight ml-2'>
          <span aria-hidden='true' className='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative'>Remove</span>
        </button>
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user} />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
