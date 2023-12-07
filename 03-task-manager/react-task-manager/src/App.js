import "./App.css";
import { Route, Routes } from "react-router-dom";
import Tasks from "./components/tasks";
import EditTask from "./components/edit";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;
