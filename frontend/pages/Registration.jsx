//Registration.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import RegisterSuccessfull from "./RegisterSuccessfull";

export default function Registration() {

    const navigate=useNavigate();

    const [userData, setuserdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const saveData = (e) => {
        setuserdata({ ...userData, [e.target.name]: e.target.value });
    }

    const sendData = async (e) => {
        try {
            e.preventDefault();
            const result = await axios.post("http://localhost:3000/", userData);
            setuserdata({
                name: "",
                email: "",
                password: ""
            })
            navigate("/RegisterSuccessfull")
        } catch (error) {
            console.error("Data connot Send!!");
        }
    }

    // useEffect(() => {
    //     console.log(userData);
    // }, [userData]);

    return (
        <div>
            <div className="bg-[url(../bg-image.jpg)] w-full h-screen bg-cover flex justify-center items-center">
                <div className="w-90 rounded-2xl ">
                    <form className="bg-gray-200 h-full flex flex-col justify-center items-center min-h-[80vh] rounded-2xl">
                        <h1 className="overline decoration-amber-500 font-bold text-3xl p-5 bg-gray-200 text-emerald-600">Registration</h1>
                        <input onChange={saveData} value={userData.name} name="name" placeholder="Enter Name" className="border-1 m-4 px-3 py-1 rounded-[8px]"></input>
                        <input onChange={saveData} value={userData.email} name="email" placeholder="Enter Email" className="border-1 m-4 px-3 py-1 rounded-[8px]"></input>
                        <input onChange={saveData} value={userData.password} name="password" placeholder="Enter Password" className="border-1 m-4 px-3 py-1 rounded-[8px]"></input>
                        <button type="submit" onClick={sendData} className="m-5 bg-amber-400 px-4 py-2 rounded-xl hover:cursor-pointer active:scale-90">Submit</button>
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}