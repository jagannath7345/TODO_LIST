import express from 'express';
import Todo, { ITodo } from '../models/todo';

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo: ITodo = new Todo({ title });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
