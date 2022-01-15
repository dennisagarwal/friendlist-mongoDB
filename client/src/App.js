import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

//useEffect function immediteky when the pag renders
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setlistOfFriends] = useState([]);

  const addFriend = () => {
    axios
      .post("http://localhost:8000/addfriend", { name: name, age: age })
      .then(() => {
        console.log("it worked");
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    {
      axios
        .get("http://localhost:8000/read")
        .then((response) => {
          console.log(response.data)
          setlistOfFriends(response.data);
        })
        .catch(() => {
          console.log("error");
        });
    }
  }, []);
  return (
    <div className="App">
      <div className="inputs">
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Friend Name"
          className="input"
          type="text"
        ></input>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          placeholder="Friend Age"
          className="input"
          type="number"
        ></input>
        <button onClick={addFriend} className="button">
          Add Friend
        </button>
      </div>
      <div className="listOfFriend">
        {listOfFriends.map((friend) => {
          return (
            <div className="friend">
              <h3 className="friend__text">Name: {friend.name}</h3>
              <h3 className="friend__text">Age: {friend.age}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
