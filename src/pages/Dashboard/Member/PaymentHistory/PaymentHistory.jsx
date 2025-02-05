import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const monthMap = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december',
};

const PaymentHistory = () => {
  const { user, loading } = useAuth() || {};
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://server-mu-six-58.vercel.app/payments/${user.email}`, { withCredentials: true })
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
    if (searchQuery.trim() === '') {
      // If the search query is empty, reset the filtered payments to all payments
      setFilteredPayments(payments);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const monthNumber = parseInt(lowercasedQuery, 10);

    let searchMonth = lowercasedQuery;
    if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
      searchMonth = monthMap[monthNumber];
    }

    setFilteredPayments(
      payments.filter((payment) =>
        payment.month.toLowerCase().includes(searchMonth)
      )
    );

    // Clear the search query input value
    setSearchQuery('');
  };

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div>
       <Helmet>
        <title>Payment History</title>
        </Helmet>
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by month name or number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 w-80 py-2 border rounded"
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
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{payment.month}</td>
                  <td className="border px-4 py-2">${payment.rent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
