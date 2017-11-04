import React from 'react'

const integral = 7
const fractional = 2
const regExp = {
  nonDigits: /\D/g,
  thousands: /\B(?=(\d{3})+(?!\d))/g,
  delimiters: /[.,]/
}

export default class MoneyInput extends React.Component {
  removingSpace = false
  jumpingOverSpace = false
  onKeyDownHandler = e => {
    let target = e.target
    // if pressed backspace and it's going to remove the space
    if (e.nativeEvent.code === 'Backspace' && target.value.charAt(target.selectionStart - 1) === ' ') {
      this.removingSpace = true
    }
  }
  onKeyPressHandler = e => {
    let target = e.target
    // if pressed symbol button and it's going to jump over the space
    if (target.value.charAt(target.selectionStart) === ' ') {
      this.jumpingOverSpace = true
    }
  }
  onChangeHandler = e => {
    let { target } = e
    let value = target.value
    let delimiter
    let delimiterFound

    // remember cursor position
    let start = target.selectionStart
    let end = target.selectionEnd

    // clear the string from non-digits and excessive delimiters
    let clearString = value.replace(regExp.nonDigits, m => {
      if (!delimiterFound) {
        let match = m.match(regExp.delimiters)
        if (match) {
          delimiterFound = true
          delimiter = match[0]
          return match
        }
      }
      return ''
    })

    // remember how many symbols from user input were cut
    let inputLength = value.length - clearString.length

    let lengthBeforeTrimming = clearString.length

    // remove excessive digits
    clearString = clearString.split(delimiter).map((p, i) => p.substr(0, i === 0 ? integral : fractional)).join(delimiter)

    // remember string's length to count spaces after
    let lengthBefore = clearString.length

    lengthBeforeTrimming -= lengthBefore

    // insert spaces
    clearString = clearString.replace(regExp.thousands, ' ')

    // substract inserted spaces from cursor position
    inputLength -= clearString.length - lengthBefore

    if (this.removingSpace) {
      // remove one position to "jump over" the space
      inputLength++
      this.removingSpace = false
    }

    if (this.jumpingOverSpace && lengthBeforeTrimming > 0) {
      // add one position to "jump over" the space
      inputLength--
      this.jumpingOverSpace = false
    }

    this.props.onChange(clearString)

    this.setState({}, () => {
      target.setSelectionRange(
        Math.max(0, start - inputLength),
        Math.max(0, end - inputLength)
      )
    })
  }
  render() {
    const { value, onChange, ...htmlProps } = this.props

    return (
      <input
        onKeyDown={ this.onKeyDownHandler }
        onKeyPress={ this.onKeyPressHandler }
        onChange={ this.onChangeHandler }
        value={ this.props.value }
        { ...htmlProps }
      />
    )
  }
}
