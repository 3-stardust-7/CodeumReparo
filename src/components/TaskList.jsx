// import React, { useEffect, useState } from "react";
// import TaskCard from "./TaskCard";
// import { Link } from "react-router-dom";

// const TaskList = ({ tasks, message }) => {
//   if (tasks.length === 0) {
//     return (
//       <div className="absolute top-0 right-0 flex flex-col items-center justify-center mt-10">
//         <p className="text-white text-[30px]">{message}</p>
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-col items-start gap-3 mt-6 w-full max-w-full">
//       {tasks.map((task, i) => (
//         <Link
//           to={`/task/${task.id}`}
//           key={i}
//           className="w-full"
//           style={{ textDecoration: "none" }}
//         >
//           <TaskCard task={task} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default TaskList;


import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, message }) => {
  useEffect(() => {
    console.log("Tasks in TaskList:", tasks); // Log tasks to debug
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-white text-[30px]">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 mt-6 w-full max-w-full">
      {tasks.map((task, i) => {
        console.log("Task details:", task); // Log each task
        return (
          <Link
            to={`/task/${task.id}`}
            key={i}
            className="w-full"
            style={{ textDecoration: "none" }}
          >
            {/* Temporarily replaced TaskCard to test rendering */}
            <div className="w-full bg-gray-800 p-4 rounded-lg mb-2">
              <h3 className="text-white text-lg font-bold">{task.name}</h3>
              <p className="text-white">{task.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TaskList;

