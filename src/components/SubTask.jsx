import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  if (!Array.isArray(boards) || boards.length === 0) return null;

  const board = boards.find((b) => b.isActive) || boards[0];
  if (!board || !Array.isArray(board.columns)) return null;

  const col = board.columns[colIndex];
  if (!col || !Array.isArray(col.tasks)) return null;

  const task = col.tasks[taskIndex];
  if (!task || !Array.isArray(task.subtasks)) return null;

  const subtask = task.subtasks[index];
  if (!subtask) return null;

  const checked = subtask.isCompleted;

  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
      <input
        className="w-4 h-4 accent-[#635fc7] cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
