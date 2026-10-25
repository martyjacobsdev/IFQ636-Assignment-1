// TODO: Implement the task service
const taskService = require("../services/taskService");

/**
 * TaskController
 * Handles incoming HTTP Requests related to Tasks
 */

/**
 * POST /api/tasks
 * Add a new task.
 */
const addTask = async (req, res, next) => {
  try {
    const { userId, title, description, completed, deadline } = req.body;
    const task = await taskService.createTask({ userId, title, description, completed, deadline });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/tasks
 * Get all the outstanding tasks 
 */
const getTasks = async (req, res, next) => {
  try {

    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Update task details.
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Deletes a task.
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
   getTasks, 
   addTask, 
   updateTask, 
   deleteTask
};