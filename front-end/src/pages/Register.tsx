import { FormEvent, useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

const userState = {
  name: '',
  email: '',
  password: '',
  isRegistered: true,
  showAlert: false
 }

const Register = () => {

  const [user, setUser] = useState(userState);

  const handleChange = (e: FormEvent) => {
    e.preventDefault();
  }

  const toogleMember = () => {
    setUser({...user, isRegistered: !user.isRegistered});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();


  }

  return (
   <Wrapper className='full-page'>
    <form onSubmit={handleSubmit} className='form'>
      <Logo/>
      <h3>{ user.isRegistered ? 'Login' : 'Register'}</h3>
      

      { user.showAlert && <Alert text='Invalid credentials'/> }

      { !user.isRegistered && <InputField label='Name' type='text' value={user.name} htmlFor='name' handleChange={handleChange}/> }
      
      <InputField label='Email' type='email' value={user.email} htmlFor='email' handleChange={handleChange}/>
      
      <InputField label='Password' type='password' value={user.password} htmlFor='password' handleChange={handleChange}/>

      <button className='btn btn-block' type='submit'>Submit</button>

      { user.isRegistered ? 'Not registered?' : 'Already a member?'}
    
      <button className='member-btn' onClick={toogleMember}>{ user.isRegistered ? ' Register' : ' Login'  }</button>
    </form>
   </Wrapper>
  )
}
export default Register