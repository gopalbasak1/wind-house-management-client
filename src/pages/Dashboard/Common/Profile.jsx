import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const { user, loading: authLoading } = useAuth() || {};
  const [role, roleLoading] = useRole();
  const [profileData, setProfileData] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`/user/${user.email}`, { withCredentials: true })
        .then((response) => {
          setProfileData(response.data);
          setIsProfileLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setIsProfileLoading(false);
        });
    }
  }, [user]);

  if (authLoading || roleLoading || isProfileLoading) return <LoadingSpinner />;

  const agreement = profileData?.agreement || {
    acceptDate: 'none',
    floorNo: 'none',
    blockName: 'none',
    apartmentNo: 'none',
  };

  console.log(agreement);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
          </a>
          <p className='p-2 px-4 text-xs text-white capitalize bg-pink-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800'>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black'>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black'>{user?.email}</span>
              </p>
            </div>
            <div className='mt-8 w-full bg-white rounded-lg shadow-lg p-6'>
              <h2 className='text-xl font-semibold mb-4'>Agreement Details</h2>
              <div className='flex flex-col space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Accept Date:</span>
                  <span>{agreement.acceptDate}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Floor No:</span>
                  <span>{agreement.floorNo}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Block Name:</span>
                  <span>{agreement.blockName}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Apartment No:</span>
                  <span>{agreement.apartmentNo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
