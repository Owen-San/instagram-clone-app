import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";
import { fetchPostById } from "@/lib/data";

type Props = {
  params: {
    id: string;
  };
};

async function EditPostPage({ params: { id } }: Props) {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
}

export default EditPostPage;