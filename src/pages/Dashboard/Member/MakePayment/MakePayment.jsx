import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const MakePayment = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();
  const [profileData, setProfileData] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [month, setMonth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/user/${user.email}`, { withCredentials: true })
        .then((response) => {
          setProfileData(response.data);
          setIsProfileLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          toast.error('Error fetching user profile:', error);
          setIsProfileLoading(false);
        });
    }
  }, [user]);

  const handleApplyCoupon = () => {
    if (coupon === 'First10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      toast.error('Invalid coupon');
    }
  };

  const handlePayment = () => {
    if (!month) {
      toast.error('Please select the month you want to pay for.');
      return;
    }

    const paymentData = {
      userEmail: user.email,
      floorNo: profileData?.agreement?.floorNo,
      blockName: profileData?.agreement?.blockName,
      apartmentNo: profileData?.agreement?.apartmentNo,
      rent: profileData?.agreement?.rent * (1 - discount / 100),
      month,
    };

    navigate('/dashboard/payment', { state: { paymentData } });
  };

  if (loading || isLoading || isProfileLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Make Payment</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Make Payment</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input type="email" value={user.email} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Floor No:</label>
              <input type="text" value={profileData?.agreement?.floorNo || ''} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Block Name:</label>
              <input type="text" value={profileData?.agreement?.blockName || ''} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apartment No:</label>
              <input type="text" value={profileData?.agreement?.apartmentNo || ''} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rent:</label>
              <input type="text" value={`$${profileData?.agreement?.rent || 0}`} readOnly className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Month:</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full p-2 border rounded">
                <option value="">Select Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Coupon:</label>
              <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="w-full p-2 border rounded" />
              <button type="button" onClick={handleApplyCoupon} className="mt-2 p-2 bg-blue-500 text-white rounded">Apply Coupon</button>
            </div>
            {discount > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700">Discounted Rent:</label>
                <input type="text" value={`$${(profileData?.agreement?.rent * (1 - discount / 100)).toFixed(2)}`} readOnly className="w-full p-2 border rounded" />
              </div>
            )}
            <button type="button" onClick={handlePayment} className="w-full p-2 bg-green-500 text-white rounded">Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
