import axios from "axios";
import React, { setState, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Tasks() {
  const [name, setName] = useState("");

  const [checked, setChecked] = useState(true);

  console.log({ name });

  const [tasks, setTasks] = useState();

  const [activeTask, setActiveTask] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/tasks");
      setTasks(response.data.allTasks);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  // console.log(tasks);
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/tasks", {
        name: name,
      });
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((item) => item._id === taskId);

    navigate(`/edit/${taskId}`, {
      state: { id: task._id, name: task.name, completed: task.completed },
    });
  };

  const handleDelete = async ( taskID) => {
    try {
      const deleteTask = await axios.delete(
        `http://localhost:4000/api/v1/tasks/${taskID}`
      );

      getTask();

      console.log("Task deleted", deleteTask);
    } catch (error) {}
  }

  return (
    <div class="flex-container">
      <form onSubmit={handleSubmit}>
        <label for="task">Task Manager</label>
        <input
          id="task"
          type="text"
          name="task"
          placeholder="New Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="submit" value="Submit" />
        {tasks?.map((item, index) => {
          function completed() {
            if (item.completed === true) {
              return (
                <>
                  <div className="completed">
                    <input
                      type="checkbox"
                      value={item.completed}
                      defaultChecked={true}
                    />
                  </div>
                  <div className="complete-task">{item.name}</div>
                </>
              );
            } else {
              return (
                <>
                  <div className="completed">
                    <input
                      type="checkbox"
                      value={item.completed}
                      defaultChecked={false}
                    />
                  </div>
                  <div className="incomplete-task">{item.name}</div>
                </>
              );
            }
          }
          return (
            <div className="card" key={index}>
              <div className="card-section">{completed()}</div>
              <div className="edit">
                <button onClick={() => handleEdit(item._id)}>
                  <img
                    width="13"
                    height="13"
                    src="https://img.icons8.com/windows/32/create-new.png"
                    alt="create-new"
                  />
                </button>
              </div>
              <div className="delete">
                <button onClick={() => handleDelete(item._id)}>
                  <img
                    width="13"
                    height="13"
                    src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"
                    alt="filled-trash"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
