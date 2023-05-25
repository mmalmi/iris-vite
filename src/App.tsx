import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './app/(dashboard)/page';
import Notifications from './app/(dashboard)/notifications/page';
import Messages from './app/(messages)/messages/page';
import Settings from './app/(settings)/settings/page';
import About from './app/(dashboard)/about/page';
import Login from './app/(auth)/login/page';
import Signup from './app/(auth)/signup/page';
import Address from './app/(dashboard)/[address]/page';
import EditProfile from './app/(dashboard)/profile/edit/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/:slug" element={<Address />} />
      </Routes>
    </Router>
  );
}

export default App;
