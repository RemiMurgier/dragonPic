import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Table, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import RoomsTableToolbar from './RoomsTableToolbar'
import RoomsTableHead from './RoomsTableHead'
import RoomsTableBody from './RoomsTableBody'

const styles = theme => ({
    tableContainer: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    table: {
        minWidth: 650,
        backgroundColor: 'rgba(0, 0, 0 , 0.5)',
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    tableFooter:{
        boxShadow: '0px -1px 4px 0px black inset',
        backgroundColor: 'rgba(0, 0, 0 , 0.5)',
        color:'white'
    }
})

class RoomsTable extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        rooms: PropTypes.array.isRequired,
        openAddRoomModal: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        setUsername: PropTypes.func.isRequired,
    }

    state = {
        order: 'asc',
        orderBy: 'roomName',
        page: 0,
        rowsPerPage: 10,
    }

    handleRequestSort = (event, property) => {
        const isDesc =
            this.state.orderBy === property && this.state.order === 'desc'
        const setOrder = isDesc ? 'asc' : 'desc'
        this.setState({ order: setOrder, orderBy: property })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

    render() {
        const { classes, rooms, openAddRoomModal, username, setUsername } = this.props
        const {
            order,
            orderBy,
            page,
            rowsPerPage,
            isOpenCreateRoomModal
        } = this.state

        return (
            <div className={classes.tableContainer}>
                <RoomsTableToolbar openAddRoomModal={openAddRoomModal} setUsername={setUsername} />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <RoomsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={rooms.length}
                        />
                        <RoomsTableBody
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rooms={rooms}
                            username={username}
                        />
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rooms.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                        'color': 'primary',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                        color: 'primary',
                    }}
                    labelDisplayedRows={({ from, to, count }) => `Salle ${from} à ${to}, nombre de salles total: ${count}`}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    className={classes.tableFooter}
                />
            </div>
        )
    }
}

export default withStyles(styles)(RoomsTable)
