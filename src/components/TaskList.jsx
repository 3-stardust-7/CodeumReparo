import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, message }) => {
  if (tasks.length === 0) {
    return (
      <div className="absolute top-0 right-0 flex flex-col items-center justify-center mt-10">
        <p className="text-white text-[30px]">{message}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start gap-3 mt-6 w-full max-w-full">
      {tasks.map((task, i) => (
        <Link
          to={`/task/${task.id}`}
          key={i}
          className="w-full"
          style={{ textDecoration: "none" }}
        >
          <TaskCard task={task} />
        </Link>
      ))}
    </div>
  );
};

export default TaskList;
