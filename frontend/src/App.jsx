import { FaTrash, FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null)

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/get-task");
    setTask(response.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:4000/create-task", {
      title,
      description,
    });
    setTitle("");
    setdescription("");
    fetchData();
  };
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/delete-task/${id}`);
    fetchData();
  };
  const updateTask = async (id) => {
    await axios.put(`http://localhost:4000/update-task/${editTaskId}`,{title,description});
    setShowEditModal(false);
    setEditTaskId(null);
    setTitle('')
    setdescription('')
    fetchData()
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              ✏️ Edit Task
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Edit Title"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e)=>{setTitle(e.target.value)}}
              />

              <input
                type="text"
                placeholder="Edit Description"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e)=>{setdescription(e.target.value)}}

              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={updateTask}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-black flex justify-center items-center ">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            📝 ToDo List
          </h1>

          <div className="flex flex-col gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Add Task
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-50 border rounded-xl p-4 hover:shadow transition"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>

                <div className="flex gap-4">
                  <FaEdit
                    size={18}
                    title="Update"
                    className="text-blue-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => {
                      setShowEditModal(true);
                      setTitle(task.title);
                      setdescription(task.description);
                      setEditTaskId(task._id)
                    }}
                  />
                  <FaTrash
                    size={18}
                    title="Delete"
                    className="text-red-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => {
                      deleteTask(task._id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
