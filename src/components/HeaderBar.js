import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    AppBar,
    Toolbar,
    Typography,
    Avatar,
} from '@material-ui/core'
import moment from 'moment'

const styles = theme => ({
    title: {
        color: 'white'
    },
    time: {
        marginLeft: theme.spacing.unit * 2
    },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
    },
    logo: {
        marginLeft: 12,
        marginRight: 36
    },
    grow: {
        flexGrow: 1
    },
    icons: {
        color: 'white'
    }
})

class HeaderBar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    state = {
        currentTime: moment().format('HH:mm')
    }

    componentDidMount() {
        this.time = setInterval(this.getTime, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.time)
    }

    getTime = () => this.setState({ currentTime: moment().format('HH:mm') })

    render() {
        const { classes } = this.props
        const { currentTime} = this.state
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar disableGutters>
                    <Avatar
                        src="/images/logoGo.png"
                        className={classes.logo}
                    />
                    <Typography variant="title" className={classes.title}>
                        Dragon Pictionary
                    </Typography>
                    <Typography className={classes.time}>
                        {currentTime}
                    </Typography>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(HeaderBar)
