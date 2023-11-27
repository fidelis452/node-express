const express = require("express")
const app = express()
const mongoose = require('mongoose')
const tasks = require("./routes/tasks")

// middleware
app.use(express.json())

app.get('/hello', (req, res) => {
   res.send("Task manager app")
})

app.use("/api/v1/tasks", tasks)

const port = 4000;
app.listen(port, console.log(`The server is running on port ${port}`))