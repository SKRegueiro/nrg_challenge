import getAllUsers from "@/app/admin/actions/getAllUsers";
import getAllPrincipals from "@/app/admin/actions/getAllPrincipals";
import UserList from "@/app/admin/ui/userList";
import PrincipalList from "@/app/admin/ui/principalList";

export default async function AdminPage() {
  const users = await getAllUsers();
  const principals = await getAllPrincipals();
  return (
    <div>
      <UserList users={users} />;
      <PrincipalList principals={principals} />
    </div>
  );
}
