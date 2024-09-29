import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ConnectDB from "@/lib/db";
import { User, Task } from "@/lib/models";

interface JwtPayload {
  Id: string;
  iat?: number;
  exp?: number;
}

// Helper to authenticate and get user ID from token
const authenticate = async (req: NextRequest): Promise<JwtPayload> => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.KEY as string) as JwtPayload;
    return decoded;
  } catch (e) {
    throw new Error("Unauthorized");
  }
};

// GET: Fetch all tasks for the authenticated user
export async function GET(req: NextRequest) {
  await ConnectDB();

  try {
    const decoded = await authenticate(req);
    const userId = decoded.Id;

    const tasks = await Task.find({ user: userId });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// POST: Create a new task for the authenticated user
export async function POST(req: NextRequest) {
  await ConnectDB();

  try {
    const decoded = await authenticate(req);
    console.log(decoded);
    const userId = decoded.Id;

    const { title, description, dueDate } = await req.json();

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      user: userId,
    });

    return NextResponse.json(
      { msg: "Task created", task: newTask },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// PUT: Update a task by ID for the authenticated user
export async function PUT(req: NextRequest) {
  await ConnectDB();

  const { id, title, description, dueDate } = await req.json();

  try {
    const decoded = await authenticate(req);
    const userId = decoded.Id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, dueDate },
      { new: true },
    );

    if (!updatedTask) {
      return NextResponse.json(
        { msg: "Task not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { msg: "Task updated", task: updatedTask },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a task by ID for the authenticated user
export async function DELETE(req: NextRequest) {
  await ConnectDB();

  const { id } = await req.json();

  try {
    const decoded = await authenticate(req);
    const userId = decoded.Id;

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTask) {
      return NextResponse.json(
        { msg: "Task not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ msg: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
