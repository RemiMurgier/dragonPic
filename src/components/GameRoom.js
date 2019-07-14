import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid } from '@material-ui/core'

import PlayersMenu from './playersMenu/Menu'
import GameArea from './gameArea/GameArea'
import ChatContainer from '../containers/ChatContainer'

const styles = theme => ({
})

export class GameRoom extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        room: PropTypes.object.isRequired,
        currentUser: PropTypes.string.isRequired
    }

    isPlayerTurn = (currentPlayer, players) =>
        players.filter(e => e.isActive && e.username === currentPlayer).length > 0

    render() {
        const { room, currentUser } = this.props
        const isPlaying = this.isPlayerTurn(currentUser, room.players)

        return (
            <Grid container>
                <Grid container>
                    <Grid item xs={2}>
                        <PlayersMenu
                            players={room.players}
                            round={room.Round}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <GameArea isPlaying={isPlaying} roomName={room.roomName}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ChatContainer roomId={room.roomId} username={currentUser}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(GameRoom)
