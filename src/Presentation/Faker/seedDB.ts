import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
const bcrypt = require('bcrypt');


export async function seedDatabase() {
    try {
        const prisma = new PrismaClient();

        await prisma.todo.deleteMany({});
        await prisma.user.deleteMany({});

        const userCount = 10;
        const users = [];
        const todos = [];

        for (let i = 0; i < userCount; i++) {
            const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);
            const user = await prisma.user.create({
                data: {
                    user_id: faker.string.uuid(),
                    email: faker.internet.email(),
                    name: faker.person.fullName(),
                    password: hashedPassword,
                }
            });

            users.push(user);

            const todoCount = Math.floor(Math.random() * 5 + 2);//Every user will have 1 to 5 todos randomly selected.

            for (let j = 0; j < todoCount; j++) {
                const todo = await prisma.todo.create({
                    data: {
                        todo_id: faker.string.uuid(),
                        body: faker.lorem.sentence(),
                        createdAt: faker.date.recent(),
                        authorId: user.user_id,
                    },
                });
                todos.push(todo);
            }
        }

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

