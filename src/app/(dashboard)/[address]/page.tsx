import PostPage from '@/components/PostPage';
import ProfilePage from '@/components/ProfilePage';
import Layout from '@/app/(dashboard)/layout';
import {useParams} from "react-router-dom";

export default function Address() {
  const slug = useParams().slug as string;
  let content;
  if (slug?.startsWith('note')) {
    content = <PostPage key={slug} address={slug} />;
  } else {
    content = <ProfilePage key={slug} address={slug} />;
  }
  return <Layout>{content}</Layout>;
}
