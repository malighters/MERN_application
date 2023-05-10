import { useState, useContext, FormEvent } from "react";
import Alert from "../../components/Alert";
import InputField from "../../components/InputField";
import { AppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardPage";

const Profile = () => {
  const { user, showAlert, displayAlert, isLoading, updateUser } = useContext(AppContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    if (!name || !email) {
      displayAlert?.();
      return;
    } 

    updateUser?.({name, email});
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="dorm-center">
          <InputField label="Name" value={name || ''} type="text" htmlFor="name" handleChange={(e: FormEvent) => {
              const {value} = e.target as HTMLInputElement;
              setName(value);
            }}/>
          <InputField label='Email' type='email' value={email || ''} htmlFor='email' handleChange={(e: FormEvent) => {
              const {value} = e.target as HTMLInputElement;
              setEmail(value);
            }}/>
          <br/>
          <button className="btn btn-block" type="submit" disabled={isLoading}> {isLoading ? 'Please wait...' : 'Save changes'} </button>
        </div>
      </form>
    </Wrapper>  
  )
}
export default Profile