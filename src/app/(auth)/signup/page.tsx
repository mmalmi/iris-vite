import { useNavigate } from "react-router-dom";
import { generatePrivateKey } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';
import EULA from './EULA';
import localState from "@/utils/LocalState";

import CardContainer from '@/components/CardContainer';

import useStore from '@/store';

import { usePublish } from '@/hooks';
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { data } = useStore((state) => state.auth.user);
  const { loginWithPrivateKey } = useStore((state) => state.auth);
  const publish = usePublish();

  const [name, setName] = useState<string>('');
  const [showEula, setShowEula] = useState<boolean>(false);

  const isStandalone =
    typeof window !== 'undefined' &&
    ((navigator as any).standalone ||
      window.matchMedia('(display-mode: standalone)').matches ||
      document.referrer.includes('android-app://iris.to'));

  const login = () => {
    const privateKey = generatePrivateKey();
    localState.get('showFollowSuggestions').set(true);
    loginWithPrivateKey(privateKey);
  };

  useEffect(() => {
    if (data) {
      if (name) {
        publish({
          kind: 0,
          content: { name },
        }).catch(console.error);
      }
      navigate('/');
    }
  }, [data, name, publish]);

  const handleDisplayNameInput = useCallback((event: any) => {
    setName(event.target.value);
  }, []);

  const handleSignupButton = useCallback(() => {
    if (isStandalone) {
      setShowEula(true);
    } else {
      login();
    }
  }, [isStandalone]);

  return (
    <>
      {showEula && (
        <EULA
          onAccept={() => {
            login();
            setShowEula(false);
          }}
          onDecline={() => setShowEula(false)}
        />
      )}

      <CardContainer>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">iris</h1>
          <h2 className="text-xs">Connecting People</h2>
        </div>
      </CardContainer>

      <CardContainer>
        <div className="form-control w-full">
          <input
            autoFocus={true}
            type="text"
            placeholder="What's your name?"
            className="input-bordered input-primary input w-full"
            value={name}
            onChange={handleDisplayNameInput}
          />
        </div>
        <button className="btn-primary btn" onClick={handleSignupButton}>
          Go
        </button>
      </CardContainer>

      <CardContainer>
        <p className="text-sm">Already have an account?</p>
        <p>
          <Link to="/login" className="btn btn-sm">
            Log in
          </Link>
        </p>
      </CardContainer>
    </>
  );
};

export default Login;
