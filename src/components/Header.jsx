// src/components/Header.jsx
import React, { useState } from "react";
import Logo from "../assets/Logo Oussama Graphics.png";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { saveState } from "../redux/store";
import "../Styles/StylesHeader.css";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  if (!Array.isArray(boards) || boards.length === 0) {
    return null;
  }

  const board = boards.find((b) => b.isActive) || boards[0];

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveClick = () => {
    // ✅ Explicit save for this device (per browser / per desktop)
    saveState({ boards });
    alert("Tasks & boards saved for this device ✅");
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 shadow-sm">
      <header className="flex justify-between items-center dark:text-white">
        {/* LEFT SIDE – BRAND + BOARD NAME */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Logo + brand block */}
          {/* Logo + brand block */}
<div className="header-logo flex items-center space-x-2">
  <img
    src={Logo}
    alt="Oussama Graphics logo"
    className="Logo-Oussama-Graphics h-8 w-8 md:h-10 md:w-10 rounded-full object-contain bg-white shadow-sm"
  />
  <div className="hidden md:flex flex-col leading-tight">
    <span className="text-lg font-bold tracking-tight">
      Oussama Graphics
    </span>
    <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
      Task Management
    </span>
  </div>
</div>


          {/* Active board name + mobile dropdown */}
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:max-w-[260px] md:text-2xl text-xl font-bold font-sans">
              {board?.name || "Board"}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="Toggle boards"
              className="w-3 ml-2 md:hidden cursor-pointer"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* RIGHT SIDE – BUTTONS + ELIPSIS MENU */}
        <div className="flex space-x-3 md:space-x-6 items-center">
          {/* Add task desktop */}
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prev) => !prev);
            }}
          >
            + Add New Task
          </button>

          {/* Add task mobile */}
          <button
            onClick={() => {
              setIsTaskModalOpen((prev) => !prev);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>

          {/* Save button (desktop only) */}
          <button
            onClick={handleSaveClick}
            className="hidden md:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition"
          >
            Save Changes
          </button>

          {/* Elipsis menu */}
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prev) => !prev);
            }}
            src={elipsis}
            alt="Board options"
            className="cursor-pointer h-6"
          />

          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {/* Boards dropdown (mobile) */}
        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>

      {/* MODALS */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board?.name || "Board"}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
