import { TfiAnnouncement } from 'react-icons/tfi'
import MenuItem from '../Sidebar/Menu/MenuItem'
import { FcSettings } from 'react-icons/fc'


const UserMenu = () => {

    //     const currentUser = {
    //       email: user?.email,
    //       role: 'guest',
    //       status: 'Requested'
    //     }
    
    //     const {data} = await axiosSecure.put(`${import.meta.env.VITE_API_URL}/user`, currentUser)
    //     console.log(data);
    //     if(data.modifiedCount>0){
    //       toast.success('Success! Please wait for admin confirmation')
    //     }
    //     else{
    //       toast.success('Please wait for admin approval')
    //     }
    //   }catch(err){
    //     console.log(err);
    //     toast.error(err.message)
    //   } finally{
    //     closeModal();
    //   }
      
    // } 
  
  return (
    <>
      <MenuItem 
        label="Profile" 
        address='/dashboard/profile' 
        icon={FcSettings} />

      
        <MenuItem 
              label="Announcement" 
              address='announcement' 
              icon={TfiAnnouncement} />
    </>
  )
}

export default UserMenu