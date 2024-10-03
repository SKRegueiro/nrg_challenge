import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  onChangePassword: (formData: FormData) => void;
  onLogOut: () => void;
};

export default function PasswordSheet({ onLogOut, onChangePassword }: Props) {
  const user = {
    username: "sergiocaminoregueiro",
    id: "1",
    groups: [1, 2, 3],
    is_staff: true,
  };

  const handleChangePassword = async (formData: FormData) => {
    onChangePassword(formData);
  };

  const handleLogout = () => {
    onLogOut();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <CircleUserRound size={28} absoluteStrokeWidth />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Account Settings</SheetTitle>
          <SheetDescription>
            Change your password or log out of your account.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="text-lg font-medium">User Information</h3>

          <dl className="mt-2 divide-y divide-gray-200">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user.username}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user.id}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Groups</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user.groups.join(", ")}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Staff Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user.is_staff ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>
        <form id={"change-password"} action={handleChangePassword}>
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input name={"current"} id="current" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              name={"newPassword"}
              id="newPassword"
              type="password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input name={"confirm"} id="confirm" type="password" required />
          </div>
          <Button type="submit" className="mb-8 mt-4 w-full">
            Change Password
          </Button>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleLogout} className="w-full">
              Log Out
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
