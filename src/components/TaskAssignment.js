// src/components/TaskAssignment.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { firestore } from "../firebase";

const TaskAssignment = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  // Fetch tasks and team members
  useEffect(() => {
    const fetchTasks = async () => {
      const taskSnapshot = await firestore.collection("tasks").get();
      setTasks(taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const memberSnapshot = await firestore.collection("members").get();
      setMembers(memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTasks();
  }, []);

  const assignTask = async (taskId, skill) => {
    try {
      // Gemini API request (pseudo example)
      const response = await axios.post("https://gemini-api.com/assign", {
        skill,
        taskId,
        members
      });

      const { assignedMemberId } = response.data;
      await firestore.collection("tasks").doc(taskId).update({ assignedTo: assignedMemberId });
      alert(`Task assigned to member with ID: ${assignedMemberId}`);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div>
      <h2>Unassigned Tasks</h2>
      <ul>
        {tasks
          .filter(task => !task.assignedTo)
          .map(task => (
            <li key={task.id}>
              {task.title} - Required Skills: {task.skills}
              <button onClick={() => assignTask(task.id, task.skills)}>Assign Task</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskAssignment;
