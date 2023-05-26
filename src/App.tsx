import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './app/(dashboard)/page';
import Notifications from './app/(dashboard)/notifications/page';
import Messages from './app/(messages)/messages/page';
import MessageThread from './app/(messages)/messages/[address]/page';
import Settings from './app/(settings)/settings/page';
import About from './app/(dashboard)/about/page';
import Login from './app/(auth)/login/page';
import Logout from './app/(auth)/logout/page';
import Signup from './app/(auth)/signup/page';
import Address from './app/(dashboard)/[address]/page';
import EditProfile from './app/(dashboard)/profile/edit/page';
import NewPost from './app/(dashboard)/post/page';
import Search from './app/(dashboard)/search/page';
import SearchResults from './app/(dashboard)/search/[keyword]/page';
import Followers from './app/(dashboard)/followers/[address]/page';
import Following from './app/(dashboard)/following/[address]/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:user" element={<MessageThread />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:keyword" element={<SearchResults />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/followers/:address" element={<Followers />} />
        <Route path="/following/:address" element={<Following />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/:slug" element={<Address />} />
      </Routes>
    </Router>
  );
}

export default App;
