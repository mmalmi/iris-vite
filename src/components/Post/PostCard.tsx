import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Event, nip19 } from 'nostr-tools';
import { MouseEventHandler, useCallback, useMemo, memo } from 'react';

import { usePostEvent, usePostReactions, useProfileContent } from '@/hooks';

import { getReplyingToEvent, getThreadRoot, isRepost } from '@/utils/event';
import { useLocalState } from '@/utils/LocalState';

import { BaseAvatar } from '@/components/Avatar';
import AvatarLoader from '@/components/Avatar/AvatarLoader';
import CardContainer from '@/components/CardContainer';
import Name from '@/components/Name';
import NewPostForm from '@/components/NewPostForm';
import PostContent from '@/components/Post/PostContent';
import RelativeTime from '@/components/RelativeTime';
import Spinner from '@/components/Spinner';
import Dropdown from './Dropdown';
import Reactions from './Reactions';
import {
  ArrowPathIcon,
  BoltIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import {getZappingUser} from "@/utils/Lightning";

type Props = {
  postId: string;
  externalReactions?: Event[] | undefined;
  showReplies?: number;
  standalone?: boolean;
  asReply?: boolean;
  asRepliedMessage?: boolean;
  asInlineQuote?: boolean;
  showReplyForm?: boolean;
};

const PostCard = ({
  postId,
  externalReactions,
  showReplies,
  standalone,
  asReply,
  asRepliedMessage,
  asInlineQuote,
  showReplyForm,
}: Props) => {
  const navigate = useNavigate();

  const { isFetching, postEvent, createdAt, nip19NoteId } =
    usePostEvent(postId);

  const { reactionEvents: internalReactions } = usePostReactions(
    !externalReactions ? postId : undefined
  );
  const sortedReactions = useMemo(() => {
    if (!externalReactions) {
      return internalReactions.sort((a, b) => a.created_at - b.created_at);
    }

    return externalReactions.sort((a, b) => a.created_at - b.created_at);
  }, [internalReactions, externalReactions]);

  const [mutedUsers] = useLocalState('muted', {});

  const replies = useMemo(
  () =>
    sortedReactions.filter((event) => {
      if (mutedUsers[event.pubkey]) return false;

      if (event.kind !== 1 || isRepost(event)) return false;

      return getReplyingToEvent(event) === postId;
    }),
  [sortedReactions, mutedUsers, postId]
  );

  const { displayName, picture } = useProfileContent(postEvent?.pubkey || '');
  const npub = nip19.npubEncode(postEvent?.pubkey || '');

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (standalone) return;
      const target = e.target as HTMLElement;
      const selectors = [
        'a',
        'button',
        '.btn',
        'video',
        'audio',
        'input',
        'textarea',
        'iframe',
        'img',
      ];

      const isMatch = selectors.some((selector) => target.closest(selector));

      if (!isMatch) {
        e.preventDefault();
        navigate(`/${nip19NoteId}`);
      }
    },
    [standalone, nip19NoteId]
  );

  const replyingToEvent = useMemo(
    () => getReplyingToEvent(postEvent),
    [postEvent]
  );
  const threadRoot = useMemo(
    () => !!replyingToEvent && getThreadRoot(postEvent),
    [postEvent, replyingToEvent]
  );
  const replyingToUsers = useMemo(
    () =>
      postEvent?.tags
        ?.filter((tag) => tag[0] === 'p' && tag[3] !== 'mention')
        .filter(
          (tag, index, self) =>
            self.findIndex((t) => t[0] === tag[0] && t[1] === tag[1]) === index
        ),
    [postEvent]
  );

  if (!postEvent) {
    return (
      <CardContainer>
        <div onClick={onClick} className="flex flex-col gap-2 cursor-pointer">
          <Spinner />
        </div>
      </CardContainer>
    );
  }

  if (replyingToEvent && postEvent.kind !== 1) {
    let text = '';
    let icon = <HeartIcon className="w-4 h-4 text-iris-purple" />;
    let author = postEvent.pubkey;
    if (postEvent.kind === 7) {
      text = 'liked';
    } else if (isRepost(postEvent)) {
      text = 'reposted';
      icon = <ArrowPathIcon className="w-4 h-4 text-iris-green" />;
    } else if (postEvent.kind === 9735) {
      text = 'zapped';
      author = getZappingUser(postEvent);
      icon = <BoltIcon className="w-4 h-4 text-iris-orange" />;
    }
    return(
      <>
        <span className={`text-sm text-neutral-500 flex items-center gap-2 px-4 -mb-2 mt-2`}>
          {icon} <Name pub={author} /> {text}
        </span>
        <PostCard postId={replyingToEvent} showReplies={0} />
      </>
    )
  }

  return (
    <>
      {postEvent &&
      !asInlineQuote &&
      !asReply &&
      !asRepliedMessage &&
      threadRoot &&
      threadRoot !== replyingToEvent ? (
        <Link
         
          to={`/${nip19.noteEncode(threadRoot)}`}
          className="-mb-2 mt-2 text-sm opacity-50 flex items-center gap-2 px-4"
        >
          Show thread
        </Link>
      ) : (
        ''
      )}
      {standalone && replyingToEvent ? (
        <PostCard
          postId={replyingToEvent}
          asRepliedMessage={true}
          showReplies={0}
        />
      ) : (
        ''
      )}
      <CardContainer>
        <div
          className={`flex flex-col gap-2 ${
            standalone ? '' : 'cursor-pointer'
          }`}
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            <Link
             
              to={`/${npub}`}
              className="flex items-center gap-2"
            >
              {picture ? (
                <BaseAvatar url={picture || '/nostribe.png'} width="w-12" />
              ) : isFetching ? (
                <div className="w-12 h-12 flex items-center">
                  <AvatarLoader />
                </div>
              ) : (
                <BaseAvatar url="/nostribe.png" width="w-12" />
              )}

              <div className="flex flex-col">
                {displayName && (
                  <h4 className="font-bold leading-5">
                    {displayName.length > 25
                      ? displayName.slice(0, 10) +
                        '...' +
                        displayName.slice(-15)
                      : displayName}
                  </h4>
                )}

                {createdAt && (
                  <div className="text-xs leading-5 opacity-50">
                    <RelativeTime date={new Date(createdAt)} />
                  </div>
                )}
              </div>
            </Link>

            <Dropdown nip19NoteId={nip19NoteId} postEvent={postEvent} />
          </div>

          {replyingToEvent && replyingToUsers && replyingToUsers.length ? (
            <small className="opacity-50 flex items-center gap-1">
              Replying to
              {replyingToUsers.slice(0, 3).map((tag) => (
                <Link
                 
                  to={`/${nip19.npubEncode(tag[1])}`}
                  key={`${postId}replyingTo${tag[1]}`}
                >
                  <Name pub={tag[1]} />
                </Link>
              ))}
              {replyingToUsers.length > 3 && (
                <span className="opacity-50">
                  {' '}
                  and {replyingToUsers.length - 3} more
                </span>
              )}
            </small>
          ) : (
            ''
          )}

          <div className="flex flex-col gap-2 break-words">
            <PostContent
              postEvent={postEvent}
              standalone={standalone || false}
            />
          </div>
        </div>

        {!asInlineQuote && (
          <Reactions
            standalone={standalone || false}
            event={postEvent}
            reactionEvents={sortedReactions}
            nip19NoteId={nip19NoteId}
          />
        )}
      </CardContainer>
      {showReplyForm && (
        <>
          <NewPostForm placeholder="Write your reply" replyingTo={postEvent} />
          <hr className="-mx-4 mt-2 opacity-10" />
        </>
      )}
      {showReplies
        ? replies
          .slice(0, showReplies)
          .map((event) => (
            <PostCard
              postId={event.id}
              key={`${postId}reply${event.id}`}
              showReplies={1}
              asReply={true}
            />
          ))
        : ''}
    </>
  );
};

export default memo(PostCard);
