
import { doc } from './helpers'
import ToDoList from './ToDoList'

const task = doc.querySelector('#task'),
  list = doc.querySelector('#list'),
  todo = new ToDoList('edList');

todo.render();