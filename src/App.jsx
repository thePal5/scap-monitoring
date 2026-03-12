import React, { useState } from 'react';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import TaskList from './components/TaskList.jsx';
import Attendance from './components/Attendance.jsx';
import Reports from './components/Reports.jsx';
import Login from './components/Login.jsx';

function App() {
  // New state to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');

  // If they are NOT authenticated, ONLY show the Login screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // If they ARE authenticated, show the rest of the application
  return (
    <MainLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'Dashboard' && <Dashboard />}
      {currentView === 'Task List' && <TaskList />}
      {currentView === 'Attendance' && <Attendance />}
      {currentView === 'Reports' && <Reports />}
    </MainLayout>
  );
}

export default App;