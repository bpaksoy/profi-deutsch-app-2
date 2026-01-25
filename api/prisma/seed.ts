import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({} as any); 

async function main() {
    // Clear existing data
    await prisma.knowledgeDocument.deleteMany();
    await prisma.category.deleteMany();

    // Seed categories
    await prisma.category.createMany({
        data: [
            { name: 'Meetings', slug: 'meetings' },
            { name: 'Emails', slug: 'emails' },
            { name: 'Phone Calls', slug: 'phone-calls' },
            { name: 'Kino', slug: 'kino' },
            { name: 'Reisen', slug: 'reisen' },
        ]
    });

    // Seed knowledge base
    await prisma.knowledgeDocument.createMany({
        data: [
            {
                title: 'German Business Greetings',
                content: `In professional German settings, greetings are formal. Common phrases include:
- Guten Morgen (Good morning) - used until noon
- Guten Tag (Good day) - used from noon until evening
- Guten Abend (Good evening) - used after 6 PM
- Auf Wiedersehen (Goodbye)
- Schönen Tag noch (Have a nice day)

Always use "Sie" (formal you) in business contexts unless invited to use "du".`,
                category: 'business',
                language: 'de'
            },
            {
                title: 'Common Cinema Vocabulary',
                content: `Useful phrases for talking about cinema in German:
- das Kino (cinema/movie theater)
- der Film (movie)
- die Vorstellung (screening/showing)
- der Actionfilm (action movie)
- die Komödie (comedy)
- das Drama (drama)
- der Horrorfilm (horror movie)
- Ich gehe gerne ins Kino (I like going to the cinema)
- Welchen Film möchtest du sehen? (Which movie would you like to see?)`,
                category: 'leisure',
                language: 'de'
            },
            {
                title: 'B2 Level Grammar Rules',
                content: `Key grammar concepts for B2 level:
- Konjunktiv II for hypothetical situations
- Passive voice construction
- Relative clauses with different cases
- Subjunctive mood for reported speech
- Complex sentence structures with subordinate clauses`,
                category: 'grammar',
                language: 'de'
            }
        ]
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });