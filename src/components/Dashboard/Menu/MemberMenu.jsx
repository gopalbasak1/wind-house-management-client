import {  MdOutlinePayments } from 'react-icons/md'
import MenuItem from '../Sidebar/Menu/MenuItem'
import { GiPayMoney } from 'react-icons/gi'
import { FcSettings } from 'react-icons/fc'
import { TfiAnnouncement } from 'react-icons/tfi'


const MemberMenu = () => {
  return (
    <>
       {/* Make payment */}
       <MenuItem 
              label="Make Payment" 
              address='make-payment' 
              icon={GiPayMoney} />
              
              {/* Payment History */}
              <MenuItem 
              label="Payment History" 
              address='payment-history' 
              icon={MdOutlinePayments} />
              <MenuItem 
              label="Announcement" 
              address='announcement' 
              icon={TfiAnnouncement} />
              <MenuItem 
              label="Profile" 
              address='/dashboard/profile' 
              icon={FcSettings} />
    </>
  )
}

export default MemberMenu