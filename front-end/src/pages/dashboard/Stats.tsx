import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/appContext";
import ChartContainer from "../../components/ChartContainer";
import Loading from "../../components/Loading";

const Stats = () => {

  const { isLoading, showStats } = useContext(AppContext); 

  const [ dataLoading, setDataLoading ] = useState(false); 
  
  useEffect(() => {
    if (!dataLoading) {
      showStats?.();
      setDataLoading(true);
    }
  }, [showStats, setDataLoading, dataLoading])

  if (isLoading) {
    return <Loading center />
  }
  

  return (
    <>
      <ChartContainer />
    </>
  )
}
export default Stats