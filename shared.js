/* Shared by / and /quiz/: strings, language switching, the scoring rules and the court drawing. */
window.PB = (function(){
"use strict";

/* Original strings, one line per language. */
var T = {
en:{title:"Odd or even: where to stand in pickleball doubles",h1:"Your score tells you where to stand.",lede:"Even score: the player who started on the right is on the right. Odd: they're on the left.",check:"Check a score",q1:"Where's the player who started on the right?",right:"On the right",left:"On the left",q2:"Their team's score?",pick:"Pick a side.",ok:"Checks out",bad:"Doesn't match",must:"Has to be {need}. Try {opts}.",even:"even",odd:"odd",or:"or",see:"See it happen",callLabel:"Score call",youServe:"You serve",theyServe:"They serve",server:"server",yourRight:"your right",theirRight:"their right",aStart:"A started here",cStart:"C started here",winUs:"You win the rally",winThem:"They win the rally",watch:"Watch a game",pause:"Pause",reset:"Start over",init:"Tap who wins. Watch A.",mUs:"Your point. A and B swap.",mThem:"Their point. C and D swap.",mS1:"Server 1 lost. Partner serves. Nobody moves.",mOut:"Side out. Nobody moves.",mOver:"Game over. Tap for a new game.",mNew:"New game. You serve first, 0-0-2.",you:"You",them:"Them",isRight:"{p} is on the right",isLeft:"{p} is on the left",why:"Why",whyP:"You only swap when your team wins a point on its own serve. One point, one swap. Odd points, off your starting side.",whyNote:"The receiving team never moves.",pocket:"The pocket version",pk1:"Even: starter on the right.",pk2:"Odd: starter on the left.",pk3:"Each team, its own score.",EVEN:"EVEN",ODD:"ODD",mathT:"The proof (for nerds)",mathB:"<p>Let <i>s</i> be your team's score and <i>k</i> the number of times your team has swapped sides.</p><ol><li>Your team only scores on its own serve, and each of those points triggers exactly one swap. Nothing else triggers a swap. So <i>s</i> = <i>k</i>.</li><li>A swap σ is its own inverse: σ² = id. After <i>k</i> swaps you're at σ<sup>k</sup>(start).</li><li>So you're on your starting side ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollary:</b> if position and score parity disagree, the score has been miscounted somewhere.</p><p class='muted'>The opponents' score and the server number (1 or 2) don't affect this. It holds for games to 11, 15 and 21, however long they run.</p>",simpleT:"The simple version",simpleB:"<p>You score, you switch. That's the only time you move. 🏃</p><p>Score is 1? You moved once. You're on the other side.<br>Score is 2? You moved twice. You're back home.<br>Score is 3? Once, twice, three times. Other side again.</p><p><b>Odd = other side. Even = home.</b></p><p class='muted'>A trick: hold up a finger every time you switch. The number of fingers is your score.</p>"},
es:{title:"Par o impar: dónde pararse en dobles de pickleball",h1:"Su puntaje les dice dónde pararse.",lede:"Puntaje par: quien empezó a la derecha está a la derecha. Impar: a la izquierda.",check:"Revisar un puntaje",q1:"¿Dónde está quien empezó a la derecha?",right:"A la derecha",left:"A la izquierda",q2:"¿Y el puntaje de ese equipo?",pick:"Elige un lado.",ok:"Correcto",bad:"No coincide",must:"Tiene que ser {need}. Prueba {opts}.",even:"par",odd:"impar",or:"o",see:"Míralo en acción",callLabel:"Anuncio del puntaje",youServe:"Sacan ustedes",theyServe:"Sacan ellos",server:"sacador",yourRight:"la derecha de ustedes",theirRight:"la derecha de ellos",aStart:"A empezó aquí",cStart:"C empezó aquí",winUs:"Ustedes ganan la jugada",winThem:"Ellos ganan la jugada",watch:"Ver un partido",pause:"Pausa",reset:"Empezar de nuevo",init:"Toca quién gana. Fíjate en A.",mUs:"Punto de ustedes. A y B cambian de lado.",mThem:"Punto de ellos. C y D cambian de lado.",mS1:"El sacador 1 perdió. Saca su compañero. Nadie se mueve.",mOut:"Cambio de saque. Nadie se mueve.",mOver:"Fin del partido. Toca para jugar otro.",mNew:"Partido nuevo. Sacan ustedes primero, 0-0-2.",you:"Ustedes",them:"Ellos",isRight:"{p} está a la derecha",isLeft:"{p} está a la izquierda",why:"Por qué",whyP:"Solo cambian de lado cuando su equipo gana un punto con su propio saque. Un punto, un cambio. Puntaje impar: fuera de su lado inicial.",whyNote:"El equipo que recibe nunca se mueve.",pocket:"Versión de bolsillo",pk1:"Par: quien empezó, a la derecha.",pk2:"Impar: a la izquierda.",pk3:"Cada equipo, su propio puntaje.",EVEN:"PAR",ODD:"IMPAR",mathT:"La demostración (para nerds)",mathB:"<p>Sea <i>s</i> el puntaje de su equipo y <i>k</i> el número de veces que su equipo ha cambiado de lado.</p><ol><li>Su equipo solo anota con su propio saque, y cada uno de esos puntos provoca exactamente un cambio. Nada más provoca un cambio. Entonces <i>s</i> = <i>k</i>.</li><li>Un cambio σ es su propio inverso: σ² = id. Después de <i>k</i> cambios están en σ<sup>k</sup>(inicio).</li><li>Entonces están en su lado inicial ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corolario:</b> si la posición y la paridad del puntaje no coinciden, el puntaje se contó mal en algún momento.</p><p class='muted'>El puntaje del otro equipo y el número de sacador (1 o 2) no influyen aquí. Vale para partidos a 11, 15 y 21, duren lo que duren.</p>",simpleT:"La versión sencilla",simpleB:"<p>Anotan, cambian de lado. Es el único momento en que se mueven. 🏃</p><p>¿Puntaje 1? Cambiaron una vez. Están del otro lado.<br>¿Puntaje 2? Cambiaron dos veces. De vuelta en casa.<br>¿Puntaje 3? Una, dos, tres veces. Otra vez del otro lado.</p><p><b>Impar = otro lado. Par = casa.</b></p><p class='muted'>Un truco: levanten un dedo cada vez que cambien de lado. El número de dedos es su puntaje.</p>"},
pt:{title:"Par ou ímpar: onde ficar nas duplas de pickleball",h1:"A pontuação de vocês diz onde ficar.",lede:"Pontuação par: quem começou na direita está na direita. Ímpar: na esquerda.",check:"Conferir uma pontuação",q1:"Onde está quem começou na direita?",right:"Na direita",left:"Na esquerda",q2:"E a pontuação dessa dupla?",pick:"Escolha um lado.",ok:"Confere",bad:"Não confere",must:"Tem que ser {need}. Tente {opts}.",even:"par",odd:"ímpar",or:"ou",see:"Veja na prática",callLabel:"Anúncio do placar",youServe:"Vocês sacam",theyServe:"Eles sacam",server:"sacador",yourRight:"a direita de vocês",theirRight:"a direita deles",aStart:"A começou aqui",cStart:"C começou aqui",winUs:"Vocês ganham o rali",winThem:"Eles ganham o rali",watch:"Ver um jogo",pause:"Pausar",reset:"Recomeçar",init:"Toque em quem ganha. Fique de olho no jogador A.",mUs:"Ponto de vocês. A e B trocam de lado.",mThem:"Ponto deles. C e D trocam de lado.",mS1:"O sacador 1 perdeu. O parceiro saca. Ninguém se move.",mOut:"Troca de saque. Ninguém se move.",mOver:"Fim de jogo. Toque para jogar de novo.",mNew:"Novo jogo. Vocês sacam primeiro, 0-0-2.",you:"Vocês",them:"Eles",isRight:"{p} está na direita",isLeft:"{p} está na esquerda",why:"Por quê",whyP:"Vocês só trocam de lado quando a dupla ganha um ponto no próprio saque. Um ponto, uma troca. Pontuação ímpar: fora do lado inicial.",whyNote:"A dupla que recebe nunca se move.",pocket:"Versão de bolso",pk1:"Par: quem começou, na direita.",pk2:"Ímpar: na esquerda.",pk3:"Cada dupla, a sua pontuação.",EVEN:"PAR",ODD:"ÍMPAR",mathT:"A prova (para nerds)",mathB:"<p>Seja <i>s</i> a pontuação da dupla de vocês e <i>k</i> o número de vezes que a dupla trocou de lado.</p><ol><li>A dupla só pontua no próprio saque, e cada um desses pontos causa exatamente uma troca. Nada mais causa uma troca. Logo <i>s</i> = <i>k</i>.</li><li>Uma troca σ é a própria inversa: σ² = id. Depois de <i>k</i> trocas, vocês estão em σ<sup>k</sup>(início).</li><li>Logo vocês estão no lado inicial ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corolário:</b> se a posição e a paridade da pontuação não batem, a pontuação foi contada errado em algum momento.</p><p class='muted'>A pontuação da outra dupla e o número do sacador (1 ou 2) não influenciam aqui. Vale para jogos até 11, 15 e 21, durem o quanto durarem.</p>",simpleT:"A versão simples",simpleB:"<p>Pontuou, trocou de lado. É o único momento em que vocês se movem. 🏃</p><p>Pontuação 1? Trocaram uma vez. Estão do outro lado.<br>Pontuação 2? Trocaram duas vezes. De volta para casa.<br>Pontuação 3? Uma, duas, três vezes. Do outro lado de novo.</p><p><b>Ímpar = outro lado. Par = casa.</b></p><p class='muted'>Uma dica: levantem um dedo a cada troca de lado. O número de dedos é a pontuação de vocês.</p>"},
de:{title:"Gerade oder ungerade: Wo stehst du im Pickleball-Doppel?",h1:"Euer Spielstand zeigt, wo ihr steht.",lede:"Gerader Spielstand: Wer rechts angefangen hat, steht rechts. Ungerade: links.",check:"Spielstand prüfen",q1:"Wo steht, wer rechts angefangen hat?",right:"Rechts",left:"Links",q2:"Spielstand dieses Teams?",pick:"Wähle eine Seite.",ok:"Stimmt",bad:"Passt nicht",must:"Muss {need} sein. Vielleicht {opts}?",even:"gerade",odd:"ungerade",or:"oder",see:"So funktioniert es",callLabel:"Ansage",youServe:"Ihr schlagt auf",theyServe:"Gegner schlagen auf",server:"Aufschlag",yourRight:"eure rechte Seite",theirRight:"ihre rechte Seite",aStart:"A hat hier angefangen",cStart:"C hat hier angefangen",winUs:"Ihr gewinnt den Ballwechsel",winThem:"Gegner gewinnen den Ballwechsel",watch:"Spiel ansehen",pause:"Pause",reset:"Neu starten",init:"Tippe, wer gewinnt. Achte auf A.",mUs:"Euer Punkt. A und B tauschen.",mThem:"Punkt für die Gegner. C und D tauschen.",mS1:"Aufschlag 1 verloren. Partner schlägt auf. Niemand bewegt sich.",mOut:"Side Out. Niemand bewegt sich.",mOver:"Spiel vorbei. Tippe für ein neues Spiel.",mNew:"Neues Spiel. Ihr schlagt zuerst auf, 0-0-2.",you:"Ihr",them:"Gegner",isRight:"{p} steht rechts",isLeft:"{p} steht links",why:"Warum",whyP:"Ihr tauscht nur, wenn euer Team bei eigenem Aufschlag punktet. Ein Punkt, ein Tausch. Ungerade Punktzahl: weg von der Startseite.",whyNote:"Das annehmende Team bewegt sich nie.",pocket:"Für die Hosentasche",pk1:"Gerade: Starter rechts.",pk2:"Ungerade: Starter links.",pk3:"Jedes Team zählt für sich.",EVEN:"GERADE",ODD:"UNGER.",mathT:"Der Beweis (für Nerds)",mathB:"<p>Sei <i>s</i> euer Spielstand und <i>k</i> die Anzahl eurer Seitenwechsel.</p><ol><li>Ihr punktet nur bei eigenem Aufschlag, und jeder dieser Punkte löst genau einen Wechsel aus. Sonst nichts. Also <i>s</i> = <i>k</i>.</li><li>Ein Wechsel σ ist selbstinvers: σ² = id. Nach <i>k</i> Wechseln steht ihr bei σ<sup>k</sup>(Start).</li><li>Also: Startseite ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Korollar:</b> Passen Position und Parität nicht zusammen, wurde der Spielstand irgendwo falsch gezählt.</p><p class='muted'>Der Spielstand der Gegner und die Aufschlagnummer (1 oder 2) spielen dafür keine Rolle. Gilt für Spiele bis 11, 15 und 21, egal wie lange sie dauern.</p>",simpleT:"Die einfache Version",simpleB:"<p>Ihr macht einen Punkt, ihr tauscht. Nur dann bewegt ihr euch. 🏃</p><p>Spielstand 1? Einmal getauscht. Ihr steht auf der anderen Seite.<br>Spielstand 2? Zweimal getauscht. Wieder zu Hause.<br>Spielstand 3? Eins, zwei, drei. Wieder drüben.</p><p><b>Ungerade = andere Seite. Gerade = zu Hause.</b></p><p class='muted'>Ein Trick: Bei jedem Wechsel einen Finger heben. Die Zahl der Finger ist euer Spielstand.</p>"},
fr:{title:"Pair ou impair : où se placer au pickleball en double",h1:"Votre score vous dit où vous placer.",lede:"Score pair : le joueur qui a commencé à droite est à droite. Impair : à gauche.",check:"Vérifier un score",q1:"Où est le joueur qui a commencé à droite ?",right:"À droite",left:"À gauche",q2:"Score de son équipe ?",pick:"Choisissez un côté.",ok:"C'est juste",bad:"Ça ne colle pas",must:"Il doit être {need}. Essayez {opts}.",even:"pair",odd:"impair",or:"ou",see:"En action",callLabel:"Annonce du score",youServe:"Vous servez",theyServe:"Ils servent",server:"serveur",yourRight:"votre droite",theirRight:"leur droite",aStart:"A a commencé ici",cStart:"C a commencé ici",winUs:"Vous gagnez l'échange",winThem:"Ils gagnent l'échange",watch:"Voir une partie",pause:"Pause",reset:"Recommencer",init:"Touchez qui gagne. Regardez A.",mUs:"Votre point. A et B changent de côté.",mThem:"Leur point. C et D changent de côté.",mS1:"Le serveur 1 perd. Son partenaire sert. Personne ne bouge.",mOut:"Changement de service. Personne ne bouge.",mOver:"Partie terminée. Touchez pour rejouer.",mNew:"Nouvelle partie. Vous servez en premier, 0-0-2.",you:"Vous",them:"Eux",isRight:"{p} est à droite",isLeft:"{p} est à gauche",why:"Pourquoi",whyP:"Vous ne changez de côté que lorsque votre équipe marque sur son propre service. Un point, un changement. Score impair : hors de votre côté de départ.",whyNote:"L'équipe qui reçoit ne bouge jamais.",pocket:"Version de poche",pk1:"Pair : joueur de départ à droite.",pk2:"Impair : joueur de départ à gauche.",pk3:"Chaque équipe, son propre score.",EVEN:"PAIR",ODD:"IMPAIR",mathT:"La preuve (pour les matheux)",mathB:"<p>Soit <i>s</i> le score de votre équipe et <i>k</i> le nombre de changements de côté.</p><ol><li>Votre équipe ne marque que sur son propre service, et chacun de ces points provoque exactement un changement. Rien d'autre. Donc <i>s</i> = <i>k</i>.</li><li>Un changement σ est son propre inverse : σ² = id. Après <i>k</i> changements, vous êtes en σ<sup>k</sup>(départ).</li><li>Donc côté de départ ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollaire :</b> si position et parité ne concordent pas, le score a été mal compté quelque part.</p><p class='muted'>Le score adverse et le numéro du serveur (1 ou 2) ne jouent aucun rôle ici. Valable pour les parties en 11, 15 et 21, quelle que soit leur durée.</p>",simpleT:"La version simple",simpleB:"<p>Vous marquez, vous changez de côté. C'est le seul moment où vous bougez. 🏃</p><p>Score 1 ? Un changement. Vous êtes de l'autre côté.<br>Score 2 ? Deux changements. Retour à la maison.<br>Score 3 ? Un, deux, trois. De nouveau en face.</p><p><b>Impair = autre côté. Pair = maison.</b></p><p class='muted'>Une astuce : levez un doigt à chaque changement de côté. Le nombre de doigts, c'est votre score.</p>"},
it:{title:"Pari o dispari: dove stare nel pickleball in doppio",h1:"Il vostro punteggio vi dice dove stare.",lede:"Punteggio pari: chi ha iniziato a destra è a destra. Dispari: a sinistra.",check:"Controlla un punteggio",q1:"Dov'è il giocatore che ha iniziato a destra?",right:"A destra",left:"A sinistra",q2:"Punteggio della sua squadra?",pick:"Scegli un lato.",ok:"Corretto",bad:"Non torna",must:"Deve essere {need}. Prova {opts}.",even:"pari",odd:"dispari",or:"o",see:"Guardalo in azione",callLabel:"Chiamata del punteggio",youServe:"Servite voi",theyServe:"Servono loro",server:"battitore",yourRight:"la vostra destra",theirRight:"la loro destra",aStart:"A ha iniziato qui",cStart:"C ha iniziato qui",winUs:"Vincete lo scambio",winThem:"Vincono lo scambio",watch:"Guarda una partita",pause:"Pausa",reset:"Ricomincia",init:"Tocca chi vince. Guarda A.",mUs:"Punto vostro. A e B si scambiano.",mThem:"Punto loro. C e D si scambiano.",mS1:"Il battitore 1 perde. Serve il compagno. Nessuno si muove.",mOut:"Cambio servizio. Nessuno si muove.",mOver:"Partita finita. Tocca per ricominciare.",mNew:"Nuova partita. Servite per primi, 0-0-2.",you:"Voi",them:"Loro",isRight:"{p} è a destra",isLeft:"{p} è a sinistra",why:"Perché",whyP:"Vi scambiate solo quando la vostra squadra fa punto sul proprio servizio. Un punto, uno scambio. Punteggio dispari: fuori dal lato di partenza.",whyNote:"La squadra in risposta non si muove mai.",pocket:"Versione tascabile",pk1:"Pari: chi ha iniziato è a destra.",pk2:"Dispari: è a sinistra.",pk3:"Ogni squadra, il suo punteggio.",EVEN:"PARI",ODD:"DISPARI",mathT:"La dimostrazione (per i nerd)",mathB:"<p>Sia <i>s</i> il punteggio della vostra squadra e <i>k</i> il numero di cambi di lato.</p><ol><li>Fate punto solo sul vostro servizio, e ognuno di quei punti causa esattamente un cambio. Nient'altro. Quindi <i>s</i> = <i>k</i>.</li><li>Un cambio σ è l'inverso di sé stesso: σ² = id. Dopo <i>k</i> cambi siete in σ<sup>k</sup>(partenza).</li><li>Quindi lato di partenza ⇔ <i>k</i> ≡ 0 (mod 2) ⇔ <i>s</i> ≡ 0 (mod 2). ∎</li></ol><p><b>Corollario:</b> se posizione e parità non coincidono, il punteggio è stato contato male da qualche parte.</p><p class='muted'>Il punteggio avversario e il numero del battitore (1 o 2) qui non c'entrano. Vale per partite a 11, 15 e 21, di qualsiasi durata.</p>",simpleT:"La versione semplice",simpleB:"<p>Fate punto, cambiate lato. È l'unico momento in cui vi muovete. 🏃</p><p>Punteggio 1? Un cambio. Siete dall'altra parte.<br>Punteggio 2? Due cambi. Di nuovo a casa.<br>Punteggio 3? Uno, due, tre. Di nuovo dall'altra parte.</p><p><b>Dispari = altro lato. Pari = casa.</b></p><p class='muted'>Un trucco: alzate un dito a ogni cambio di lato. Il numero di dita è il vostro punteggio.</p>"}
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
es:{
  toQuiz:"Ponte a prueba: quiz de puntaje →",
  qTitle:"Quiz de puntaje en dobles de pickleball",
  qH1:"Quiz de puntaje",
  qBack:"← Par o impar",
  next:"Siguiente",
  qRight:"Correcto.",
  qWrong:"No exactamente.",
  qScore:"{r} de {n} correctas",
  qStreak:"racha de {n}",
  topic:"Practica un tema",
  tAll:"Todo",
  tPoints:"Puntos",
  tCall:"El anuncio",
  tServe:"El saque",
  tSides:"Lados",
  sitScores:"Ustedes {us} · Ellos {them}",
  sitFirst:"Primer saque del partido",
  yes:"Sí",
  no:"No",
  pWinUs:"Ustedes ganan la jugada. ¿Qué pasa?",
  pWinThem:"Ellos ganan la jugada. ¿Qué pasa?",
  oPtUs:"Punto para ustedes",
  oPtThem:"Punto para ellos",
  oSecond:"Sin punto. Saca {p}.",
  oOut:"Sin punto. Cambio de saque.",
  pCall:"¿Cuál es el anuncio?",
  pNextUs:"Ustedes ganan la jugada. ¿Cuál es el siguiente anuncio?",
  pNextThem:"Ellos ganan la jugada. ¿Cuál es el siguiente anuncio?",
  pWhoUs:"Ustedes ganan la jugada. ¿Quién saca ahora?",
  pWhoThem:"Ellos ganan la jugada. ¿Quién saca ahora?",
  pRecv:"Saca {p}. ¿Quién recibe?",
  pWhereUs:"Su equipo tiene {n}. {p} empezó a la derecha. ¿Dónde está {p} ahora?",
  pWhereThem:"El equipo de ellos tiene {n}. {p} empezó a la derecha. ¿Dónde está {p} ahora?",
  pImpUs:"{p} empezó a la derecha. ¿Qué puntaje es imposible para su equipo?",
  pImpThem:"{p} empezó a la derecha. ¿Qué puntaje es imposible para el equipo de ellos?",
  pOver:"¿Terminó el partido?",
  xPoint:"Solo anota el equipo que saca. Quien saca cambia de lado con su compañero y vuelve a sacar.",
  xSecond:"El equipo que recibe nunca anota. El sacador 1 perdió, así que saca su compañero. Nadie se mueve.",
  xOut:"El equipo que recibe nunca anota. El sacador 2 perdió, así que saca el otro equipo. Nadie se mueve.",
  xFirst:"El primer equipo en sacar tiene un solo sacador (el 2 de 0-0-2), así que hay cambio de saque de inmediato.",
  xNow:"Nuevo anuncio: {call}.",
  xCall:"Primero el puntaje del equipo que saca, luego el del que recibe, luego el número de sacador: {call}.",
  xStartCall:"El primer equipo en sacar tiene un solo sacador, así que todo partido empieza con el sacador 2: 0-0-2.",
  xSame:"Punto para el equipo que saca. {p} sigue sacando, desde el otro lado.",
  xPartner:"El sacador 1 perdió la jugada, así que ahora saca su compañero: {p}.",
  xOutHead:"Cambio de saque.",
  xRight:"Saca primero quien esté a la derecha: {p}.",
  xDiag:"El saque siempre va en diagonal. {p} está en el cuadro diagonal.",
  xEven:"{n} es par, así que {p} está en su lado inicial: la derecha.",
  xOdd:"{n} es impar, así que {p} está del otro lado: la izquierda.",
  xImpOdd:"{p} está fuera de su lado inicial, así que el puntaje tiene que ser impar. {n} es par.",
  xImpEven:"{p} está en su lado inicial, así que el puntaje tiene que ser par. {n} es impar.",
  xOverYes:"Sí. Alguien tiene 11 o más y lleva 2 de ventaja.",
  xOverNo11:"No. Nadie tiene 11 todavía.",
  xOverNo2:"No. Hay que ganar por 2.",
  rulesT:"Las reglas en seis líneas",
  rulesB:"<ol><li>Solo puede anotar el equipo que saca.</li><li>Ganas la jugada con tu saque: un punto. Quien saca cambia de lado con su compañero y vuelve a sacar.</li><li>Pierdes la jugada con tu saque: sin punto. Si perdió el sacador 1, saca su compañero. Si perdió el sacador 2, saca el otro equipo (cambio de saque).</li><li>Después de un cambio de saque, saca primero quien esté a la derecha. Todo saque va en diagonal.</li><li>El anuncio son tres números: puntaje del equipo que saca, puntaje del equipo que recibe, número de sacador. El partido empieza en 0-0-2 porque el primer equipo tiene un solo sacador.</li><li>Se juega a 11. Hay que ganar por 2.</li></ol>"
},
pt:{
  toQuiz:"Teste seus conhecimentos: quiz de pontuação →",
  qTitle:"Quiz de pontuação nas duplas de pickleball",
  qH1:"Quiz de pontuação",
  qBack:"← Par ou ímpar",
  next:"Próxima",
  qRight:"Certo.",
  qWrong:"Não exatamente.",
  qScore:"{r} de {n} certas",
  qStreak:"sequência de {n}",
  topic:"Pratique um tema",
  tAll:"Tudo",
  tPoints:"Pontos",
  tCall:"O anúncio",
  tServe:"O saque",
  tSides:"Lados",
  sitScores:"Vocês {us} · Eles {them}",
  sitFirst:"Primeiro saque do jogo",
  yes:"Sim",
  no:"Não",
  pWinUs:"Vocês ganham o rali. O que acontece?",
  pWinThem:"Eles ganham o rali. O que acontece?",
  oPtUs:"Ponto para vocês",
  oPtThem:"Ponto para eles",
  oSecond:"Sem ponto. {p} saca.",
  oOut:"Sem ponto. Troca de saque.",
  pCall:"Qual é o anúncio?",
  pNextUs:"Vocês ganham o rali. Qual é o próximo anúncio?",
  pNextThem:"Eles ganham o rali. Qual é o próximo anúncio?",
  pWhoUs:"Vocês ganham o rali. Quem saca agora?",
  pWhoThem:"Eles ganham o rali. Quem saca agora?",
  pRecv:"{p} está sacando. Quem recebe?",
  pWhereUs:"A dupla de vocês tem {n}. {p} começou na direita. Onde está {p} agora?",
  pWhereThem:"A dupla deles tem {n}. {p} começou na direita. Onde está {p} agora?",
  pImpUs:"{p} começou na direita. Que pontuação é impossível para a dupla de vocês?",
  pImpThem:"{p} começou na direita. Que pontuação é impossível para a dupla deles?",
  pOver:"O jogo acabou?",
  xPoint:"Só a dupla que saca pontua. Quem saca troca de lado com o parceiro e saca de novo.",
  xSecond:"A dupla que recebe nunca pontua. O sacador 1 perdeu, então o parceiro saca. Ninguém se move.",
  xOut:"A dupla que recebe nunca pontua. O sacador 2 perdeu, então a outra dupla saca. Ninguém se move.",
  xFirst:"A primeira dupla a sacar tem só um sacador (o 2 de 0-0-2), então a troca de saque é imediata.",
  xNow:"Novo anúncio: {call}.",
  xCall:"Primeiro a pontuação da dupla que saca, depois a da que recebe, depois o número do sacador: {call}.",
  xStartCall:"A primeira dupla a sacar tem só um sacador, então todo jogo começa com o sacador 2: 0-0-2.",
  xSame:"Ponto para a dupla que saca. {p} continua sacando, do outro lado.",
  xPartner:"O sacador 1 perdeu o rali, então agora o parceiro saca: {p}.",
  xOutHead:"Troca de saque.",
  xRight:"Quem está na direita saca primeiro: {p}.",
  xDiag:"O saque sempre vai na diagonal. {p} está na área diagonal.",
  xEven:"{n} é par, então {p} está no lado inicial: a direita.",
  xOdd:"{n} é ímpar, então {p} está do outro lado: a esquerda.",
  xImpOdd:"{p} está fora do lado inicial, então a pontuação tem que ser ímpar. {n} é par.",
  xImpEven:"{p} está no lado inicial, então a pontuação tem que ser par. {n} é ímpar.",
  xOverYes:"Sim. Alguém tem 11 ou mais e está 2 à frente.",
  xOverNo11:"Não. Ninguém tem 11 ainda.",
  xOverNo2:"Não. É preciso vencer por 2.",
  rulesT:"As regras em seis linhas",
  rulesB:"<ol><li>Só a dupla que saca pode pontuar.</li><li>Ganhou o rali no seu saque: um ponto. Quem saca troca de lado com o parceiro e saca de novo.</li><li>Perdeu o rali no seu saque: sem ponto. Se o sacador 1 perdeu, o parceiro saca. Se o sacador 2 perdeu, a outra dupla saca (troca de saque).</li><li>Depois de uma troca de saque, quem está na direita saca primeiro. Todo saque vai na diagonal.</li><li>O anúncio tem três números: pontuação da dupla que saca, pontuação da dupla que recebe, número do sacador. O jogo começa em 0-0-2 porque a primeira dupla tem só um sacador.</li><li>Os jogos vão até 11. É preciso vencer por 2.</li></ol>"
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
/* A language code we have strings for, or null. "DE", "de-CH" and "de" all give "de". */
function known(l){
  l = String(l || "").slice(0,2).toLowerCase();
  return Object.prototype.hasOwnProperty.call(T, l) ? l : null;
}
function setLang(l){
  lang = known(l) || "en";
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
  /* The link, then the saved choice, then the browser. A code we do not have is skipped, not turned into English. */
  var start = null;
  try{ start = known(new URLSearchParams(location.search).get("lang")); }catch(e){}
  if(!start){ try{ start = known(localStorage.getItem("lang")); }catch(e){} }
  if(!start){ start = known(navigator.language); }
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
