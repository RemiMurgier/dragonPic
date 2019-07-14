import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Grid,
    Typography,
    Divider
} from '@material-ui/core'

import PlayersMenuRow from './PlayerRow'

const styles = theme => ({
    divider: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        backgroundColor: 'white'
    },
    titles: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    }
})

class GameStatus extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        round: PropTypes.number.isRequired,
        winner: PropTypes.object.isRequired,

    }

    render() {
        const { classes, winner, round } = this.props

        return (
            <Grid container alignItems='center'>
                <Grid container justify="space-between" className={classes.titles}>
                    <Grid item>
                        <Typography>Manche :</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{round}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography>Gagnant</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Point</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <PlayersMenuRow username={winner.username} score={winner.score} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(GameStatus)
