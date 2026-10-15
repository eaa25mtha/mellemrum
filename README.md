Mellemrum er en React-prototype for en lokal kultur- og eventplatform. Projektet er startpunktet for Case 1 i Product Optimization.

Den primære målgruppe er personer, der ønsker en enkel vej til at opdage og tilmelde sig lokale kulturoplevelser i Aarhus. Arrangører er en sekundær målgruppe, som bruger platformen til at dele events og få overblik over tilmeldinger.

Forbedringer:

1. Robusthed og fejlhåndtering
   Centraliseret Supabase-kald i supabaseService.js og gjort tilmeldingsflowet funktionelt.
   Tilføjet loading-, error- og empty-states samt feedback ved tilmelding.

2. Datamodel og Supabase
   Opdateret databasen med relationer mellem events, tilmeldinger og brugere.
   Fjernet behovet for duplikerede eventdata og gjort datahåndteringen mere overskuelig.

3. Login og brugerroller
   Implementeret Supabase authentication med login, logout og session-håndtering.
   Oprettet bruger- og arrangørroller med forskellige navigationsmuligheder.

   test de to brugere ved at logge ind med:
   - almen bruger: testbruger@supabase.com, test1test
   - arrangør: testorganizer@supabase.com, test2test

4. GDPR og adgangskontrol
   Brugere kan se egne tilmeldinger, mens arrangører får et samlet overblik.
   Tilføjet rollebaseret visning og adgangskontrol i React, dog uden RLS.

5. Accessibility og semantik
   Forbedret HTML-semantik med korrekte headings og tabeller.
   Optimeret formularer, tastaturnavigation, fokusmarkeringer og fejlbeskeder.

6. UX og navigation
   Gjort hele eventkortet klikbart og tilføjet automatisk scroll til toppen ved sideskift.
   Forbedret login/logout-flow, dynamiske sidetitler og 404-siden.

7. Performance
   Optimeret billedstørrelser, så der ikke indlæses unødvendigt store billeder.
   Tilføjet lazy loading og reduceret sidens samlede datamængde.

8. CSS og vedligeholdelse
   Struktureret CSS med tydelige sektioner og kommentarer frem for unødvendig opdeling.
   Ryddet op i styling, typografi og overflødige CSS-regler.

9. Kodestruktur og kvalitet
   Opdelt funktionalitet i relevante komponenter, sider og servicefiler.
   Reduceret gentagelser uden at overkomplicere arkitekturen.
