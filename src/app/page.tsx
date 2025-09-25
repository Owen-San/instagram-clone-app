import { getServerSession } from "next-auth/next";
import { config } from "../../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(config);
  if (session) redirect("/dashboard");
  redirect("/login");
}
