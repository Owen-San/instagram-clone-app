import ProfileForm from "@/components/ProfileForm";
import { fetchProfile } from "@/lib/data";
import { auth } from "auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {
  const session = await auth();
  const username = session?.user?.username;

  if (!username) {
    notFound();
  }

  const profile = await fetchProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;