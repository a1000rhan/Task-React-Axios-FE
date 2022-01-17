import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => fetchRoom(), []);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );

      setRooms([...rooms, response.data]);
    } catch (e) {
      alert("cannot create new room");
      console.log(e);
    }
    // to do : call BE to create a room
  };
  const updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      let tempstudent = rooms.find((room) => room.id === rooms.id);
      for (const key in tempstudent) tempstudent[key] = updatedRoom[key];
    } catch (e) {
      alert("cannot update new room");
      console.log(e);
    }
    // to do : call BE to create a room
  };

  const deleteRoom = async (id) => {
    try {
      const respones = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempstudent = rooms.filter((room) => room.id !== rooms.id);
      setRooms(tempstudent);
    } catch (e) {
      alert("cannot delete the room");
    }
    // to do : call BE to delete a room
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
