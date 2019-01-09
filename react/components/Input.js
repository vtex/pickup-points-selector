import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import AddressShapeWithValidation from '@vtex/address-form/lib/propTypes/AddressShapeWithValidation'

export class Input extends Component {
  handleChange = event => this.props.onChange(event.target.value)

  render() {
    const {
      address,
      placeholder,
      onBlur,
      onFocus,
      inputRef,
      autoFocus,
      className,
    } = this.props

    const fieldValue = address.addressQuery

    return (
      <input
        autoFocus={autoFocus || false}
        data-hj-whitelist
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={this.handleChange}
        placeholder={placeholder}
        ref={inputRef}
        className={className}
        style={{
          boxSizing: 'border-box',
          padding: '.8rem 1rem',
        }}
        type="text"
        value={fieldValue.value || ''}
      />
    )
  }
}

Input.propTypes = {
  address: AddressShapeWithValidation,
  autoFocus: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool, // eslint-disable-line
  googleMapsKey: PropTypes.string,
  inputRef: PropTypes.func,
  intl: intlShape,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
}

export default injectIntl(Input)
