// Libs
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Application from './components/Application';

// S
import './style.css';


ReactDOM.render(
  <Application title="The Scoreboard" initialPlayers={playerList} />,
  document.getElementById('app')
);