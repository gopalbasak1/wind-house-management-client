import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';

const MakeAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const [announcements, setAnnouncements] = useState([]);
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data } = await axiosCommon.get('/announcements');
      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, [axiosCommon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const announcementData = {
      title,
      description,
      admin: {
        email: user?.email,
        name: user?.displayName
      }
    };

    try {
      await axiosCommon.post('/announcements', announcementData);
      toast.success('Your announcement has been added successfully!');

      const { data } = await axiosCommon.get('/announcements');
      setAnnouncements(data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to add announcement. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-4xl text-center">Make an Announcement</h2>
      {role === 'admin' && (
        <div className="hero my-10">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea name="description" placeholder="Description" className="textarea textarea-bordered h-24" required></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {announcements.length > 0 && (
        <>
          <h2 className="text-2xl text-center my-10">Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="max-w-md p-6 overflow-hidden rounded-lg shadow dark:bg-gray-50 dark:text-gray-800">
                <article>
                  <h2 className="text-xl font-bold">{announcement.title}</h2>
                  <p className="mt-4 dark:text-gray-600">{announcement.description}</p>
                  <div className="flex items-center mt-8 space-x-4">
                    <img src="https://i.ibb.co/km8fc2Y/windhouse.png" alt="" className="w-10 h-10 rounded-full dark:bg-gray-500" />
                    <div>
                      <h3 className="text-sm font-medium">Wind House</h3>
                      <p>Owner</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MakeAnnouncement;
