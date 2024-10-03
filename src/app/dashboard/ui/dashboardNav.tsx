import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ProfileSheet from "./profileSheet";

type Props = {
  onLogOut: () => void;
  onChangePassword: (formData: FormData) => void;
};

export default function DashboardNav({ onLogOut, onChangePassword }: Props) {
  return (
    <NavigationMenu
      className={
        "h-16 w-full min-w-full items-center justify-start border-b px-4"
      }
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Redirection
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <div className={"flex w-full justify-end"}>
        <ProfileSheet onChangePassword={onChangePassword} onLogOut={onLogOut} />
      </div>
    </NavigationMenu>
  );
}
