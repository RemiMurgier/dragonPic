import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GameRoom from '../components/GameRoom'

export class GameRoomContainer extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    state = {
        room: {
            roomID: 'roomId01',
            roomName: 'Room Of The Death',
            round: 0,
            players: [{username: 'ryu', score: 500, isActive: true}],
        }
    }

    componentDidMount() {
        const {state} = this.props.location
        const {roomId} = this.props.match.params
        // this.getRoom(roomId, state)
    }

    getRoom = async (roomId, currentUser) => {
        const res = await fetch('/services/getRoom/' + roomId + '/' + currentUser, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        })
        const resJson = await res.json()
        console.log('---->| RES FETCH ROOM |<----')
        console.log(resJson)
        // if (resJson.Room) {
        //     const room = JSON.parse(resJson.Room)
        //     this.setState({room})
        //     newConnection(room.RoomID, room.RoomName)
        // }

    }   

    render() {
        const {location} = this.props
        const { room } = this.state

        return <GameRoom room={room} currentUser={location.state}/>
    }
}

export default GameRoomContainer
