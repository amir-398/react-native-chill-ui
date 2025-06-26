import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from '$components'

type NothingFoundProps = {
  content?: string
}

export const FormAutoCompleteNothingFound = ({ content }: NothingFoundProps) => {
  const { styles } = useStyles(stylesheet)
  return (
    <View style={styles.container}>
      <Text>{content ?? 'No data'}</Text>
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
  },
}))
