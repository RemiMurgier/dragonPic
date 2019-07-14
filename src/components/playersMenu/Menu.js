import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Grid,
    Avatar,
    Divider
} from '@material-ui/core'
import { VideogameAsset as GameIcon} from '@material-ui/icons'

import PlayersMenuRow from './PlayerRow'
import GameStatus from './GameStatus'

const styles = theme => ({
    box: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: '0px 0px 6px -1px black inset',
        borderRadius: 10,
        color: 'white',
        padding: theme.spacing.unit * 2,
        height: '85vh'
    },
    boxLogo: {
        background: 'transparent',
        color: theme.palette.primary.light
    },
    boxTitle: {
        marginTop: theme.spacing.unit,
        color: 'white',
    },
    divider: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        backgroundColor: 'white'
    },
})

class playersMenu extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        players: PropTypes.array.isRequired,
        round: PropTypes.number.isRequired,
    }

    winner = (players) => {
        let winnerPlayer = {score: 0}
        for (const player of players) {
            if ( player.score > winnerPlayer.score)
                winnerPlayer = player
        } 
        return winnerPlayer
    }

    render() {
        const { classes, players, round } = this.props
        const rows = players.map(player => (
            <PlayersMenuRow key={player.username} username={player.username} score={player.score} />
        ))

        return (
            <div className={classes.box}>
                <Grid
                    container
                    alignItems="center"
                    className={classes.boxTitle}
                >
                    <Grid container justify="center">
                        <Avatar className={classes.boxLogo}>
                            <GameIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                </Grid>
                <GameStatus round={round} winner={this.winner(players)}/>
                <Grid container alignItems="center">
                    {rows}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(playersMenu)
