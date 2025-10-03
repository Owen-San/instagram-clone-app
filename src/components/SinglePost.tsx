import { auth } from "auth";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import Post from "@/components/Post";
import PostActions from "@/components/PostActions";
import PostOptions from "@/components/PostOptions";
import UserAvatar from "@/components/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPostById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "./ui/card";
import MiniPost from "./MiniPost";

async function SinglePost({ id }: { id: string }) {
  const post = await fetchPostById(id);
  const session = await auth();
  const postUsername = post?.user.username ?? "";
  const userId = session?.user.id;

  if (!post) notFound();

  return (
    <>
      <Card className="hidden md:flex md:flex-row items-stretch mx-auto max-w-3xl lg:max-w-4xl p-0 gap-0 overflow-hidden rounded-2xl">
        <div className="relative overflow-hidden bg-black w-full aspect-square md:aspect-auto md:h-[520px] md:w-[520px]">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="object-cover select-none"
            priority
          />
        </div>

        <div className="flex flex-col flex-1 min-h-0 max-w-sm md:h-[520px]">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link className="font-semibold text-sm" href={`/dashboard/${postUsername}`}>
                  {postUsername}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <UserAvatar user={post.user} className="h-14 w-14" />
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOptions post={post} userId={userId} />
          </div>

          <ScrollArea className="flex-1 min-h-0 px-5 py-3">
            <div className="space-y-3 pr-2">
              <MiniPost post={post} />
              {post.comments.length > 0 ? (
                post.comments.map((c) => <Comment key={c.id} comment={c} />)
              ) : (
                <div className="py-2">
                  <p className="text-sm font-semibold">No comments yet.</p>
                  <p className="text-sm text-muted-foreground">Start the conversation.</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="px-5 py-2 border-t">
            <PostActions post={post} userId={userId} />
            <time className="text-[11px] uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <CommentForm postId={id} className="px-5 border-t" />
        </div>
      </Card>

      <div className="md:hidden">
        <Post post={post} />
      </div>
    </>
  );
}

export default SinglePost;
