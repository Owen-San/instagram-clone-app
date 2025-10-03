import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export function PostSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
}

export function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="p-0 gap-0">
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  );
}

export function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent
        className="
          p-0 gap-0
          flex flex-col
          w-full sm:max-w-md md:max-w-lg
          overflow-hidden bg-background
        "
      >
        <DialogHeader className="flex flex-row items-center gap-2 px-3 py-2 border-b text-left">
          <DialogTitle className="sr-only">Loading post…</DialogTitle>
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </DialogHeader>

        <div className="relative w-full h-[320px] sm:h-[360px] md:h-[420px]">
          <Skeleton className="absolute inset-0" />
        </div>

        <div className="px-3 py-2 border-t">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-md" />
            <div className="ml-auto">
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </div>
        </div>

        <div className="border-t px-3 py-2">
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="px-3 py-2 border-t">
          <Skeleton className="h-4 w-24" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserAvatarSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SinglePostSkeleton() {
  return (
    <Card className="max-w-3xl lg:max-w-4xl mx-auto hidden md:flex">
      <div className="relative overflow-hidden h-[450px] max-w-sm lg:max-w-lg  w-full">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex max-w-sm flex-col flex-1">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>

        <div className="px-5 space-y-3 mt-8">
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
        </div>
      </div>
    </Card>
  );
}