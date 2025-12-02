import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({} as any); 

interface KnowledgeDoc {
    title: string;
    content: string;
    category: string;
}

async function seedKnowledge() {
    // Clear existing knowledge
    await prisma.knowledgeDocument.deleteMany();
    await prisma.knowledgeChunk.deleteMany();

    const knowledgeDocs: KnowledgeDoc[] = [
        {
            title: 'German Business Greetings',
            content: `In professional German settings, greetings are formal and important.

Common Greetings:
- Guten Morgen (Good morning) - Used until approximately 11 AM
- Guten Tag (Good day) - Used from late morning until about 6 PM
- Guten Abend (Good evening) - Used from 6 PM onwards
- Grüß Gott (Southern German/Austrian greeting) - Used throughout the day in Bavaria and Austria
- Auf Wiedersehen (Goodbye) - Formal farewell
- Tschüss (Bye) - Informal farewell

Important Rules:
1. Always use "Sie" (formal you) in business contexts unless explicitly invited to use "du"
2. Handshakes are common and should be firm but not aggressive
3. Wait for the other person to extend their hand first if they are senior to you
4. Maintain eye contact during greetings
5. Use academic titles when appropriate (Herr Doktor, Frau Professor)`,
            category: 'business'
        },
        {
            title: 'Cinema and Entertainment Vocabulary',
            content: `Essential vocabulary for discussing movies and cinema in German.

Basic Terms:
- das Kino (the cinema/movie theater)
- der Film (the movie/film)
- die Vorstellung (the showing/screening)
- die Karte / das Ticket (the ticket)
- der Sitzplatz (the seat)
- die Leinwand (the screen)
- das Popcorn (popcorn - same in German!)

Movie Genres:
- der Actionfilm (action movie)
- die Komödie (comedy)
- das Drama (drama)
- der Horrorfilm (horror movie)
- der Science-Fiction-Film (sci-fi movie)
- der Animationsfilm (animated movie)
- der Thriller (thriller)
- die Romanze (romance)

Common Phrases:
- Ich gehe gerne ins Kino (I like going to the cinema)
- Welchen Film möchtest du sehen? (Which movie would you like to see?)
- Wann fängt die Vorstellung an? (When does the showing start?)
- Der Film läuft um 20 Uhr (The movie starts at 8 PM)
- Zwei Karten bitte (Two tickets please)
- Ist der Film synchronisiert oder mit Untertiteln? (Is the movie dubbed or with subtitles?)`,
            category: 'leisure'
        },
        {
            title: 'B2 Level Grammar: Konjunktiv II',
            content: `The Konjunktiv II (subjunctive mood) is essential for B2 level German.

Uses:
1. Expressing wishes and hypothetical situations
2. Polite requests
3. Expressing possibility or uncertainty
4. Reported speech (alternative to Konjunktiv I)

Formation:
Regular verbs: Use würde + infinitive
- Ich würde gehen (I would go)
- Du würdest kommen (You would come)

Irregular verbs (common ones have special forms):
- sein → ich wäre (I would be)
- haben → ich hätte (I would have)
- können → ich könnte (I could)
- müssen → ich müsste (I would have to)
- wollen → ich wollte (I would want)

Examples:
- Wenn ich Zeit hätte, würde ich mehr lesen (If I had time, I would read more)
- Könnten Sie mir helfen? (Could you help me? - polite)
- Das wäre schön (That would be nice)
- Ich würde gerne nach Berlin fahren (I would like to go to Berlin)`,
            category: 'grammar'
        },
        {
            title: 'Travel and Transportation',
            content: `Essential vocabulary for traveling in German-speaking countries.

Transportation:
- der Zug (train)
- der Bahnhof (train station)
- das Flugzeug (airplane)
- der Flughafen (airport)
- die U-Bahn (subway/metro)
- der Bus (bus)
- das Taxi (taxi)
- das Auto (car)

Common Phrases:
- Wo ist der Bahnhof? (Where is the train station?)
- Wie komme ich zum Flughafen? (How do I get to the airport?)
- Eine Fahrkarte nach Berlin, bitte (A ticket to Berlin, please)
- Wann fährt der nächste Zug? (When does the next train leave?)
- Von welchem Gleis? (From which platform?)
- Ich möchte ein Taxi bestellen (I would like to order a taxi)
- Einmal hin und zurück (One round-trip ticket)`,
            category: 'travel'
        },
        {
            title: 'German Email Etiquette',
            content: `Professional email writing in German follows specific conventions.

Opening Salutations:
Formal:
- Sehr geehrte Frau [Last Name] (Dear Ms. [Last Name])
- Sehr geehrter Herr [Last Name] (Dear Mr. [Last Name])
- Sehr geehrte Damen und Herren (Dear Sir or Madam)

Less Formal (when you know the person):
- Liebe Frau [Last Name] / Lieber Herr [Last Name]
- Guten Tag Frau/Herr [Last Name]

Closing:
Formal:
- Mit freundlichen Grüßen (With kind regards)
- Freundliche Grüße (Kind regards)

Less Formal:
- Viele Grüße (Many regards)
- Beste Grüße (Best regards)

Structure:
1. Greeting
2. Purpose of email
3. Details/request
4. Closing statement
5. Sign-off

Example Opening:
"Sehr geehrte Frau Schmidt,
vielen Dank für Ihre E-Mail vom 15. März..."`,
            category: 'business'
        }
    ];

    // Insert documents and create chunks
    for (const doc of knowledgeDocs) {
        const document = await prisma.knowledgeDocument.create({
            data: {
                title: doc.title,
                content: doc.content,
                category: doc.category,
                language: 'de'
            }
        });

        // Split content into chunks (simple approach)
        const chunks = chunkText(doc.content, 300); // 300 chars per chunk
        
        for (let i = 0; i < chunks.length; i++) {
            await prisma.knowledgeChunk.create({
                data: {
                    documentId: document.id,
                    content: chunks[i],
                    chunkIndex: i
                }
            });
        }

        console.log(`✅ Created: ${doc.title} (${chunks.length} chunks)`);
    }

    console.log('\n✅ Knowledge base seeded successfully!');
}

// Simple text chunking function
function chunkText(text: string, maxChunkSize: number): string[] {
    const chunks: string[] = [];
    const paragraphs = text.split('\n\n');
    
    let currentChunk = '';
    
    for (const paragraph of paragraphs) {
        if ((currentChunk + paragraph).length <= maxChunkSize) {
            currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
        } else {
            if (currentChunk) {
                chunks.push(currentChunk.trim());
            }
            currentChunk = paragraph;
        }
    }
    
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }
    
    return chunks;
}

seedKnowledge()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });