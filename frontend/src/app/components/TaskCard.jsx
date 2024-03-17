"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'


function TaskCard({ task }) {

    const router = useRouter()
    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setnewDescription] = useState(task.description);

    const handleDelete = async (id) => {
        if (window.confirm('Do you want delete this task ?')) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
                {
                    method: "DELETE",
                })
            // console.log(res)
            if (res.status === 204) {
                router.refresh();
            }
        }
        // console.log(id);
    };

    const handleTaskDone = async (id) => {
        // console.log(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
            {
                method: "POST",
            })
        if (res.status === 200) {
            router.refresh()
        }
    }

    const handleUpdate = async (id) => {
        console.log(id)
        console.log(newTitle, newDescription)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${task.id}/`, {
            method: "PUT",
            body: JSON.stringify({ title: newTitle, description: newDescription }),
            headers: {
                "content-Type": "application/json",
            }
        });
        const data = await res.json();
        console.log(data)
        setNewTitle(data.title);
        setnewDescription(data.description);
        setEdit(!edit);
    }



    return (

        <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md flex justify-between items-center">
            <div className='flex flex-col'>

                {!edit ? (
                    <h2 className="font-bold ">
                        {newTitle}
                        {task.done && <span>✅</span>}
                    </h2>
                ) : (
                    <input type="text" placeholder={task.title}
                        className="p-2 bg-slate-500 border-none outline-none text-green-400"
                        onChange={e => setNewTitle(e.target.value)}
                    />
                )}


                {
                    !edit ? (
                        <p>{newDescription}</p>
                    ) : (
                        <textarea
                            placeholder={task.description}
                            className='p-2 bg-slate-500 border-none text-green-400 w-full'
                            rows={1}
                            onChange={e => setnewDescription(e.target.value)}
                        />

                    )
                }

            </div>
            <div className="flex justify-between gap-x-2">

                {edit && (
                    <button
                        className='bg-slate-300 text-black rounded-md p-2'
                        onClick={() => handleUpdate(task.id)}
                    // onClick={() => (!edit)}
                    >
                        Save Changes
                    </button>
                )}

                <button
                    className={
                        " text-white rounded-md p-2" +
                        (task.done ? " bg-gray-800 " : " bg-green-500")
                    }
                    onClick={() => handleTaskDone(task.id)}
                >
                    {task.done ? "Desmarcar" : "Marcar"}
                </button>
                <button
                    className=" bg-red-500 text-white rounded-md p-2"
                    onClick={() => handleDelete(task.id)}
                >
                    Eliminar
                </button>
                <button
                    className=" bg-indigo-500 text-white rounded-md p-2"
                    onClick={() => setEdit(!edit)}
                >
                    Update
                </button>
            </div>
        </div >

    )
}

export default TaskCard; 