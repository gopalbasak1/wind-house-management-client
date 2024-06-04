import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';

const PaymentHistory = () => {
  const { user, loading } = useAuth() || {};
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/payments/${user.email}`, { withCredentials: true })
        .then((response) => {
          setPayments(response.data);
          setFilteredPayments(response.data); // Set initial filtered payments to all payments
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching payment history:', error);
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setFilteredPayments(
      payments.filter((payment) =>
        payment.month.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by month name or number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Payment Date</th>
              <th>Month</th>
              <th>Rent</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{payment.month}</td>
                <td className="border px-4 py-2">${payment.rent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
