import './App.css';

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
function App() {
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <InputTodo />
        <div>
          <ListTodos />
        </div>
    </div>
    </div>
  );
}

export default App;
