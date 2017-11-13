import React from 'react';
import ReactDOM from 'react-dom';
import TravelSearchUI from './TravelSearchUI';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TravelSearchUI />, div);
});
