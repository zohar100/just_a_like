import { Response, Request } from "express";
const catchAsync = require("../utillities/catchAsync");

/*************************************************************
 ** All Routes taken from "requirments" doc. *****************
 ** If you didn't understand something please check the doc. *
 ** UML also associated within the project files *************
 *************************************************************/

/**
 * Get all tasks:
 * Any user from level 1-4
 * can get all tasks
 * */
module.exports.index = catchAsync(async (req: Request, res: Response) => {
  res.json("All tasks");
});

/**
 * Create tasks:
 * Require user level 1 (-Admin)
 * to create new task
 * */
module.exports.createTask = catchAsync(async (req: Request, res: Response) => {
  res.json("Create task");
});

/**
 * Delete tasks:
 * Require user level 1 (-Admin)
 * to delete existing task
 *
 * params:
 * tid - task id
 * */
module.exports.deleteTask = catchAsync(async (req: Request, res: Response) => {
  res.json("Delete task");
});

/**
 * Update tasks:
 * Require user level 3 or 1 (Volunteer / Admin)
 * to update existing task.
 *
 * Level 3 - can update task only if he is associated with the project.
 * Level 1 - can update any task in any project.
 *
 * params:
 * pid - project id
 * tid - task id
 * */
module.exports.updateTask = catchAsync(async (req: Request, res: Response) => {
  res.json("Update task");
});

/**
 * Get Associated tasks:
 * Require user level 3-1
 * to get associated tasks.
 *
 * Level 3 - get he's associated tasks in associated project.
 * Level 2 - get he's associated tasks in associated project.
 * Level 1 - get all the tasks in the project.
 *
 * params:
 * pid - project id
 * tid - task id
 * */
module.exports.getAssociatedTasks = catchAsync(
  async (req: Request, res: Response) => {
    res.json("Get associated tasks");
  }
);