import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles,
    Grid,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import RoomsTable from './RoomsTable';
import CreateRoomModal from './CreateRoomModal';

const styles = theme => ({
    container: {
        color: 'white'
    },
    table: {
        minWidth: 650,
        backgroundColor: 'rgba(0, 0, 0 , 0.5)'
    },
    tableCell: {
        color: 'white'
    },
    title: {
        textShadow: '1px 2px 3px black'
    }
});

export class Rooms extends Component {
    static propTypes = {
        rooms: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired,
        createRoom: PropTypes.func.isRequired,
        isOpenCreateRoomModal: false
    };

    state = {
        username: ''
    };

    openAddRoomModal = () =>
        this.setState({
            isOpenCreateRoomModal: !this.state.isOpenCreateRoomModal
        });

    handleChangeUsername = event =>
        this.setState({ username: event.target.value });

    render() {
        const { rooms, classes, createRoom } = this.props;
        const { newRoomName, username, isOpenCreateRoomModal } = this.state;

        return (
            <Grid container className={classes.container}>
                <CreateRoomModal
                    isOpen={isOpenCreateRoomModal}
                    closeFunc={() =>
                        this.setState({ isOpenCreateRoomModal: false })
                    }
                    addroom={createRoom}
                />
                <Grid container>
                    <Typography variant="h4" className={classes.title}>
                        D-Corp Pictionary
                    </Typography>
                </Grid>
                <Grid
                    container
                    justify="center"
                    className={classes.containerInputs}
                ></Grid>
                <Grid container>
                    <RoomsTable
                        rooms={rooms}
                        openAddRoomModal={this.openAddRoomModal}
                        username={username}
                        setUsername={this.handleChangeUsername}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Rooms);
