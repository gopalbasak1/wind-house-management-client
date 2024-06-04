import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const {user} =useAuth(); /// Replace with the logged-in user's email

  const fetchPayments = async (month) => {
    try {
      const response = await axios.get(`http://localhost:5000/payments/${user}/${month}`);
      setPayments(response.data);
    } catch (err) {
      console.error('Failed to fetch payments', err);
    }
  };

  useEffect(() => {
    fetchPayments(new Date().getMonth() + 1); // Fetch current month payments on initial load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayments(searchMonth);
  };

  return (
    <div>
      <h1>Payment History</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter month name or number"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{new Date(payment.timestamp).toLocaleDateString()}</td>
              <td>{payment.amount}</td>
              <td>{payment.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
