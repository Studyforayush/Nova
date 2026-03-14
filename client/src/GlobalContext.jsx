// File: GlobalContext.js
import { createContext, useState, useContext } from "react";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
