import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { red, blue, grey, green, lime } from '@material-ui/core/colors'
import 'typeface-roboto'

import Index from './components/Index'

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: lime,
        background: {
            light: grey[50],
            main: grey[200],
            dark: grey[900],
        }
    },
    
})
const history = createBrowserHistory()

const router = (
    <MuiThemeProvider theme={theme}>
        <Router history={history}>
            <Route path="/" component={Index} />
        </Router>
    </MuiThemeProvider>
)

render(
    <Fragment>
        <CssBaseline /> {router}
    </Fragment>,
    document.getElementById('root')
)
