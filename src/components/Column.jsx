import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const [color, setColor] = useState(null);

  const boards = useSelector((state) => state.boards);

  // ✅ Guard against missing boards
  if (!Array.isArray(boards) || boards.length === 0) {
    return null;
  }

  const board = boards.find((b) => b.isActive) || boards[0];

  // ✅ Guard against missing columns
  if (!board || !Array.isArray(board.columns)) {
    return null;
  }

  const col = board.columns[colIndex];

  // ✅ Guard against missing column index
  if (!col) {
    return null;
  }

  const tasks = Array.isArray(col.tasks) ? col.tasks : [];

  useEffect(() => {
    setColor(shuffle(colors).pop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDrop = (e) => {
    const data = e.dataTransfer.getData("text");
    if (!data) return;

    const { prevColIndex, taskIndex } = JSON.parse(data);

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({tasks.length})
      </p>

      {tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
