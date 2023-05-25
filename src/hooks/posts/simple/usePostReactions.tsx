

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';
import {useMemo} from "react";

const usePostReactions = (postId: string | undefined) => {
  const relays = useStore((store) => store.relays);

  const { events, eose } = useSubscribe({
    relays,
    filters: postId ? [{ '#e': [postId], kinds: [1, 6, 7, 9735] }] : [],
    options: {
      closeAfterEose: false,
      enabled: !!postId,
      cacheRefresh: true,
      batchingInterval: 2000,
    },
  });

  // only 1 like or repost per author. TODO kind 1 reposts
  const reactionEvents = useMemo(
    () =>
      events.filter((event, index, self) => {
        if (event.kind === 1 || event.kind === 9735) return true;
        return (
          self.findIndex(
            (e) => e.pubkey === event.pubkey && e.kind === event.kind
          ) === index
        );
      }),
    [events]
  );

  const isFetchingReactions = !eose && !reactionEvents.length;
  const isReactionsEmpty = eose && !reactionEvents.length;

  return {
    reactionEvents,
    reactionEose: eose,
    isFetchingReactions,
    isReactionsEmpty,
  };
};

export default usePostReactions;
