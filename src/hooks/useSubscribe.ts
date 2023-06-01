import { useSubscribe as useNostrHooksSubscribe } from "nostr-hooks";

import { useState, useEffect } from 'react';
import { Event, Filter } from 'nostr-tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RelayPool, SubscriptionOptions } from 'nostr-relaypool';
import localState from "@/utils/LocalState";

let globalRelayPool: RelayPool | null = null;

const DEFAULT_RELAYS = [
  'wss://eu.rbr.bio',
  'wss://us.rbr.bio',
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://relay.nostr.info',
  'wss://offchain.pub',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.fmt.wiz.biz',
  'wss://nos.lol',
];


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
      globalRelayPool = new RelayPool(DEFAULT_RELAYS, { useEventCache: true, logErrorsAndNotices: true });
    }
    initalRelayPool = globalRelayPool;
  }

  const [relayPool] = useState<RelayPool>(initalRelayPool);
  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

  options.allowDuplicateEvents = false;

  useEffect(() => {
    if (!enabled) return;
    setUnsubscribe(() => {
      relayPool.subscribe(
        filters,
        relays,
        (event: any) => {
          setEvents((prevEvents: Event[]) => {
            if (prevEvents.some(e => e.id === event.id)) {
              return prevEvents;
            } else {
              return [...prevEvents, event];
            }
          });
        },
        maxDelayms,
        onEose,
        options,
      );
      setUnsubscribe(() => () => {
        //
      });
    });
  }, [enabled]);

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

export default function useSubscribe(opts: any) {
  const relayPoolSubscribe = useRelayPoolSubscribe({...opts, enabled: useRelayPool });
  const nostrHooksSubscribe = useNostrHooksSubscribe({...opts, enabled: !useRelayPool });

  return useRelayPool ? relayPoolSubscribe : nostrHooksSubscribe;
}