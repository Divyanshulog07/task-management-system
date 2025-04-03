import axios from "axios";

const MarkTaskCompleted = ({ taskId, onTaskMarked }) => {
  const handleComplete = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/tasks/${taskId}/completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status === 200) {
        onTaskMarked();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error marking task as completed");
    }
  };

  return (
    <button
      onClick={handleComplete}
      className="bg-green-500 text-white px-3 py-1 rounded"
    >
      Complete
    </button>
  );
};

export default MarkTaskCompleted;