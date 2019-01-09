import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from '../utils/i18nUtils'

import styles from './Geolocation.css'

class GeolocationStatus extends Component {
  render() {
    const {
      titleTop,
      subtitleTop,
      titleBottom,
      subtitleBottom,
      Image,
      children,
      intl,
    } = this.props

    return (
      <div className={`pkpmodal-locating ${styles.locating}`}>
        <div className={`pkpmodal-locating-content ${styles.locatingContent}`}>
          {titleTop && (
            <h2 className={`pkpmodal-locating-title ${styles.locatingTitle}`}>
              {translate(intl, titleTop)}
            </h2>
          )}
          {subtitleTop && (
            <h3
              className={`pkpmodal-locating-subtitle ${
                styles.locatingSubtitle
              }`}>
              {translate(intl, subtitleTop)}
            </h3>
          )}
          {Image && (
            <div className={`pkpmodal-locating-image ${styles.locatingImage}`}>
              <Image />
            </div>
          )}
          {(titleBottom || subtitleBottom) && (
            <div
              className={`pkpmodal-locating-instructions ${
                styles.locatingInstructions
              }`}>
              {titleBottom && (
                <h2
                  className={`pkpmodal-locating-title-small ${
                    styles.locatingTitleSmall
                  }`}>
                  {translate(intl, titleBottom)}
                </h2>
              )}
              {subtitleBottom && (
                <h3
                  className={`pkpmodal-locating-subtitle ${
                    styles.locatingSubtitle
                  }`}>
                  {translate(intl, subtitleBottom)}
                </h3>
              )}
            </div>
          )}
        </div>

        {children && (
          <div
            className={`pkpmodal-locating-actions ${styles.locatingActions}`}>
            {children}
          </div>
        )}
      </div>
    )
  }
}

GeolocationStatus.propTypes = {
  Image: PropTypes.any,
  children: PropTypes.any,
  intl: intlShape,
  subtitleBottom: PropTypes.any,
  subtitleTop: PropTypes.any,
  titleBottom: PropTypes.any,
  titleTop: PropTypes.any,
}

export default injectIntl(GeolocationStatus)
