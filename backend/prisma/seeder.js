const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed User
    const user = await prisma.user.create({
        data: {
            name: 'Johan Nasution',
            email: 'johans@example.com',
            password: 'mahalkita',
        },
    });

    console.log('User created:', user);

    // Seed Book
    const book = await prisma.book.create({
        data: {
            title: 'The Magic of Reality',
            author: 'Richard Dawkins',
            publisher: 'KPG',
            year: 2015,
            pages: 265,
            image: 'uploads\\1699107610271-book1.jpg',
        },
    });

    console.log('Book created:', book);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });