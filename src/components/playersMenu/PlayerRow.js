import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Grid,
    Typography,
    Avatar,
} from '@material-ui/core'

const styles = theme => ({
    logo: {
        background: theme.palette.primary.dark,
    },
    box:{
        color: 'white',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        width: '100%'
    },
    username: {
        padding: theme.spacing.unit 
    }
})

class PlayersMenuRow extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        username: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
    }

    render() {
        const { classes, username = '', score } = this.props
        const shortName = username.substring(0, 1).toUpperCase()

        return (
            <div className={classes.box}>
                <Grid container alignItems='center'>
                    <Grid container xs={2} justify="center">
                        <Avatar className={classes.logo}>{shortName}</Avatar>
                    </Grid>
                    <Grid container xs={10} justify="space-between" alignItems='center'>
                        <Grid item className={classes.username}>
                            <Typography>{username}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{score}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(PlayersMenuRow)
