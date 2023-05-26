import { memo } from 'react';

import {Link, useParams} from "react-router-dom";

import { nip19 } from 'nostr-tools';
import { useState, useEffect } from 'react';

import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import FollowButton from '@/components/FollowButton';
import { useProfileHex } from '@/hooks';

import Layout from '@/app/(dashboard)/layout';

const Profile = () => {
  const params = useParams();
  const [followers, setFollowers] = useState([]);
  const hex = useProfileHex(params.address);

  useEffect(() => {
    hex &&
      fetch(`https://rbr.bio/${hex}/followers.json`)
        .then((res) => {
          res.json().then((data) => {
            setFollowers(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }, [hex]);

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-2">
        {followers.map((follower) => (
          <div
            key={follower}
            className="flex items-center w-full justify-between"
          >
            <Link
              to={`/${nip19.npubEncode(follower)}`}
              className="flex gap-4 items-center"
            >
              <Avatar pub={follower} />
              <Name pub={follower} />
            </Link>
            <FollowButton pub={follower} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default memo(Profile);
