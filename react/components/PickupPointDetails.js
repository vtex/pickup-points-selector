import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { translate } from '../utils/i18nUtils'

import {
  getUnavailableItemsByPickup,
  getItemsWithPickupPoint,
  formatBusinessHoursList,
} from '../utils/pickupUtils'

import PickupPoint from './PickupPoint'
import ProductItems from './ProductItems'
import PickupPointHour from './PickupPointHour'
import Button from './Button'

import styles from './PickupPointDetails.css'

export class PickupPointDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      unavailableItems: getUnavailableItemsByPickup(
        this.props.items,
        this.props.logisticsInfo,
        this.props.pickupPoint,
        this.props.sellerId
      ),
      items: getItemsWithPickupPoint(
        this.props.items,
        this.props.logisticsInfo,
        this.props.pickupPoint,
        this.props.sellerId
      ),
    }
  }

  handleBackButtonClick = () => this.props.onBack()

  handleConfirmButtonClick = () => {
    this.props.onConfirm({
      slaOption: this.props.pickupPoint.id,
      sellerId: this.props.sellerId,
      shouldUpdateShippingData: false,
    })
  }

  render() {
    const {
      pickupPoint,
      pickupPointInfo,
      selectedRules,
      isSelectedSla,
      sellerId,
      intl,
      storePreferencesData,
      logisticsInfo,
    } = this.props

    const { unavailableItems, items } = this.state

    const hasItems = (items && items.length > 0) || (unavailableItems && unavailableItems.length > 0)

    const businessHours =
      !pickupPointInfo ||
      !pickupPointInfo.businessHours ||
      pickupPointInfo.businessHours.length === 0
        ? null
        : formatBusinessHoursList(pickupPointInfo.businessHours)

    return (
      <div className={`pkpmodal-details ${styles.details}`}>
        <div className={`pkpmodal-details-top ${styles.detailsTop}`}>
          <button
            className={`pkpmodal-details-back-lnk btn btn-link ${
              styles.detailsBackLink
            }`}
            onClick={this.handleBackButtonClick}
            type="button">
            <i
              className={`pkpmodal-icon-back-pickup-points-list icon-angle-left ${
                styles.iconBackPickupPointsList
              }`}
            />
            {translate(intl, 'cancelBackList')}
          </button>
        </div>

        <div className={`pkpmodal-details-middle ${styles.detailsMiddle}`}>
          <div className={`pkpmodal-details-store ${styles.detailsStore}`}>
            <PickupPoint
              isSelected={isSelectedSla}
              items={this.props.items}
              logisticsInfo={logisticsInfo}
              pickupPoint={pickupPoint}
              selectedRules={selectedRules}
              sellerId={sellerId}
              storePreferencesData={storePreferencesData}
            />
          </div>

          <div className={`pkpmodal-details-info ${styles.detailsInfo}`}>
            {hasItems && (
              <div className={`pkpmodal-details-group ${styles.detailsGroup}`}>
                <h3
                  className={`title pkpmodal-details-info-title ${styles.title} ${
                    styles.detailsInfoTitle
                  }`}>
                  {translate(intl, 'productsInPoint')}
                </h3>
                {items && <ProductItems items={items} />}
                {unavailableItems && (
                  <ProductItems isAvailable={false} items={unavailableItems} />
                )}
              </div>
            )}
            {pickupPoint.pickupStoreInfo &&
              pickupPoint.pickupStoreInfo.additionalInfo && (
                <div
                  className={`pkpmodal-details-group ${styles.detailsGroup}`}>
                  <h3
                    className={`pkpmodal-details-info-title ${
                      styles.detailsInfoTitle
                    }`}>
                    {translate(intl, 'aditionalInfo')}
                  </h3>
                  {pickupPoint.pickupStoreInfo.additionalInfo}
                </div>
              )}

            {businessHours && (
              <div className={`pkpmodal-details-group ${styles.detailsGroup}`}>
                <h3
                  className={`pkpmodal-details-info-title ${
                    styles.detailsInfoTitle
                  }`}>
                  {translate(intl, 'businessHours')}
                </h3>
                <table
                  className={`pkpmodal-details-hours ${styles.detailsHours}`}>
                  {businessHours.map((day, i) => {
                    return (
                      <tr key={i}>
                        <td
                          className={`${
                            styles.detailsHoursTd
                          } pkpmodal-details-hours-day`}>
                          {translate(intl, `weekDay${day.number}`)}
                        </td>
                        {day.closed ? (
                          <td
                            className={`pkpmodal-details-hours-closed ${
                              styles.detailsHoursClosed
                            }`}>
                            {translate(intl, 'closed')}
                          </td>
                        ) : (
                          <td
                            className={`pkpmodal-details-hours-range ${
                              styles.detailsHoursRange
                            }`}>
                            <PickupPointHour time={day.openingTime} />{' '}
                            {translate(intl, 'hourTo')}{' '}
                            <PickupPointHour time={day.closingTime} />
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </table>
              </div>
            )}
          </div>
        </div>

        <div className={`pkpmodal-details-bottom ${styles.detailsBottom}`}>
          <Button
            id={`confirm-pickup-${pickupPoint.id
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')}`}
            kind="primary"
            large
            moreClassName="pkpmodal-details-confirm-btn"
            onClick={this.handleConfirmButtonClick}
            title={translate(intl, 'confirmPoint')}
          />
        </div>
      </div>
    )
  }
}

PickupPointDetails.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  intl: intlShape,
  isSelectedSla: PropTypes.bool,
  items: PropTypes.array.isRequired,
  logisticsInfo: PropTypes.array.isRequired,
  onBack: PropTypes.func,
  onClickPickupModal: PropTypes.func,
  pickupPoint: PropTypes.object.isRequired,
  pickupPointInfo: PropTypes.object.isRequired,
  selectedRules: PropTypes.object.isRequired,
  sellerId: PropTypes.string,
  storePreferencesData: PropTypes.object.isRequired,
}

PickupPointDetails.defaultProps = {
  onBack: () => {},
}

export default injectIntl(PickupPointDetails)
