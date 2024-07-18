import "./style.css";

interface todo {
  title: string;
  iscompleted: boolean;
  readonly id: string;
}

const Todos: todo[] = [];

const todosContainer = document.querySelector(
  ".taskContainer"
) as HTMLDivElement;

const todoInput = document.querySelector("#title") as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const Todo: todo = {
    title: todoInput.value,
    iscompleted: false,
    id: String(Math.random() * 1000),
  };
  Todos.push(Todo);
  todoInput.value = "";
  console.log(Todos);
  renderTodo(Todos);
};

const renderTodo = (Todos: todo[]) => {
  todosContainer.innerText = "";
  Todos.forEach((item) => {
    generateTodoItem(item.title, item.iscompleted, item.id);
  });
};

const generateTodoItem = (title: string, iscompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";
  const checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = iscompleted;
  checkbox.onchange = () => {
    Todos.find((item) => {
      if (item.id === id) item.iscompleted = checkbox.checked;
    });
    para.className = checkbox.checked ? "textCut" : "";
  };

  const para = document.createElement("p") as HTMLParagraphElement;
  para.innerText = title;
  para.className = iscompleted ? "textCut" : "";

  const delbtn = document.createElement("button") as HTMLButtonElement;
  delbtn.innerText = "X";
  delbtn.className = "delbtn";
  delbtn.onclick = () => {
    delTodo(id);
  };

  todo.append(checkbox, para, delbtn);
  todosContainer.append(todo);
};

const delTodo = (id: string) => {
  const idx = Todos.findIndex((item) => item.id === id);
  Todos.splice(idx, 1);
  renderTodo(Todos);
};
