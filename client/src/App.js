import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios';
import Header from './components/Header';
import GroupsTable from './components/GroupsTable';
import StudentsTable from './components/StudentsTable';
import CouncilTable from './components/CouncilTable';
import StaffTable from './components/StaffTable';
import EventsListTable from './components/EventsListTable';
import EventsLogTable from './components/EventsLogTable';
import ReportTable from './components/ReportTable';
import Redirect from './components/Redirect';


export default function App() {
  axios.defaults.baseURL = 'https://application-event.onrender.com/api/';  // backend on render.com
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Redirect url="/groups" />} />
          <Route path="/groups" element={<GroupsTable />} />
          <Route path="/students" element={<StudentsTable />} />
          <Route path="/student-council" element={<CouncilTable />} />
          <Route path="/staff" element={<StaffTable />} />
          <Route path="/events-list" element={<EventsListTable />} />
          <Route path="/events-log" element={<EventsLogTable />} />
          <Route path="/report" element={<ReportTable />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}
