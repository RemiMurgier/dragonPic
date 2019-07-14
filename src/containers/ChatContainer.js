import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Chat from '../components/Chat'

let curly = []
const takeACurly = (msgNumber = 0) => {
    for (let i = 0; i < msgNumber; i++) {
        curly = [
            ...curly,
            { username: 'User' + i, message: 'Bonjour je suis l\'utilisateur ' + i, date: moment() }
        ]
    }
}

export class ChatContainer extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        username: PropTypes.string.isRequired,
    }

    state = {
        messages: [],
    }
    

    componentDidMount () {
        takeACurly(20)
        this.setState({messages: curly})
    }

    getRoomMessages = async (roomId) => {
        console.log('GET ROOM MESSAGE FUNC')
        // const res = await fetch('/services/getRoomMessages/' + roomId, {
        //     method: 'GET',
        //     headers: {
        //         'Content-type': 'application/json',
        //         Accept: 'application/json'
        //     }
        // })
        // const resJson = await res.json()
        // console.log('---->| RES GET ROOM MESSAGES |<----')
        // console.log(resJson)
        // if (resJson.Messages) {
        //     const messages = resJson.Messages.map(e => JSON.parse(e))
        //     this.setState({messages})
        // }
    }

    //have to connect to backend
    sendNewMessage = (message) => {
        const {roomId, username} = this.props
        const {messages} = this.state
        this.setState({messages: [...messages,{ username, message: message, date: moment() }]})
        // sendMessage(roomId, username, message)
    }

    render() {
        const {messages} = this.state
        return <Chat messages={messages} sendNewMessage={this.sendNewMessage}/>
    }
}

export default ChatContainer
