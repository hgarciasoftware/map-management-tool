import { HashRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Choropleth from './components/Choropleth';
import AdminView from './components/AdminView';
import ModifyForm from './components/ModifyForm';
import DeleteForm from './components/DeleteForm';
import Neuralyzer from './components/Neuralyzer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Choropleth />} />
        <Route path='/admin' element={<AdminView />} />
        <Route path='/admin/update/:id' element={<ModifyForm />} />
        <Route path='/admin/delete/:id' element={<DeleteForm />} />
        <Route path='*' element={<Neuralyzer />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
