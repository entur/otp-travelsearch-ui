import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TravelSearchUI from './TravelSearchUI';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TravelSearchUI />, document.getElementById('root'));
registerServiceWorker();
