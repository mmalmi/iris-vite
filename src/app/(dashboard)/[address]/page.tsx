import PostPage from '@/components/PostPage';
import ProfilePage from '@/components/ProfilePage';
import Layout from '@/app/(dashboard)/layout';
import {useParams} from "react-router-dom";

export default function Address() {
  const slug = useParams().slug as string;
  let content;
  if (slug?.startsWith('note')) {
    content = <PostPage address={slug} />;
  } else {
    content = <ProfilePage address={slug} />;
  }
  return <Layout>{content}</Layout>;
}
