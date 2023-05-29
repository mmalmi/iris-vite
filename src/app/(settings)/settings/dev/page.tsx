"use strict";
import { useLocalState } from "@/utils/LocalState";

export default function Relays() {
  const [useRelayPool, setUseRelayPool] = useLocalState('useRelayPool');

  return (
    <div className="prose p-2">
      <h2>Developer settings</h2>
      <div className="flex flex-col">
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Use <a href="https://github.com/adamritter/nostr-relaypool-ts">relaypool</a></span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={useRelayPool}
              onChange={(e) => setUseRelayPool(e.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
