const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // req.body

/*
  ROUTES
*/

// Create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.status(202).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
});
// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
});


// Set task status
app.put("/todos/status/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET is_completed = $1 WHERE todo_id = $2",
      [is_completed, id]
    );

    res.status(200).json("Todo was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
})

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(200).json("Todo was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
});

// Delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 1, message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
