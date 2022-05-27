import 'reflect-metadata';

import React from 'react';
import { DatabaseConnectionProvider } from './src/database';

import Home from './src/pages/Home';

const App = () => {
  return (
    <DatabaseConnectionProvider>
      <Home />
    </DatabaseConnectionProvider>
  );
};

export default App;
