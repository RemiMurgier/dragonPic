import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import ChooseWord from './ChooseWord'

const styles = theme => ({
    title: {
        marginBottom: theme.spacing.unit * 2
    }
})

export class DrawingHelper extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        roomName: PropTypes.string.isRequired,
        words: PropTypes.array.isRequired,
        timer: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        words: ['arbres', 'vélo', 'hache'],
        timer: 40
    }

    state = {
        selectedWord: '',
        winningPlayer: 0
    }

    selectWord = word => this.setState({ selectedWord: word })

    manageLetters = (word, time) => {
        const {winningPlayer} = this.state
        let letters = ''
        let i = 0
        const firstLetter = word[0]
        const lastLetter = word[word.length - 1]
        for (let letter of word) {
            if (
                (time < 40 && i === 0 && winningPlayer < 1) ||
                (time < 20 && i === word.length - 1 && winningPlayer < 4) ||
                (time < 10 && winningPlayer < 6 &&  (letter === lastLetter || letter === firstLetter)) ||
                (time === 0) ||
                (letter === '-')
            ) {
                letters += letter + ' '
            } else if (letter == ' ') {
                letters += '*'
            } else {
                letters += '_ '
            }
            i++
        }
        return letters
    }

    hideWord = (selectedWord, timer) => {
        const hiddenLetters = this.manageLetters(selectedWord, timer)
        const splitWord = hiddenLetters.split('*')
        const hiddenWord = splitWord.map(word => (
            <Grid item key={word}>
                <Typography variant="h4">{word}</Typography>
            </Grid>
        ))
        return (
            <Grid container spacing={3}>
                {hiddenWord}
            </Grid>
        )
    }

    render() {
        const { roomName, classes, words, timer, isPlaying } = this.props
        const { selectedWord, winningPlayer } = this.state
        const hiddenWord = this.hideWord(selectedWord, timer)

        return (
            <Grid item xs={12}>
                <ChooseWord
                    words={words}
                    isOpen={selectedWord.length < 1 && isPlaying}
                    selectWord={this.selectWord}
                />
                <Grid container className={classes.title}>
                    <Typography variant="h3">{roomName}</Typography>
                </Grid>
                <Grid container justify="space-evenly">
                    <Grid item>
                        <Typography variant="h4">{timer} Secondes</Typography>
                    </Grid>
                    <Grid item>{hiddenWord}</Grid>
                    <Grid item>
                        <Typography variant="h4">
                            {winningPlayer} Players ont trouvé
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(DrawingHelper)
