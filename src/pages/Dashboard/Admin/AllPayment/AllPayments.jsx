import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { PDFDocument } from 'pdf-lib';
import domtoimage from 'dom-to-image';
import { Helmet } from "react-helmet-async";

const AllPayments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch users Data
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/payments`);
      return data;
    },
  });

  // Calculate total rent
  const totalRent = payments.reduce((total, payment) => total + payment.rent, 0);

  if (isLoading) return <LoadingSpinner />;

  const handlePrint = async () => {
    const element = document.getElementById('paymentsTable');
    if (!element) {
      console.error('Element not found');
      return;
    }

    try {
      const imgDataUrl = await domtoimage.toPng(element);
      const pdfDoc = await PDFDocument.create();

      const img = await pdfDoc.embedPng(imgDataUrl);

      // Determine dimensions and scaling
      const pdfPage = pdfDoc.addPage();
      const { width: pageWidth, height: pageHeight } = pdfPage.getSize();
      const imgWidth = img.width;
      const imgHeight = img.height;

      let scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;

      pdfPage.drawImage(img, {
        x: (pageWidth - scaledWidth) / 2,
        y: (pageHeight - scaledHeight) / 2,
        width: scaledWidth,
        height: scaledHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'payments.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>All Payments</title>
      </Helmet>
     <div className="flex justify-end">
     <button className="btn btn-primary btn-sm mb-4" onClick={handlePrint}>
        Download PDF
      </button>
     </div>
      <div className="overflow-x-auto" id="paymentsTable">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>Month Name</th>
              <th>Payment Date</th>
              <th>Rent</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.userEmail}</td>
                <td>{payment.month}</td>
                <td>{payment.paymentDate}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">{payment.rent}</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-lg font-semibold text-red-500" colSpan="4">Total Rent</th>
              <th>
                <button className="btn btn-ghost btn-xs text-lg font-semibold text-red-500">{totalRent}</button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
