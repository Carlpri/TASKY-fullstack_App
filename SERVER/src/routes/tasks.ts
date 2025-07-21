import { Router } from "express";
import { body, validationResult } from "express-validator";
import prisma from "../lib/prisma";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { title, description } = req.body;
      const userId = req.user.id;

      const task = await prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });

      res.status(201).json({
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      console.error("Task creation error:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  }
);

router.get("/", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { status = "active" } = req.query;

    let whereClause: any = {
      userId,
      isDeleted: false,
    };

    if (status === "completed") {
      whereClause.isCompleted = true;
    } else if (status === "active") {
      whereClause.isCompleted = false;
    } else if (status === "deleted") {
      whereClause.isDeleted = true;
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: {
        dateCreated: "desc",
      },
    });

    res.json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.patch("/complete/:id", async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { isCompleted: true },
    });

    res.json({
      message: "Task marked as complete",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Mark complete error:", error);
    res.status(500).json({ message: "Failed to mark task as complete" });
  }
});

router.patch("/incomplete/:id", async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { isCompleted: false },
    });

    res.json({
      message: "Task marked as incomplete",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Mark incomplete error:", error);
    res.status(500).json({ message: "Failed to mark task as incomplete" });
  }
});

router.patch("/restore/:id", async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found in trash" });
    }

    const restoredTask = await prisma.task.update({
      where: { id },
      data: { isDeleted: false },
    });

    res.json({
      message: "Task restored successfully",
      task: restoredTask,
    });
  } catch (error) {
    console.error("Task restore error:", error);
    res.status(500).json({ message: "Failed to restore task" });
  }
});

router.get("/:id", async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

router.patch(
  "/:id", 
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { title, description } = req.body;
      const userId = req.user.id;

      const task = await prisma.task.findFirst({
        where: {
          id,
          userId,
          isDeleted: false,
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const updatedTask = await prisma.task.updateMany({
        where: { 
          id , 
          userId, 
          isDeleted: false 
        },
        data: {
          title,
          description,
        },
      });

      res.json({
        message: "Task updated successfully",
        task: updatedTask,
      });
    } catch (error) {
      console.error("Task update error:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  }
);

router.delete("/:id", async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Task deletion error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
