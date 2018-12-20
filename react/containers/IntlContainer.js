import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import enTranslation from '../../messages/en.json'
import enLocale from 'react-intl/locale-data/en'
import reduce from 'lodash/reduce'
import getCountryISO2 from '@vtex/address-form/lib/countryISOMap'
import enAdressFormTranslations from '@vtex/address-form/lib/locales/en.json'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'

addLocaleData(enLocale)

class IntlContainer extends Component {
  constructor(props) {
    super(props)

    const testMessages = {
      ...enTranslation,
      ...enAdressFormTranslations,
      ...this.addCountryCodeNameSpace(enCountryCodeTranslations),
    }

    this.state = {
      locale: process.env.NODE_ENV === 'test' ? 'en' : null,
      messages: process.env.NODE_ENV === 'test' ? testMessages : null,
    }
  }

  componentDidMount() {
    if (!this.props.locale) return
    this.handleLocaleChange({}, this.props.locale)
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.locale) return
    this.handleLocaleChange({}, nextProps.locale)
  }

  getBaseLocale(locale) {
    return locale.indexOf('-') !== -1 ? locale.split('-')[0] : locale
  }

  handleLocaleChange = (e, locale) => {
    const baseLocale = this.getBaseLocale(locale)

    Promise.all([
      import(`react-intl/locale-data/${baseLocale}`),
      this.importTranslations(baseLocale, locale),
      this.importAddressTranslations(baseLocale, locale),
      this.importPickupPointsSelectorTranslations(baseLocale, locale),
      this.importCountryCodeTranslations(baseLocale, locale),
    ])
      .then(
        ([
          localeData,
          translations,
          addressTranslations,
          pickupPointsSelectorTranslations,
          countryCodeTranslations,
        ]) => {
          this.handleNewTranslations(
            locale,
            {
              ...translations,
              ...addressTranslations,
              ...pickupPointsSelectorTranslations,
              ...countryCodeTranslations,
            },
            localeData
          )
        }
      )
      .catch(event => {
        console.error(event)
        return Promise.reject(event)
      })
  }

  importTranslations(baseLocale, locale) {
    return Promise.all([
      import(`../../messages/${baseLocale}`),
      import(`../../messages/${locale}`),
    ])
      .then(([baseTranslation, translation]) => {
        return {
          ...baseTranslation,
          ...translation,
        }
      })
      .catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          this.couldNotFindModuleError(e)
        }
        return import(`../../messages/${baseLocale}`)
          .then(baseTranslation => baseTranslation)
          .catch(() => {
            this.setState({
              messages: {
                ...this.state.messages,
                ...enTranslation,
                ...this.addCountryCodeNameSpace(enCountryCodeTranslations),
              },
            })
          })
      })
  }

  importAddressTranslations(baseLocale, locale) {
    return Promise.all([
      import(`@vtex/address-form/lib/locales/${baseLocale}.json`),
      import(`@vtex/address-form/lib/locales/${locale}.json`),
    ])
      .then(([baseAddressTranslation, addressTranslation]) => {
        return {
          ...baseAddressTranslation,
          ...addressTranslation,
        }
      })
      .catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          this.couldNotFindModuleError(e)
        }
        return import(`@vtex/address-form/lib/locales/${baseLocale}`)
          .then(baseAddressTranslation => baseAddressTranslation)
          .catch(() => {
            this.setState({
              locale: 'en',
              messages: {
                ...this.state.messages,
                ...enAdressFormTranslations,
              },
            })
          })
      })
  }

  importPickupPointsSelectorTranslations(baseLocale, locale) {
    return Promise.all([
      import(`../../messages/${baseLocale}.json`),
      import(`../../messages/${locale}.json`),
    ])
      .then(
        ([basePickupPointsSelectorTranslation, pickupPointsSelectorTranslation]) => {
          return {
            ...basePickupPointsSelectorTranslation,
            ...pickupPointsSelectorTranslation,
          }
        }
      )
      .catch(e => {
        if (process.env.NODE_ENV !== 'production') {
          this.couldNotFindModuleError(e)
        }
        return import(`../../messages/${baseLocale}.json`).then(
          basePickupPointsSelectorTranslation => basePickupPointsSelectorTranslation
        )
      })
  }

  importCountryCodeTranslations(baseLocale) {
    return import(`i18n-iso-countries/langs/${baseLocale}.json`).then(
      this.addCountryCodeNameSpace
    )
  }

  addCountryCodeNameSpace(obj) {
    return reduce(
      obj,
      (acc, value, key) => {
        acc[`country.${getCountryISO2(key)}`] = value
        return acc
      },
      {}
    )
  }

  couldNotFindModuleError(e) {
    const regex = new RegExp(/Cannot find module '\.\/([A-z-]{1,7})'\./)
    const result = regex.exec(e.message)
    if (!result) return false

    return result[1]
  }

  handleNewTranslations = (locale, messages, localeData) => {
    addLocaleData(localeData)
    this.setState({
      locale,
      messages,
    })
  }

  render() {
    const { locale, messages } = this.state

    return (
      locale &&
      messages && (
        <IntlProvider key={locale} locale={locale} messages={messages}>
          {this.props.children}
        </IntlProvider>
      )
    )
  }
}

IntlContainer.propTypes = {
  children: PropTypes.element,
  locale: PropTypes.string,
}

export default IntlContainer
