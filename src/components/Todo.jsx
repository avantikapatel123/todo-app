import { useState } from "react";
import { produce } from "immer";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");


  const addTodo = () => {
    if (text.trim() === "") return;

    setTodos(
      produce((draft) => {
        draft.push({
          id: Date.now(),
          text: text,
          completed: false,
        });
      })
    );

    setText("");
  };

  
  const deleteTodo = (id) => {
    setTodos(
      produce((draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };


  const toggleTodo = (id) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((t) => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
    );
  };

  
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

 
  const saveEdit = () => {
    if (editText.trim() === "") return;

    setTodos(
      produce((draft) => {
        const todo = draft.find((t) => t.id === editId);
        if (todo) {
          todo.text = editText;
        }
      })
    );

    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo App 🚀</h1>

      <input
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />

      <button className="add-btn" onClick={addTodo}>
        Add
      </button>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            
            {editId === todo.id ? (
              <>
                <input
                  className="todo-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="btn save-btn" onClick={saveEdit}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`todo-text ${todo.completed ? "done" : ""}`}
                >
                  {todo.text}
                </span>

                <div>
                  <button
                    className="btn edit-btn"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

