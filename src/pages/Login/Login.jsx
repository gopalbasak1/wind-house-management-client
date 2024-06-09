import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Login.css'


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const { signInWithGoogle, signIn, loading, setLoading, resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await signIn(email, password);
      navigate(from);
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        toast.error('Incorrect email or password. Please try again.');
      } else {
        toast.error(err.message);
      }
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error('Please enter your email first!');
    try {
      await resetPassword(email);
      toast.success('Request Success! Check your email for further process...');
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success('Sign In Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg'>
      <Helmet>
        <title>Wind House | Login</title>
      </Helmet>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 border-2 z-50 text-black'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-[#b8aaaa]'>Log In</h1>
          <p className='text-sm text-gray-400'>Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6 ng-untouched ng-pristine ng-valid'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                onBlur={e => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button
            onClick={handleResetPassword}
            className='text-xs hover:underline hover:text-rose-500 text-white'
>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm text-white'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>

        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p className='text-white font-bold hover:text-red-500'>Continue with Google</p>
        </button>

        <p className='px-6 text-sm text-center text-white'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-white'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
