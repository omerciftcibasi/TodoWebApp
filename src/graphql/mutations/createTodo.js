import gql from 'graphql-tag';

export default gql`

mutation createTodo ( $input: String!) {

createTodo (title: $input) {
    id,
    userId,
    title,
    isCompleted
}

}
`;
