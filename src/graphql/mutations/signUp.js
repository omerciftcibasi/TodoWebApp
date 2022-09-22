import gql from 'graphql-tag'

export default gql`

mutation signUp ( $input: SignUpInput!) {
  signUp ( input: $input) {
    email            
  }
}

`