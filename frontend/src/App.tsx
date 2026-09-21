import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { ThemeProvider } from './contexts/themeProvider';
import { store } from './redux/store';
import Router from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider defaultTheme="dark" storageKey="ui-key">
                    <Router />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default App;
