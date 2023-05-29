import Modal from "./Modal";
import { useState } from "react";
import "../styles/addTodo.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import axios from "axios"; // add this one before you could use axios to consume the api endpoint

function AddTodo({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todo1"), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  /* function to add new task to BackEnd API */
  const handleSubmitAPI = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://back-end-nine-chi.vercel.app/users/1/todos/", {
          title: title,
          description: description,
        })
        .then(function (response) {
          console.log(response.status);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Todo" onClose={onClose} open={open}>
      <form onSubmit={handleSubmitAPI} className="addTodo" name="addTodo">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTodo;
