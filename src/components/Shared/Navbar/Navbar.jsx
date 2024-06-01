import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed w-full bg-black bg-opacity-30 text-white z-10 shadow-sm'>
      <div className=''>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link to='/'>
                <img
                  src='https://i.ibb.co/Ctvgz06/Wind-House-1-unscreen.gif'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
              <Link to='/'>
                <h2 className='text-2xl font-medium mt-10'>Wind House</h2>
              </Link>
            </div>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Links for larger screens */}
                <div className='hidden md:flex gap-5'>
                  <Link to='/' className='text-xl font-medium '>
                    Home
                  </Link>
                  <Link to='/apartment' className='text-xl font-medium'>
                    Apartment
                  </Link>
                </div>
                {/* Dropdown button */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-black bg-opacity-30 overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    {/* Links for smaller screens */}
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold '
                    >
                      Home
                    </Link>
                    <Link
                      to='/apartment'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold '
                    >
                      Apartment
                    </Link>
                    {user ? (
                      <>
                        <div
                          onClick={logOut}
                          className='px-4 py-3  hover:bg-slate-500 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-slate-500 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-slate-500 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
