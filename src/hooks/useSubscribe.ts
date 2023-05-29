import { useSubscribe as useNostrHooksSubscribe } from "nostr-hooks";

import { useState, useEffect } from 'react';
import { Event, Filter } from 'nostr-tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RelayPool, SubscriptionOptions } from 'nostr-relaypool';
import localState from "@/utils/LocalState";

let globalRelayPool: RelayPool | null = null;

const useRelayPoolSubscribe = (ops: {
  relays: string[];
  filters: Filter[];
  options: SubscriptionOptions;
  maxDelayms: number;
  onEose: () => {
    //
  };
  relayPool?: RelayPool;
  enabled: boolean;
}) => {
  const { relays, filters, options, maxDelayms, onEose, enabled } = ops;
  const [events, setEvents] = useState<Event[]>([]);
  const [eose, setEose] = useState(false);
  let initalRelayPool = ops.relayPool;
  if (!initalRelayPool) {
    if (!globalRelayPool) {
      console.log('init relaypool');
      globalRelayPool = new RelayPool(undefined, { logErrorsAndNotices: true });
    }
    initalRelayPool = globalRelayPool;
  }

  const [relayPool] = useState<RelayPool>(initalRelayPool);
  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

  useEffect(() => {
    if (!enabled) return;
    setUnsubscribe(() => {
      relayPool.subscribe(
        filters,
        relays,
        (event: any) => {
          setEvents((prevEvents: Event[]) => [...prevEvents, event]);
        },
        maxDelayms,
        onEose,
        options
      );
      setUnsubscribe(() => () => {
        //
      });
    });
  }, []);

  const invalidate = () => {
    setEvents([]);
    setEose(false);
    unsubscribe();
  };

  const loadMore = () => {
    // TODO
  };

  return { events, eose, invalidate, loadMore };
};

let useRelayPool = false;
localState.get('useRelayPool').on((value: any) => {
  useRelayPool = !!value;
});

// let i = 0;

export default function useSubscribe(opts: any) {
  const relayPoolSubscribe = useRelayPoolSubscribe({...opts, enabled: useRelayPool });
  const nostrHooksSubscribe = useNostrHooksSubscribe({...opts, enabled: !useRelayPool });

  /*
  console.log('useRelayPool', useRelayPool);
  i++;
  if (i > 100000) {
    debugger;
  }
   */

  return useRelayPool ? relayPoolSubscribe : nostrHooksSubscribe;
}