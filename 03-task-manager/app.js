const express = require("express")
const app = express()
const mongoose = require('mongoose')
const tasks = require("./routes/tasks")
const dbConnect = require("./db/connect")
const cors = require('cors')
// middleware
// app.use(cors())
app.options("*", cors());
app.use(express.static('./public'));
app.use(express.json())

// routes
app.get('/tasks', (req, res) => {
   res.send("Task manager app")
})

app.use("/api/v1/tasks", tasks, cors())

const port = 4000;

const start = async () => {
   try {
      await dbConnect(process.env.connectionString)
      app.listen(port, console.log(`The server is listening on port ${port} and the db is connected`))
   } catch (error) {
      console.log(error);
   }
}

start()