import React from 'react';

export default function ImpressumPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-primary">Impressum</h1>

            <div className="space-y-6 text-text-light dark:text-text-dark">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Angaben gemäß § 5 TMG</h2>
                    <p className="mb-2">
                        <strong>Betreiber:</strong><br />
                        [Ihr Name oder Firmenname]<br />
                        [Straße und Hausnummer]<br />
                        [PLZ und Ort]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Kontakt</h2>
                    <p>
                        <strong>Telefon:</strong> [Ihre Telefonnummer]<br />
                        <strong>E-Mail:</strong> [Ihre E-Mail-Adresse]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Umsatzsteuer-ID</h2>
                    <p>
                        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                        [Ihre USt-IdNr.]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                    <p>
                        [Name]<br />
                        [Adresse]
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Haftungsausschluss</h2>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Haftung für Inhalte</h3>
                    <p className="mb-4">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Haftung für Links</h3>
                    <p className="mb-4">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-4">Urheberrecht</h3>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                </section>
            </div>
        </div>
    );
}
