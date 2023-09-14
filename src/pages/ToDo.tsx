import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Button";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Todo } from "../lib/types/todo";
import "../styles/pages/Todo.css";

import ToDolists from "../components/ToDoLists";

const ToDo = () => {
  // todoLists
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const parsedToken = token ? JSON.parse(token) : null;
  //   const getTodoList = async () => {
  //     await axios({
  //       method: "get",
  //       url: `${process.env.REACT_APP_WANTED_API}/todos`,
  //       headers: {
  //         Authorization: `Bearer ${parsedToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => {
  //         setTodoLists(res.data);
  //       })
  //       .catch((err) => {
  //         window.alert("할일을 불러오지 못하였습니다!!");
  //       });
  //   };
  //   getTodoList();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      const parsedToken = token ? JSON.parse(token) : null;
      const getTodoList = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_WANTED_API}/todos`,
          headers: {
            Authorization: `Bearer ${parsedToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setTodoLists(res.data);
          })
          .catch((err) => {
            window.alert("할일을 불러오지 못하였습니다!!");
          });
      };
      getTodoList();
    }
  }, []);

  // newTodo item
  const [nwetodo, setNewTodo] = useState<string>("");
  const newtodoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(e.target.value);
  };

  // logoutHandler
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  // addHandler
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addHandler = async () => {
    if (nwetodo !== "") {
      const token = localStorage.getItem("token");
      const parsedToken = token ? JSON.parse(token) : null;
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_WANTED_API}/todos`,
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          "Content-Type": "application/json",
        },
        data: {
          todo: nwetodo,
        },
      }).then(() => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_WANTED_API}/todos`,
          headers: {
            Authorization: `Bearer ${parsedToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setTodoLists(res.data);
          })
          .catch((err) => {
            window.alert("할일을 불러오지 못하였습니다!!");
          });
      });
    } else {
      window.alert("할일을 입력해주세요.");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="todo">
      <CustomButton
        type="logout"
        text="로그아웃"
        button_type="button"
        testid=""
        handler={logoutHandler}
      />
      <h2>새로운 Todo 작성하기 ✏️</h2>
      <div className="addtodo">
        <input
          type="text"
          data-testid="new-todo-input"
          className="add_input"
          value={nwetodo}
          placeholder="할일을 작성해주세요."
          onChange={newtodoChange}
          ref={inputRef}
        />
        <CustomButton
          type="add"
          text="추가"
          button_type="button"
          testid="new-todo-add-button"
          handler={addHandler}
        />
      </div>
      <ToDolists todoitems={todoLists} />
    </div>
  );
};
export default ToDo;
