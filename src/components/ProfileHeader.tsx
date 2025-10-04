import { ChevronDown, Settings, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

function ProfileHeader({ username }: { username: string | null }) {
  return (
    <header className="fixed md:hidden top-0 z-50 w-full h-12 bg-white dark:bg-neutral-950 flex items-center px-3 sm:-ml-6">
      <Button size="icon" variant="ghost">
        <Settings />
      </Button>

      <div className="flex items-center gap-x-2 mx-auto">
        <p className="font-bold">{username}</p>
        <ChevronDown />
      </div>

      <Button size="icon" variant="ghost">
        <UserPlus />
      </Button>
    </header>
  );
}

export default ProfileHeader;