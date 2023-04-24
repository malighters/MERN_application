import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import farm from '../assets/images/farm.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className="container page">
      <div className="info">
        <h1>Pig farm <span>management</span> system</h1>
        <p>
        Occupy photo booth four dollar toast drinking vinegar. Bespoke venmo readymade skateboard, pinterest gochujang fingerstache offal williamsburg lomo occupy affogato ugh XOXO viral. Fam post-ironic thundercats, cray chillwave vape church-key shaman wayfarers meggings. Cold-pressed vice edison bulb polaroid occupy humblebrag, narwhal heirloom flexitarian.


        </p>
        <Link to='/register' className='btn btn-hero'>Login/Register</Link>
      </div>
      <img src={farm} alt='Farm' className='img' />
    </div>
  </Wrapper>
  )
}





export default Landing