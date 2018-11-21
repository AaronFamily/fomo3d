import React, { Component } from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import zh_CN from './locale/zh-CN'
import en_US from './locale/en-US'
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'

addLocaleData([...zh,...en])

@connect(state => ({
    locale: state.language,
    localeMessage: chooseLocale(state.language)
}))
class Inter extends Component {
    render() {
        let { locale, localeMessage, children } = this.props

        return (
        <IntlProvider locale={locale} messages={localeMessage}>
            {children}
        </IntlProvider>
        )
    }
}

function chooseLocale(val) {
  switch (val) {
    case 'en':
      return en_US
    case 'zh':
      return zh_CN
    default:
      return zh_CN
  }
}

export default Inter