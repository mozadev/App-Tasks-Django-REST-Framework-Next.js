"use client"
function TaskCard({ task }) {
    return (

        <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md flex justify-between items-center">
            <div>
                <h2 className="font-bold ">{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className="flex justify-between gap-x-2">
                <button className="bg-red-500 text-white rounded-md p-2" >Eliminar</button>
                <button className="bg-indigo-500 text-white rounded-md p-2" >Actualizar</button>
            </div>
        </div>

    )
}

export default TaskCard; 