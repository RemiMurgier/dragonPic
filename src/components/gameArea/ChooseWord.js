import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography,
    Zoom,
    Button,
    withStyles
} from '@material-ui/core'

const styles = theme => ({
    selectedButton: {
        backgroundColor: theme.palette.secondary.dark
    }
})

class ChooseWord extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        words: PropTypes.array.isRequired,
        selectWord: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
    }

    state = {
        selectedWord: '',
        selectedButton: null
    }

    transition = props => <Zoom {...props} />

    selectButton = (word, index) => {
        let selectedButton = null
        switch (index) {
            case 0:
                selectedButton = 0
                break
            case 1:
                selectedButton = 1
                break
            case 2:
                selectedButton = 2
                break

            default:
                selectedButton = null
                break
        }
        this.setState({ selectedWord: word, selectedButton })
    }

    render() {
        const { words, selectWord, classes, isOpen } = this.props
        const { selectedWord, selectedButton } = this.state

        const buttons = words.map((e, i) => (
            <Button
                key={e.name}
                onClick={() => this.selectButton(e, i)}
                className={selectedButton === i ? classes.selectedButton : null}
                variant={selectedButton === i ? 'contained' : 'outlined'}
                fullWidth
                size="large"
            >
                {e}
            </Button>
        ))

        return (
            <Fragment>
                <Dialog
                    open={isOpen}
                    TransitionComponent={this.transition}
                    fullWidth={true}
                    maxWidth="md"
                    keepMounted
                >
                    <DialogTitle>
                        <Typography> Choisis un mot </Typography>
                    </DialogTitle>
                    <DialogContent dividers>{buttons}</DialogContent>
                    <DialogActions>
                        <Button onClick={() => selectWord(selectedWord)}>
                            Confirmer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ChooseWord)
