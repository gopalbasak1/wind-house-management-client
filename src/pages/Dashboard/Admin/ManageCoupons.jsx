import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageCoupons = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading] = useRole();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axiosCommon.get('/coupons');
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, [axiosCommon]);

  const handleCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const code = form.code.value;
    const discount = form.discount.value;
    const description = form.description.value;

    const couponData = {
      code,
      discount,
      description,
      admin: {
        email: user?.email,
        name: user?.displayName,
      },
    };

    try {
      await axiosCommon.put('/coupon', couponData);  // Assuming it's a PUT request
      toast.success('Your coupon has been added successfully!');
      form.reset();
      const { data } = await axiosCommon.get('/coupons');
      setCoupons(data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to add coupon. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div>
      <h3 className="text-center text-4xl">Manage Coupons</h3>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>
          Add Coupon
        </button>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form onSubmit={handleCoupon} className="card-body h-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                placeholder="Coupon code"
                name="code"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount Percentage</span>
              </label>
              <input
                type="number"
                name="discount"
                placeholder="Discount Percentage"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Coupon Description"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>{coupon.code}</td>
                <td>{coupon.discount}%</td>
                <td>{coupon.description}</td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
