import gql from 'graphql-tag';

export default gql`

mutation login ( $input: LoginInput!) {

login (input: $input) {
  id,
      email,
      accessToken,
      refreshToken    
}
}
`;
