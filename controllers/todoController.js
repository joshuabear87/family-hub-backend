import Todo from '../models/Todo.js';

export const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  todo.text = req.body.text || todo.text;
  todo.completed = req.body.completed ?? todo.completed;

  const updatedTodo = await todo.save();
  res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await todo.deleteOne();
  res.json({ message: 'Todo deleted' });
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); // adjust as needed
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching todos' });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      user: req.user._id,
      text: req.body.text,
    });
    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating todo' });
  }
};

