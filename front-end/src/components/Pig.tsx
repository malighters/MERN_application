import moment from "moment";
import { IPig } from "../interfaces/pig-interface";
import { FaStickyNote, FaCalendarAlt } from 'react-icons/fa';
import Wrapper from "../assets/wrappers/Pig";
import { AppContext } from "../context/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PigInfo from "./PigInfo";


const Pig = ({id, tag, gender, breed, birth_date, note}: IPig) => {

  const { setEditId, deletePig } = useContext(AppContext);

  const date = moment(birth_date);
  const birthDate = date.format('MMM Do, YYYY');

  return (
    <Wrapper>
      <div>
        <header>
          <div className={`main-icon ${gender.toLowerCase()}`}>{gender.charAt(0)}</div>
          <div className="info">
            <h5>{tag}</h5>
            <p>{breed}</p>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <PigInfo Icon={FaCalendarAlt} text={birthDate} />
            { note ? <PigInfo Icon={FaStickyNote} text={note} /> : null}
          </div>
          <footer>
            <div className="actions">
              <Link className="btn edit-btn" to="/add-pig" onClick={() => setEditId?.(id)}>Edit</Link>
              <button type="button" className="btn delete-btn" onClick={() => deletePig?.(id)}>Delete</button>
            </div>
          </footer>
        </div>
      </div>
    </Wrapper>
  )
}
export default Pig