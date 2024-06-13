import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './app.css'

import Home from './pages/home/Home';
import ProfilePage from './pages/profile/ProfilePage';
import { initAxios, publicAxios } from './services/settings';
import Routers from './Routers.jsx'

publicAxios()
initAxios()

function App() {

  return (
    <Routers/>
  );
}

export default App;
