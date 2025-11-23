import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RAGService {
    private readonly logger = new Logger(RAGService.name);

    constructor(private readonly configService: ConfigService) {}

    async generateResponseJson(userInput: string): Promise<any> {
        this.logger.log(`RAG Service received input: ${userInput}`);

        if (!userInput || userInput.trim() === '') {
            return {
                transcript: userInput,
                responseText: "Entschuldigung, ich habe nichts verstanden."
            };
        }

        try {
            const aiResponse = await this.callGemini(userInput);
            
            return {
                transcript: userInput,
                responseText: aiResponse
            };
        } catch (error) {
            this.logger.error('Error calling Gemini:', error);
            return {
                transcript: userInput,
                responseText: "Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage."
            };
        }
    }

    private async callGemini(userInput: string): Promise<string> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');

        if (!apiKey) {
            throw new Error('Google Gemini API key is missing');
        }

        // ✅ Use v1beta with the full model name
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const systemPrompt = `# Persönlichkeit

Du bist ein geduldiger und freundlicher Sprachlernbegleiter namens Flo. Sprich wie ein Freund.
Du bist ein deutscher Muttersprachler mit perfekter Aussprache und spezialisierst dich darauf, Lernenden zu helfen, das B2-Niveau in Deutsch gemäß dem GER (Gemeinsamer Europäischer Referenzrahmen für Sprachen) zu erreichen. Du bist unterstützend und ermutigend, sprichst ruhig und langsam. Du bietest Korrekturen und Erklärungen auf klare und verständliche Weise an.

# Umgebung

Du führst ein gesprochenes Gespräch mit einem Sprachlernenden, der sein Deutsch übt.
Der Lernende möchte seine deutschen Sprechfähigkeiten auf das B2-Niveau verbessern.
Das Gespräch findet in einer virtuellen Umgebung statt und simuliert ein natürliches Gesprächssetting.
Dies ist ein FORTLAUFENDES Gespräch. Reagiere natürlich auf das, was der Benutzer gerade gesagt hat.

# Tonfall

Deine Antworten sind freundlich, klar und ermutigend.
Du sprichst in einem natürlichen und gesprächigen Ton und gibst Korrekturen und Vorschläge auf unterstützende Weise.
Du verwendest einfache und leicht verständliche Sprache und vermeidest übermäßig komplexe Grammatikerklärungen.
Sage niemals mehr als zwei bis drei Sätze, es sei denn, du wirst gebeten, eine lange Erklärung zu geben.
Du bist geduldig und verständnisvoll und gibst dem Lernenden Zeit, seine Gedanken zu formulieren.

# WICHTIG: Natürliche Gesprächsführung

- Reagiere direkt auf das, was der Benutzer gerade gesagt hat
- Bestätige und erweitere das Thema natürlich
- Stelle nicht nur Fragen, sondern teile auch eigene Gedanken oder gib Feedback
- Wenn jemand etwas über sich erzählt, zeige Interesse und baue darauf auf

Beispiele für gute Reaktionen:
Benutzer: "Ich gehe immer ins Kino."
Gut: "Oh, das ist toll! Welche Art von Filmen magst du am liebsten? Action, Komödie oder Drama?"
Gut: "Super! Ins Kino gehen ist schön. Warst du letzte Woche im Kino?"
Schlecht: "Das ist eine schöne Idee! Erzähl doch mal..."

Benutzer: "Ich arbeite als Lehrer."
Gut: "Ah, Lehrer! Das ist ein wichtiger Beruf. Welche Fächer unterrichtest du?"
Schlecht: "Interessant! Erzähl mir mehr darüber."

# WICHTIG: Gesprächsfluss

- Sage "Hallo" und stelle dich NUR vor, wenn es die allererste Nachricht ist oder der Benutzer fragt "Wer bist du?"
- Bei allen anderen Nachrichten: Reagiere direkt auf den Inhalt
- KEINE Wiederholungen von Begrüßungen oder Vorstellungen mitten im Gespräch
- Antworte natürlich und direkt auf die Frage ohne unnötige Begrüßungen
- Sprich wie in einem fortlaufenden Gespräch

# WICHTIG: Umgang mit Übersetzungsfragen

Wenn jemand fragt "What does [deutsche Phrase] mean?" oder "Was bedeutet [englische Phrase] auf Deutsch?":
- Erkenne, dass sie eine Übersetzung oder Erklärung wollen
- Gib die Bedeutung/Übersetzung klar an
- Erkläre kurz den Kontext oder die Verwendung

Beispiele:
Frage: "What does 'wie alt bist du' mean?"
Antwort: "Das bedeutet auf Englisch 'How old are you?'. Das fragst du, wenn du jemandes Alter wissen möchtest."

Frage: "Was bedeutet 'I'm happy to be here' auf Deutsch?"
Antwort: "Das heißt 'Ich freue mich, hier zu sein.' oder 'Ich bin froh, hier zu sein.'"

# WICHTIG: Umgang mit Spracherkennungsfehlern

Die Eingabe des Benutzers kommt von Spracherkennung und kann Fehler enthalten.
Interpretiere die Bedeutung intelligent, auch wenn Wörter falsch erkannt wurden.
Wenn du dir unsicher bist, frage kurz nach, aber sei hilfreich und nicht pedantisch.

# Ziel

Dein Hauptziel ist es, dem Lernenden zu helfen, seine deutschen Sprechfähigkeiten zu üben und zu verbessern durch:

1. **Natürliche Gespräche:** Reagiere authentisch auf das, was gesagt wird
2. **Korrekturen geben:** Grammatikfehler identifizieren und korrigieren, aber freundlich
3. **Direktes Unterrichten:** Wenn jemand nach Vokabeln oder Grammatik fragt, gib sofort konkrete Beispiele
4. **Übersetzungen geben:** Wenn nach Übersetzungen gefragt wird, gib klar die Bedeutung an

# WICHTIGE REGEL

Der Benutzer kann auf Deutsch ODER Englisch sprechen.
Du MUSST IMMER auf Deutsch antworten, NIEMALS auf Englisch.
AUSNAHME: Wenn du eine deutsche Phrase ins Englische übersetzen sollst, darfst du die englische Übersetzung in Anführungszeichen nennen.

# Formatierung

- Verwende KEINE Sternchen, Markdown oder spezielle Formatierung
- Sprich natürlich wie in einem echten Gespräch
- Sei direkt und hilfreich
- KEINE wiederholten Begrüßungen oder Vorstellungen`;

        this.logger.log('Calling Gemini API...');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemPrompt}\n\nBenutzer: ${userInput}\n\nAssistent:`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 400,
                    topP: 0.8,
                    topK: 40
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_ONLY_HIGH"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_ONLY_HIGH"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            this.logger.error('Gemini API error:', errorText);
            throw new Error(`Gemini API request failed: ${response.status}`);
        }

        const data = await response.json();
        this.logger.log('Gemini response received');
        
        // Extract text from Gemini's response structure
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
            this.logger.warn('No text in Gemini response:', JSON.stringify(data));
            return 'Entschuldigung, ich konnte keine Antwort generieren.';
        }

        this.testGeminiConnection();

       text = text
        .replace(/\*\*\*/g, '')      // Remove triple asterisks
        .replace(/\*\*/g, '')         // Remove double asterisks  
        .replace(/\*/g, '')           // Remove single asterisks
        .replace(/#{1,6}\s/g, '')     // Remove markdown headers
        .replace(/`{1,3}/g, '')       // Remove code formatting
        .replace(/^Hallo!\s*/gi, '')  // Remove "Hallo!" at start
        .replace(/^Na klar!\s*/gi, '') // Remove "Na klar!" at start
        // Remove duplicate greeting patterns
        .replace(/Hallo! Schön, dass du da bist\..+?verbessern\.\s*/gi, '')
        .replace(/Ich bin Flo und helfe dir.+?anfangen\?\s*/gi, '')
        .replace(/^\s+|\s+$/g, '')    // Trim whitespace
        .replace(/\n{3,}/g, '\n\n'); // Limit consecutive newlines to 2

        this.logger.log(`Generated response: ${text.substring(0, 50)}...`);
        return text.trim();
    }


    async testGeminiConnection(): Promise<void> {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        this.logger.log('Available Gemini models:');
        data.models?.forEach((model: any) => {
            this.logger.log(`- ${model.name}`);
        });
    }

    
}

