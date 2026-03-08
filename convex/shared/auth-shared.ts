import { Select } from './api';
import type { getAuth } from '../functions/generated/auth';

export type Auth = ReturnType<typeof getAuth>;
export type SessionUser = Select<"user"> & {
  activeOrganization:
    | (Select<"organization"> & {
      role: Select<"member">["role"];
    })
    | null;
  session: Select<"session">;
}