//App.jsx
import Login from "../pages/Login";
import Registration from "../pages/Registration"
import RegisterSuccessfull from "../pages/RegisterSuccessfull";
import { Link, Routes, Route } from "react-router-dom";
import TaskPage from "../pages/TaskPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/RegisterSuccessfull" element={<RegisterSuccessfull/>}></Route>
      <Route path="/TaskPage" element={<TaskPage/>}></Route>
    </Routes>
  )
}

export default App;