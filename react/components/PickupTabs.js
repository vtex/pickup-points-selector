import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from '../utils/i18nUtils'
import { HIDE_MAP, SHOW_MAP } from '../constants'

import styles from './PickupTabs.css'
import buttonStyles from './Button.css'

export class PickupTabs extends Component {
  handleLocationTab = event => {
    if (event.target.value === !this.props.mapStatus) return

    this.props.updateLocationTab(event.target.value)
    this.setState({ lastMapValue: !this.props.mapStatus })
  }

  render() {
    const { intl, mapStatus } = this.props

    return (
      <div className={`pkpmodal-pickup-view-mode ${styles.pickupViewMode}`}>
        <button
          className={`pkpmodal-pickup-view-list btn btn-link ${
            styles.pickupViewList
          } ${styles.linkButton} ${
            mapStatus === HIDE_MAP
              ? `pkpmodal-pickup-view-option-active ${
                  styles.pickupViewOptionActive
                }`
              : `pkpmodal-pickup-view-option-inactive ${
                  styles.pickupViewOptionInactive
                }`
          }`}
          onClick={this.handleLocationTab}
          type="button"
          value={HIDE_MAP}>
          {translate(intl, 'list')}
        </button>
        <button
          className={`pkpmodal-pickup-view-map btn btn-link ${
            styles.pickupViewMap
          } ${styles.linkButton} ${
            mapStatus === SHOW_MAP
              ? `pkpmodal-pickup-view-option-active ${
                  styles.pickupViewOptionActive
                }`
              : `pkpmodal-pickup-view-option-inactive ${
                  styles.pickupViewOptionInactive
                }`
          }`}
          onClick={this.handleLocationTab}
          type="button"
          value={SHOW_MAP}>
          {translate(intl, 'map')}
        </button>
      </div>
    )
  }
}

PickupTabs.propTypes = {
  intl: intlShape,
  mapStatus: PropTypes.string.isRequired,
  updateLocationTab: PropTypes.func.isRequired,
}

export default injectIntl(PickupTabs)
