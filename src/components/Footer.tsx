'use client';

import {
  HomeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconFull,
  PaperAirplaneIcon as PaperAirplaneIconFull,
  PlusCircleIcon as PlusCircleIconFull,
} from '@heroicons/react/24/solid';

import { Link, useLocation } from "react-router-dom";
import Avatar from '@/components/Avatar';
import useStore from '@/store';
import { useProfileContent } from '@/hooks';

const MagnifyingGlassIconFull = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      className={className}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};

const Footer = () => {
  const userData = useStore((state) => state.auth.user.data);
  const { npub } = useProfileContent(userData?.publicKey || '');
  const {pathname} = useLocation();

  if (!userData?.publicKey) return null;

  return (
    <div className="fixed md:hidden bottom-0 z-10 w-full bg-base-200 pb-safe-area-inset-bottom">
      <div className="flex w-full h-full items-stretch">
        <Link
          to="/"
          className="flex-grow flex items-center justify-center p-3"
        >
          {pathname === '/' ? (
            <HomeIconFull className="h-6 w-6" />
          ) : (
            <HomeIcon className="h-6 w-6" />
          )}
        </Link>
        <Link
          to="/search"
          className="flex-grow flex items-center justify-center p-3"
        >
          {pathname === '/search' ? (
            <MagnifyingGlassIconFull className="h-6 w-6" />
          ) : (
            <MagnifyingGlassIcon className="h-6 w-6" />
          )}
        </Link>
        <Link
          to="/post"
          className="flex-grow flex items-center justify-center p-3"
        >
          {pathname === '/post' ? (
            <PlusCircleIconFull className="h-6 w-6" />
          ) : (
            <PlusCircleIcon className="h-6 w-6" />
          )}
        </Link>
        <Link
          to="/messages"
          className="flex-grow flex items-center justify-center p-3"
        >
          {pathname === '/messages' ? (
            <PaperAirplaneIconFull className="h-6 w-6" />
          ) : (
            <PaperAirplaneIcon className="h-6 w-6" />
          )}
        </Link>
        {/*
        <Link to="/post/new" className="flex-grow flex items-center justify-center p-3">
          {pathname === "/post/new" ? <PlusCircleIconFull className="h-6 w-6"/> : <PlusCircleIcon className="h-6 w-6"/>}
        </Link>
        */}
        {npub && (
          <Link
            to={`/${npub}`}
            className="flex-grow flex items-center justify-center p-3"
          >
            <div
              className={`flex border-2 ${
                pathname === `/${npub}`
                  ? 'border-white rounded-full'
                  : 'border-transparent'
              }`}
            >
              <Avatar width="w-6" pub={userData?.publicKey} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;
