import { notFound } from "next/navigation";
import { getGroupById } from "@/lib/data";
import TaskItem from "@/components/TaskItem";

export default async function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const group = await getGroupById(params.id);

  // Next.js's built-in way to render the closest not-found.tsx (or a
  // default 404) when a dynamic route doesn't match real data.
  if (!group) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-950">{group.name}</h1>
      <p className="text-purple-800">
        {group.subject} · {group.memberCount} members · Created by{" "}
        {group.owner.name}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-purple-950">Tasks</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {group.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
