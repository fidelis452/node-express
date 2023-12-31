import React, { useState } from "react";
import "./styles.css";
import {
  Navigate,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

export default function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Extracting initial state from location.state or use an empty object
  const initialState = location.state || {};

  // Initialize state with the extracted state and the provided id
  const [task, setTask] = useState({
    completed: initialState.completed || false,
    name: initialState.name || "",
    _id: id,
  });

  const handleChange = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let name = e.target.name;

    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(task);

  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/tasks/${task._id}`,
        {
          name: task.name,
          completed: task.completed,
        }
      );
      console.log(JSON.stringify(response.data));
      console.log("Submitted Task:", task);
      navigate("/", {redirect: true})
    } catch (error) {
      console.log(error);
    }

    // Add your logic to submit the task data
  };


  return (
    <div className="flex-container">
      <form onSubmit={handleSubmit}>
        <div className="editTask">
          <label htmlFor="id">Task ID</label>
          <input id="id" type="text" name="id" value={id} readOnly />
        </div>

        <div className="editTask">
          <label htmlFor="task">Name</label>
          <input
            id="task"
            type="text"
            name="name"
            placeholder="New Task"
            value={task.name}
            onChange={handleChange}
          />
        </div>

        <div className="editTask">
          <label htmlFor="status">Completed</label>
          <input
            id="status"
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
          />
        </div>

        <input className="submit-button" type="submit" value="Submit" />
        {/* Submit
        </button> */}
      </form>
    </div>
  );
}
