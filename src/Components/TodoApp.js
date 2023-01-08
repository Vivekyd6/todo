import React, { useState, useEffect } from 'react';
import TodoListTable from './TodoListTable';



const TodoListApp = () => {
  const [todoList, setTodoList] = useState([]);
  const mockTodoList = [
    {
      key: 1,
      timestampCreated: 1605981200000,
      title: 'Task 1',
      description: 'This is task 1',
      dueDate: 1606322400000,
      tag: 'tag 1',
      status: 'OPEN',
    },
    {
      key: 2,
      timestampCreated: 1606322400000,
      title: 'Task 2',
      description: 'This is task 2',
      dueDate: 1606663600000,
      tag: 'tag 2',
      status: 'WORKING',
    },
    {
        key: 3,
        timestampCreated: 16063422400000,
        title: 'Task 3',
        description: 'This is task 3',
        dueDate: 1606663600000,
        tag: 'tag 3',
        status: 'WORKING',
      },
      {
        key: 4,
        timestampCreated: 16066322400000,
        title: 'Task 4',
        description: 'This is task 4',
        dueDate: 1606663600000,
        tag: 'tag 4',
        status: 'WORKING',
      },
      {
        key: 5,
        timestampCreated: 16067322400000,
        title: 'Task 5',
        description: 'This is task 5',
        dueDate: 16066636000900,
        tag: 'tag 5',
        status: 'WORKING',
      },
    // other tasks go here
  ];
  


  const mockApi = {
    async getTodoList() {
      return mockTodoList;
    },
    async addTodo(todo) {
      const newKey = Math.max(...mockTodoList.map(t => t.key)) + 1;
      const newTodo = { ...todo, key: newKey };
      mockTodoList.push(newTodo);
      return mockTodoList;
    },
    async updateTodo(todo) {
      const index = mockTodoList.findIndex(t => t.key === todo.key);
      if (index > -1) {
        mockTodoList[index] = todo;
      }
      return mockTodoList;
    },
    async deleteTodo(key) {
      const index = mockTodoList.findIndex(t => t.key === key);
      if (index > -1) {
        mockTodoList.splice(index, 1);
      }
      return mockTodoList;
    },
  };
  

  useEffect(() => {
    async function fetchData() {
      const todoList = await mockApi.getTodoList();
      setTodoList(todoList);
    }
    fetchData();
  }, []);


  const handleAdd = async newTodo => {
    const updatedTodoList = await mockApi.addTodo(newTodo);
    setTodoList(updatedTodoList);
  };

  const handleDelete = async key => {
    const updatedTodoList = await mockApi.deleteTodo(key);
    setTodoList(updatedTodoList);
  };

  const handleSave = async todo => {
    const updatedTodoList = await mockApi.updateTodo(todo);
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      <TodoListTable
        todoList={todoList}
        setTodoList={setTodoList}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
    </div>
  );
};

export default TodoListApp;
