const angular = require('angular');
const Raven = require('raven-js');

Raven
  .config('https://XXXXXXXXXXXXXXXXXXXXX@sentry.io/XXXX')//your public dsn
  .addPlugin(require('raven-js/plugins/angular'), angular)
  .install();

angular.module('todoApp', [
  'ngRaven',
]).controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
      //do something bad:
      foo.thisWillThrow()
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
