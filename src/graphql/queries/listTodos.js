import gql from 'graphql-tag';

export default gql`

query listTodos {

listTodos  {
        id,
        title,
        isCompleted
}

}
`;
