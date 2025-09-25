import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { config } from "../../../../auth";
import { Suspense } from "react";
import Posts from "@/components/Posts";

export default async function DashBoardPage() {
  const session = await getServerSession(config);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense 
        // fallback={
        //   <PostsSkeleton/>
        // }
        >
          <Posts/></Suspense>
      </div>
    </main>
  );
}
