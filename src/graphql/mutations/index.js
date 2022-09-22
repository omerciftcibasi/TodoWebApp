const { default: createTodo } = require('./createTodo');
const { default: deleteTodo } = require('./deleteTodo');
const { default: login } = require('./login');
const { default: refreshAccessToken } = require('./refreshAccessToken');
const { default: signUp } = require('./signUp');
const { default: updateTodo } = require('./updateTodo');

export default {
  signUp, refreshAccessToken, updateTodo, deleteTodo, createTodo, login,
};
