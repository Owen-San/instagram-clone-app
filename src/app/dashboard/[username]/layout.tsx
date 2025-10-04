import { auth } from "auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const profile = await fetchProfile(params.username);
  return { title: `${profile?.name} (@${profile?.username})` };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const session = await auth();
  const isCurrentUser = session?.user.id === profile?.id;
  const isFollowing = profile?.followedBy.some(
    (u) => u.followerId === session?.user.id
  );

  if (!profile) notFound();

  return (
    <>
      <ProfileHeader username={profile.username} />
      <div className="max-w-4xl mx-auto pt-[48px] md:pt-0">
        <div className="flex flex-col md:flex-row gap-x-5 md:gap-x-10 px-4">
          <div className="flex justify-center md:block">
            <ProfileAvatar user={profile}>
              <UserAvatar
                user={profile}
                className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
              />
            </ProfileAvatar>
          </div>

          <div className="md:px-10 space-y-4 w-full">
            <div className="flex flex-col items-center text-center gap-3 md:grid md:grid-cols-4 md:items-center md:text-left">
              <p className="font-semibold text-xl">{profile.username}</p>

              {isCurrentUser ? (
                <>
                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/edit-profile`}
                      className={buttonVariants({
                        className: "!font-bold",
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      Edit profile
                    </Link>
                    <Button variant="secondary" className="font-bold" size="sm">
                      View archive
                    </Button>
                  </div>
                  <div className="hidden md:block" />
                  <div className="hidden md:block" />
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" className="md:order-last">
                    <MoreHorizontal />
                  </Button>
                  <div className="flex gap-3">
                    <FollowButton isFollowing={isFollowing} profileId={profile.id} />
                    <Button variant="secondary" className="font-bold" size="sm">
                      Message
                    </Button>
                  </div>
                  <div className="hidden md:block" />
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7 justify-center md:justify-start">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>
              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followedBy.length}</strong> followers
              </Link>
              <Link
                href={`/dashboard/${profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm text-center md:text-left">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />
        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
