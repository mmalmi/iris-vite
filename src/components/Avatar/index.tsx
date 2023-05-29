import { useProfileContent } from '@/hooks';
import ProxyImg from '@/components/ProxyImg';
import { memo } from 'react';

type Width = 'w-6' | 'w-8' | 'w-12' | 'w-14' | 'w-24' | 'w-36';

const BaseAvatar = memo(function BaseAvatar({
  url,
  width = 'w-12',
}: {
  url: string;
  width?: Width;
}) {
  return (
    <>
      <div className="avatar">
        <div className={`mask mask-circle ${width}`}>
          <ProxyImg square={true} width={96} src={url || '/nostribe.png'} />
        </div>
      </div>
    </>
  );
});

function Avatar({
  pub,
  width = 'w-12',
}: {
  pub: string;
  width?: Width;
}) {
  const { picture } = useProfileContent(pub);

  return <BaseAvatar url={picture} width={width} />;
}

export default memo(Avatar);
export { BaseAvatar };