"use client";

import type { ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type Props = ButtonProps & {
  children: React.ReactNode;
};

function SubmitButton({ children, className, variant, size, asChild, ...rest }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    >
      {children}
    </button>
  );
}

export default SubmitButton;