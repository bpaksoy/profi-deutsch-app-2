import React from 'react';

export default function DatenschutzPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-primary">Datenschutzerklärung</h1>

            <div className="space-y-6 text-text-light dark:text-text-dark">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">1. Datenschutz auf einen Blick</h2>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Allgemeine Hinweise</h3>
                    <p className="mb-4">
                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                        passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                        persönlich identifiziert werden können.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Datenerfassung auf dieser Website</h3>
                    <p className="mb-4">
                        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                        können Sie dem Impressum dieser Website entnehmen.
                    </p>

                    <p className="mb-4">
                        <strong>Wie erfassen wir Ihre Daten?</strong><br />
                        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                        um Daten handeln, die Sie in ein Kontaktformular eingeben.
                    </p>

                    <p className="mb-4">
                        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                        IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                        Uhrzeit des Seitenaufrufs).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">2. Hosting</h2>
                    <p className="mb-4">
                        Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                    </p>
                    <p className="mb-4">
                        <strong>Externer Hosting-Anbieter</strong><br />
                        Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                        werden auf den Servern des Hosters / der Hoster gespeichert.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">3. Allgemeine Hinweise und Pflichtinformationen</h2>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Datenschutz</h3>
                    <p className="mb-4">
                        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                        personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                        dieser Datenschutzerklärung.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Hinweis zur verantwortlichen Stelle</h3>
                    <p className="mb-4">
                        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
                        [Siehe Impressum]
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Speicherdauer</h3>
                    <p className="mb-4">
                        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                        Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                    <p className="mb-4">
                        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                        bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                        Datenverarbeitung bleibt vom Widerruf unberührt.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">4. Datenerfassung auf dieser Website</h2>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Cookies</h3>
                    <p className="mb-4">
                        Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf
                        Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                        (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Server-Log-Dateien</h3>
                    <p className="mb-4">
                        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                        die Ihr Browser automatisch an uns übermittelt. Dies sind:
                    </p>
                    <ul className="list-disc list-inside mb-4 ml-4">
                        <li>Browsertyp und Browserversion</li>
                        <li>verwendetes Betriebssystem</li>
                        <li>Referrer URL</li>
                        <li>Hostname des zugreifenden Rechners</li>
                        <li>Uhrzeit der Serveranfrage</li>
                        <li>IP-Adresse</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">5. Ihre Rechte</h2>
                    <p className="mb-4">
                        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
                        deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder
                        Löschung dieser Daten.
                    </p>
                </section>

                <section className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
                    </p>
                </section>
            </div>
        </div>
    );
}
