import { Link } from 'react-router-dom';
import img from '../assets/images/error_not_found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='Error: not found 404'/>
        <h3>Page not found</h3>
        <p>We can't find a page with such adress</p>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  )
}
export default Error