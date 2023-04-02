import 'styles/styles.css'
import { red } from '@mui/material/colors';

import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#0077ff',
        },
        gray: '#808080',
        black: '#000000'
    },
    typography: {
        fontFamily: "'Inter', sans-serif"
    },
});


const App = ({ Component, pageProps }) => {
    return <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
}

export default App
