import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import MealPlanner from './components/MealPlanner';
// import ShoppingList from './components/ShoppingList';
// import Progress from './components/Progress';
import { UserProvider } from './context/UserContext';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: sans-serif;
  padding: 20px;
`;

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            {/* ... outras rotas ... */}
          </Routes>
        </AppContainer>
      </Router>
    </UserProvider>
  );
}; 

export default App;