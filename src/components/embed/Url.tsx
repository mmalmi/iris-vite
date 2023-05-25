import Embed from './index';
import { Link } from "react-router-dom";

const Url: Embed = {
  regex: /(https?:\/\/[^\s]+)/g,
  component: ({ match, key }) => {
    // if same origin as current page, link internally
    const link = new URL(match);
    const current = new URL(window.location.href);
    let url = match;
    if (link.origin === current.origin) {
      url = link.pathname + link.search + link.hash;
    }
    return (
      <Link
       
        key={key}
        to={url}
        className="text-iris-blue hover:underline"
        target={link.origin === current.origin ? '' : '_blank'}
      >
        {match}
      </Link>
    );
  },
};

export default Url;
