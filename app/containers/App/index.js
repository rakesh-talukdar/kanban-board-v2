/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import Header from '../Header/index';
import TaskColumns from '../TaskColumns/index';
import GlobalStyle from '../../global-styles';
import './index.scss';
export default function App() {
  return (
    <div>
      <Header />
      <TaskColumns />
      <GlobalStyle />
    </div>
  );
}
