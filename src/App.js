import React, { useState } from "react";
import { db } from "./firebase"; // Import the Firestore instance from firebase.js
import { collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const [task, setTask] = useState({ title: "", description: "", deadline: "" });

  // Handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Function to add a new task to the Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskCollection = collection(db, "tasks"); // Correct way to access a collection
      await addDoc(taskCollection, task); // Use addDoc to insert a document into the collection
      console.log("Task successfully added!");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  // Example of how to fetch all tasks (optional)
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <div>
      <h1>AI Task Assignment System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
        />
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
        />
        <button type="submit">Create Task</button>
      </form>

      <button onClick={fetchTasks}>Fetch All Tasks</button>
    </div>
  );
}

export default App;
