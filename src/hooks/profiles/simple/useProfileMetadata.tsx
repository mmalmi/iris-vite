import useSubscribe from '@/hooks/useSubscribe'

import useStore from '@/store';

import { useProfileHex } from '@/hooks';
import { Event } from 'nostr-tools';
import {useMemo} from "react";

const useProfileMetadata = (profileAddress: string | undefined) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const {
    events: metadataEvents,
    eose: metadataEose,
    invalidate,
  } = useSubscribe({
    relays,
    filters: profileHex ? [{ authors: [profileHex], kinds: [0] }] : [],
    options: { enabled: !!profileHex },
  });

  const isFetchingMetadata = !metadataEose && !metadataEvents.length;
  const isMetadataEmpty = metadataEose && !metadataEvents.length;

  const latestMetadataEvent = useMemo(() => {
    return metadataEvents?.reduce((prev, curr) => {
      if (!prev) return curr;
      if (curr.created_at > prev.created_at) return curr;
      return prev;
    }, null as Event | null);
  }, [metadataEvents]);

  const metadata = useMemo(() => {
    try {
      return latestMetadataEvent
        ? JSON.parse(latestMetadataEvent.content)
        : {};
    } catch (e) {
      console.error(e);
      return {};
    }
  }, [latestMetadataEvent]);

  return {
    isFetchingMetadata,
    isMetadataEmpty,
    latestMetadataEvent,
    metadataEose,
    metadata,
    invalidate,
  };
};

export default useProfileMetadata;
