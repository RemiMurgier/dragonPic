import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid } from '@material-ui/core'
import classNames from 'classnames'
import CanvasDraw from 'react-canvas-draw'

import PaintPannel from './PaintPannel'
import DrawingHelper from './DrawingHelper'

const styles = theme => ({
    container: {
        height: '85vh'
    },
    gridBox: {
        boxShadow: '0px 0px 6px -1px black inset',
        margin: theme.spacing.unit * 2,
        color: 'black'
    },
    helperBox: {
        color: 'white',
        textShadow: '1px 2px 3px black'
    },
})

let savedDrawing = null
class GameArea extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        roomName: PropTypes.string.isRequired,
    }

    state = {
        brushSize: 5,
        brushColor: '#000000'
    }

    componentDidMount() {
        this.saveDrawingInterval = setInterval(this.saveDrawing, 500)

    }

    componentWillUnmount() {
        clearInterval(this.saveDrawingInterval)
    }

    setBrushSize = size => this.setState({ brushSize: size })

    setBrushColor = color => this.setState({ brushColor: color })

    undoLastAction = () => this.canvasDrawing.undo()

    clearCanvas = () => this.canvasDrawing.clear()

    saveDrawing = () => {
        if (this.props.isPlaying) {
            savedDrawing = this.canvasDrawing.getSaveData()
        }

    }

    render() {
        const { classes, isPlaying, roomName } = this.props
        const { brushSize, brushColor } = this.state

        return (
            <Grid container className={classes.container}>
                <Grid
                    container
                    justify="center"
                    className={classNames(classes.helperBox, classes.gridBox)}
                >
                    <DrawingHelper roomName={roomName} isPlaying={isPlaying}/>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignContent="center"
                >
                    <CanvasDraw
                        ref={el => (this.canvasDrawing = el)}
                        className={classes.gridBox}
                        canvasWidth={1100}
                        canvasHeight={500}
                        lazyRadius={0}
                        brushRadius={brushSize}
                        brushColor={brushColor}
                        catenaryColor={brushColor}
                        loadTimeOffset={0}
                        disabled={!isPlaying}
                        hideGrid={!isPlaying}
                        saveData={isPlaying ? null : savedDrawing}
                    />
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignContent="center"
                    className={classes.gridBox}
                >
                    {isPlaying && (
                        <PaintPannel
                            setBrushColor={this.setBrushColor}
                            undoLastAction={this.undoLastAction}
                            clearCanvas={this.clearCanvas}
                            setBrushSize={this.setBrushSize}
                        />
                    )}
                    
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(GameArea)
