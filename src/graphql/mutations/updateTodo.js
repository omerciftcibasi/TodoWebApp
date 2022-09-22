import gql from 'graphql-tag';

export default gql`

mutation updateTodo ( $id: Int!, $isCompleted: Boolean!) {

  updateTodo (id: $id, isCompleted: $isCompleted) 

}
`;
