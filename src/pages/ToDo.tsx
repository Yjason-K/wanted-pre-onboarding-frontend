const ToDo = () => {
  return (
    <div className="todo">
      <div className="addtodo">
        <h2>Todo List</h2>
        <input type="text" data-testid="new-todo-input" />
        <button data-testid="new-todo-add-button">추가</button>
      </div>
    </div>
  );
};

export default ToDo;
