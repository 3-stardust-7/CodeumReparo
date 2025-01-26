import React from "react";

const TaskCard = ({ task }) => {
  const bgColor =
    task.status === "not-started"
      ? "bg-gray-600"
      : task.status === "in-progress"
      ? "bg-yellow-500"
      : "bg-green-500";
  return (
    <div
      className={`rounded-lg p-4 ${bgColor} bg-opacity-80 text-white w-full flex items-center`}
    >
      <h3 className="text-lg font-semibold">{task.name}</h3>
    </div>
  );
};

export default TaskCard;
