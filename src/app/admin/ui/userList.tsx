import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import type User from "@/types/User";

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">User List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Groups</TableHead>
            <TableHead>Staff Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <UserCircle className="h-5 w-5 text-gray-500" />
                  <span>{user.username}</span>
                </div>
              </TableCell>
              <TableCell>
                {user.groups.map((group) => (
                  <Badge key={group} variant="secondary" className="mr-1">
                    Group {group}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                {user.is_staff ? (
                  <div className="flex items-center text-green-600">
                    <ShieldCheck className="mr-1 h-5 w-5" />
                    Staff
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600">
                    <ShieldAlert className="mr-1 h-5 w-5" />
                    Non-Staff
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
