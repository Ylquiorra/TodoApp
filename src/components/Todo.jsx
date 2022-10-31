import React from 'react';

export const Todo = ({ completed, title, todo, id, todos, setTodos }) => {
  //Эти строчки кода позваляют нам находить задачу по id и менять булевое значение на противоположное
  const completeHandler = () => {
    setTodos(
      todos.map((objTodo) => {
        if (objTodo.id == id) {
          return { ...objTodo, completed: !completed };
        }
        return objTodo;
      }),
    );
  };

  return (
    <div
      className={`${
        completed === false
          ? 'block-todo__main-string block-todo__main-active'
          : 'block-todo__main-string block-todo__main-completed'
      }`}>
      <div onClick={() => completeHandler()} className="circle-status-todo">
        {completed === false ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="23.5" stroke="#D9D9D9" />
          </svg>
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29 15C29 22.732 22.732 29 15 29C7.26801 29 1 22.732 1 15C1 7.26801 7.26801 1 15 1C22.732 1 29 7.26801 29 15ZM30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM13.8321 21.5547L21.8321 9.5547L20.1679 8.4453L12.8383 19.4398L9.70059 16.3592L8.29941 17.7863L12.2994 21.7136L13.1617 22.5602L13.8321 21.5547Z"
              fill="#77C0AF"
            />
          </svg>
        )}
      </div>
      <p>{title}</p>
    </div>
  );
};
