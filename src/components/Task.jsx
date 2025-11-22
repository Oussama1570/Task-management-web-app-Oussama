import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);

  // ✅ Guards
  if (!Array.isArray(boards) || boards.length === 0) return null;

  const board = boards.find((b) => b.isActive) || boards[0];
  if (!board || !Array.isArray(board.columns)) return null;

  const col = board.columns[colIndex];
  if (!col || !Array.isArray(col.tasks)) return null;

  const task = col.tasks[taskIndex];
  if (!task) return null;

  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
