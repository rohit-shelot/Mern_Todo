const Task_Schema = require("../database/Schema");
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.json({ message: "Enter all Details" });
    }
    const createTask = await Task_Schema.create({ title, description });
    res.json({ message: createTask });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  const id  = req.params.id;
  try {
    if (!id) {
      return res.json({ message: "Task not Found" });
    }
    await Task_Schema.findByIdAndDelete(id);
    return res.json({ message: "Successfully Task Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  const id  = req.params.id;
  const {title,description} = req.body;
  if (!id) {
    return res.json({ message: "Task not Found" });
  }
  const updateTask = await Task_Schema.findByIdAndUpdate(id, {
    title,
    description,
  });
  res.json({message:"Task has been Successfully Updated"});
};
const getTask = async (req, res) => {
  try {
    const fetchTask = await Task_Schema.find();
    return res.json(fetchTask);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createTask, deleteTask, updateTask, getTask };
