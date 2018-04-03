import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import {
  getUnavailableItemsByPickup,
  getItemsByPickup,
} from '../utils/pickupUtils'

import PickupPoint from './PickupPoint'
import ProductItems from '../components/ProductItems'

import './PickupPointDetails.css'

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
      items: getItemsByPickup(
        this.props.items,
        this.props.logisticsInfo,
        this.props.pickupPoint,
        this.props.sellerId
      ),
    }
  }
  handleBackButtonClick = () => this.props.togglePickupDetails()

  handleConfirmButtonClick = () => {
    this.props.handleChangeActiveSLAOption({
      slaOption: this.props.pickupPoint.id,
      sellerId: this.props.sellerId,
      shouldUpdateShippingData: false,
    })
    this.props.togglePickupDetails()
    this.props.handleClosePickupPointsModal()
  }

  translate = (id, values) =>
    this.props.intl.formatMessage({ id: `pickupPointsModal.${id}` }, values)

  render() {
    const {
      pickupPoint,
      selectedRules,
      isSelectedSla,
      sellerId,
      storePreferencesData,
      logisticsInfo,
    } = this.props

    const { unavailableItems, items } = this.state

    return (
      <div className="pkpmodal-pickup-point-details">
        <div className="pkpmodal-pickup-point-details-top">
          <button
            type="button"
            className="pkpmodal-link-back-pickup-points-list btn btn-link"
            onClick={this.handleBackButtonClick}
          >
            <i className={'pkpmodal-icon-back-pickup-points-list icon-angle-left'} />
            {this.translate('cancelBackList')}
          </button>
        </div>

        <div className="pkpmodal-pickup-point-details-middle">
          <div className="pkpmodal-pickup-point-details-store">
            <PickupPoint
              items={items}
              logisticsInfo={logisticsInfo}
              sellerId={sellerId}
              storePreferencesData={storePreferencesData}
              isSelected={isSelectedSla}
              selectedRules={selectedRules}
              pickupPoint={pickupPoint}
            />
          </div>

          <div className="pkpmodal-pickup-point-details-info">
            <div className="pkpmodal-pickup-point-details-group">
              <h3 className="title pkpmodal-pickup-point-details-info-title">
                {this.translate('productsInPoint')}
              </h3>
              {items && <ProductItems items={items} />}
              {unavailableItems && (
                <ProductItems items={unavailableItems} available={false} />
              )}
            </div>
            {pickupPoint.pickupStoreInfo &&
              pickupPoint.pickupStoreInfo.additionalInfo && (
                <div className="pkpmodal-pickup-point-details-group">
                  <h3 className="pkpmodal-pickup-point-details-info-title">
                    {this.translate('aditionalInfo')}
                  </h3>
                  {pickupPoint.pickupStoreInfo.additionalInfo}
                </div>
              )}
          </div>
        </div>

        <div className="pkpmodal-pickup-point-details-bottom">
          <button
            type="button"
            className="pkpmodal-pickup-point-details-confirm btn btn-success btn-large btn-block"
            id={`confirm-pickup-${pickupPoint.id
              .replace(/[^\w\s]/gi, '')
              .split(' ')
              .join('-')}`}
            onClick={this.handleConfirmButtonClick}
          >
            {this.translate('confirmPoint')}
          </button>
        </div>
      </div>
    )
  }
}

PickupPointDetails.propTypes = {
  handleChangeActiveSLAOption: PropTypes.func.isRequired,
  intl: intlShape,
  isSelectedSla: PropTypes.bool,
  items: PropTypes.array.isRequired,
  onClickPickupModal: PropTypes.func,
  pickupPoint: PropTypes.object.isRequired,
  selectedRules: PropTypes.object.isRequired,
  storePreferencesData: PropTypes.object.isRequired,
  sellerId: PropTypes.string,
  togglePickupDetails: PropTypes.func.isRequired,
  handleClosePickupPointsModal: PropTypes.func.isRequired,
  logisticsInfo: PropTypes.array.isRequired,
}

export default injectIntl(PickupPointDetails)
