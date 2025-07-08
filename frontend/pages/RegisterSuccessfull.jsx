import React from "react";
import { Link } from "react-router-dom";

export default function(){
    return(
        <div>
            <div className="flex justify-center items-center min-h-[90vh] text-emerald-500 underline text-6xl font-bold">
                <h1>Registered Successfully</h1>
            </div>
                <Link to="/login" className="flex justify-center items-center text-blue-600 text-2xl font-bold">Click to Login</Link>
        </div>
    )
}