import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Button.css'

class Button extends Component {
  render() {
    const {
      kind,
      large,
      inline,
      disabled,
      title,
      moreClassName = '',
      ...rest
    } = this.props

    const classes = [moreClassName, styles.button, 'pkp-modal-btn']

    switch (kind) {
      case 'secondary':
        classes.push(styles.secondary, 'pkp-modal-btn-secondary')
        break
      default:
        classes.push(styles.primary, 'pkp-modal-btn-primary')
        break
    }

    if (!inline) {
      classes.push(styles.block, 'pkp-modal-btn-block')
    }
    if (large) {
      classes.push(styles.large, 'pkp-modal-btn-lg')
    }
    if (disabled) {
      classes.push(styles.disabled, 'pkp-modal-btn-disabled')
    }

    return (
      <button
        className={classes.join(' ')}
        disabled={disabled}
        {...rest}
        type="button">
        {title}
      </button>
    )
  }
}

Button.propTypes = {
  disabled: PropTypes.bool, // eslint-disable-line
  inline: PropTypes.bool, // eslint-disable-line
  kind: PropTypes.string,
  large: PropTypes.bool, // eslint-disable-line
  moreClassName: PropTypes.string,
  title: PropTypes.string,
}

export default Button
