import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

interface KnowledgeDoc {
    title: string;
    content: string;
    category: string;
}

async function seedKnowledge() {
    console.log('🌱 Starting knowledge base seeding...\n');

    // Clear existing knowledge
    await prisma.knowledgeChunk.deleteMany();
    await prisma.knowledgeDocument.deleteMany();
    
    console.log('✅ Cleared existing knowledge documents');

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
5. Use academic titles when appropriate (Herr Doktor, Frau Professor)

Common Professional Phrases:
- Es freut mich, Sie kennenzulernen (Pleased to meet you)
- Wie geht es Ihnen? (How are you? - formal)
- Danke, gut. Und Ihnen? (Fine, thank you. And you?)
- Schönen Tag noch! (Have a nice day!)`,
            category: 'business'
        },
        {
            title: 'Cinema and Entertainment Vocabulary',
            content: `Essential vocabulary for discussing movies and cinema in German.

Basic Cinema Terms:
- das Kino (the cinema/movie theater)
- der Film (the movie/film)
- die Vorstellung (the showing/screening)
- die Karte / das Ticket (the ticket)
- der Sitzplatz (the seat)
- die Leinwand (the screen)
- das Popcorn (popcorn - same in German!)
- die Nachrichten / der Trailer (the trailer)

Movie Genres:
- der Actionfilm (action movie)
- die Komödie (comedy)
- das Drama (drama)
- der Horrorfilm (horror movie)
- der Science-Fiction-Film (sci-fi movie)
- der Animationsfilm (animated movie)
- der Thriller (thriller)
- die Romanze (romance)
- die Dokumentation (documentary)

Common Phrases:
- Ich gehe gerne ins Kino (I like going to the cinema)
- Welchen Film möchtest du sehen? (Which movie would you like to see?)
- Wann fängt die Vorstellung an? (When does the showing start?)
- Der Film läuft um 20 Uhr (The movie starts at 8 PM)
- Zwei Karten für die 18-Uhr-Vorstellung, bitte (Two tickets for the 6 PM showing, please)
- Ist der Film synchronisiert oder mit Untertiteln? (Is the movie dubbed or with subtitles?)
- Der Film hat mir sehr gut gefallen (I really enjoyed the movie)
- Die Handlung war spannend (The plot was exciting)`,
            category: 'leisure'
        },
        {
            title: 'B2 Level Grammar: Konjunktiv II',
            content: `The Konjunktiv II (subjunctive mood) is essential for B2 level German.

Primary Uses:
1. Expressing wishes and hypothetical situations
2. Making polite requests
3. Expressing possibility or uncertainty
4. Reported speech (alternative to Konjunktiv I)

Formation:
Regular verbs: Use würde + infinitive
- Ich würde gehen (I would go)
- Du würdest kommen (You would come)
- Er/Sie würde arbeiten (He/She would work)

Irregular verbs (common ones have special forms):
- sein → ich wäre (I would be)
- haben → ich hätte (I would have)
- können → ich könnte (I could)
- müssen → ich müsste (I would have to)
- wollen → ich wollte (I would want)
- sollen → ich sollte (I should)
- dürfen → ich dürfte (I might/could)

Common Examples:
- Wenn ich Zeit hätte, würde ich mehr lesen (If I had time, I would read more)
- Könnten Sie mir helfen? (Could you help me? - polite request)
- Das wäre schön (That would be nice)
- Ich würde gerne nach Berlin fahren (I would like to go to Berlin)
- An deiner Stelle würde ich das nicht machen (In your position, I wouldn't do that)
- Es wäre besser, wenn du früher kämest (It would be better if you came earlier)`,
            category: 'grammar'
        },
        {
            title: 'Travel and Transportation',
            content: `Essential vocabulary for traveling in German-speaking countries.

Transportation Methods:
- der Zug (train)
- der Bahnhof (train station)
- das Gleis (platform)
- das Flugzeug (airplane)
- der Flughafen (airport)
- die U-Bahn (subway/metro)
- die S-Bahn (suburban train)
- der Bus (bus)
- die Straßenbahn (tram)
- das Taxi (taxi)
- das Auto (car)
- das Fahrrad (bicycle)

Ticket and Travel Phrases:
- Wo ist der Bahnhof? (Where is the train station?)
- Wie komme ich zum Flughafen? (How do I get to the airport?)
- Eine Fahrkarte nach Berlin, bitte (A ticket to Berlin, please)
- Einmal hin und zurück (One round-trip ticket)
- Einfache Fahrt (One-way ticket)
- Wann fährt der nächste Zug? (When does the next train leave?)
- Von welchem Gleis fährt der Zug ab? (From which platform does the train leave?)
- Hat der Zug Verspätung? (Is the train delayed?)
- Ich möchte ein Taxi bestellen (I would like to order a taxi)
- Zum Hauptbahnhof, bitte (To the main station, please)

Directions:
- links (left)
- rechts (right)
- geradeaus (straight ahead)
- um die Ecke (around the corner)
- die erste/zweite Straße (the first/second street)`,
            category: 'travel'
        },
        {
            title: 'German Email Etiquette',
            content: `Professional email writing in German follows specific conventions.

Opening Salutations:
Formal (don't know the person):
- Sehr geehrte Frau [Last Name] (Dear Ms. [Last Name])
- Sehr geehrter Herr [Last Name] (Dear Mr. [Last Name])
- Sehr geehrte Damen und Herren (Dear Sir or Madam)

Semi-Formal (business acquaintance):
- Liebe Frau [Last Name] / Lieber Herr [Last Name]
- Guten Tag Frau/Herr [Last Name]

Informal (colleagues you know well):
- Hallo [First Name]
- Liebe/Lieber [First Name]

Closing Phrases:
Formal:
- Mit freundlichen Grüßen (With kind regards) - most common
- Freundliche Grüße (Kind regards)
- Hochachtungsvoll (Yours faithfully) - very formal, rarely used

Semi-Formal:
- Viele Grüße (Many regards)
- Beste Grüße (Best regards)

Informal:
- Liebe Grüße (Warm regards)
- Schöne Grüße (Nice regards)

Email Structure Example:
"Sehr geehrte Frau Schmidt,

vielen Dank für Ihre E-Mail vom 15. März.

Gerne bestätige ich unseren Termin am kommenden Montag um 10 Uhr. Ich freue mich auf unser Gespräch.

Mit freundlichen Grüßen
[Your Name]"`,
            category: 'business'
        },
        {
            title: 'Restaurant and Food Vocabulary',
            content: `Essential phrases for dining out in German.

Restaurant Basics:
- das Restaurant (restaurant)
- das Café (café)
- die Speisekarte (menu)
- die Rechnung (bill/check)
- das Trinkgeld (tip)
- der Kellner / die Kellnerin (waiter/waitress)
- die Reservierung (reservation)

Ordering Food:
- Ich hätte gerne... (I would like...)
- Ich möchte... bestellen (I would like to order...)
- Was empfehlen Sie? (What do you recommend?)
- Haben Sie vegetarische Gerichte? (Do you have vegetarian dishes?)
- Die Rechnung, bitte (The bill, please)
- Zahlen, bitte (I'd like to pay, please)
- Getrennt oder zusammen? (Separate or together?)
- Zusammen, bitte (Together, please)
- Kann ich mit Karte zahlen? (Can I pay by card?)

Meal Times:
- das Frühstück (breakfast)
- das Mittagessen (lunch)
- das Abendessen (dinner)
- der Snack / die Zwischenmahlzeit (snack)

Common Expressions:
- Guten Appetit! (Enjoy your meal!)
- Prost! / Zum Wohl! (Cheers!)
- Das schmeckt sehr gut (This tastes very good)
- Ich bin satt (I'm full)
- Die Portion war zu groß (The portion was too large)`,
            category: 'leisure'
        },
        {
            title: 'Job Interview Vocabulary',
            content: `Key phrases and vocabulary for job interviews in German.

Common Interview Questions:
- Erzählen Sie etwas über sich (Tell us something about yourself)
- Warum möchten Sie bei uns arbeiten? (Why do you want to work with us?)
- Was sind Ihre Stärken und Schwächen? (What are your strengths and weaknesses?)
- Wo sehen Sie sich in fünf Jahren? (Where do you see yourself in five years?)
- Warum haben Sie Ihre letzte Stelle verlassen? (Why did you leave your last position?)

Professional Skills:
- die Berufserfahrung (work experience)
- die Qualifikation (qualification)
- die Fähigkeit (ability/skill)
- das Team (team)
- die Führungskraft (manager/leader)
- der Kollege / die Kollegin (colleague)
- das Projekt (project)
- die Verantwortung (responsibility)

Useful Responses:
- Ich habe X Jahre Erfahrung in... (I have X years of experience in...)
- Meine Stärken sind... (My strengths are...)
- Ich bin teamfähig und flexibel (I'm a team player and flexible)
- Ich lerne schnell (I learn quickly)
- Ich arbeite gut unter Druck (I work well under pressure)
- Ich freue mich auf neue Herausforderungen (I look forward to new challenges)

Questions to Ask:
- Wie sieht ein typischer Arbeitstag aus? (What does a typical workday look like?)
- Welche Entwicklungsmöglichkeiten gibt es? (What development opportunities are there?)
- Wie groß ist das Team? (How large is the team?)`,
            category: 'business'
        },
        {
            title: 'Phone Call Etiquette',
            content: `Professional phone conversation phrases in German.

Answering the Phone:
- [Company name], [Your name], guten Tag (Company, Your name, good day)
- [Your name], guten Tag (Your name, good day)
- Hier spricht [Your name] (This is [Your name] speaking)

Making a Call:
- Guten Tag, hier ist [Your name] von [Company]
- Könnte ich bitte mit [Person] sprechen? (Could I please speak with [Person]?)
- Ich würde gerne einen Termin vereinbaren (I would like to arrange an appointment)

Common Phrases:
- Einen Moment bitte (One moment please)
- Ich verbinde Sie (I'll put you through)
- Die Leitung ist besetzt (The line is busy)
- Möchten Sie eine Nachricht hinterlassen? (Would you like to leave a message?)
- Können Sie das bitte wiederholen? (Could you please repeat that?)
- Könnten Sie bitte langsamer sprechen? (Could you speak more slowly?)
- Ich rufe später zurück (I'll call back later)
- Vielen Dank für Ihren Anruf (Thank you very much for your call)
- Auf Wiederhören (Goodbye - on the phone)

Leaving a Message:
- Ich hätte gerne eine Nachricht hinterlassen (I would like to leave a message)
- Könnten Sie ihm/ihr ausrichten, dass... (Could you tell him/her that...)
- Bitte rufen Sie mich unter folgender Nummer zurück (Please call me back at the following number)`,
            category: 'business'
        },
        {
            title: 'Small Talk Topics',
            content: `Common topics and phrases for casual conversation in German.

Weather (Always a Safe Topic):
- Wie ist das Wetter bei dir? (How's the weather where you are?)
- Es ist schönes Wetter heute (It's nice weather today)
- Es regnet / schneit (It's raining / snowing)
- Die Sonne scheint (The sun is shining)
- Es ist kalt / warm / heiß (It's cold / warm / hot)

Weekend Plans:
- Was machst du am Wochenende? (What are you doing on the weekend?)
- Ich habe nichts Besonderes vor (I don't have anything special planned)
- Ich treffe mich mit Freunden (I'm meeting with friends)
- Ich bleibe zu Hause (I'm staying at home)

Hobbies:
- Was sind deine Hobbys? (What are your hobbies?)
- Ich interessiere mich für... (I'm interested in...)
- Ich spiele gerne [Sport] (I like to play [sport])
- Ich lese gerne (I like to read)
- Ich höre gerne Musik (I like to listen to music)

Compliments and Polite Phrases:
- Das gefällt mir sehr (I like that very much)
- Gute Idee! (Good idea!)
- Das klingt interessant (That sounds interesting)
- Wie nett von Ihnen! (How nice of you!)
- Danke, gleichfalls (Thank you, likewise)`,
            category: 'leisure'
        },
        {
            title: 'B2 Grammar: Passive Voice',
            content: `Understanding and using the passive voice at B2 level.

Why Use Passive Voice:
- To emphasize the action rather than who does it
- When the actor is unknown or unimportant
- In formal or scientific writing
- In news reports

Formation:
Present: werden (conjugated) + Partizip II
- Das Auto wird repariert (The car is being repaired)
- Die Tür wird geöffnet (The door is being opened)

Past: wurde/wurden + Partizip II
- Das Auto wurde repariert (The car was repaired)
- Die Türen wurden geöffnet (The doors were opened)

Perfect: ist/sind + Partizip II + worden
- Das Auto ist repariert worden (The car has been repaired)
- Die Türen sind geöffnet worden (The doors have been opened)

With Modal Verbs:
- Das Auto muss repariert werden (The car must be repaired)
- Die Tür kann geöffnet werden (The door can be opened)
- Das Projekt sollte heute beendet werden (The project should be finished today)

Converting Active to Passive:
Active: Der Mechaniker repariert das Auto
Passive: Das Auto wird (vom Mechaniker) repariert

Note: The agent (vom Mechaniker) is often omitted in passive sentences.`,
            category: 'grammar'
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

        // Split content into chunks (simple approach - split by paragraphs)
        const chunks = chunkText(doc.content, 400); // 400 chars per chunk
        
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

    console.log('\n🎉 Knowledge base seeded successfully!');
    console.log(`📚 Total: ${knowledgeDocs.length} documents created`);
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
            // If single paragraph is too long, split it
            if (paragraph.length > maxChunkSize) {
                const sentences = paragraph.split('. ');
                let sentenceChunk = '';
                for (const sentence of sentences) {
                    if ((sentenceChunk + sentence).length <= maxChunkSize) {
                        sentenceChunk += (sentenceChunk ? '. ' : '') + sentence;
                    } else {
                        if (sentenceChunk) {
                            chunks.push(sentenceChunk.trim());
                        }
                        sentenceChunk = sentence;
                    }
                }
                if (sentenceChunk) {
                    chunks.push(sentenceChunk.trim());
                }
                currentChunk = '';
            } else {
                currentChunk = paragraph;
            }
        }
    }
    
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }
    
    return chunks;
}

seedKnowledge()
    .catch((e) => {
        console.error('❌ Error seeding knowledge base:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });