import React from 'react'
import Button from '@material-ui/core/Button'
import './StartButton.css'

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */

export default function StartButton(props) {
  return (
    <Button
      className="start-button"
      variant="contained"
      disabled={props.disabled}
      onClick={props.onClick}
      color="primary"
    >
      {props.disabled ? 'Nu ai niciun call in progress' : 'Participa la call'}
    </Button>
  )
}
