import React, { memo } from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

interface FormAutoCompleteHighlitherProps {
  text: string
  highlightTerm: string
  style?: StyleProp<TextStyle>
  highlightStyle?: StyleProp<TextStyle>
}

const FormAutoCompleteHighlitherImpl = ({
  text,
  highlightTerm,
  style,
  highlightStyle,
}: FormAutoCompleteHighlitherProps) => {
  if (!highlightTerm.trim()) {
    return <Text style={style}>{text}</Text>
  }

  const escapedHighlightTerm = highlightTerm.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&')
  const regex = new RegExp(`(${escapedHighlightTerm})`, 'gi')
  const parts = text.split(regex)

  return (
    <Text style={style}>
      {parts.map((part, i) => {
        if (part.toLowerCase() === highlightTerm.toLowerCase()) {
          return (
            <Text
              key={i}
              style={[highlightStyle, !highlightStyle && { backgroundColor: '#FFE4B5' }]}>
              {part}
            </Text>
          )
        }
        return part
      })}
    </Text>
  )
}

export const FormAutoCompleteHighlither = memo(FormAutoCompleteHighlitherImpl)
