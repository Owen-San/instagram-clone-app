"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateProfile } from "@/lib/actions";
import { UserWithExtras } from "@/lib/definitions";
import { UpdateUser } from "@/lib/schemas";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import UserAvatar from "./UserAvatar";
import { Form } from "./ui/form";

function ProfileAvatar({
  user,
  children,
}: {
  user: UserWithExtras;
  children?: React.ReactNode;
}) {
  const { data: session } = useSession();
  const isCurrentUser = session?.user?.id === user.id;

  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const triggerContent =
    children ?? <UserAvatar user={user} className="w-20 h-20 md:w-36 md:h-36" />;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (isCurrentUser) setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <button type="button" aria-disabled={!isCurrentUser}>
          {triggerContent}
        </button>
      </DialogTrigger>

      {isCurrentUser && (
        <DialogContent className="dialogContent">
          <DialogHeader>
            <DialogTitle className="mx-auto font-medium text-xl py-5">
              Change Profile Photo
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const { message } = await updateProfile(values);
                toast(message);
                setOpen(false);
              })}
            >
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        appearance={{
                          button:
                            "bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-11 px-5 w-full",
                          container: "w-full",
                          allowedContent: "hidden",
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);
                          if (inputRef.current) inputRef.current.click();
                        }}
                        onUploadError={() => {
                          toast.error("Upload failed");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user.image && (
                <SubmitButton
                  className="text-red-500 border-b border-zinc-300 dark:border-neutral-700 font-bold disabled:cursor-not-allowed w-full text-sm p-3"
                  onClick={() => {
                    form.setValue("image", "");
                    if (inputRef.current) inputRef.current.click();
                  }}
                  disabled={form.formState.isSubmitting}
                >
                  Remove Current Photo
                </SubmitButton>
              )}

              <input type="submit" hidden ref={inputRef} />
            </form>
          </Form>

          <DialogClose className="postOption border-0 w-full p-3">
            Cancel
          </DialogClose>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ProfileAvatar;
