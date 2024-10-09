"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import axios from "axios";
import { CheckIcon } from "@radix-ui/react-icons";

interface Task {
  _id: string; // MongoDB ObjectId
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Task>();

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_API}/api/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const openModal = (task: Task | null = null) => {
    setSelectedTask(task);
    if (task) {
      reset(task);
    } else {
      reset({ title: "", description: "", dueDate: "", completed: false });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const onSubmit = async (data: Task) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Assuming you store the userId in local storage

      if (selectedTask) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_USER_API}/api/tasks`,
          { ...data, id: selectedTask._id, user: userId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? response.data.task : task,
          ),
        );
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_USER_API}/api/tasks`,
          { ...data, user: userId }, // Include userId here
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_USER_API}/api/tasks`,
        { id, completed: true },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_USER_API}/api/tasks`, {
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Task Manager</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => openModal(null)}
        >
          Add Task
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Completed</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border p-2">{task.title || "No Title"}</td>
              <td className="border p-2">
                {task.description || "No Description"}
              </td>
              <td className="border p-2">
                <Checkbox.Root
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(task._id)}
                  className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded"
                >
                  {task.completed && <CheckIcon className="text-green-600" />}
                </Checkbox.Root>
              </td>
              <td className="border p-2">{task.dueDate || "Not set"}</td>
              <td className="border p-2">
                <button
                  className="mr-2 text-blue-500"
                  onClick={() => openModal(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit Task */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-lg font-semibold mb-4">
                {selectedTask ? "Edit Task" : "Add Task"}
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  className="w-full p-2 border rounded"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  className="w-full p-2 border rounded"
                  {...register("description")}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  {...register("dueDate")}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                  type="submit"
                >
                  {selectedTask ? "Save Changes" : "Add Task"}
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
