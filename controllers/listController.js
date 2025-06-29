import List from '../models/List.js';
import Todo from '../models/Todo.js';

// Create a new list
export const createList = async (req, res) => {
  const { name } = req.body;

  try {
    const list = new List({
      user: req.user._id,
      name,
      todos: [],
    });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all lists for the user
export const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id }).populate('todos');
    res.json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a list and its todos
export const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: 'List not found' });

    await Todo.deleteMany({ _id: { $in: list.todos } });
    await list.deleteOne();

    res.json({ message: 'List and todos deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a todo to a list
export const addTodoToList = async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({
      text,
      user: req.user._id,
    });
    await todo.save();

    const list = await List.findById(req.params.id);
    list.todos.push(todo._id);
    await list.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
