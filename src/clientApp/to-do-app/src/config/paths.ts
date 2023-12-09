const paths = {
   main: "/",
   todos: {
      main: "/todos",
      addTodo: "/todos/add",
      editTodo: "/todos/edit/:id",
   },
   auth: {
      register: "/register",
      login: "/login",
   },
};

export default paths;
