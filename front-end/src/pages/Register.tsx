import { FormEvent, useContext, useEffect ,useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Alert from "../components/Alert";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const userState = {
  name: '',
  email: '',
  password: '',
  isRegistered: true
 }

const Register = () => {

  const navigate = useNavigate();
  const userData = useContext(AppContext).user;

  useEffect(() => {  
    if(userData){
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }
  }, [userData, navigate])

  const [user, setUser] = useState(userState);

  const { isLoading, showAlert, displayAlert, registerUser, loginUser } = useContext(AppContext);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUser({...user, [name]: value})
  }

  const toogleMember = () => {
    setUser({...user, isRegistered: !user.isRegistered});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(!user.email || !user.password || (!user.isRegistered && !user.name)){
      displayAlert?.();
      return;
    }

    const currentUser = {
      email: user.email, 
      password: user.password,
      name: user.name,
    }

    if(user.isRegistered) {
      loginUser?.(currentUser);
    }
    else{ 
      registerUser?.(currentUser);
    }

  }
  return (
   <Wrapper className='full-page'>
    <form onSubmit={handleSubmit} className='form'>
      <Logo/>
      <h3>{ user.isRegistered ? 'Login' : 'Register'}</h3>
      

      { showAlert && <Alert /> }

      { !user.isRegistered && <InputField label='Name' type='text' value={user.name} htmlFor='name' handleChange={handleChange}/> }
      
      <InputField label='Email' type='email' value={user.email} htmlFor='email' handleChange={handleChange}/>
      
      <InputField label='Password' type='password' value={user.password} htmlFor='password' handleChange={handleChange}/>

      <button className='btn btn-block' type='submit' disabled={isLoading}>Submit</button>

      { user.isRegistered ? 'Not registered?' : 'Already a member?'}
    
      <button className='member-btn' onClick={toogleMember}>{ user.isRegistered ? ' Register' : ' Login'  }</button>
    </form>
   </Wrapper>
  )
}
export default Register