import React from 'react'
import { Tooltip, Zoom, IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

const CreateIconAction = ({ title, ActionFunction, Icon, iconClass=null, isDisabled = false }) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={title} placement="top">
            <IconButton disabled={isDisabled} onClick={ActionFunction} className={iconClass}>
                <Icon />
            </IconButton>
        </Tooltip>
    )
}

CreateIconAction.propTypes = {
    title: PropTypes.string.isRequired,
    ActionFunction: PropTypes.func.isRequired,
    Icon: PropTypes.node.isRequired,
    iconClass: PropTypes.object,
    isDisabled: PropTypes.bool,
}

export default CreateIconAction
