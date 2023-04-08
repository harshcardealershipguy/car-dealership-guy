import 'styles/styles.css'

import { ThemeProvider, createTheme  } from '@mui/material/styles';

const theme = createTheme({
    shape: {borderRadius: '20px'},
    palette: {
        primary: {
            main: '#0077ff',
            contrastText: '#fff'
        },
        success: {
            main: 'rgb(102, 187, 106)',
            contrastText: '#fff',

        },
        gray: '#808080',
        black: '#000000'
    },
    typography: {
        fontFamily: "'Lato', sans-serif",
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        }
    }
});


const App = ({ Component, pageProps }) => {
    return <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
}

export default App
