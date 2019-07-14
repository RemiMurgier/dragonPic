import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

import {isValidName} from '../../utils'

const styles = theme => ({
    tableCell: {
        color: 'white'
    }
})

class RoomsTableBody extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        rooms: PropTypes.array.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }

    desc = (a, b, orderBy) => {
        const lowerB = typeof b === 'string' ? b[orderBy].toLowerCase() : b[orderBy]
        const lowerA = typeof a === 'string' ? a[orderBy].toLowerCase() : a[orderBy]
        if (lowerB < lowerA) {
            return -1
        }
        if (lowerB > lowerA) {
            return 1
        }
        return 0
    }

    stableSort = (array, cmp) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map(el => el[0])
    }

    getSorting = (order, orderBy) => order === 'desc'
            ? (a, b) => this.desc(a, b, orderBy)
            : (a, b) => -this.desc(a, b, orderBy)


    render() {
        const { page, rowsPerPage, rooms, order, orderBy, classes, username } = this.props

        const tableRows = this.stableSort(
            rooms,
            this.getSorting(order, orderBy)
        )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(room => {
                return (
                    <TableRow hover tabIndex={-1} key={room.roomId}>
                        <TableCell
                            component="th"
                            scope="room"
                            align="center"
                            className={classes.tableCell}
                        >
                            <Typography>{room.roomName}</Typography>
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                            <Typography>{room.numberOfPlayers}</Typography>
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                            <Typography>{room.round}</Typography>
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.container}
                                disabled={!isValidName(username)}
                                component={Link}
                                to={{
                                    pathname: 'rooms/' + room.roomId,
                                    state: username
                                }}
                            >
                                Join
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })

        return <TableBody>{tableRows}</TableBody>
    }
}

export default withStyles(styles)(RoomsTableBody)
