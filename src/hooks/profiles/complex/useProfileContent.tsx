import { useEffect, useState } from 'react';
import { nip19 } from 'nostr-tools';
import { IAuthor } from '@/types';
import { useProfileHex, useProfileMetadata } from '@/hooks';

const useProfileContent = (profileAddress: string | undefined) => {
  const hex = useProfileHex(profileAddress);
  const {
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEose,
    latestMetadataEvent,
    metadata,
  } = useProfileMetadata(hex);

  const [author, setAuthor] = useState<IAuthor>({
    about: '',
    banner: '',
    following: [],
    id: '',
    lud06: '',
    name: '',
    nip05: '',
    picture: '',
    website: '',
    displayName: '',
  });
  const [npub, setNpub] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAuthor({
      about: metadata.about || '',
      banner: metadata.banner || '',
      following: metadata.following || [],
      id: metadata.id || '',
      lud06: metadata.lud06 || '',
      name: metadata.name || '',
      nip05: metadata.nip05 || '',
      picture: metadata.picture || '',
      website: metadata.website || '',
      displayName: metadata.display_name || metadata.name,
    });

    setNpub((!!profileAddress && nip19.npubEncode(hex)) || undefined);
  }, [hex, latestMetadataEvent?.content]);

  return {
    ...author,
    npub,
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEose,
    latestMetadataEvent,
  };
};

export default useProfileContent;
