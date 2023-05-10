import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import {AddPig, AllPigs, Profile,SharedLayout, Stats} from "./pages/dashboard/dashboard";
import Error from "./pages/Error";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import axios from "axios";
function App() {
  
  axios.defaults.baseURL = `http://localhost:5000`;
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path="add-pig" element={<AddPig />} />
          <Route path="all-pig" element={<AllPigs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
