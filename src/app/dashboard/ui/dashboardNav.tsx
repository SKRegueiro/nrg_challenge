import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ProfileSheet from "./profileSheet";
import routes from "@/constants/routes";
import { useSession } from "next-auth/react";
import groups from "@/constants/groups";

type Props = {
  onLogOut: () => void;
  onChangePassword: (formData: FormData) => void;
};

export default function DashboardNav({ onLogOut, onChangePassword }: Props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.groups.includes(groups.ADMIN);

  return (
    <NavigationMenu
      className={
        "h-16 w-full min-w-full items-center justify-start border-b px-4"
      }
    >
      <title>Dashboard</title>
      {isAdmin && (
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={routes.ADMIN} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Go to admin
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}

      <div className={"flex w-full justify-end"}>
        <ProfileSheet onChangePassword={onChangePassword} onLogOut={onLogOut} />
      </div>
    </NavigationMenu>
  );
}
