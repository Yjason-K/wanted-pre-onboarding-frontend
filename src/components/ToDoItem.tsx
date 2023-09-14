import { useRef, useState } from "react";
import axios from "axios";
import { Todo } from "../lib/types/todo";
import CustomButton from "./Button";

interface ToDoItemProps {
  item: Todo;
  onDel: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, onDel }) => {
  const [todoItem, setTodoItem] = useState(item);

  // 수정으로 변경시
  const [localContent, setLocalContent] = useState(item.todo);
  const [isModify, setIsModify] = useState(false);
  const onEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalContent(e.target.value);
  };

  // todo 수정을 취소하는 경우
  const moifyRef = useRef<HTMLInputElement | null>(null);
  const onCancelEdit = () => {
    if (window.confirm("할일 수정을 취소하시겠습니까??")) {
      setLocalContent(item.todo);
      setIsModify(false);
    }
  };

  // todo 수정 확정
  const onConfrimEdit = async () => {
    if (localContent !== "") {
      if (localContent !== "") {
      }
      const token = localStorage.getItem("token");
      const parsedToken = token ? JSON.parse(token) : null;
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_WANTED_API}/todos/${todoItem.id}`,
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          "Content-Type": "application/json",
        },
        data: { todo: localContent, isCompleted: todoItem.isCompleted },
      })
        .then((res) => {
          setTodoItem((prevItem) => ({
            ...prevItem,
            todo: localContent,
          }));
          setIsModify(false);
        })
        .catch((err) => {
          window.alert("할일을 수정하지 못하였습니다.");
          console.log(err);
        });
    } else {
      window.alert("할일을 입력해 주세요!");
      if (moifyRef.current) {
        moifyRef.current.focus();
      }
    }
  };

  // modifyhandler
  const checkHandler = async () => {
    const tmpCheck = !todoItem.isCompleted;
    const token = localStorage.getItem("token");
    const parsedToken = token ? JSON.parse(token) : null;
    await axios({
      method: "put",
      url: `${process.env.REACT_APP_WANTED_API}/todos/${todoItem.id}`,
      headers: {
        Authorization: `Bearer ${parsedToken}`,
        "Content-Type": "application/json",
      },
      data: { todo: todoItem.todo, isCompleted: tmpCheck },
    })
      .then((res) => {
        setTodoItem((prevItem) => ({
          ...prevItem,
          isCompleted: tmpCheck,
        }));
      })
      .catch((err) => {
        window.alert("할일을 수정하지 못하였습니다.");
        console.log(err);
      });
  };

  //deleteHandler
  const delHandler = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까??")) {
      const token = localStorage.getItem("token");
      const parsedToken = token ? JSON.parse(token) : null;

      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_WANTED_API}/todos/${todoItem.id}`,
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          onDel(todoItem.id);
        })
        .catch((err) => {
          window.alert("할일을 삭제하지 못했습니다 ㅜㅜ");
          console.log(err);
        });
    }
  };

  return (
    <li className="todoitem" key={todoItem.id}>
      <label>
        <input
          type="checkbox"
          checked={todoItem.isCompleted}
          onChange={checkHandler}
          className="inputcheck"
        />
        {isModify ? (
          <input
            type="text"
            data-testid="modify-input"
            value={localContent}
            ref={moifyRef}
            onChange={onEditChange}
          />
        ) : (
          <span className="todospan">{todoItem.todo}</span>
        )}
      </label>
      <div className="btnwrap">
        <CustomButton
          text="수정하기"
          type="modify"
          button_type="button"
          testid="modify-button"
          handler={() => {
            {
              !isModify ? setIsModify(true) : onConfrimEdit();
            }
          }}
        />
        {!isModify ? (
          <CustomButton
            text="삭제하기"
            type="delete"
            button_type="button"
            testid="modify-button"
            handler={delHandler}
          />
        ) : (
          <CustomButton
            text="취소"
            type="cancel"
            button_type="button"
            testid=""
            handler={onCancelEdit}
          />
        )}
      </div>
    </li>
  );
};

export default ToDoItem;
