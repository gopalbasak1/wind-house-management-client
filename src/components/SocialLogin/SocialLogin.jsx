import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";



const SocialLogin = () => {

    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosCommon();
    const navigate = useNavigate();


    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res => {
            console.log(res.user);
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                
                navigate('/')
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <div className="divider divider-info mt-10">
            <button
            onClick={handleGoogleSignIn}
            className="btn ">
              <FcGoogle className="text-4xl" />
              </button>
            </div>

        </div>
    );
};

export default SocialLogin;