import 'reflect-metadata';
import { expect, test, vi } from 'vitest'
import DIContainer from '../Presentation/di-container';
import TodoRepository from '../Infrastructure/Repository/TodoRepository';
import UserRepository from '../Infrastructure/Repository/UserRepository';
import prisma from '../libs/__mocks__/prisma';
import { Todo } from '@prisma/client';

const todoRepo = DIContainer.get<TodoRepository>(TodoRepository);
const userRepo = DIContainer.get<UserRepository>(UserRepository);

vi.mock('../libs/prisma')

//Todo Test
test.skip('Create Todo Test', async () => {
  const newTodo = { todo_id: "48112f9c-898a-4196-b9c4-54962b6a98c9", body: "hello test", authorId: "30112f9c-898a-4196-b9c4-54962b6a98c9" };
  const todo = await todoRepo.CreateTodo(newTodo.todo_id, newTodo.body, newTodo.authorId);
  expect(todo).toContain({ ...newTodo });

});

test.skip('Update Todo Test', async () => {
  const todo = await todoRepo.UpdateTodo("41112f9c-898a-4196-b9c4-54962b6a98c9", "new test todo hello");
  expect(todo).toContain({ authorId: "30112f9c-898a-4196-b9c4-54962b6a98c9", todo_id: "41112f9c-898a-4196-b9c4-54962b6a98c9", body: "new test todo hello" })
})


test.skip('Delete Todo Test', async () => {
  const todoId = "46112f9c-898a-4196-b9c4-54962b6a98c9";
  const todo = await todoRepo.DeleteTodo(todoId);
  expect(todo).toContain({ todoId });
})


//User Tests
test.skip('User SignIn Test', async () => {
  const email = "asad@test.com";
  const password = "asad";
  const user = await userRepo.SignIn(email, password);
  //expect(user).toBe({ user: { email } })
  //expect(user).toContain({ message: "User SignIn Successful", user: { email, name: "Mr.Asad", password: "$2b$10$B33aDvHZOj1GeIevx4WEK.KmldkcN/1VeU7iq7T7mrHGuP91He1aa", user_id: "30112f9c-898a-4196-b9c4-54962b6a98c9" } })
  expect(user).toContain({ message: "User SignIn Successful" })//, user: { email, name: "Mr.Asad", password: "$2b$10$B33aDvHZOj1GeIevx4WEK.KmldkcN/1VeU7iq7T7mrHGuP91He1aa", user_id: "30112f9c-898a-4196-b9c4-54962b6a98c9" } })
})

test.skip('User SugnUp Test', async () => {

})

/**
test.skip('User update Test', async () => {
  const todos[]= new Todo();
  const newUser = {userId:"30112f9c-898a-4196-b9c4-54962b6a98c9", name: "Mr.Asad", email: "asad@test.com", password: "asad", todo[]: new Todo()) }
})
 * 
 */

test('User Delete Test', async () => {
  const id = "2e3835d3-20f7-4254-9447-f51fd89bffd7";
  const user = await userRepo.DeleteUser(id);
  expect(user).toContain({ id });
})












/*
Mr.Asad
asad@test.com
asad
30112f9c-898a-4196-b9c4-54962b6a98c9
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzYWRAdGVzdC5jb20iLCJpZCI6IjMwMTEyZjljLTg5OGEtNDE5Ni1iOWM0LTU0OTYyYjZhOThjOSIsImlhdCI6MTY5MjA4NjU0MH0.9W-i_EXoIguw6trn57z3gNn_33EewuSp4z0p2y-si1Q 
*/