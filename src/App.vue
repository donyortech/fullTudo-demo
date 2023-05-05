<template>
  <!-- 
    0. npm init vue@latst
    2. npm install bulma / https://bulma.io/
  -->
  <div class="badass-todo">
    <div class="title has-text-centered">nextCode24 Todo</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newtTodoContent"
            class="input"
            type="text"
            placeholder="Find a repo"
          />
        </p>
        <b class="control">
          <button :disabled="!newtTodoContent" class="button is-info">
            Add
          </button>
        </b>
      </div>
    </form>
    <!-- Cards -->
    <div
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
      v-for="todo in todos"
    >
      <!-- i in 3 -->
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports

import { ref, onMounted } from "vue";
//npm install firebase
import { db } from "./firebase/index";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

//firebase refs

const todosCollectionRef = collection(db, "todos");

// todos

const todos = ref([
  // {
  //   id: "id1",
  //   content: "Save my butt",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "Save my butt",
  //   done: true,
  // },
]);

//get todos
onMounted(() => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

// add todo

const newtTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newtTodoContent.value,
    done: false,
    data: Date.now(),
  });
  newtTodoContent.value = "";
};

// delete todo

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

//toggle done

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import "bulma/css/bulma.min.css";
.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
