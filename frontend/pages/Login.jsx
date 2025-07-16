//Login.jsx
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {

  const navigate=useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  })

  const [passwordcheck,setmsg]=useState("");

  const [emailCheck,setemailCheck]=useState("");

  const saveData = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const sendData = async (e) => {
    e.preventDefault();
    const result = await axios.post("https://task-manager-with-authentication.onrender.com/login", loginData);
    // console.log(result.data.fullData.dbresult._id);
    setmsg(result.data.passwordMessage)
    setemailCheck(result.data.emailMessage)
    if(result.data.fullData.isMatch){
      localStorage.setItem("userId",result.data.fullData.dbresult._id)
      navigate("/TaskPage")
    }
    setloginData({
      email: "",
      password: ""
    })
    
  }


  useEffect(() => {
    console.log(loginData);
  }, [loginData])

  return (
    <div className="text-gray-300 bg-cover bg-[url(https://www.skyweaver.net/images/media/wallpapers/wallpaper2.jpg)] w-full h-screen flex justify-center items-center">
      <div className="bg-gray-900 flex flex-col py-10 justify-center items-center border-1 rounded-xl">
        <h1 className="m-5 text-3xl font-bold]">Login</h1>
        <form className="flex flex-col">
          <p className={emailCheck==="User not found" ? "text-red-500 font-semibold ml-11 text-sm":"font-semibold ml-11 text-sm"}>{emailCheck}</p>
          <input onChange={saveData} value={loginData.email} className="bg-gray-950 border-1 rounded-[8px] m-3 mt-0 mx-10 px-3 py-3" name="email" placeholder="Enter your Email" />
          <br />
        <p className={passwordcheck==="Login successful"? "text-emerald-500 text-sm ml-11":"text-red-500 text-sm ml-10"}>{passwordcheck}</p>
          <input onChange={saveData} value={loginData.password} className="bg-gray-950 border-1 rounded-[8px] m-3 mt-0  mx-10 px-3 py-3" name="password" placeholder="Enter your Password" />
          <button onClick={sendData} className="m-5 rounded-[8px] py-2 cursor-pointer bg-pink-500 active:scale-95">Login</button>
        </form>
        <p className="">Terms and Condition fuck you</p>
        <p>
          <Link to="/" className="text-blue-600">Back to Registration</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

