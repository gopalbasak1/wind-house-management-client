import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
  const { user, loading: authLoading } = useAuth() || {};
  const [role, roleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const [profileData, setProfileData] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user && role === 'admin') {
        try {
          const { data } = await axiosSecure.get('/admin-profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setProfileData(data);
        } catch (err) {
          console.error('Failed to fetch profile data', err);
        } finally {
          setIsProfileLoading(false);
        }
      } else {
        setIsProfileLoading(false);
      }
    };

    if (!authLoading && !roleLoading) {
      fetchProfileData();
    }
  }, [axiosSecure, user, role, authLoading, roleLoading]);

  if (authLoading || roleLoading || isProfileLoading) {
    return <LoadingSpinner />;
  }

  if (role !== 'admin') {
    return <p>Unauthorized access</p>;
  }

  if (!profileData) {
    return <p>No profile data available</p>;
  }

  const barData = [
    { name: 'Total Rooms', value: profileData.totalRooms },
    { name: 'Available Rooms', value: profileData.percentageAvailableRooms },
    { name: 'Unavailable Rooms', value: profileData.percentageUnavailableRooms },
  ];

  const pieData = [
    { name: 'Total Users', value: profileData.totalUsers },
    { name: 'Members', value: profileData.totalMembers },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="admin-profile p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Admin Profile</title>
      </Helmet>
      <h3 className="text-center text-4xl mb-6">Admin Profile</h3>
      <div className="profile-details grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="profile-info bg-white p-6 rounded-lg shadow-md">
          <img
            alt="profile"
            src={user?.photoURL || profileData?.userImage}
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white mb-4"
          />
          <p><strong>Name:</strong> {user?.displayName || profileData?.userName}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Total Number of Rooms:</strong> {profileData.totalRooms}</p>
          <p><strong>Percentage of Available Rooms:</strong> {profileData.percentageAvailableRooms}%</p>
          <p><strong>Percentage of Unavailable Rooms:</strong> {profileData.percentageUnavailableRooms}%</p>
          <p><strong>Total Number of Users:</strong> {profileData.totalUsers}</p>
          <p><strong>Number of Members:</strong> {profileData.totalMembers}</p>
        </div>
        <div className="charts bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-center text-2xl mb-4">Rooms Data</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <h4 className="text-center text-2xl mt-6 mb-4">User Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
