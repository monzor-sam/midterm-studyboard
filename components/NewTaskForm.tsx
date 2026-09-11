"use client";

import {useState, FormEvent} from "react";
import { useRouter } from 'next/navigation';
import Button from "./Button";
import { title } from "process";

export default function NewTaskForm({ groupId }: { groupId: string }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("TODO: implement add-task submit handler");
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    required
                    placeholder="Add a new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Task"}
                </Button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}