import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useRole from "../../../hooks/useRole";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Helmet } from 'react-helmet-async';


const ManageCoupons = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState(null);

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

  const openModal = (coupon = null) => {
    setCurrentCoupon(coupon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCoupon(null);
    setIsModalOpen(false);
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const code = form.code.value;
    const discount = form.discount.value;
    const description = form.description.value;
    const active = form.active.checked;

    const couponData = {
      code,
      discount,
      description,
      active,
      admin: {
        email: user?.email,
        name: user?.displayName,
      },
    };

    try {
      await axiosCommon.put('/coupon', couponData); // Assuming it's a PUT request
      toast.success('Coupon has been added/updated successfully!');
      form.reset();
      const { data } = await axiosCommon.get('/coupons');
      setCoupons(data);
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error('Failed to add/update coupon. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      await axiosCommon.delete(`/coupon/${couponId}`);
      toast.success('Coupon deleted successfully!');
      setCoupons(coupons.filter(coupon => coupon._id !== couponId));
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete coupon. Please try again later.');
    }
  };



  return (
    <div>
      <Helmet>
        <title>Manage Coupon</title>
      </Helmet>
      <h3 className="text-center text-4xl">Manage Coupons</h3>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Add Coupon
        </button>
      </div>

      {isModalOpen && (
        <dialog open className="modal">
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
                  defaultValue={currentCoupon?.code || ""}
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
                  defaultValue={currentCoupon?.discount || ""}
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
                  defaultValue={currentCoupon?.description || ""}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Active</span>
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked={currentCoupon?.active || false}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Description</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>{coupon.code}</td>
                <td>{coupon.discount}%</td>
                <td>{coupon.description}</td>
                <td>{coupon.active ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-secondary mr-2 mb-2 lg:mb-0"
                    onClick={() => openModal(coupon)}
                  >
                    <BiSolidEdit />
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteCoupon(coupon._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
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
