import gql from 'graphql-tag';

export default gql`

mutation deleteTodo ( $id: Int!) {

deleteTodo (id: $id) 

}
`;
