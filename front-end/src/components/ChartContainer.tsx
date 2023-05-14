import { useContext } from "react";
import Wrapper from "../assets/wrappers/ChartContainer";
import { AppContext } from "../context/appContext";
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const ChartContainer = () => {

  const { stats } = useContext(AppContext)  

  return (
    <Wrapper>
      <h4>Distribution of pigs by breeds</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="Breed" />
          <YAxis allowDecimals={false}/>
          <Tooltip />
          <Bar dataKey="Quantity" fill="#82ca9d" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
export default ChartContainer