'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useCRPC } from '@/lib/convex/crpc';

export default function UserPage() {
  const crpc = useCRPC();

  const { data: users, isPending } = useQuery(
    crpc.user.list.queryOptions({ limit: 10 })
  );

  const createUser = useMutation(crpc.user.create.mutationOptions());

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <button
        onClick={() => createUser.mutate({ name: 'John', email: 'john@example.com' })}
      >
        Create User
      </button>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}