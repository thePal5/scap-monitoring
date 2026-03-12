import React, { useState } from 'react';
import MainLayout from './components/MainLayout.jsx';
import Dashboard from './components/Dashboard.jsx';
import TaskList from './components/TaskList.jsx';
import Attendance from './components/Attendance.jsx';
import Reports from './components/Reports.jsx';
import Login from './components/Login.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Handle logging out and resetting the app state
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('Dashboard'); 
  };

  return (
    <MainLayout 
      currentView={currentView} 
      setCurrentView={setCurrentView}
      onLogout={handleLogout} // Pass the logout function down
    >
      {currentView === 'Dashboard' && <Dashboard />}
      {currentView === 'Task List' && <TaskList />}
      {currentView === 'Attendance' && <Attendance />}
      {currentView === 'Reports' && <Reports />}
    </MainLayout>
  );
}

export default App;