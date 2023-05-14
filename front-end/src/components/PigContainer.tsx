import { useContext, useEffect } from "react"
import { AppContext } from "../context/appContext"
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/PigContainer";
import Pig from "./Pig";
import PageBtnContainer from "./PageBtnContainer";

const PigContainer = () => {
  const { getPigs, pigs, numOfPages, totalPigs, isLoading, search, searchBreed, searchGender, searchSort, isUpdated } = useContext(AppContext);
  
  useEffect(() => {
    if (!isUpdated) {
      getPigs?.();
    }
  }, [getPigs, search, searchBreed, searchGender, searchSort, isUpdated])

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
      { numOfPages! > 1 && <PageBtnContainer /> }
    </Wrapper>
  )
}
export default PigContainer