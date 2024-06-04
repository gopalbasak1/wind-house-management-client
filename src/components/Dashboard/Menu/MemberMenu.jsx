import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdOutlinePayments } from 'react-icons/md'
import MenuItem from '../Sidebar/Menu/MenuItem'
import { GiPayMoney } from 'react-icons/gi'


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
    </>
  )
}

export default MemberMenu