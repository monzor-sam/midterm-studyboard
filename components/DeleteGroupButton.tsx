"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function DeleteGroupButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("TODO: implement delete-group handler");
  }

  return (
    <div>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className="whitespace-nowrap rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
        >
          {isDeleting ? "Deleting..." : "Delete Group"}
        </Button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}