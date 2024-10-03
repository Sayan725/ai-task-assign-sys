// src/components/TaskForm.js
import React, { useState } from "react";
import { firestore } from "../firebase";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "", skills: "", deadline: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("tasks").add(task);
    setTask({ title: "", description: "", skills: "", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={task.title} onChange={handleInputChange} placeholder="Task Title" required />
      <textarea name="description" value={task.description} onChange={handleInputChange} placeholder="Task Description" required />
      <input name="skills" value={task.skills} onChange={handleInputChange} placeholder="Required Skills" required />
      <input type="date" name="deadline" value={task.deadline} onChange={handleInputChange} required />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
