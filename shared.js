/* Shared by / and /quiz/: strings, language switching, the scoring rules and the court drawing. */
window.PB = (function(){
"use strict";

/* Original strings, one line per language. */
var T = {
en:{title:"Odd or even: where to stand in pickleball doubles",h1:"Your score tells you where to stand.",lede:"Even score: the player who started on the right is on the right. Odd: they're on the left.",settle:"Settle it",q1:"Where's the player who started on the right?",right:"On the right",left:"On the left",q2:"Their team's score?",pick:"Pick a side.",ok:"Checks out",bad:"Wrong score",must:"Has to be {need}. Try {opts}.",even:"even",odd:"odd",or:"or",see:"See it happen",callLabel:"Score call",youServe:"You serve",theyServe:"They serve",server:"server",yourRight:"your right",theirRight:"their right",aStart:"A started here",cStart:"C started here",winUs:"You win the rally",winThem:"They win the rally",watch:"Watch a game",pause:"Pause",reset:"Start over",init:"Tap who wins. Watch A.",mUs:"Your point. A and B swap.",mThem:"Their point. C and D swap.",mS1:"Server 1 lost. Partner serves. Nobody moves.",mOut:"Side out. Nobody moves.",mOver:"Game over. Tap for a new game.",mNew:"New game. You serve first, 0-0-2.",you:"You",them:"Them",isRight:"{p} is on the right",isLeft:"{p} is on the left",why:"Why",whyP:"You only swap when your team wins a point on its own serve. One point, one swap. Odd points, off your starting side.",whyNote:"The receiving team never moves.",pocket:"The pocket version",pk1:"Even: starter on the right.",pk2:"Odd: starter on the left.",pk3:"Each team, its own score.",EVEN:"EVEN",ODD:"ODD",mathT:"The proof (for nerds)",mathB:"<p>Let <i>s</i> be your team's score and <i>k</i> the number of times your team has swapped sides.</p><ol><li>Your team only scores on its own serve, and each of those points triggers exactly one swap. Nothing else triggers a swap. So <i>s</i> = <i>k</i>.</li><li>A swap σ is its own inverse: σ² = id. After <i>k</i> swaps you're at σ<sup>k</sup>(start).</li><li>So you're on your starting side ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollary:</b> if position and score parity disagree, the score is wrong. Not debatable. Wrong.</p><p class='muted'>The opponents' score and the server number (1 or 2) are irrelevant to this invariant. Please stop bringing them up. Holds for games to 11, 15, 21, and for infinitely long games, which is how this argument feels.</p>",simpleT:"The simple version (for whoever just cut you off)",simpleB:"<p>You score, you switch. That's the only time you move. 🏃</p><p>Score is 1? You moved once. You're on the other side.<br>Score is 2? You moved twice. You're back home.<br>Score is 3? Once, twice, three times. Other side again.</p><p><b>Odd = other side. Even = home.</b></p><p class='muted'>Still lost? Hold up a finger every time you switch. Count the fingers. That's your score. You've got this. Probably.</p>"},
de:{title:"Gerade oder ungerade: Wo stehst du im Pickleball-Doppel?",h1:"Euer Spielstand zeigt, wo ihr steht.",lede:"Gerader Spielstand: Wer rechts angefangen hat, steht rechts. Ungerade: links.",settle:"Streit beenden",q1:"Wo steht, wer rechts angefangen hat?",right:"Rechts",left:"Links",q2:"Spielstand dieses Teams?",pick:"Wähle eine Seite.",ok:"Stimmt",bad:"Falscher Spielstand",must:"Muss {need} sein. Vielleicht {opts}?",even:"gerade",odd:"ungerade",or:"oder",see:"So funktioniert es",callLabel:"Ansage",youServe:"Ihr schlagt auf",theyServe:"Gegner schlagen auf",server:"Aufschlag",yourRight:"eure rechte Seite",theirRight:"ihre rechte Seite",aStart:"A hat hier angefangen",cStart:"C hat hier angefangen",winUs:"Ihr gewinnt den Ballwechsel",winThem:"Gegner gewinnen den Ballwechsel",watch:"Spiel ansehen",pause:"Pause",reset:"Neu starten",init:"Tippe, wer gewinnt. Achte auf A.",mUs:"Euer Punkt. A und B tauschen.",mThem:"Punkt für die Gegner. C und D tauschen.",mS1:"Aufschlag 1 verloren. Partner schlägt auf. Niemand bewegt sich.",mOut:"Side Out. Niemand bewegt sich.",mOver:"Spiel vorbei. Tippe für ein neues Spiel.",mNew:"Neues Spiel. Ihr schlagt zuerst auf, 0-0-2.",you:"Ihr",them:"Gegner",isRight:"{p} steht rechts",isLeft:"{p} steht links",why:"Warum",whyP:"Ihr tauscht nur, wenn euer Team bei eigenem Aufschlag punktet. Ein Punkt, ein Tausch. Ungerade Punktzahl: weg von der Startseite.",whyNote:"Das annehmende Team bewegt sich nie.",pocket:"Für die Hosentasche",pk1:"Gerade: Starter rechts.",pk2:"Ungerade: Starter links.",pk3:"Jedes Team zählt für sich.",EVEN:"GERADE",ODD:"UNGER.",mathT:"Der Beweis (für Nerds)",mathB:"<p>Sei <i>s</i> euer Spielstand und <i>k</i> die Anzahl eurer Seitenwechsel.</p><ol><li>Ihr punktet nur bei eigenem Aufschlag, und jeder dieser Punkte löst genau einen Wechsel aus. Sonst nichts. Also <i>s</i> = <i>k</i>.</li><li>Ein Wechsel σ ist selbstinvers: σ² = id. Nach <i>k</i> Wechseln steht ihr bei σ<sup>k</sup>(Start).</li><li>Also: Startseite ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Korollar:</b> Passen Position und Parität nicht zusammen, ist der Spielstand falsch. Nicht diskutabel. Falsch.</p><p class='muted'>Der Spielstand der Gegner und die Aufschlagnummer (1 oder 2) spielen für diese Invariante keine Rolle. Bitte hört auf, damit anzufangen. Gilt für Spiele bis 11, 15, 21 und für unendlich lange Spiele, also gefühlt für diese Diskussion.</p>",simpleT:"Die einfache Version (für die Person, die dich gerade unterbrochen hat)",simpleB:"<p>Ihr macht einen Punkt, ihr tauscht. Nur dann bewegt ihr euch. 🏃</p><p>Spielstand 1? Einmal getauscht. Ihr steht auf der anderen Seite.<br>Spielstand 2? Zweimal getauscht. Wieder zu Hause.<br>Spielstand 3? Eins, zwei, drei. Wieder drüben.</p><p><b>Ungerade = andere Seite. Gerade = zu Hause.</b></p><p class='muted'>Immer noch verloren? Bei jedem Wechsel einen Finger hoch. Finger zählen. Das ist der Spielstand. Du schaffst das. Wahrscheinlich.</p>"},
fr:{title:"Pair ou impair : où se placer au pickleball en double",h1:"Votre score vous dit où vous placer.",lede:"Score pair : le joueur qui a commencé à droite est à droite. Impair : à gauche.",settle:"Trancher le débat",q1:"Où est le joueur qui a commencé à droite ?",right:"À droite",left:"À gauche",q2:"Score de son équipe ?",pick:"Choisissez un côté.",ok:"C'est juste",bad:"Score faux",must:"Il doit être {need}. Essayez {opts}.",even:"pair",odd:"impair",or:"ou",see:"En action",callLabel:"Annonce du score",youServe:"Vous servez",theyServe:"Ils servent",server:"serveur",yourRight:"votre droite",theirRight:"leur droite",aStart:"A a commencé ici",cStart:"C a commencé ici",winUs:"Vous gagnez l'échange",winThem:"Ils gagnent l'échange",watch:"Voir une partie",pause:"Pause",reset:"Recommencer",init:"Touchez qui gagne. Regardez A.",mUs:"Votre point. A et B changent de côté.",mThem:"Leur point. C et D changent de côté.",mS1:"Le serveur 1 perd. Son partenaire sert. Personne ne bouge.",mOut:"Changement de service. Personne ne bouge.",mOver:"Partie terminée. Touchez pour rejouer.",mNew:"Nouvelle partie. Vous servez en premier, 0-0-2.",you:"Vous",them:"Eux",isRight:"{p} est à droite",isLeft:"{p} est à gauche",why:"Pourquoi",whyP:"Vous ne changez de côté que lorsque votre équipe marque sur son propre service. Un point, un changement. Score impair : hors de votre côté de départ.",whyNote:"L'équipe qui reçoit ne bouge jamais.",pocket:"Version de poche",pk1:"Pair : joueur de départ à droite.",pk2:"Impair : joueur de départ à gauche.",pk3:"Chaque équipe, son propre score.",EVEN:"PAIR",ODD:"IMPAIR",mathT:"La preuve (pour les matheux)",mathB:"<p>Soit <i>s</i> le score de votre équipe et <i>k</i> le nombre de changements de côté.</p><ol><li>Votre équipe ne marque que sur son propre service, et chacun de ces points provoque exactement un changement. Rien d'autre. Donc <i>s</i> = <i>k</i>.</li><li>Un changement σ est son propre inverse : σ² = id. Après <i>k</i> changements, vous êtes en σ<sup>k</sup>(départ).</li><li>Donc côté de départ ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollaire :</b> si position et parité ne concordent pas, le score est faux. Pas discutable. Faux.</p><p class='muted'>Le score adverse et le numéro du serveur (1 ou 2) ne jouent aucun rôle dans cet invariant. Merci d'arrêter d'en parler. Valable pour les parties en 11, 15, 21, et pour les parties infinies, ce qui ressemble beaucoup à ce débat.</p>",simpleT:"La version simple (pour celui qui vient de vous couper la parole)",simpleB:"<p>Vous marquez, vous changez de côté. C'est le seul moment où vous bougez. 🏃</p><p>Score 1 ? Un changement. Vous êtes de l'autre côté.<br>Score 2 ? Deux changements. Retour à la maison.<br>Score 3 ? Un, deux, trois. De nouveau en face.</p><p><b>Impair = autre côté. Pair = maison.</b></p><p class='muted'>Toujours perdu ? Levez un doigt à chaque changement. Comptez les doigts. C'est votre score. Vous allez y arriver. Sans doute.</p>"},
it:{title:"Pari o dispari: dove stare nel pickleball in doppio",h1:"Il vostro punteggio vi dice dove stare.",lede:"Punteggio pari: chi ha iniziato a destra è a destra. Dispari: a sinistra.",settle:"Chiudi la discussione",q1:"Dov'è il giocatore che ha iniziato a destra?",right:"A destra",left:"A sinistra",q2:"Punteggio della sua squadra?",pick:"Scegli un lato.",ok:"Corretto",bad:"Punteggio sbagliato",must:"Deve essere {need}. Prova {opts}.",even:"pari",odd:"dispari",or:"o",see:"Guardalo in azione",callLabel:"Chiamata del punteggio",youServe:"Servite voi",theyServe:"Servono loro",server:"battitore",yourRight:"la vostra destra",theirRight:"la loro destra",aStart:"A ha iniziato qui",cStart:"C ha iniziato qui",winUs:"Vincete lo scambio",winThem:"Vincono lo scambio",watch:"Guarda una partita",pause:"Pausa",reset:"Ricomincia",init:"Tocca chi vince. Guarda A.",mUs:"Punto vostro. A e B si scambiano.",mThem:"Punto loro. C e D si scambiano.",mS1:"Il battitore 1 perde. Serve il compagno. Nessuno si muove.",mOut:"Cambio servizio. Nessuno si muove.",mOver:"Partita finita. Tocca per ricominciare.",mNew:"Nuova partita. Servite per primi, 0-0-2.",you:"Voi",them:"Loro",isRight:"{p} è a destra",isLeft:"{p} è a sinistra",why:"Perché",whyP:"Vi scambiate solo quando la vostra squadra fa punto sul proprio servizio. Un punto, uno scambio. Punteggio dispari: fuori dal lato di partenza.",whyNote:"La squadra in risposta non si muove mai.",pocket:"Versione tascabile",pk1:"Pari: chi ha iniziato è a destra.",pk2:"Dispari: è a sinistra.",pk3:"Ogni squadra, il suo punteggio.",EVEN:"PARI",ODD:"DISPARI",mathT:"La dimostrazione (per i secchioni)",mathB:"<p>Sia <i>s</i> il punteggio della vostra squadra e <i>k</i> il numero di cambi di lato.</p><ol><li>Fate punto solo sul vostro servizio, e ognuno di quei punti causa esattamente un cambio. Nient'altro. Quindi <i>s</i> = <i>k</i>.</li><li>Un cambio σ è l'inverso di sé stesso: σ² = id. Dopo <i>k</i> cambi siete in σ<sup>k</sup>(partenza).</li><li>Quindi lato di partenza ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollario:</b> se posizione e parità non coincidono, il punteggio è sbagliato. Non discutibile. Sbagliato.</p><p class='muted'>Il punteggio avversario e il numero del battitore (1 o 2) non c'entrano con questo invariante. Smettetela di tirarli in ballo. Vale per partite a 11, 15, 21 e per partite infinite, come sembra questa discussione.</p>",simpleT:"La versione semplice (per chi ti ha appena interrotto)",simpleB:"<p>Fate punto, cambiate lato. È l'unico momento in cui vi muovete. 🏃</p><p>Punteggio 1? Un cambio. Siete dall'altra parte.<br>Punteggio 2? Due cambi. Di nuovo a casa.<br>Punteggio 3? Uno, due, tre. Di nuovo dall'altra parte.</p><p><b>Dispari = altro lato. Pari = casa.</b></p><p class='muted'>Ancora persi? Alzate un dito a ogni cambio. Contate le dita. Quello è il punteggio. Ce la potete fare. Forse.</p>"},
rm:{title:"Pèr u impèr: nua star en il pickleball dubel",h1:"Voss resultat as di nua star.",lede:"Resultat pèr: tgi che ha cumenzà a dretga è a dretga. Impèr: a sanestra.",settle:"Decider la dispita",q1:"Nua è il giugader che ha cumenzà a dretga?",right:"A dretga",left:"A sanestra",q2:"Resultat da sia equipa?",pick:"Tscherna ina vart.",ok:"Quai tutga",bad:"Resultat fauss",must:"Sto esser {need}. Emprova {opts}.",even:"pèr",odd:"impèr",or:"u",see:"Guarda co che funcziuna",callLabel:"Annunzia dal resultat",youServe:"Vus servis",theyServe:"Els servan",server:"servider",yourRight:"vossa dretga",theirRight:"lur dretga",aStart:"A ha cumenzà qua",cStart:"C ha cumenzà qua",winUs:"Vus gudagnais il bal",winThem:"Els gudognan il bal",watch:"Guardar ina partida",pause:"Pausa",reset:"Cumenzar da nov",init:"Tutga tgi che gudogna. Guarda A.",mUs:"Voss punct. A e B midan la vart.",mThem:"Lur punct. C e D midan la vart.",mS1:"Il servider 1 perda. Il partenari serva. Nagin na sa mova.",mOut:"Midada dal servi. Nagin na sa mova.",mOver:"Partida finida. Tutga per ina nova partida.",mNew:"Nova partida. Vus servis l'emprim, 0-0-2.",you:"Vus",them:"Els",isRight:"{p} è a dretga",isLeft:"{p} è a sanestra",why:"Pertge",whyP:"Vus midais la vart mo cura che vossa equipa fa in punct cun l'agen servi. In punct, ina midada. Resultat impèr: davent da la vart da partenza.",whyNote:"L'equipa che retschaiva na sa mova mai.",pocket:"Versiun da giaglioffa",pk1:"Pèr: il giugader da partenza a dretga.",pk2:"Impèr: a sanestra.",pk3:"Mintga equipa, ses agen resultat.",EVEN:"PÈR",ODD:"IMPÈR",mathT:"La cumprova (per ils nerds)",mathB:"<p><i>s</i> saja il resultat da vossa equipa e <i>k</i> il dumber da midadas da vart.</p><ol><li>Vossa equipa fa puncts mo cun l'agen servi, e mintga tal punct chaschuna exactamain ina midada. Nagut auter. Pia <i>s</i> = <i>k</i>.</li><li>Ina midada σ è sia atgna inversa: σ² = id. Suenter <i>k</i> midadas essas vus en σ<sup>k</sup>(partenza).</li><li>Pia vart da partenza ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Consequenza:</b> sche posiziun e paritad na correspundan betg, è il resultat fauss. Betg discutabel. Fauss.</p><p class='muted'>Il resultat da l'adversari ed il numer dal servider (1 u 2) n'han nagina rolla per questa invarianta. Smettai per plaschair da discurrer da quai. Vala per partidas fin 11, 15, 21 e per partidas infinitas, sco quai che questa dispita para.</p>",simpleT:"La versiun simpla (per quel che ta ha gist interrut)",simpleB:"<p>Vus faschais in punct, vus midais la vart. Mo lura as movais vus. 🏃</p><p>Resultat 1? Ina midada. Vus essas da l'autra vart.<br>Resultat 2? Duas midadas. Puspè a chasa.<br>Resultat 3? Ina, duas, trais. Puspè visavi.</p><p><b>Impèr = autra vart. Pèr = a chasa.</b></p><p class='muted'>Anc adina pers? Auzai in det a mintga midada. Dumbrai ils dets. Quai è voss resultat. Vus faschais quai. Probablamain.</p>"}
};

/* Strings added with the quiz. One key per line so they stay easy to diff and fix. */
var EXTRA = {
en:{
  toQuiz:"Test yourself: scoring quiz →",
  qTitle:"Pickleball doubles scoring quiz",
  qH1:"Scoring quiz",
  qBack:"← Odd or even",
  next:"Next",
  qRight:"Right.",
  qWrong:"Not quite.",
  qScore:"{r} of {n} right",
  qStreak:"streak {n}",
  topic:"Practise one topic",
  tAll:"Everything",
  tPoints:"Points",
  tCall:"The call",
  tServe:"Serving",
  tSides:"Sides",
  sitScores:"You {us} · Them {them}",
  sitFirst:"First serve of the game",
  yes:"Yes",
  no:"No",
  pWinUs:"You win the rally. What happens?",
  pWinThem:"They win the rally. What happens?",
  oPtUs:"Point for you",
  oPtThem:"Point for them",
  oSecond:"No point. {p} serves.",
  oOut:"No point. Side out.",
  pCall:"What's the call?",
  pNextUs:"You win the rally. What's the next call?",
  pNextThem:"They win the rally. What's the next call?",
  pWhoUs:"You win the rally. Who serves next?",
  pWhoThem:"They win the rally. Who serves next?",
  pRecv:"{p} is serving. Who receives?",
  pWhereUs:"Your team has {n}. {p} started on the right. Where is {p} now?",
  pWhereThem:"Their team has {n}. {p} started on the right. Where is {p} now?",
  pImpUs:"{p} started on the right. Which score is impossible for your team?",
  pImpThem:"{p} started on the right. Which score is impossible for their team?",
  pOver:"Is the game over?",
  xPoint:"Only the serving team scores. The server switches sides with their partner and serves again.",
  xSecond:"The receiving team never scores. Server 1 lost, so the partner serves. Nobody moves.",
  xOut:"The receiving team never scores. Server 2 lost, so the other team serves. Nobody moves.",
  xFirst:"The first serving team gets only one server (the 2 in 0-0-2), so it's a side out right away.",
  xNow:"New call: {call}.",
  xCall:"Serving team's score first, then the receivers', then the server number: {call}.",
  xStartCall:"The first serving team gets only one server, so every game starts on server 2: 0-0-2.",
  xSame:"Point for the serving team. {p} keeps serving, from the other side.",
  xPartner:"Server 1 lost the rally, so the partner serves next: {p}.",
  xOutHead:"Side out.",
  xRight:"Whoever is on the right serves first: {p}.",
  xDiag:"The serve always goes diagonally. {p} is in the diagonal box.",
  xEven:"{n} is even, so {p} is on the starting side: the right.",
  xOdd:"{n} is odd, so {p} is on the other side: the left.",
  xImpOdd:"{p} is off the starting side, so the score has to be odd. {n} is even.",
  xImpEven:"{p} is on the starting side, so the score has to be even. {n} is odd.",
  xOverYes:"Yes. Someone has 11 or more and leads by 2.",
  xOverNo11:"No. Nobody has 11 yet.",
  xOverNo2:"No. You have to win by 2.",
  rulesT:"The rules in six lines",
  rulesB:"<ol><li>Only the serving team can score.</li><li>Win the rally on your serve: one point. The server switches sides with their partner and serves again.</li><li>Lose the rally on your serve: no point. If server 1 lost, the partner serves. If server 2 lost, the other team serves (side out).</li><li>After a side out, whoever is on the right serves first. Every serve goes diagonally.</li><li>The call is three numbers: serving team's score, receiving team's score, server number. The game starts at 0-0-2 because the first team gets only one server.</li><li>Games go to 11. Win by 2.</li></ol>"
},
de:{
  toQuiz:"Teste dich: Quiz zur Zählweise →",
  qTitle:"Quiz zur Zählweise im Pickleball-Doppel",
  qH1:"Quiz zur Zählweise",
  qBack:"← Erklärung",
  next:"Weiter",
  qRight:"Richtig.",
  qWrong:"Nicht ganz.",
  qScore:"{r} von {n} richtig",
  qStreak:"Serie {n}",
  topic:"Ein Thema üben",
  tAll:"Alles",
  tPoints:"Punkte",
  tCall:"Die Ansage",
  tServe:"Aufschlag",
  tSides:"Seiten",
  sitScores:"Ihr {us} · Gegner {them}",
  sitFirst:"Erster Aufschlag des Spiels",
  yes:"Ja",
  no:"Nein",
  pWinUs:"Ihr gewinnt den Ballwechsel. Was passiert?",
  pWinThem:"Die Gegner gewinnen den Ballwechsel. Was passiert?",
  oPtUs:"Punkt für euch",
  oPtThem:"Punkt für die Gegner",
  oSecond:"Kein Punkt. {p} schlägt auf.",
  oOut:"Kein Punkt. Side Out.",
  pCall:"Wie lautet die Ansage?",
  pNextUs:"Ihr gewinnt den Ballwechsel. Wie lautet die nächste Ansage?",
  pNextThem:"Die Gegner gewinnen den Ballwechsel. Wie lautet die nächste Ansage?",
  pWhoUs:"Ihr gewinnt den Ballwechsel. Wer schlägt als Nächstes auf?",
  pWhoThem:"Die Gegner gewinnen den Ballwechsel. Wer schlägt als Nächstes auf?",
  pRecv:"{p} schlägt auf. Wer nimmt an?",
  pWhereUs:"Euer Team hat {n}. {p} hat rechts angefangen. Wo steht {p} jetzt?",
  pWhereThem:"Die Gegner haben {n}. {p} hat rechts angefangen. Wo steht {p} jetzt?",
  pImpUs:"{p} hat rechts angefangen. Welcher Spielstand ist für euer Team unmöglich?",
  pImpThem:"{p} hat rechts angefangen. Welcher Spielstand ist für die Gegner unmöglich?",
  pOver:"Ist das Spiel vorbei?",
  xPoint:"Nur das aufschlagende Team punktet. Wer aufschlägt, tauscht mit dem Partner die Seite und schlägt wieder auf.",
  xSecond:"Das annehmende Team punktet nie. Aufschlag 1 verloren, also schlägt der Partner auf. Niemand bewegt sich.",
  xOut:"Das annehmende Team punktet nie. Aufschlag 2 verloren, also schlägt das andere Team auf. Niemand bewegt sich.",
  xFirst:"Das Team, das zuerst aufschlägt, hat nur einen Aufschlag (die 2 in 0-0-2). Also sofort Side Out.",
  xNow:"Neue Ansage: {call}.",
  xCall:"Erst der Spielstand des aufschlagenden Teams, dann der des annehmenden, dann die Aufschlagnummer: {call}.",
  xStartCall:"Das Team, das zuerst aufschlägt, hat nur einen Aufschlag. Deshalb beginnt jedes Spiel mit Aufschlag 2: 0-0-2.",
  xSame:"Punkt für das aufschlagende Team. {p} schlägt weiter auf, jetzt von der anderen Seite.",
  xPartner:"Aufschlag 1 verloren, also schlägt jetzt der Partner auf: {p}.",
  xOutHead:"Side Out.",
  xRight:"Wer rechts steht, schlägt zuerst auf: {p}.",
  xDiag:"Der Aufschlag geht immer diagonal. {p} steht im diagonalen Feld.",
  xEven:"{n} ist gerade, also steht {p} auf der Startseite: rechts.",
  xOdd:"{n} ist ungerade, also steht {p} auf der anderen Seite: links.",
  xImpOdd:"{p} steht nicht auf der Startseite, also muss der Spielstand ungerade sein. {n} ist gerade.",
  xImpEven:"{p} steht auf der Startseite, also muss der Spielstand gerade sein. {n} ist ungerade.",
  xOverYes:"Ja. Ein Team hat mindestens 11 und zwei Punkte Vorsprung.",
  xOverNo11:"Nein. Noch hat niemand 11.",
  xOverNo2:"Nein. Man braucht zwei Punkte Vorsprung.",
  rulesT:"Die Regeln in sechs Zeilen",
  rulesB:"<ol><li>Nur das aufschlagende Team kann punkten.</li><li>Ballwechsel bei eigenem Aufschlag gewonnen: ein Punkt. Wer aufschlägt, tauscht mit dem Partner die Seite und schlägt wieder auf.</li><li>Ballwechsel bei eigenem Aufschlag verloren: kein Punkt. Nach Aufschlag 1 schlägt der Partner auf. Nach Aufschlag 2 schlägt das andere Team auf (Side Out).</li><li>Nach einem Side Out schlägt zuerst auf, wer rechts steht. Jeder Aufschlag geht diagonal.</li><li>Die Ansage besteht aus drei Zahlen: Spielstand des aufschlagenden Teams, Spielstand des annehmenden Teams, Aufschlagnummer. Das Spiel beginnt bei 0-0-2, weil das erste Team nur einen Aufschlag hat.</li><li>Gespielt wird bis 11, mit zwei Punkten Vorsprung.</li></ol>"
},
fr:{
  toQuiz:"Testez-vous : le quiz du score →",
  qTitle:"Quiz : compter les points au pickleball en double",
  qH1:"Quiz du score",
  qBack:"← Explication",
  next:"Suivant",
  qRight:"Exact.",
  qWrong:"Pas tout à fait.",
  qScore:"{r} sur {n}",
  qStreak:"série de {n}",
  topic:"Travailler un thème",
  tAll:"Tout",
  tPoints:"Points",
  tCall:"L'annonce",
  tServe:"Service",
  tSides:"Côtés",
  sitScores:"Vous {us} · Eux {them}",
  sitFirst:"Premier service de la partie",
  yes:"Oui",
  no:"Non",
  pWinUs:"Vous gagnez l'échange. Que se passe-t-il ?",
  pWinThem:"Ils gagnent l'échange. Que se passe-t-il ?",
  oPtUs:"Point pour vous",
  oPtThem:"Point pour eux",
  oSecond:"Pas de point. {p} sert.",
  oOut:"Pas de point. Changement de service.",
  pCall:"Quelle est l'annonce ?",
  pNextUs:"Vous gagnez l'échange. Quelle est la prochaine annonce ?",
  pNextThem:"Ils gagnent l'échange. Quelle est la prochaine annonce ?",
  pWhoUs:"Vous gagnez l'échange. Qui sert ensuite ?",
  pWhoThem:"Ils gagnent l'échange. Qui sert ensuite ?",
  pRecv:"{p} sert. Qui reçoit ?",
  pWhereUs:"Votre équipe a {n}. {p} a commencé à droite. Où est {p} maintenant ?",
  pWhereThem:"Leur équipe a {n}. {p} a commencé à droite. Où est {p} maintenant ?",
  pImpUs:"{p} a commencé à droite. Quel score est impossible pour votre équipe ?",
  pImpThem:"{p} a commencé à droite. Quel score est impossible pour leur équipe ?",
  pOver:"La partie est-elle terminée ?",
  xPoint:"Seule l'équipe au service marque. Le serveur change de côté avec son partenaire et sert de nouveau.",
  xSecond:"L'équipe qui reçoit ne marque jamais. Le serveur 1 a perdu, donc son partenaire sert. Personne ne bouge.",
  xOut:"L'équipe qui reçoit ne marque jamais. Le serveur 2 a perdu, donc l'autre équipe sert. Personne ne bouge.",
  xFirst:"L'équipe qui sert en premier n'a qu'un seul serveur (le 2 de 0-0-2). Le service change donc tout de suite.",
  xNow:"Nouvelle annonce : {call}.",
  xCall:"D'abord le score de l'équipe au service, puis celui de l'équipe qui reçoit, puis le numéro du serveur : {call}.",
  xStartCall:"L'équipe qui sert en premier n'a qu'un seul serveur. Chaque partie commence donc au serveur 2 : 0-0-2.",
  xSame:"Point pour l'équipe au service. {p} continue de servir, depuis l'autre côté.",
  xPartner:"Le serveur 1 a perdu l'échange, donc son partenaire sert ensuite : {p}.",
  xOutHead:"Changement de service.",
  xRight:"Le joueur placé à droite sert en premier : {p}.",
  xDiag:"Le service part toujours en diagonale. {p} est dans le carré en diagonale.",
  xEven:"{n} est pair, donc {p} est du côté de départ : à droite.",
  xOdd:"{n} est impair, donc {p} est de l'autre côté : à gauche.",
  xImpOdd:"{p} n'est pas du côté de départ, donc le score doit être impair. {n} est pair.",
  xImpEven:"{p} est du côté de départ, donc le score doit être pair. {n} est impair.",
  xOverYes:"Oui. Une équipe a au moins 11 points et deux points d'avance.",
  xOverNo11:"Non. Personne n'a encore 11 points.",
  xOverNo2:"Non. Il faut deux points d'écart.",
  rulesT:"Les règles en six lignes",
  rulesB:"<ol><li>Seule l'équipe au service peut marquer.</li><li>Échange gagné sur votre service : un point. Le serveur change de côté avec son partenaire et sert de nouveau.</li><li>Échange perdu sur votre service : pas de point. Si le serveur 1 a perdu, son partenaire sert. Si le serveur 2 a perdu, l'autre équipe sert (changement de service).</li><li>Après un changement de service, le joueur placé à droite sert en premier. Chaque service part en diagonale.</li><li>L'annonce comporte trois chiffres : score de l'équipe au service, score de l'équipe qui reçoit, numéro du serveur. La partie commence à 0-0-2, car la première équipe n'a qu'un seul serveur.</li><li>Une partie se joue en 11 points, avec deux points d'écart.</li></ol>"
},
it:{
  toQuiz:"Mettiti alla prova: quiz sul punteggio →",
  qTitle:"Quiz sul punteggio del pickleball in doppio",
  qH1:"Quiz sul punteggio",
  qBack:"← Spiegazione",
  next:"Avanti",
  qRight:"Giusto.",
  qWrong:"Non proprio.",
  qScore:"{r} su {n}",
  qStreak:"serie di {n}",
  topic:"Allenati su un argomento",
  tAll:"Tutto",
  tPoints:"Punti",
  tCall:"La chiamata",
  tServe:"Servizio",
  tSides:"Lati",
  sitScores:"Voi {us} · Loro {them}",
  sitFirst:"Primo servizio della partita",
  yes:"Sì",
  no:"No",
  pWinUs:"Vincete lo scambio. Cosa succede?",
  pWinThem:"Vincono lo scambio. Cosa succede?",
  oPtUs:"Punto per voi",
  oPtThem:"Punto per loro",
  oSecond:"Nessun punto. Serve {p}.",
  oOut:"Nessun punto. Cambio servizio.",
  pCall:"Qual è la chiamata?",
  pNextUs:"Vincete lo scambio. Qual è la prossima chiamata?",
  pNextThem:"Vincono lo scambio. Qual è la prossima chiamata?",
  pWhoUs:"Vincete lo scambio. Chi serve adesso?",
  pWhoThem:"Vincono lo scambio. Chi serve adesso?",
  pRecv:"Serve {p}. Chi risponde?",
  pWhereUs:"La vostra squadra ha {n}. {p} ha iniziato a destra. Dov'è {p} adesso?",
  pWhereThem:"La loro squadra ha {n}. {p} ha iniziato a destra. Dov'è {p} adesso?",
  pImpUs:"{p} ha iniziato a destra. Quale punteggio è impossibile per la vostra squadra?",
  pImpThem:"{p} ha iniziato a destra. Quale punteggio è impossibile per la loro squadra?",
  pOver:"La partita è finita?",
  xPoint:"Fa punto solo la squadra al servizio. Chi serve cambia lato con il compagno e serve di nuovo.",
  xSecond:"La squadra in risposta non fa mai punto. Il battitore 1 ha perso, quindi serve il compagno. Nessuno si muove.",
  xOut:"La squadra in risposta non fa mai punto. Il battitore 2 ha perso, quindi serve l'altra squadra. Nessuno si muove.",
  xFirst:"La squadra che serve per prima ha un solo battitore (il 2 di 0-0-2). Quindi il servizio cambia subito.",
  xNow:"Nuova chiamata: {call}.",
  xCall:"Prima il punteggio di chi serve, poi quello di chi risponde, poi il numero del battitore: {call}.",
  xStartCall:"La squadra che serve per prima ha un solo battitore. Per questo ogni partita inizia dal battitore 2: 0-0-2.",
  xSame:"Punto per la squadra al servizio. {p} continua a servire, dall'altro lato.",
  xPartner:"Il battitore 1 ha perso lo scambio, quindi adesso serve il compagno: {p}.",
  xOutHead:"Cambio servizio.",
  xRight:"Serve per primo chi si trova a destra: {p}.",
  xDiag:"Il servizio va sempre in diagonale. {p} è nel riquadro in diagonale.",
  xEven:"{n} è pari, quindi {p} è sul lato di partenza: a destra.",
  xOdd:"{n} è dispari, quindi {p} è sull'altro lato: a sinistra.",
  xImpOdd:"{p} non è sul lato di partenza, quindi il punteggio deve essere dispari. {n} è pari.",
  xImpEven:"{p} è sul lato di partenza, quindi il punteggio deve essere pari. {n} è dispari.",
  xOverYes:"Sì. Una squadra ha almeno 11 punti e due di vantaggio.",
  xOverNo11:"No. Nessuno è ancora arrivato a 11.",
  xOverNo2:"No. Servono due punti di scarto.",
  rulesT:"Le regole in sei righe",
  rulesB:"<ol><li>Può fare punto solo la squadra al servizio.</li><li>Scambio vinto sul vostro servizio: un punto. Chi serve cambia lato con il compagno e serve di nuovo.</li><li>Scambio perso sul vostro servizio: nessun punto. Se ha perso il battitore 1, serve il compagno. Se ha perso il battitore 2, serve l'altra squadra (cambio servizio).</li><li>Dopo un cambio servizio, serve per primo chi si trova a destra. Ogni servizio va in diagonale.</li><li>La chiamata ha tre numeri: punteggio di chi serve, punteggio di chi risponde, numero del battitore. La partita inizia da 0-0-2 perché la prima squadra ha un solo battitore.</li><li>Si gioca a 11, con due punti di scarto.</li></ol>"
},
rm:{
  toQuiz:"Emprova il quiz dal resultat →",
  qTitle:"Quiz dal resultat: pickleball dubel",
  qH1:"Quiz dal resultat",
  qBack:"← Explicaziun",
  next:"Vinavant",
  qRight:"Correct.",
  qWrong:"Betg dal tut.",
  qScore:"{r} da {n} correct",
  qStreak:"seria da {n}",
  topic:"Trenar in tema",
  tAll:"Tut",
  tPoints:"Puncts",
  tCall:"L'annunzia",
  tServe:"Servi",
  tSides:"Varts",
  sitScores:"Vus {us} · Els {them}",
  sitFirst:"Emprim servi da la partida",
  yes:"Gea",
  no:"Na",
  pWinUs:"Vus gudagnais il bal. Tge capita?",
  pWinThem:"Els gudognan il bal. Tge capita?",
  oPtUs:"Punct per vus",
  oPtThem:"Punct per els",
  oSecond:"Nagin punct. {p} serva.",
  oOut:"Nagin punct. Midada dal servi.",
  pCall:"Co è l'annunzia?",
  pNextUs:"Vus gudagnais il bal. Co è la proxima annunzia?",
  pNextThem:"Els gudognan il bal. Co è la proxima annunzia?",
  pWhoUs:"Vus gudagnais il bal. Tgi serva sco proxim?",
  pWhoThem:"Els gudognan il bal. Tgi serva sco proxim?",
  pRecv:"{p} serva. Tgi retschaiva?",
  pWhereUs:"Vossa equipa ha {n}. {p} ha cumenzà a dretga. Nua è {p} ussa?",
  pWhereThem:"Lur equipa ha {n}. {p} ha cumenzà a dretga. Nua è {p} ussa?",
  pImpUs:"{p} ha cumenzà a dretga. Tge resultat è nunpussaivel per vossa equipa?",
  pImpThem:"{p} ha cumenzà a dretga. Tge resultat è nunpussaivel per lur equipa?",
  pOver:"È la partida finida?",
  xPoint:"Mo l'equipa che serva fa puncts. Il servider mida la vart cun ses partenari e serva danovamain.",
  xSecond:"L'equipa che retschaiva na fa mai puncts. Il servider 1 ha pers, pia serva il partenari. Nagin na sa mova.",
  xOut:"L'equipa che retschaiva na fa mai puncts. Il servider 2 ha pers, pia serva l'autra equipa. Nagin na sa mova.",
  xFirst:"L'equipa che serva l'emprim ha mo in servider (il 2 da 0-0-2). Pia mida il servi immediat.",
  xNow:"Nova annunzia: {call}.",
  xCall:"L'emprim il resultat da l'equipa che serva, lura quel da l'equipa che retschaiva, lura il numer dal servider: {call}.",
  xStartCall:"L'equipa che serva l'emprim ha mo in servider. Perquai cumenza mintga partida cun il servider 2: 0-0-2.",
  xSame:"Punct per l'equipa che serva. {p} serva vinavant, da l'autra vart.",
  xPartner:"Il servider 1 ha pers il bal, pia serva ussa il partenari: {p}.",
  xOutHead:"Midada dal servi.",
  xRight:"Tgi che stat a dretga serva l'emprim: {p}.",
  xDiag:"Il servi va adina en diagonala. {p} stat en il champ diagonal.",
  xEven:"{n} è pèr, pia è {p} da la vart da partenza: a dretga.",
  xOdd:"{n} è impèr, pia è {p} da l'autra vart: a sanestra.",
  xImpOdd:"{p} n'è betg da la vart da partenza, pia sto il resultat esser impèr. {n} è pèr.",
  xImpEven:"{p} è da la vart da partenza, pia sto il resultat esser pèr. {n} è impèr.",
  xOverYes:"Gea. Ina equipa ha almain 11 puncts e dus puncts avantatg.",
  xOverNo11:"Na. Nagin n'ha anc 11 puncts.",
  xOverNo2:"Na. I dovra dus puncts differenza.",
  rulesT:"Las reglas en sis lingias",
  rulesB:"<ol><li>Mo l'equipa che serva po far puncts.</li><li>Bal gudagnà cun l'agen servi: in punct. Il servider mida la vart cun ses partenari e serva danovamain.</li><li>Bal pers cun l'agen servi: nagin punct. Sch'il servider 1 ha pers, serva il partenari. Sch'il servider 2 ha pers, serva l'autra equipa (midada dal servi).</li><li>Suenter ina midada dal servi serva l'emprim tgi che stat a dretga. Mintga servi va en diagonala.</li><li>L'annunzia ha trais cifras: resultat da l'equipa che serva, resultat da l'equipa che retschaiva, numer dal servider. La partida cumenza cun 0-0-2, perquai che l'emprima equipa ha mo in servider.</li><li>Ins gioga fin 11, cun dus puncts differenza.</li></ol>"
}
};
Object.keys(EXTRA).forEach(function(l){ Object.keys(EXTRA[l]).forEach(function(k){ T[l][k] = EXTRA[l][k]; }); });

/* ---------- language ---------- */
var lang = "en", listeners = [];
function t(k, v){
  var s = T[lang][k] != null ? T[lang][k] : T.en[k];
  if(v){ Object.keys(v).forEach(function(x){ s = s.split("{"+x+"}").join(v[x]); }); }
  return s;
}
function each(sel, fn){ Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
function setLang(l){
  lang = T[l] ? l : "en";
  var root = document.documentElement;
  root.lang = lang;
  document.title = t(root.getAttribute("data-title") || "title");
  each("[data-i]", function(el){ el.textContent = t(el.getAttribute("data-i")); });
  each("[data-ih]", function(el){ el.innerHTML = t(el.getAttribute("data-ih")); });
  each("[data-ia]", function(el){ el.setAttribute("aria-label", t(el.getAttribute("data-ia"))); });
  each(".langs button", function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-lang")===lang); });
  /* Links between the two pages carry the language, in case storage is blocked. */
  each("a[data-keep-lang]", function(a){ a.setAttribute("href", a.getAttribute("href").split("?")[0] + "?lang=" + lang); });
  try{ localStorage.setItem("lang", lang); }catch(e){}
  try{ var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u); }catch(e){}
  listeners.forEach(function(fn){ fn(); });
}
function initLang(onChange){
  if(onChange) listeners.push(onChange);
  each(".langs button", function(b){ b.onclick = function(){ setLang(b.getAttribute("data-lang")); }; });
  var start = null;
  try{ start = new URLSearchParams(location.search).get("lang"); }catch(e){}
  if(!start){ try{ start = localStorage.getItem("lang"); }catch(e){} }
  if(!start){ start = (navigator.language || "en").slice(0,2).toLowerCase(); }
  setLang(start);
}

/* ---------- rules ---------- */
var partner = {A:"B",B:"A",C:"D",D:"C"};
var teamOf = {A:"us",B:"us",C:"them",D:"them"};
function other(team){ return team==="us" ? "them" : "us"; }
/* right: who stands on each team's right. first: still the opening service turn, which has one server only. */
function fresh(){ return { us:0, them:0, serving:"us", num:2, server:"A", right:{us:"A",them:"C"}, first:true, done:false }; }
function copy(s){ return { us:s.us, them:s.them, serving:s.serving, num:s.num, server:s.server, right:{us:s.right.us,them:s.right.them}, first:s.first, done:s.done }; }
function sideOf(s, p){ return s.right[teamOf[p]] === p ? "right" : "left"; }
function callOf(s){ return s[s.serving]+"-"+s[other(s.serving)]+"-"+s.num; }
/* One rally won by team w. Returns the new state and what happened: "point", "second" or "sideout". */
function step(s, w){
  var n = copy(s), srv = s.serving, ev;
  if(w === srv){ n[srv]++; n.right[srv] = partner[n.right[srv]]; ev = "point"; }
  else if(s.num === 1){ n.num = 2; n.server = partner[s.server]; ev = "second"; }
  else { n.serving = other(srv); n.num = 1; n.server = n.right[n.serving]; n.first = false; ev = "sideout"; }
  if((n.us>=11 || n.them>=11) && Math.abs(n.us-n.them)>=2) n.done = true;
  return { st:n, ev:ev };
}

/* ---------- court ---------- */
var POS = { us:{right:[170,244],left:[70,244]}, them:{right:[70,78],left:[170,78]} };
function startMark(team, key, labelY, colour){
  var c = POS[team].right;
  return '<g class="start" data-start="'+team+'" style="opacity:0">'+
    '<circle cx="'+c[0]+'" cy="'+c[1]+'" r="22" fill="none" stroke="'+colour+'" stroke-width="2" stroke-dasharray="4 4"/>'+
    '<text x="'+c[0]+'" y="'+labelY+'" text-anchor="middle" class="side-tag" style="fill:'+colour+';opacity:1" data-i="'+key+'"></text></g>';
}
function ghostMark(team){
  return '<g class="ghost" data-ghost="'+team+'" style="opacity:0">'+["left","right"].map(function(side){
    var c = POS[team][side];
    return '<circle cx="'+c[0]+'" cy="'+c[1]+'" r="16" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-width="2" stroke-dasharray="3 4"/>'+
      '<text x="'+c[0]+'" y="'+c[1]+'">?</text>';
  }).join("")+'</g>';
}
function player(p, fill){
  return '<g class="p" data-p="'+p+'"><circle r="16" fill="'+fill+'" stroke="#13261C"/><text fill="#13261C">'+p+'</text></g>';
}
var COURT =
  '<svg class="court" viewBox="0 0 240 320" role="img">'+
  '<rect width="240" height="320" rx="14" fill="var(--surround)"/>'+
  '<rect x="20" y="14" width="200" height="292" fill="var(--court)"/>'+
  '<rect x="20" y="130" width="200" height="60" fill="var(--kitchen)"/>'+
  '<g stroke="#fff" stroke-width="2" fill="none">'+
    '<rect x="20" y="14" width="200" height="292"/>'+
    '<line x1="20" y1="130" x2="220" y2="130"/><line x1="20" y1="190" x2="220" y2="190"/>'+
    '<line x1="120" y1="14" x2="120" y2="130"/><line x1="120" y1="190" x2="120" y2="306"/>'+
  '</g>'+
  '<line x1="10" y1="160" x2="230" y2="160" stroke="#fff" stroke-width="4"/>'+
  '<line x1="10" y1="160" x2="230" y2="160" stroke="#13261C" stroke-width="1.5" stroke-dasharray="3 3"/>'+
  '<text class="side-tag" x="213" y="300" text-anchor="end" data-i="yourRight"></text>'+
  '<text class="side-tag" x="27" y="27" data-i="theirRight"></text>'+
  startMark("us", "aStart", 279, "var(--ball)") + startMark("them", "cStart", 49, "var(--them)")+
  ghostMark("us") + ghostMark("them")+
  '<line class="aim" stroke="var(--ball)" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 8" style="opacity:0"/>'+
  '<circle class="ring" r="21" fill="none" stroke="#fff" stroke-width="3" style="opacity:0"/>'+
  player("A","var(--ball)") + player("B","#fff") + player("C","var(--them)") + player("D","#fff")+
  '<circle class="ball" r="6" fill="var(--ball)" stroke="var(--ballEdge)" stroke-width="1.5"/>'+
  '</svg>';

function place(el, xy){ el.style.transform = "translate("+xy[0]+"px,"+xy[1]+"px)"; }
/* Puts the court into `box` and returns draw(state, opts).
   opts: hide "AB" (players to hide), ghost team (show "?" on both of its spots), ball false (no server),
         start team (always show where its starter began), mark player (ring), aim [from,to] (serve path). */
function mountCourt(box){
  box.innerHTML = COURT;
  var svg = box.querySelector("svg"), ball = svg.querySelector(".ball"), ring = svg.querySelector(".ring"), aim = svg.querySelector(".aim");
  function draw(s, o){
    o = o || {};
    var hide = o.hide || "", seen = [];
    ["A","B","C","D"].forEach(function(p){
      var el = svg.querySelector('[data-p="'+p+'"]'), gone = hide.indexOf(p) >= 0;
      place(el, POS[teamOf[p]][sideOf(s, p)]);
      el.style.opacity = gone ? 0 : 1;
      if(!gone) seen.push(t(sideOf(s, p)==="right" ? "isRight" : "isLeft", {p:p}));
    });
    var sp = POS[s.serving][sideOf(s, s.server)];
    place(ball, [sp[0]+24, sp[1] + (s.serving==="us" ? -10 : 10)]);
    ball.style.opacity = o.ball === false ? 0 : 1;
    if(o.ball !== false) seen.push(t("server")+": "+s.server);
    ["us","them"].forEach(function(team){
      var starter = team==="us" ? "A" : "C";
      var away = hide.indexOf(starter) < 0 && sideOf(s, starter)==="left";
      svg.querySelector('[data-start="'+team+'"]').style.opacity = (away || o.start===team) ? 1 : 0;
      svg.querySelector('[data-ghost="'+team+'"]').style.opacity = o.ghost===team ? 1 : 0;
    });
    if(o.mark) place(ring, POS[teamOf[o.mark]][sideOf(s, o.mark)]);
    ring.style.opacity = o.mark ? 1 : 0;
    if(o.aim){
      var a = POS[teamOf[o.aim[0]]][sideOf(s, o.aim[0])], b = POS[teamOf[o.aim[1]]][sideOf(s, o.aim[1])];
      aim.setAttribute("x1", a[0]); aim.setAttribute("y1", a[1]); aim.setAttribute("x2", b[0]); aim.setAttribute("y2", b[1]);
    }
    aim.style.opacity = o.aim ? 1 : 0;
    svg.setAttribute("aria-label", seen.join(". "));
  }
  return { draw:draw };
}

return { t:t, initLang:initLang, partner:partner, teamOf:teamOf, other:other, fresh:fresh, copy:copy, sideOf:sideOf, callOf:callOf, step:step, mountCourt:mountCourt };
})();
