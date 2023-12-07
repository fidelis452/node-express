const myTask = require("../models/Task");
const { ObjectId } = require("mongoose").Types;

const getAllTasks = async (req, res) => {
//   try {
    const allTasks = await myTask.find({});
    res.status(201).json({ allTasks });
//   } catch (error) {
//     res.status(500).send(error);
//   }
};

const createTask = async (req, res) => {
  try {
    const task = await myTask.create(req.body);
    res.status(201).json({ task });
    console.log(task);
  } catch (error) {
    res.status(500).send({ message: error });
    console.log(error);
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;

    //   The ObjectId.isValid(id) check ensures that the provided ID is a valid ObjectId before attempting to create an ObjectId instance.
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task id!" });
    }

    const objectId = new ObjectId(id);

    const singleTask = await myTask.findById({ _id: objectId }).exec();

    //   After fetching the task using findById, it checks if the singleTask variable is null (no task found). If so, it returns a 404 Not Found response.
    if (!singleTask) {
      return res.status(404).json({ error: "Task not Found!" });
    }

    res.status(200).json({ singleTask });
    // res.json({id: req.params.id})
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid) {
    return res.status(400).json({ error: "Invalid task id!" });
  }

  try {
    const { name, completed } = req.body;

    // Construct the update object based on the provided values
    const updateObject = {};
    if (name) updateObject.name = name;
    if (completed !== undefined) updateObject.completed = completed;

    const updatedTask = await myTask.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.status(200).json({ updateTask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
    console.log(error);
  }
};

const deleteTask = async (req, res) => {

  const id = req.params.id;

  if (!ObjectId.isValid) {
    return res.status(400).json({ error: "Invalid task id!" });
  }

  try {
     const deletedTask = await myTask.findByIdAndDelete(id);
     
     if (!deletedTask) {
       return res.status(404).json({ error: "Task not found!", deletedTask });
     }

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
