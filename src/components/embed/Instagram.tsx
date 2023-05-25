import Embed from './index';

const Instagram: Embed = {
  regex:
    /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)((?:p|reel)\/[\w-]{11})(?:\S+)?/g,
  component: ({ match, key }) => {
    return (
      <iframe
        className="instagram"
        key={key}
        width="650"
        height="400"
        style={{ maxWidth: '100%' }}
        src={`https://instagram.com/${match}/embed`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  },
};

export default Instagram;
