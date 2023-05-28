import PostPage from '@/components/PostPage';
import ProfilePage from '@/components/ProfilePage';
import {useParams} from "react-router-dom";

export default function Address() {
  const slug = useParams().slug as string;
  if (slug?.startsWith('note')) {
    return <PostPage key={slug} address={slug} />;
  } else {
    return <ProfilePage key={slug} address={slug} />;
  }
}
