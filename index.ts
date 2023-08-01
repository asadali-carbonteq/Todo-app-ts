import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main(){
    //const user = await prisma.user.create({
    //    data:{
    //        email: 'imasad@gmail.com',
    //        name: 'asad ali',
    //    }
    //})
    //console.log(user);

    /*const todos = await prisma.todo.create({
        data:{
            body: 'first todo',
            author:{
                connect:{
                    id: '64affd67dc0d00e9db2d33b4'   
                }
            }
        }
    })*/

    const users = await prisma.user.findMany({
        include:{
            Todo: true
        }
    });
    console.log(users);
}

main()
.catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })