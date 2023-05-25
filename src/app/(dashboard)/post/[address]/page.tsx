import PostPage from '@/components/PostPage';

import Layout from '@/app/(dashboard)/layout';

const Post = ({ params }: { params: { address: string } }) => {
  return (
    <Layout>
      <PostPage address={params.address} />
    </Layout>
  );
};

export default Post;
