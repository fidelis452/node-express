const myTask = require("../models/Task")

const getAllTasks = (req, res) => {
   res.send('Get all tasks from the database!')
}

const createTask = async (req, res) => {
   try {
      const task = await myTask.create(req.body)
      res.status(201).json({task})      
   } catch (error) {
      res.status(500).send({ message: error})
   }
}

const getTask = (req, res) => {
   res.json({id:req.params.id})
}

const updateTask = async (req, res) => {
   const task = await myTask.updateOne({ name: 'third test', completed: true })
   res.send('Update a task!')
}

const deleteTask = async (req, res) => {
   const task =  await myTask.deleteOne({name: 'second test', completed: false})
   res.status(201).send("Task deleted!")
}

module.exports = {
   getAllTasks,
   createTask,
   getTask,
   updateTask,
   deleteTask
}