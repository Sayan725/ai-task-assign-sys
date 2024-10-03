// src/components/TeamDashboard.js
import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";

const TeamDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      const taskSnapshot = await firestore.collection("tasks").where("assignedTo", "==", user.uid).get();
      setTasks(taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} - Due: {task.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDashboard;
