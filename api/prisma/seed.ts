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
            },
            {
                title: 'Nominalisieren von Verben',
                content: `Nominalisierung verwandelt Verben oder Adjektive in Nomen. 
Wichtig für gehobene Sprache (B2/C1).
- Verben: "essen" -> "das Essen". "Beim Essen nicht sprechen."
- Adjektive: "gut" -> "das Gute". "Ich glaube an das Gute im Menschen."
- Endungen: -ung, -heit, -keit, -nis.
- Beispiel: "Wir diskutieren über das Projekt." -> "Die Diskussion über das Projekt war lang."`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Nebensätze verwenden',
                content: `Nebensätze werden durch Konjunktionen eingeleitet. Das konjugierte Verb steht am ENDE.
- weil/da (Grund): "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte."
- obwohl (Gegensatz): "Ich gehe spazieren, obwohl es regnet."
- dass (Objektsatz): "Ich weiß, dass Deutsch schwer ist."
- wenn/als (Zeit): "Wenn ich Zeit habe, lese ich."`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Passiv (Vorgangspassiv & Zustandspassiv)',
                content: `Das Passiv betont die Handlung, nicht den Täter.
- Vorgangspassiv: werden + Partizip II.
  "Der Brief wird geschrieben." (Präsens)
  "Der Brief wurde geschrieben." (Präteritum)
- Zustandspassiv: sein + Partizip II.
  "Der Brief ist geschrieben." (Ergebnis ist fertig).
- Mit Modalverben: "Die Arbeit muss gemacht werden."`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Konjunktiv II (Wünsche & Höflichkeit)',
                content: `Verwendung: Irreale Wünsche, Höflichkeit, Ratschläge, Hypothesen.
- Höflichkeit: "Ich hätte gern einen Kaffee." "Könnten Sie mir helfen?"
- Ratschlag: "Du solltest mehr schlafen."
- Wunsch: "Wenn ich doch reich wäre!"
- Bildung: würde + Infinitiv (meistens) ODER Originalformen (wäre, hätte, käme, ginge).`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Syntax (Satzbau)',
                content: `Deutsche Wortstellung (Topologie):
1. Verb an Position 2 im Hauptsatz. IMMER.
2. Verb am Ende im Nebensatz.
3. TeKaMoLo (Temporal, Kausal, Modal, Lokal) für Angaben im Mittelfeld.
   "Ich fahre [heute] [wegen des Wetters] [mit dem Auto] [nach München]."
4. Inversion: Wenn der Satz mit etwas anderem als dem Subjekt beginnt, rutscht das Subjekt hinter das Verb.`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Konjugation der Verben',
                content: `Regelmäßige und unregelmäßige Verben.
- Präsens: ich gehe, du gehst, er geht.
- Präteritum: ich ging, du gingst.
- Perfekt: ich bin gegangen (Bewegung) / ich habe geschlafen.
- Achte auf Vokalwechsel bei starken Verben (sehen -> du siehst, fahren -> du fährst).`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Inversion (Subjekt-Verb-Umstellung)',
                content: `Wenn Position 1 im Satz besetzt ist (z.B. durch eine Zeitangabe), tauschen Subjekt und Verb den Platz.
- Normal: "Ich gehe heute ins Kino."
- Inversion: "Heute gehe ich ins Kino." (Verb bleibt auf Pos 2!)
- Inversion: "Vielleicht gehe ich ins Kino."
- Falsch wäre: "Heute ich gehe..." (Das ist der häufigste Fehler!).`,
                category: 'grammar',
                language: 'de'
            },
            {
                title: 'Wortschatz (Vocabulary Assessment)',
                content: `Kriterien zur Bewertung des Wortschatzes auf B2-Niveau:

Der User kann:
- Synonyme und Umschreibungen verwenden (z.B. "großartig" statt immer nur "gut")
- Etwas begründen und einen Standpunkt vertreten ("Ich bin der Meinung, dass... weil...")
- Vor- und Nachteile nennen ("Einerseits..., andererseits...")

Beispiel für SCHLECHTEN Wortschatz:
Der User wiederholt immer dieselben Worte, um etwas zu erklären.
"Das ist gut. Ich finde das gut. Das ist sehr gut für mich."

Beispiel für GUTEN Wortschatz:
"Das ist vorteilhaft. Ich halte das für sinnvoll. Das erscheint mir als eine ausgezeichnete Lösung."`,
                category: 'vocabulary',
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