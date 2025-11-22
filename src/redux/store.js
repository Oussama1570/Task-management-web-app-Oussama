// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import data from "../data/data.json";

const STORAGE_KEY = "og_task_boards_state";

// ✅ Exported so we can use it from components (Save button)
export const saveState = (state) => {
  if (typeof window === "undefined") return;
  try {
    const serializedState = JSON.stringify(state.boards);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save boards to localStorage:", err);
  }
};

const loadState = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;

    const boards = JSON.parse(serializedState);

    // Sanity check
    if (!Array.isArray(boards)) return undefined;

    return { boards };
  } catch (err) {
    console.error("Could not load saved boards from localStorage:", err);
    return undefined;
  }
};

// If nothing saved yet, we fall back to data.json
const preloadedState = loadState() || { boards: data.boards };

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
  preloadedState,
});

// ✅ Auto-save on any state change (still per-device via localStorage)
if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState(store.getState());
  });
}

export default store;
