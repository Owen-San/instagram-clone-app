"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import { useEffect, useMemo, useState } from "react";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, className, ...avatarProps }: Props) {
  const FALLBACK = "/instagram_default_pfp.jpg";

  const label = user?.username || user?.name || "User";
  const initials = useMemo(
    () =>
      (user?.username || user?.name || "U")
        .split(" ")
        .map((s) => s[0]?.toUpperCase())
        .slice(0, 2)
        .join(""),
    [user?.username, user?.name]
  );

  const safeSrc = user?.image && user.image.trim() !== "" ? user.image : FALLBACK;
  const [src, setSrc] = useState<string>(safeSrc);

  useEffect(() => {
    setSrc(safeSrc);
  }, [safeSrc]);

  return (
    <Avatar className={`relative h-8 w-8 ${className ?? ""}`} {...avatarProps}>
      <AvatarImage
        key={src}
        src={src}
        alt={`${label}'s profile picture`}
        className="rounded-full object-cover"
        onError={() => setSrc(FALLBACK)}
      />
      <AvatarFallback className="text-[10px] font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
