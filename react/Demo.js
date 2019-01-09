import React from 'react'
import PickupPointsSelector from './PickupPointsSelector'
import { newAddress } from './utils/newAddress'
import BRA from '@vtex/address-form/lib/country/BRA'
import { SEARCH } from './constants/index'
import { addValidation } from '@vtex/address-form/lib/transforms/address'

import './global.css'
import './components/PickupPoint.css'
import './components/PickupPointDetails.css'
import './components/PickupTabs.css'
import './components/ProductItems.css'

import pickupMock from './mocks/pickup-options'
import pickupPointsMock from './mocks/pickup-points'
import itemsMock from './mocks/items'
import logisticsInfoMock from './mocks/logistics-info'

const API_KEY = 'AIzaSyBpe3LiW2Pwhc29ttSy2USVULYEuLY2Yzg'

export default class Demo extends React.Component {
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
