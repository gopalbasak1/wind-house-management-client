import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../Sidebar/Menu/MenuItem'
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'

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
    </>
  )
}

export default AdminMenu