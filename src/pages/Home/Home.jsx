import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Rooms from '../../components/Home/Rooms'
import Banner from '../../components/Home/Banner/Banner'
import AboutBuilding from '../../components/Home/About'
import LocationDetails from '../../components/Home/Location/LocationDetails'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Wind House | Rental Homes & Management System</title>
      </Helmet>
      {/* Categories section  */}
      <Banner/>
      
      <AboutBuilding/>

      <LocationDetails/>
    </div>
  )
}

export default Home
