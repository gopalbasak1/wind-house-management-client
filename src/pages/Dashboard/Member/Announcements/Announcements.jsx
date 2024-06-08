import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";


const Announcements = () => {

    const axiosSecure = useAxiosSecure();
    const {data: announcements = [], isLoading} = useQuery({
        queryKey: ['announcements'],
        queryFn: async()=>{
            const {data} = await axiosSecure('/announcements')
            return data
        }
    })

    console.log(announcements);
    if(isLoading) return <LoadingSpinner/>


    return (
        <div>
          <div>
          <Helmet>
        <title>Announcement</title>
        </Helmet>
            </div>
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

export default Announcements;
