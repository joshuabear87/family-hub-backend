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
