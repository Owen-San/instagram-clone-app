"use client";

import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
  const FALLBACK = "/instagram_default_pfp.jpg";
  const [src, setSrc] = useState<string>(user?.image || FALLBACK);

  useEffect(() => {
    setSrc(user?.image || FALLBACK);
  }, [user?.image]);

  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        src={src}
        fill
        alt={`${user?.name ?? "User"}'s profile picture`}
        className="rounded-full object-cover"
        sizes="32px"
        onError={() => setSrc(FALLBACK)}
      />
    </Avatar>
  );
}

export default UserAvatar;