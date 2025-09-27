"use client";

import { deletePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import { PostWithExtras } from "@/lib/definitions";

type Props = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
};

function PostOptions({ post, userId, className }: Props) {
  const isPostMine = post.userId === userId;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open post options"
          className={cn("p-1 rounded-md focus:outline-none", className)}
        >
          <MoreHorizontal className="h-5 w-5 cursor-pointer dark:text-neutral-400" />
        </button>
      </DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle asChild>
            <VisuallyHidden>Post options</VisuallyHidden>
          </DialogTitle>
        </DialogHeader>

        {isPostMine && (
          <form
            action={async (formData) => {
              const { message } = await deletePost(formData);
              toast(message);
            }}
            className="postOption"
          >
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
              Delete post
            </SubmitButton>
          </form>
        )}

        {isPostMine && (
          <Link
            scroll={false}
            href={`/dashboard/p/${post.id}/edit`}
            className="postOption p-3"
          >
            Edit
          </Link>
        )}

        <form action="" className="postOption border-0">
          <button type="button" className="w-full p-3">
            Hide like count
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
