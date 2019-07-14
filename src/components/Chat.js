import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Grid,
    Typography,
    Avatar,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    InputBase,
    Divider,
    Paper
} from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'

const styles = theme => ({
    box: {
        backgroundColor: theme.palette.background.main,
        boxShadow: '0px 0px 6px -1px black inset',
        borderRadius: 10,
        width: '100%',
        overflow: 'auto',
        height: '85vh'
    },
    logo: {
        background: 'transparent',
        height: '30px'
    },
    text: {
        padding: theme.spacing.unit * 2
    },
    list: {
        width: '100%'
    },
    titleAppbar: {
        backgroundColor: theme.palette.secondary.dark,
        opacity: 0.8,
        borderRadius: 10,
        top: 0,
        bottom: 'auto'
    },
    sendMessageBox: {
        backgroundColor: theme.palette.background.main,
        boxShadow: '0px 0px 6px -1px black inset',
        position: 'sticky',
        top: 'auto',
        bottom: 0,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        width: 2,
        height: 30,
        margin: 4
    },
})

class Chat extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        messages: PropTypes.array.isRequired,
        sendNewMessage: PropTypes.func.isRequired,
    }

    state = {
        newMessage: ''
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom = () =>
        this.messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'end' })

    handleChange = event => this.setState({ newMessage: event.target.value })

    displayingMessages = ArrayOfMessages =>
        ArrayOfMessages.map(e => {
            const shortName = e.username.substring(0, 1).toUpperCase()
            return (
                <ListItem key={e.Order} divider>
                    <ListItemAvatar>
                        <Avatar alt='Profile Picture'>{shortName}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={e.username} secondary={e.message} />
                </ListItem>
            )
        })


    sendMessage = e => {
        const { newMessage } = this.state
        if ((e.key === 'Enter' || e.type === 'click') && newMessage !== '') {
            this.props.sendNewMessage(newMessage)
            this.setState({ newMessage: '' })
        }
    }

    textField = classes => (
        <Paper className={classes.sendMessageBox}>
            <InputBase
                className={classes.input}
                placeholder='Votre réponse ici'
                value={this.state.newMessage}
                inputProps={{ 'aria-label': 'textFieldChat' }}
                onChange={this.handleChange}
                onKeyDown={this.sendMessage}
            />
            <Divider className={classes.divider} />
            <IconButton
                color='primary'
                className={classes.iconButton}
                aria-label='sendMessage'
                onClick={this.sendMessage}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    )

    render() {
        const { classes, messages } = this.props
        const chatRows = this.displayingMessages(messages)
        const chatTextfield = this.textField(classes)

        return (
            <div className={classes.box}>
                <AppBar position='sticky' className={classes.titleAppbar}>
                    <Toolbar>
                        <Avatar src='../images/chat.png' className={classes.logo}/>
                        <Typography
                            className={classes.text}
                            variant='h5'
                            gutterBottom
                        >
                            Chat
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <List className={classes.list} disablePadding>{chatRows}</List>
                </Grid>
                {chatTextfield}
                <Grid
                    container
                    ref={el => {
                        this.messagesEnd = el
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Chat)
