import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Grid,
    IconButton,
    Popover
} from '@material-ui/core'
import {
    ColorLens as ChooseColorIcon,
    Undo as UndoIcon,
    DeleteForever as DeleteIcon
} from '@material-ui/icons'
import { SketchPicker } from 'react-color'

import SliderBrush from './SliderBrush'

const styles = theme => ({
    selecterColor: {
        width: '36px',
        height: '14px',
        borderRadius: '2px'
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
    },
    iconButton: {
        color:'white'
    }
})

class PaintPannel extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        setBrushColor: PropTypes.func.isRequired,
        clearCanvas: PropTypes.func.isRequired,
        undoLastAction: PropTypes.func.isRequired,
        setBrushSize: PropTypes.func.isRequired,
    }

    state = {
        anchorPicker: null,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1'
        }
    }

    handleClick = event => {
        this.setState({ anchorPicker: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorPicker: null })
    }

    handleChange = color => {
        this.props.setBrushColor(color.hex)
        this.setState({ color: color.rgb })
    }

    render() {
        const { classes, undoLastAction, clearCanvas, setBrushSize } = this.props
        const { anchorPicker, color } = this.state
        const id = anchorPicker !== null ? 'popover-picker' : undefined
       
        // have to concert my team for what we add
        return (
            <Grid item xs={12}>
                <Grid container justify="space-evenly">
                    <Grid item >
                        <IconButton
                            aria-describedby={id}
                            className={classes.iconButton}
                            onClick={this.handleClick}
                        >
                            <ChooseColorIcon
                                fontSize="large"
                                style={{
                                    color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }}
                            />
                            <div className={classes.swatch}>
                                <div
                                    className={classes.selecterColor}
                                    style={{
                                        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                    }}
                                />
                            </div>
                        </IconButton>
                        <Popover
                            id={id}
                            open={anchorPicker !== null}
                            anchorEl={anchorPicker}
                            onClose={this.handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                        >
                            <SketchPicker
                                color={color}
                                onChange={this.handleChange}
                            />
                        </Popover>
                    </Grid>
                    <Grid item>
                        <SliderBrush setBrushSize={setBrushSize}/>
                    </Grid>
                    <Grid item>
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => undoLastAction()}
                        >
                            <UndoIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => clearCanvas()}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(PaintPannel)
