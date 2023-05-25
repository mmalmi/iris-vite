import Embed from './index';
import { Link } from "react-router-dom";
import Name from '@/components/Name';

const pubKeyRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/p\/|damus\.io\/)+((?:@)?npub[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrNpub: Embed = {
  regex: pubKeyRegex,
  component: ({ match, key }) => {
    const pub = match.replace('@', '');
    return (
      <Link
       
        key={key}
        to={`/${pub}`}
        className="text-iris-blue hover:underline mx-1"
      >
        <Name pub={pub} />
      </Link>
    );
  },
};

export default NostrNpub;
