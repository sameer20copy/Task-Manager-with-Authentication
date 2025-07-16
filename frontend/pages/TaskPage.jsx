//TaskPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TaskPage() {

    const [status, setstatus] = useState("Complete");
    // const [showStatus,setShowStatus]=useState("")
    const [count, setcount] = useState(false)
    const [tasks, settasks] = useState([])

    const [userTask, setuserTask] = useState({
        title: "",
        description: "",
        lastDate: "",
    })

    const handleStatus = async (id) => {

        const newStatus = count ? "COMPLETE" : "Pending";
        setstatus(newStatus);           // update local state (optional)
        setcount(!count);

        const result = await axios.post("https://task-manager-with-authentication.onrender.com/status", { status: status, id: id })
        console.log(result.data.status)
        getData();
    }

    const saveData = (e) => {
        setuserTask({ ...userTask, [e.target.name]: e.target.value })
    }

    const sendData = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId")
        const taskWithStatus = { ...userTask, status, userId };
        const result = await axios.post("https://task-manager-with-authentication.onrender.com/TaskPage", taskWithStatus);
        setuserTask({
            title: "",
            description: "",
            lastDate: "",
        })
        getData();
        // const getData=await axios.post("http://localhost:3000/TaskPage");
    }

    const getData = async (e) => {
        // e.preventDefault();
        const connection = await axios.get(`https://task-manager-with-authentication.onrender.com/TaskPage`,{userId: localStorage.getItem("userId")})
        // const userId=connection.data.taskData[0].userId
        settasks(connection.data.taskData);
        // console.log(connection.data.taskData[0].userId)
    }


    const deleteHandle = async (id) => {
        const del = await axios.delete(`https://task-manager-with-authentication.onrender.com/TaskPage/${id}`);
        getData();
    };

    useEffect(() => {
        getData()
        handleStatus();
    }, [])

    return (
        <div className="bg-gray-950 h-screen overflow-y-auto text-white">
            <div className="flex">
                <div className="w-1/3 ml-5">
                    <div className="bg-rose-600 mb-1 rounded-xl p-1 w-full flex flex-col items-center mt-6"><h1 className="font-bold text-2xl flex items-center">Add Task</h1></div>
                    <form className="flex flex-col justify-center items-start ">
                        <input onChange={saveData} value={userTask.title} className="w-full border-1 mt-1 bg-gray-900 rounded-[8px] p-3" name="title" placeholder="Enter Title"></input>
                        <input onChange={saveData} value={userTask.lastDate} className="w-full border-1 mt-2 bg-gray-900 rounded-[8px] p-3" name="lastDate" placeholder="Enter Last Date"></input>
                        <br />
                        <textarea spellCheck={false} onChange={saveData} value={userTask.description} name="description" placeholder="Enter Discription" className="p-3 mt-0 h-50 w-full border  border-gray-300 rounded-xl shadow-sm focus:outline-none resize-none text-base placeholder-gray-400 bg-gray-900"></textarea>
                        <button onClick={sendData} className="w-full mt-4 p-3 rounded-xl cursor-pointer active:scale-95 bg-cyan-600 text-gray-300">Save</button>
                        <button onClick={getData}>test</button>
                    </form>
                </div>
                <div className="w-full ml-5 mr-5 mt-5 rounded-xl flex flex-col ">
                    <div className="bg-rose-600 p-2 rounded-xl mb-2 w-full flex flex-col items-center"><h1 className="font-bold text-2xl flex items-center">Task List</h1></div>
                    <table className="min-w-full border bg-gray-900 border-gray-300 rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Description</th>
                                <th className="py-3 px-6 text-left">Last Date</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 text-white">
                            {tasks.map((task, ind) => {
                                if (task.title === "") {
                                    return <tr key={ind} className="w-full flex items-center ml-5 mb-4">
                                        <td className="">Empty task</td>
                                        <td className="flex justify-center border-t-1 items-center "><button className="mt-2 bg-red-600 px-3 py-1 rounded-2xl active:scale-95 cursor-pointer" onClick={() => { deleteHandle(task._id) }}>Delete</button></td>
                                    </tr>
                                }
                                else {
                                    return <tr key={task._id}>
                                        <td className="py-3 px-6 border-1">{task.title}</td>
                                        <td className="py-3 px-6 border-1">{task.description}</td>
                                        <td className="py-3 px-6 border-1">{task.lastDate}</td>
                                        <td className={task.status === "Pending" ? "py-3 px-6 border-1 text-yellow-600" : "py-3 px-6 border-1 text-blue-600"}><button className="cursor-pointer" onClick={() => { handleStatus(task._id) }}>{task.status}</button></td>
                                        <td className="flex justify-center border-t-1 items-center "><button className="mt-2 bg-red-600 px-3 py-1 rounded-2xl active:scale-95 cursor-pointer" onClick={() => { deleteHandle(task._id) }}>Delete</button></td>
                                        {/* <td key={ind} className="py-3 px-6 border-t">{task.status}</td> */}
                                        {/* <td><button onClick={deleteTask} className={status === "Pending" ? "bg-yellow-600 px-3 py-1.5 rounded-2xl active:scale-95 cursor-pointer" : "bg-green-500 px-3 py-1.5 rounded-2xl active:scale-95 cursor-pointer"}>{status}</button></td> */}
                                    </tr>
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}