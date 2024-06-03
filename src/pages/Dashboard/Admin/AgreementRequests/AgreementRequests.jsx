import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner';
import Container from '../../../../components/Shared/Container';
import Heading from '../../../../components/Shared/Heading';

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agreements = [], isLoading, refetch } = useQuery({
    queryKey: ['agreements'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/agreements');
      return data;
    },
  });

  const updateAgreementStatus = useMutation({
    mutationFn: async ({ id, status, userEmail }) => {
      await axiosSecure.put('/agreement/status', { id, status, userEmail });
    },
    onSuccess: () => {
      toast.success('Agreement status updated successfully.');
      refetch();
    },
    onError: () => {
      toast.error('Failed to update agreement status.');
    },
  });

  const handleAccept = (agreement) => {
    updateAgreementStatus.mutate({ id: agreement._id, status: 'accepted', userEmail: agreement.userEmail });
  };

  const handleReject = (agreement) => {
    updateAgreementStatus.mutate({ id: agreement._id, status: 'rejected', userEmail: agreement.userEmail });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Heading title='Agreement Requests' />
      {agreements.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 gap-8'>
          {agreements.map((agreement) => (
            <div key={agreement._id} className='p-4 bg-white shadow rounded-lg'>
              <p><strong>User Name:</strong> {agreement.userName}</p>
              <p><strong>User Email:</strong> {agreement.userEmail}</p>
              <p><strong>Floor No:</strong> {agreement.floorNo}</p>
              <p><strong>Block Name:</strong> {agreement.blockName}</p>
              <p><strong>Room No:</strong> {agreement.apartmentNo}</p>
              <p><strong>Rent:</strong> ${agreement.rent}</p>
              <p><strong>Agreement Request Date:</strong> {new Date(agreement.timestamp).toLocaleString()}</p>
              <div className='flex gap-4 mt-4'>
                <button
                  className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
                  onClick={() => handleAccept(agreement)}
                >
                  Accept
                </button>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                  onClick={() => handleReject(agreement)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Heading center title='No Agreement Requests' subtitle='All pending agreement requests will be shown here.' />
      )}
    </Container>
  );
};

export default AgreementRequests;
