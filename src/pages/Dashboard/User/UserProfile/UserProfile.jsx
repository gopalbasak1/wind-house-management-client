import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';

const UserProfile = () => {
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`/user/${user.email}`, { withCredentials: true })
        .then((response) => {
          console.log('User profile data:', response.data); // Log fetched data
          setProfileData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setIsLoading(false);
        });
    }
  }, [user]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!profileData) {
    return <div>Error loading profile data.</div>;
  }

  const agreement = profileData.agreement || {
    acceptDate: 'none',
    floorNo: 'none',
    blockName: 'none',
    apartmentNo: 'none',
  };

  return (
    <Container>
      <Helmet>
        <title>Wind House | Profile</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <img
          src={profileData.photo || 'default-profile.jpg'}
          alt="User"
          className="w-32 h-32 rounded-full"
        />
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
        <p className="text-lg">{profileData.email}</p>

        <div className="mt-8 w-full bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Agreement Details</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Accept Date:</span>
              <span>{agreement.acceptDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Floor No:</span>
              <span>{agreement.floorNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Block Name:</span>
              <span>{agreement.blockName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Apartment No:</span>
              <span>{agreement.apartmentNo}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
