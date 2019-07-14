import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    Typography,
    Zoom,
    Button,
    withStyles
} from '@material-ui/core';

import { isValidName } from '../../utils';

const styles = theme => ({
    titleError: {
        backgroundColor: 'red',
        color: 'white'
    }
});

const DEFAULT_STATE = {
    username: null,
    roomName: null,
    isValidRoomName: false,
    isValidUsername: false,
    responseStatus: null
};

class CreateRoomModal extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isOpen: PropTypes.bool.isRequired,
        closeFunc: PropTypes.func.isRequired,
        addroom: PropTypes.func.isRequired
    };

    state = {
        username: '',
        roomName: '',
        responseStatus: null
    };

    transition = props => <Zoom {...props} />;

    handleChange = state => event =>
        this.setState({ [state]: event.target.value });

    isValidCreateRoomInputs = (username, newRoomName) => {
        const isValidUsername = isValidName(username);
        const isValidRoomName = isValidName(newRoomName);
        return isValidUsername && isValidRoomName;
    };

    addRoom = async (username, newRoomName) => {
        if (this.isValidCreateRoomInputs(username, newRoomName)) {
            console.log("FIRE CREATE ROOM");
            const status = await this.props.addroom(username, newRoomName)
            if (status && this.state.responseStatus) {
                this.setState(DEFAULT_STATE)
                this.props.closeFunc()
            } else {
                this.setState({ responseStatus: status })
            }
        } else {
            this.setState({ responseStatus: 'Noms incorrect' });
        }
    };

    switchTitle = (status, classes) => {
        if (status !== null) {
            return (
                <Typography className={classes.titleError}>{status}</Typography>
            );
        }
        return <Typography> Ajouter une salle </Typography>;
    };

    render() {
        const { isOpen, closeFunc, classes } = this.props;
        const { username, roomName, responseStatus } = this.state;

        const isDisableButton = !username.length > 0 && !roomName.length > 0;

        const title = this.switchTitle(responseStatus, classes);

        return (
            <Fragment>
                <Dialog
                    open={isOpen}
                    TransitionComponent={this.transition}
                    fullWidth={true}
                    maxWidth="md"
                    keepMounted
                    onClose={closeFunc}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle
                        id="form-dialog-title"
                        className={
                            responseStatus !== null && classes.titleError
                        }
                    >
                        {title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            id="username"
                            label="Pseudo"
                            error={!isValidName(username)}
                            onChange={this.handleChange('username')}
                            placeholder={username}
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                        />
                        <TextField
                            id="name"
                            label="Nom de la salle"
                            error={!isValidName(roomName)}
                            placeholder={roomName}
                            onChange={this.handleChange('roomName')}
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeFunc} color="primary">
                            retour
                        </Button>
                        <Button
                            onClick={() => this.addRoom(username, roomName)}
                            color="primary"
                            disabled={isDisableButton}
                        >
                            Ajouter
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default withStyles(styles)(CreateRoomModal);
