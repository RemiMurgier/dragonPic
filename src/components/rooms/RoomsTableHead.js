import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    withStyles,
} from '@material-ui/core'

const styles = theme => ({
    root: {
        color: 'white !important' ,
    },
    active:{}
})

class RoomsTableHeader extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired
    }

    createSortHandler = property => event =>
        this.props.onRequestSort(event, property)

    render() {
        const {
            order,
            orderBy,
            classes
        } = this.props

        // i think we have to move this constance to anothers files for manage languages... stay here for now
        const headRowCells = [
            { id: 'roomName', label: 'Noms' },
            { id: 'numberOfPlayers', label: 'Nombres de joueurs' },
            { id: 'round', label: 'round' },
        ]

        // when we moove headRowCell transform to an fonction for dynamical render of name of cell
        const headRow = headRowCells.map(row => (
            <TableCell
                key={row.id}
                align="center"
                sortDirection={orderBy === row.id ? order : false}
                className={classes.root}
            >
                <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                    classes={{root: classes.root, icon: classes.root, active: classes.root}}
                >
                    {row.label}
                </TableSortLabel>
            </TableCell>
        ))

        return (
            <TableHead>
                <TableRow>
                    {headRow}
                    <TableCell/>
                </TableRow>
            </TableHead>
        )
    }
}

export default withStyles(styles)(RoomsTableHeader)
