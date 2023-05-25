import Discover from '@/components/Discover';
import Layout from "@/app/(dashboard)/layout";

export default function Search() {
  return (
    <Layout>
      <div className="p-2 w-full">
        <Discover />
      </div>
    </Layout>
  );
}
