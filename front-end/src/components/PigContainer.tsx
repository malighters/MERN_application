import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/appContext"
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/PigContainer";
import Pig from "./Pig";

const PigContainer = () => {
  const { getPigs, pigs, numOfPages, page, totalPigs, isLoading } = useContext(AppContext);

  const [ dataLoading, setDataLoading ] = useState(false); 
  
  useEffect(() => {
    if (!dataLoading) {
      getPigs?.();
      setDataLoading(true);
    }
  }, [getPigs])

  if (isLoading) {
    return <Loading center />
  }

  if (pigs?.length === 0) {
    return (
      <Wrapper>
        No pigs to display...
      </Wrapper>
    )
  } 

  return (
    <Wrapper>
      <h5>{totalPigs} pig{totalPigs! > 1 && 's'} found</h5>
      <div className="pigs">
        {pigs?.map((pig) => {
          return <Pig key={pig.id} {...pig} />
        })}
      </div>
    </Wrapper>
  )
}
export default PigContainer