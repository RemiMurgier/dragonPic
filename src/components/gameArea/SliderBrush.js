import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, Typography, Input, Slider } from '@material-ui/core'
import { Brush as PaintIcon } from '@material-ui/icons'

const styles = theme => ({
    root: {
        width: 250
    },
    input: {
        width: 45,
        color: 'white'
    },
    title:{
        color: 'white'
    }
})

class SliderBrush extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        setBrushSize: PropTypes.func.isRequired,
    }

    state = {
        value: 5
    }

    handleSliderChange = (event, newValue) => {
        this.setState({ value: newValue })
        this.props.setBrushSize(newValue)
    }

    handleInputChange = event => {
        this.setState({
            value: event.target.value === '' ? '' : Number(event.target.value)
        })
        this.props.setBrushSize(event.target.value === '' ? 1 : Number(event.target.value))
    }

    handleBlur = () => {
        if (this.state.value < 1) {
            this.setState({ value: 1 })
        } else if (this.state.value > 20) {
            this.setState({ value: 20 })
        }
    }

    render() {
        const { classes } = this.props
        const { value } = this.state
        

        return (
            <div className={classes.root}>
                <Typography id="input-slider" gutterBottom className={classes.title}>
                    Brush Size
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <PaintIcon className={classes.title}/>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={this.handleSliderChange}
                            aria-labelledby="input-slider"
                            step={1}
                            max={20}
                            min={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            className={classes.input}
                            value={value}
                            margin="dense"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 20,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SliderBrush)
