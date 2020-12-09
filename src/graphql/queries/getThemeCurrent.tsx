import { gql } from '@apollo/client'

export const GET_THEME_CURRENT = gql`
  query getTheme {
    themeMode @client
  }
`
