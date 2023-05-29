import { memo } from 'react';
import { useProfileContent } from '@/hooks';

function Name({ pub }: { pub: string }) {
  const { name, displayName } = useProfileContent(pub);

  return <>{displayName || name || ''}</>;
}

export default memo(Name);