import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/principal";
import Options from "./pages/options"
import InputRoom from "./pages/rommInput";
import Room from "./pages/sala";
import CreateRoom from "./pages/createRoom";
import CallbackTrue from "./pages/callbackTrue";
import CallbackFalse from "./pages/callbackFalse";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room" element = {<InputRoom></InputRoom>}></Route>
        <Route path="/" element={<Principal />} />
        <Route path="/options" element={<Options />} />
        <Route path="/login" element={<InputRoom></InputRoom>}></Route>
        <Route path="/room/:codigoSala" element={<Room></Room>}></Route>
        <Route path="/createRoom" element={<CreateRoom></CreateRoom>}></Route>
        <Route path="/callback/access_granted" element={<CallbackTrue></CallbackTrue>}></Route> 
        <Route path="/callback/access_denied" element={<CallbackFalse></CallbackFalse>}></Route>
      </Routes>
    </BrowserRouter>
  );
}