import NewPostForm from '@/components/NewPostForm';
import Layout from "@/app/(dashboard)/layout";

export default function NewPost() {
  return (
    <Layout>
      <div className="p-2 w-full">
        <NewPostForm />
      </div>
    </Layout>
  );
}
