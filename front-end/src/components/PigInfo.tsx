import { IconType } from "react-icons";
import Wrapper from "../assets/wrappers/PigInfo";

const PigInfo = ({Icon, text}: {Icon: IconType, text:string}) => {
  return (
    <Wrapper>
      <span className="icon"><Icon /></span>
      <span className="text">{text}</span>
    </Wrapper>
  )
}
export default PigInfo