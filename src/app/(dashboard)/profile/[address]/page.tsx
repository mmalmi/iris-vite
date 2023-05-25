import ProfilePage from '@/components/ProfilePage';

import Layout from '@/app/(dashboard)/layout';

const Profile = ({ params }: { params: { address: string } }) => {
  return (
    <Layout>
      <ProfilePage address={params.address} />
    </Layout>
  );
};

export default Profile;
