import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Toolbar,
    Typography,
    TextField,
    withStyles,
    Grid
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CreateIconAction from '../CreateIconAction';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        boxShadow: '0px 1px 4px 0px black inset',
        backgroundColor: 'transparent'
    },
    spacer: {
        flex: '1 1 100%'
    },
    title: {
        flex: '0 0 auto',
        textShadow: '1px 2px 3px black'
    },
    inputNameRoom: {
        minWidth: 400,
        backgroundColor: 'rgba(255, 255, 255 , 0.3)'
    },
    iconContainer: {
        // paddingRight: theme.spacing(1)
    },
    icon: {
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }
    }
});
class RoomsTableToolbar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        openAddRoomModal: PropTypes.func.isRequired,
        setUsername: PropTypes.func.isRequired,
    };

    render() {
        const { classes, openAddRoomModal, setUsername } = this.props;

        return (
            <Toolbar className={classes.root}>
                <Grid
                    container
                    alignItems="center"
                    justify="space-around"
                    xs={6}
                >
                    <Grid item>
                        <Typography variant="h5" className={classes.title}>
                            Entre ton pseudo :
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            className={classes.inputNameRoom}
                            id="name"
                            label="Choisi un pseudo"
                            placeholder={name}
                            onChange={setUsername}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    container
                    alignItems="center"
                    justify="space-around"
                    xs={6}
                >
                    <Grid item>
                        <Typography variant="h5" className={classes.title}>
                            choisis ou créer une salle :
                        </Typography>
                    </Grid>
                    <Grid item className={classes.iconContainer}>
                        <CreateIconAction
                            title="Ajouter une salle"
                            ActionFunction={() => openAddRoomModal()}
                            Icon={AddIcon}
                            iconClass={classes.icon}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(RoomsTableToolbar);
