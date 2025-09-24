import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { config } from "../../../auth";

export default async function DashBoardPage() {
  const session = await getServerSession(config);
  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      DashBoardPage
      {/* dashboard UI goes here */}
    </main>
  );
}
