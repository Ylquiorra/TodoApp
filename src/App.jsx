import React from 'react';
import { Todo } from './components/Todo';

const currentValueArr = [
  { id: 0, title: 'All' },
  { id: 1, title: 'Completed' },
  { id: 2, title: 'Active' },
];

function App() {
  const [todos, setTodos] = React.useState([
    { id: 0, title: 'Тестовое задание', completed: false },
    { id: 1, title: 'Прекрасный код', completed: true },
    { id: 2, title: 'Покрытие тестами', completed: false },
  ]);
  const [filteredTodos, setFilteredTodos] = React.useState([]);
  const [currentButton, setCurrentButton] = React.useState({ id: 0, title: 'All' });
  const [inputValue, setInputValue] = React.useState('');

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      //Тут я обращаюсь к последнему объекту массива для того, чтобы увеличить его id на 1
      ...todos,
      {
        id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
        title: inputValue,
        completed: false,
      },
    ]);
    setInputValue('');
  };

  React.useEffect(() => {
    getLocalTodos();
  }, []);

  // Два хука ниже фильтруют массив заданий по категориям: "Выполнено"/"Не выполнено"
  React.useEffect(() => {
    filterCategoryHandler();
    saveLocalTodos();
  }, [todos, currentButton]);

  const filterCategoryHandler = () => {
    switch (currentButton.title) {
      case 'Completed':
        setFilteredTodos(todos.filter((filteredTodo) => filteredTodo.completed === true));
        break;
      case 'Active':
        setFilteredTodos(todos.filter((filteredTodo) => filteredTodo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Сократил код
  const leftCounter = todos.filter((obj) => obj.completed === false).length;

  //Создал контралируемый инпут
  const changeValue = (e) => {
    setInputValue(e.target.value);
  };

  //Функция для изменения категорий
  const handleClickToChangeCurrentValue = (e) => {
    setCurrentButton(e);
  };

  //Удалание только выполненых Todo
  const deleteCompletedTodo = () => {
    setTodos(todos.filter((objDeleteCompleted) => objDeleteCompleted.completed !== true));
  };

  //Сохранение в LocalStorage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  //Вытаскиваю из Локального хранилища данные после перезапуска страницы
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      const todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <main className="todo">
      <div className="todo__container">
        <section className="todo__title">
          <h1>todos</h1>
        </section>
        <section className="todo__block block-todo">
          <div className="block-todo__top top-block-todo">
            <div className="top-block-todo__body">
              <div className="top-block-todo__body-arrow">
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5 5.75L0 0V4L7.5 9.75L15 4V0L7.5 5.75Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
              <form action="">
                <input
                  value={inputValue}
                  onChange={changeValue}
                  type="text"
                  placeholder="What needs to be done?"
                />
                <button onClick={addTodo}></button>
              </form>
            </div>
          </div>
          <div className="block-todo__main">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((objTodos) => (
                <Todo
                  todo={objTodos}
                  todos={todos}
                  setTodos={setTodos}
                  key={objTodos.id}
                  {...objTodos}
                />
              ))
            ) : currentButton.title === 'Completed' ? (
              <div className="block-todo__main-info">
                <p>У Вас нет выполненых таксков</p>
              </div>
            ) : (
              <div className="block-todo__main-info">
                <p>У Вас нет активных таксков </p>
              </div>
            )}
          </div>
          <div className="block-todo__buttom">
            <div className="block-todo__buttom-row">
              <div className="block-todo__buttom-left">
                <p className="block-todo-text">
                  {leftCounter === 0 ? 'You have not task' : `${leftCounter} items left`}
                </p>
              </div>
              <div className="block-todo__buttom-active-button">
                {currentValueArr.map((objCurrentValue) => (
                  <div key={objCurrentValue.id} className="buttom-active-button__all">
                    <p
                      className={`${
                        objCurrentValue.id === currentButton.id
                          ? 'block-todo-text button-text-block active-button'
                          : 'block-todo-text button-text-block'
                      }`}
                      onClick={() => handleClickToChangeCurrentValue(objCurrentValue)}>
                      {objCurrentValue.title}
                    </p>
                  </div>
                ))}
              </div>
              <div onClick={deleteCompletedTodo} className="block-todo__buttom-clear-completed">
                <p className="block-todo-text">Clear completed</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
