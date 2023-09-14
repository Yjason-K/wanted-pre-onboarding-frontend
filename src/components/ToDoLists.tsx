import { useState, useEffect } from "react";
import { Todo } from "../lib/types/todo";
import ToDoItem from "./ToDoItem";

interface ToDolistsProps {
  todoitems: Todo[];
}
const ToDolists: React.FC<ToDolistsProps> = ({ todoitems }) => {
  const [allitems, setAllItems] = useState(todoitems);

  useEffect(() => {
    setAllItems(todoitems);
  }, [todoitems]);

  const onDeleteHanlder = (id: number) => {
    const newTodoLists = allitems.filter((it) => it.id !== id);
    setAllItems(newTodoLists);
  };

  return (
    <div className="todolists">
      <h3>Todo List 📒</h3>
      <div className="todoitmens">
        {allitems.map((it) => (
          <ToDoItem key={it.id} item={it} onDel={onDeleteHanlder} />
        ))}
      </div>
    </div>
  );
};

export default ToDolists;
