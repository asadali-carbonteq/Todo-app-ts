import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
const bcrypt = require('bcrypt');
const logger = require('pino')()
import { SeedingException } from "../../Infrastructure/Error/SeedError";


export async function seedDatabase(Total_Users: number) {
    try {
        const prisma = new PrismaClient();

        await prisma.todo.deleteMany({});
        await prisma.user.deleteMany({});

        const users = [];

        for (let i = 0; i < Total_Users; i++) {
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

            const randomTodoCount = Math.floor(Math.random() * 5 + 2);

            for (let j = 0; j < randomTodoCount; j++) {
                const todo = await prisma.todo.create({
                    data: {
                        todo_id: faker.string.uuid(),
                        body: faker.lorem.sentence(),
                        createdAt: faker.date.recent(),
                        authorId: user.user_id,
                    },
                });
            }
        }

        logger.info('Database seeded successfully.');
    } catch (error) {
        throw new SeedingException("Error Seeding Database");
    }
}

