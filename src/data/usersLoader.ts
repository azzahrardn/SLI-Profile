export type User = {
  id: string;
  username: string;
  password: string;
  role: string;
};

const modules = import.meta.glob<{ default: User }>(
  "../../database/user/*.json",
  { eager: true },
);

export function getUsers(): User[] {
  return Object.values(modules).map((m) => m.default);
}

export function validateUser(
  username: string,
  password: string,
): User | null {
  const users = getUsers();
  return (
    users.find(
      (u) => u.username === username && u.password === password,
    ) ?? null
  );
}
