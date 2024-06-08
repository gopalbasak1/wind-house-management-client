import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { AiOutlineBars } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import UserMenu from '../Menu/UserMenu';
import MemberMenu from '../Menu/MemberMenu';
import AdminMenu from '../Menu/AdminMenu';

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link className='flex items-center ' to='/'>
                <img
                  src='https://i.ibb.co/Ctvgz06/Wind-House-1-unscreen.gif'
                  alt='logo'
                  width='60'
                  height='50'
                />
                <p className='mt-6'>Wind House</p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {role === 'user' && <UserMenu />}
              {role === 'member' && <MemberMenu />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <button
            onClick={handleLogout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
