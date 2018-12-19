import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PickupPointsSelector from '../../react/PickupPointsSelector'
import { newAddress } from '../../react/utils/newAddress'
import BRA from '@vtex/address-form/lib/country/BRA'
import { SEARCH } from '../../react/constants/index'
import { addValidation } from '@vtex/address-form/lib/transforms/address'

import '../../react/index.css'
import '../../react/components/PickupPoint.css'
import '../../react/components/PickupPointDetails.css'
import '../../react/components/PickupTabs.css'
import '../../react/components/ProductItems.css'

import pickupMock from './pickup-options'
import itemsMock from './items'
import logisticsInfoMock from './logistics-info'
import pickupPointsMock from './pickup-points'

const API_KEY = 'AIzaSyATLp76vkHxfMZqJF_sJbjQqZwvSIBhsTM'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: true,
      selectedPickupPoint: pickupMock.pickupOptions[0],
      pickupOptions: pickupMock.pickupOptions,
      logisticsInfo: logisticsInfoMock.logisticsInfo,
      pickupPoints: pickupPointsMock.pickupPoints,
      items: itemsMock.items,
      storePreferencesData: {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        currencySymbol: 'R$',
        currencyFormatInfo: {
          currencyDecimalDigits: 2,
          currencyDecimalSeparator: ',',
          currencyGroupSeparator: '.',
          currencyGroupSize: 3,
          startsWithCurrencySymbol: true,
        },
      },
      searchAddress: addValidation(
        newAddress({
          addressType: SEARCH,
          geoCoordinates: [-43.185971, -22.943419],
        })
      ),
    }
  }

  changeActivePickupDetails = () =>
    this.setState({
      selectedPickupPoint: pickupMock.pickupOptions[0],
    })

  handleAddressChange = address => this.setState({ address })

  handleConfirm = options => {
    console.log('Selected pickup options:', options)
  }

  render() {
    const {
      searchAddress,
      selectedPickupPoint,
      isPickupDetailsActive,
      storePreferencesData,
      logisticsInfo,
      pickupPoints,
      items,
    } = this.state

    return (
      <div className="w-100 h-100 overflow-hidden ba">
        <PickupPointsSelector
          activePickupPoint={selectedPickupPoint}
          askForGeolocation={false}
          changeActivePickupDetails={this.changeActivePickupDetails}
          changeActiveSLAOption={() => {}}
          onConfirm={this.handleConfirm}
          googleMapsKey={API_KEY}
          intl={this.props.intl}
          isPickupDetailsActive={isPickupDetailsActive}
          items={items}
          logisticsInfo={logisticsInfo}
          onAddressChange={this.handleAddressChange}
          pickupOptions={pickupMock.pickupOptions}
          rules={BRA}
          searchAddress={searchAddress}
          selectedPickupPoint={selectedPickupPoint}
          storePreferencesData={storePreferencesData}
          pickupPoints={pickupPoints}
        />
      </div>
    )
  }
}

App.propTypes = {
  intl: intlShape,
}

export default injectIntl(App)
