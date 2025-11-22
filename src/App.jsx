// src/App.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import boardsSlice from "./redux/boardsSlice";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  // Ensure at least one active board when boards exist
  useEffect(() => {
    if (Array.isArray(boards) && boards.length > 0 && !boards.some((b) => b.isActive)) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
  }, [boards, dispatch]);

  const hasBoards = Array.isArray(boards) && boards.length > 0;

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {hasBoards ? (
        <>
          <Header
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
          <Home
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default App;
