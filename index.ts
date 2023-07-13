import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const user = await prisma.user.create({
        data:{
            email: 'imasad@gmail.com',
            name: 'asad ali'
        }
    })
    console.log(user);
}

main();