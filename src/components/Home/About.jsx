import { useTypewriter} from 'react-simple-typewriter'
import './About.css'
import { FaHandHoldingHand } from 'react-icons/fa6';
import { SiFsecure } from 'react-icons/si';
import { MdOutlineAddHomeWork } from 'react-icons/md';



const AboutBuilding = () => {

    const [typeEffect] = useTypewriter({
        words: [ 'to', 'Wind House'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 40
      })

  return (
        <div className='mt-10'>
            <div>
                <h2 className="text-4xl text-center">Welcome {typeEffect}</h2>
                <p className="text-xl text-center mt-5 mb-5">About the Building</p>
            </div>
             <div className="featured-item-b text-white w-full pt-8 my-50">
                
                <div className="featured-content md:flex justify-center items-center pb-20 pt-12 px-36">
                    <div>
                        <img src='https://i.ibb.co/NtzbzZS/32c3fb23-bb30-44b7-9a41-7ce9db1843e8.webp' alt="Featured" />
                    </div>
                    <div className="md:ml-10 text-white font-medium w-full space-y-2 z-10">
                    <p className="uppercase">Can i give you something?</p>
                    <p>From June 1, 2024, <span>To June 30, 2024</span></p>
                    <p>10% Off Your First Month</p>
                    <p className='border-2 bg-black border-none w-[150px]  text-center py-5'>
                    <q >
                        First10
                    </q>
                    </p>
                    </div>
                </div>
            </div>

            <div className='md:flex relative justify-around sm:flex-1 gap-5 px-5 -mt-5 z-10'>

            <div className="card md:w-1/3 bg-base-100 shadow-xl">
            <div className="card-body">
            <span className='text-4xl mx-auto mb-5'><SiFsecure /></span>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Our building is equipped with state-of-the-art facilities, including a fully equipped gym,
                a rooftop pool with stunning city views, and 24/7 security to ensure the safety and
                well-being of all residents. The apartments are designed with spacious layouts, high
                ceilings, and large windows that provide ample natural light.
                </p>
            </div>
            </div>

            <div className="card md:w-1/3 bg-base-100 mt-5 md:mt-0 shadow-xl">
            <div className="card-body">
            <span className='text-4xl mx-auto mb-5'><FaHandHoldingHand /></span>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
            
          Wind House also features a communal garden, a children's play area, and secure
          underground parking. Each apartment is fitted with modern appliances, smart home
          technology, and high-speed internet connectivity. We are committed to providing a
          comfortable and luxurious living experience for all our residents.
        </p>
            </div>
            </div>

            <div className="card mt-5 md:mt-0 md:w-1/3 bg-base-100 shadow-xl">
            <div className="card-body">
            <span className='text-4xl mx-auto mb-5'><MdOutlineAddHomeWork /></span>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Join us at Wind House, where contemporary living meets exceptional amenities. Whether
                you are looking for a peaceful retreat or a vibrant community, Wind House is the perfect
                place to call home.
                </p>
            </div>
            </div>


            </div>

        </div>
  );
};

export default AboutBuilding;
