import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Rooms from '../../components/Home/Rooms'
import Banner from '../../components/Home/Banner/Banner'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Wind House | Rental Homes & Management System</title>
      </Helmet>
      {/* Categories section  */}
      <Banner/>
      {/* Rooms section */}
      {/* <Rooms /> */}
    </div>
  )
}

export default Home
