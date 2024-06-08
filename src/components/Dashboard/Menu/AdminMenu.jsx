import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../Sidebar/Menu/MenuItem'
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'
import { TfiAnnouncement } from 'react-icons/tfi'
import { RiAdminLine, RiCoupon4Line } from 'react-icons/ri'
import { FaCircleDollarToSlot } from 'react-icons/fa6'

const AdminMenu = () => {
  return (
    <>
      {/* Manage Members */}
      <MenuItem 
              label="Manage Members" 
              address='manage-members' 
              icon={FaUserCog} />
          
              {/* Agreement Requests */}
              <MenuItem 
              label="AgreementRequests" 
              address='agreement-requests' 
              icon={VscGitPullRequestGoToChanges} />

              <MenuItem 
              label="Make Announcement" 
              address='make-announcement' 
              icon={TfiAnnouncement} />

              <MenuItem 
              label="Manage Coupon" 
              address='manage-coupons' 
              icon={RiCoupon4Line} />

              <MenuItem 
              label="Admin Profile" 
              address='admin-profile' 
              icon={RiAdminLine} />

              <MenuItem 
              label="All Payments" 
              address='all-payments' 
              icon={FaCircleDollarToSlot} />
              
    </>
  )
}

export default AdminMenu