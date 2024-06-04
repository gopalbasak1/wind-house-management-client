import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminAgreementRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/agreements', { withCredentials: true });
        setRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch agreement requests', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (agreement) => {
    try {
      await axios.put('/agreement/status', { id: agreement._id, status: 'accepted', userEmail: agreement.userEmail }, { withCredentials: true });
      toast.success('Agreement accepted.');
      setRequests(requests.filter((req) => req._id !== agreement._id));
    } catch (error) {
      console.error('Error accepting agreement:', error);
      toast.error('Failed to accept agreement.');
    }
  };

  const handleReject = async (agreement) => {
    try {
      await axios.put('/agreement/status', { id: agreement._id, status: 'rejected', userEmail: agreement.userEmail }, { withCredentials: true });
      toast.success('Agreement rejected.');
      setRequests(requests.filter((req) => req._id !== agreement._id));
    } catch (error) {
      console.error('Error rejecting agreement:', error);
      toast.error('Failed to reject agreement.');
    }
  };

  return (
    <div>
      <h1>Admin Agreement Requests</h1>
      {requests.map((request) => (
        <div key={request._id}>
          <p>{request.userName} - {request.apartmentNo}</p>
          <button onClick={() => handleAccept(request)}>Accept</button>
          <button onClick={() => handleReject(request)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminAgreementRequests;
