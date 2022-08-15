import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MainPageComponent } from './pages/MainPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainPageComponent />
      </ThemeProvider>
  );
}

export default App;
