import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/Shared/Container';
import Heading from '../../components/Shared/Heading';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Apartment = () => {
  const axiosCommon = useAxiosCommon();
  const [params] = useSearchParams();
  const category = params.get('category');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 6; // Set the number of items per page to 6

  const { data, isLoading, isError } = useQuery({
    queryKey: ['rooms', category, page],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/apartment?page=${page}&limit=${limit}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading apartments</div>;
  }

  const { apartments, totalPages } = data;

  const handleAgreementClick = async (room) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      floorNo: room.floorNo,
      blockName: room.blockName,
      apartmentNo: room.apartmentNo,
      rent: room.rent,
      status: 'pending',
      acceptDate: new Date().toISOString().split('T')[0], // Current date
    };

    try {
      await axiosCommon.post('/agreement', agreementData);
      toast.success('Agreement request submitted successfully.');
    } catch (error) {
      console.error('Error submitting agreement request:', error);
      toast.error('Failed to submit agreement request.');
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Helmet>
        <title>Wind House | Apartment</title>
      </Helmet>
      <Container>
        {apartments && apartments.length > 0 ? (
          <motion.div 
            className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.5
                }
              }
            }}
          >
            {apartments.map((room) => (
              <motion.div
                key={room.apartmentNo}
                className="flex flex-col items-center justify-center w-full max-w-sm mx-auto cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md group-hover:scale-120"
                  style={{ backgroundImage: `url(${room.image})` }}
                ></div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    Block: {room.blockName}
                  </h3>
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    Apartment: {room.apartmentNo}
                  </h3>
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                    Floor No: {room.floorNo}
                  </h3>

                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200">${room.rent}</span>
                    <button
                      className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                      onClick={() => handleAgreementClick(room)}
                    >
                      Agreement
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
            <Heading
              center={true}
              title='No Rooms Available In This Category!'
              subtitle='Please Select Other Categories.'
            />
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1 text-sm font-medium text-gray-800 bg-gray-200 rounded">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Apartment;