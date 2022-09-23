import gql from 'graphql-tag';

export default gql`

mutation refreshAccessToken ( $input: String!) {
    refreshAccessToken (input: $input)
}
`;
