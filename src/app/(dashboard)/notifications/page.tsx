'use client';

import Feed from '@/components/Feed';
import useStore from '@/store';
import { Event, Filter } from 'nostr-tools';
import Layout from "@/app/(dashboard)/layout";

export default function Notifications() {
  const userData = useStore((state) => state.auth.user.data);
  const filter: Filter = userData?.publicKey
    ? { kinds: [1, 6, 7, 9735], limit: 100, '#p': [userData?.publicKey || ''] }
    : {};
  const filterFn = (event: Event) => event?.pubkey !== userData?.publicKey;
  const filterOptions = [{ name: 'Notifications', filter, filterFn }];
  return (
    <Layout>
      <Feed showDisplayAs={false} filterOptions={filterOptions} />
    </Layout>
  );
}
