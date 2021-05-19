import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

import GlobalStyle from './styles/global';
import AppProvider from './hooks';


const App: React.FC = () => (
	<BrowserRouter>
		<ToastContainer autoClose={4000} />
		<GlobalStyle />
		<AppProvider>
			<Routes />
		</AppProvider>
	</BrowserRouter>
);


export default App;
