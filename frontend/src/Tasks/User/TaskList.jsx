import { useEffect, useState } from "react";
import axios from "axios";
import UpdateTask from "./UpdateTask";
import MarkTaskCompleted from "./MarkTaskCompleted";

const TaskList = ({ refreshTasks }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTasks]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Your Tasks</h3>
      {tasks.length ? (
        tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded mt-2 shadow-md">
            <div className="lg:flex justify-between">
              <div>
                <h4 className="text-lg font-medium">Title: {task.title}</h4>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Description:</span>{" "}
                  {task.description}
                </p>
                <hr className="mt-3 h-0.5 bg-gray-400" />
                <span className="text-sm font-semibold">
                  Task is:{" "}
                  {task.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </span>
              </div>
              <div className="lg:mt-0 md:mt-3 mt-3 lg:w-[30%] md:w-[60%] lg:justify-self-auto md:justify-self-center">
                <UpdateTask task={task} onTaskUpdated={fetchTasks} />
                <div className="text-center mt-3">
                  <MarkTaskCompleted
                    taskId={task._id}
                    onTaskMarked={fetchTasks}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
