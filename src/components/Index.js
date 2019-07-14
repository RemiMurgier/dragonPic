import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import HeaderBar from './HeaderBar'
import GameRoomContainer from '../containers/GameRoomContainer'
import RoomsContainer from '../containers/RoomsContainer'


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        width: '100vw',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        backgroundImage: 'url(/images/wall.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    main: {
        width: '100%',
        margin: theme.spacing.unit * 4,
    },
    toolbar: theme.mixins.toolbar,
})

class Index extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    }

    render() {
        const { classes, match } = this.props

        return (
            <div className={classes.root}>
                <HeaderBar />
                <main className={classes.main}>
                    <div className={classes.toolbar} />
                    <Route exact path={match.url} component={RoomsContainer}/>
                    <Route exact path='/rooms/:roomId' component={GameRoomContainer}/>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Index)
