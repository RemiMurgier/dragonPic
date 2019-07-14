import React, { Component } from 'react'
import { Redirect } from 'react-router'

import Rooms from '../components/rooms/Rooms'
import { yellow } from '@material-ui/core/colors';

let fakeRooms = []
const setFakeRooms = (rooms) => {
    for (let i = 0; i < rooms; i++) {
        fakeRooms = [
            ...fakeRooms,
            { 
                roomId: 'idRoom' + i,
                roomName: 'Room ' + i,
                round: 1,
                numberOfPlayers: 2,
            }
        ]
    }
}

export class RoomsConatainer extends Component {
    state = {
        rooms: [],
        roomId: null,
        username: null
    }

    componentDidMount() {
        setFakeRooms(60)
        this.setState({rooms: fakeRooms})
        this.getRooms()
    }

    componentWillUnmount() {
        fakeRooms = []

    }

    getRooms = async () => {
        const res = await fetch('/services/getRooms', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        })
        const resJson = await res.json()
        console.log('---- RES GET ROOMS LIST ----')
        console.log(resJson)
        // if (resJson.RoomsList) {
        //     const rooms = resJson.RoomsList.map(e => JSON.parse(e))
        //     this.setState({ listRooms: rooms })
        // }
    }

    // have to pass in post
    createRoom = async (username, roomName) => {
        if (roomName.length < 2 && username.length < 2) {
            return
        }
        const res = await fetch('/services/createRoom/' + roomName, {
            method: 'GET', //to post
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            }
        })
        const {status, payload} = await res.json()
        if (status) {
            this.setState({ roomId: payload.roomId, username })
        } else {
            return payload
        }
        console.log('---->| RES CREATE ROOM |<----')
        console.log(payload)
    }

    render() {
        const { rooms, roomId, username } = this.state
        const isRedirectToRoom =
            roomId !== null ? (
                <Redirect
                    to={{ pathname: 'rooms/' + roomId, state: username }}
                />
            ) : (
                <Rooms rooms={rooms} createRoom={this.createRoom} />
            )

        return isRedirectToRoom
    }
}

export default RoomsConatainer
