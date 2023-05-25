import Embed from './index';
import { Link } from "react-router-dom";

const Hashtag: Embed = {
  regex: /(?<=\s|^)(#\w+)/g,
  component: ({ match, key }) => {
    return (
      <Link
        key={key}
        to={`/search/${encodeURIComponent(match)}`}
        className="text-iris-blue hover:underline"
      >
        {' '}
        {match}{' '}
      </Link>
    );
  },
};

export default Hashtag;
