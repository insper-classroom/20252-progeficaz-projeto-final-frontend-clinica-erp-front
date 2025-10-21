import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Appointments from './pages/Appointments/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import Doctors from './pages/Doctors/index.jsx';
import Patients from './pages/Patients/index.jsx';
import Schedules from './pages/Schedules/index.jsx';

// Para proteger rotas que precisam de autenticação
function PrivateRoute () {

}

function RootRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<login/>} />               {/* rota publica */}
      
        <Route element={<PrivateRoute/>}>
          <Route path='*/' element={<App/>}>
            <Route index element={<Dashboard/>} />
            <Route path='dashboards' element={<Dashboard/>}/>
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="appointments" element={<Appointments />} />

          </Route>
        </Route>
      <Route path="*" element={<Navigate to="/" replace />} /> {/*Para qualquer rota aleatoria*/}

    </Routes>
  </BrowserRouter>
);
}

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const root = createRoot(document.getElementById('root'))
root.render(<App/>); //depois trocar para RootRouter