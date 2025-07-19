# AnatomIQ 🧠💻

[🌐 Site oficial](https://anatomiq.netlify.app/) |  
[📸 Instagram](https://www.instagram.com/anatom_iq?igsh=MTk4b2I1NGp4MDF0aQ==) |  
[🎵 TikTok](https://www.tiktok.com/@anatomiq25?_t=ZN-8xwIgPzNBIN&_r=1) |  
[▶️ YouTube](https://www.youtube.com/@anatomiq)

---

## Introducere

Într-o lume în care educația trebuie să țină pasul cu tehnologia, **AnatomIQ** aduce o soluție modernă și eficientă pentru învățarea anatomiei corpului uman. Proiectul a fost creat din dorința de a transforma o materie complexă într-o experiență interactivă, logică și accesibilă oricui este pasionat de știință, medicină sau biologie.

AnatomIQ este o platformă educațională digitală care combină modelele 3D interactive cu materiale academice riguroase, informații schematizate, galerii vizuale și teste de verificare a cunoștințelor. Cu o interfață prietenoasă și un asistent virtual integrat (BioBot), site-ul facilitează învățarea personalizată și eficientă, atât pentru elevi și studenți, cât și pentru profesori sau medici rezidenți.

Prin acest proiect, ne propunem să aducem anatomia mai aproape de toți cei care vor să înțeleagă mai bine propriul corp și să îmbunătățim metodele clasice de învățare cu ajutorul noilor tehnologii.

---

## Alegerea tematicii 🎯

Ideea AnatomIQ s-a născut din fascinația noastră pentru corpul uman – un sistem incredibil de bine pus la punct, complex și armonios. Încă din primele lecții de biologie, am simțit o atracție firească spre anatomie. Fiecare organ, fiecare funcție, fiecare conexiune din organism ne trezea curiozitatea și dorința de a înțelege mai profund cum funcționează totul.

Am vrut să ducem această pasiune mai departe, să o transformăm într-un proiect care îmbină știința cu tehnologia, educația cu interactivitatea. Ne-am propus să creăm un spațiu digital unde anatomia să poată fi explorată intuitiv, vizual și logic – un instrument care să fie în același timp util, modern și captivant pentru toți cei interesați de domeniu.

Alegerea temei nu a fost întâmplătoare. Am simțit că avem motivația și responsabilitatea de a crea ceva care să aducă un plus real în modul în care ne apropiem de știință. Anatomia este un limbaj universal al vieții, iar prin AnatomIQ ne dorim să-l facem mai accesibil și mai viu ca niciodată.

---

## Implementarea aplicației ⚙️

### 2.1 Arhitectura aplicației

Aplicația este organizată modular și construită pe o arhitectură client-side, cu conținut dinamic și componente interactive. Paginile sunt încărcate separat, iar funcțiile sunt distribuite pe module (chatbot, teste, modele 3D, notițe etc.).

Fiecare pagină are o tematică specifică (ex: „Celula”, „Sisteme ale corpului”) și include animații, secțiuni interactive și fundaluri dinamice.

### Tehnologiile folosite 🛠️

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Java (fără framework, logica e locală)  
- **Inteligență Artificială:** Google Gemini  
- **Servicii Web:** Cloudflare (translatare)  
- **Autentificare/Securitate:** Firebase  
- **Design:** Canva, Boxicons  
- **IDE:** Visual Studio  
- **Funcționalități suplimentare:** LocalStorage, animații CSS, toggle light/dark  

### Stabilitatea aplicației

Aplicația a fost testată pe mai multe rezoluții și dispozitive. Codul este împărțit pe fișiere (HTML, JS, CSS) și structurat clar. Folosirea LocalStorage permite păstrarea temei și notițelor fără erori la refresh. Interfața este optimizată pentru o experiență lină.

### Securitatea aplicației 🔐

Am implementat verificări asupra inputurilor, restricții la accesul în paginile de tip recenzii/contact, iar sistemul de autentificare gestionează rolurile utilizatorilor. Datele sunt păstrate local, fără colectare de informații sensibile.

### Testarea produsului ✅

Am testat fiecare componentă:

- meniul  
- butoanele  
- chatbot-ul  
- modelele 3D  
- generatorul de teste  
- testele făcute individual pentru fiecare sistem uman  
- funcția de luat notițe  
- funcția de setat task-uri  
- videoclipurile realizate de noi în Canva  
- cronometrul  
- contactul  
- funcția de lăsat recenzii  
- logarea/conectarea  

S-au făcut simulări de utilizare și s-a colectat feedback real de la colegi, profesori, kinetoterapeuți și un medic ortoped pentru a identifica și corecta erori.

---

## Documentația proiectului 📑

### 3.1 Descrierea problemei

Anatomia este una dintre disciplinele fundamentale în studiul biologiei și al medicinei, însă este percepută de mulți elevi și studenți ca fiind abstractă, dificilă și copleșitoare. Manualele clasice de biologie, deși informative, oferă conținut într-o formă predominant textuală, completată de câteva imagini schematice, deseori lipsite de claritate sau detalii.

Această abordare statică limitează înțelegerea profundă a relațiilor spațiale dintre organe și sisteme. De exemplu, un elev poate citi despre sistemul limfatic sau structura unei celule, dar fără o vizualizare interactivă, aceste concepte rămân teoretice, greu de imaginat și, prin urmare, dificil de reținut.

Mai mult decât atât, metodele clasice de predare rareori se adaptează stilurilor diverse de învățare. Elevii vizuali sau kinestezici, care ar beneficia de elemente animate, modele 3D sau interactivitate, nu sunt sprijiniți suficient în sistemul actual. În absența unei experiențe multisenzoriale, motivația pentru învățare scade, iar performanțele sunt afectate.

### 3.2 Soluția propusă

AnatomIQ este răspunsul nostru la provocările actuale din educația științifică. Am creat o aplicație web care transformă învățarea anatomiei dintr-un proces pasiv într-o experiență activă, vizuală și personalizată. Scopul nu este doar de a transmite informații, ci de a crea un spațiu unde cunoașterea prinde viață.

Aplicația oferă:

- Modele 3D interactive, ușor de manipulat și etichetate clar, pentru o înțelegere spațială a organelor și sistemelor;  
- Chatbot-ul BioBot, un asistent virtual care răspunde întrebărilor utilizatorilor și ghidează procesul de învățare;  
- Teste interactive și dinamice, pentru toate sistemele umane;  
- Generator automat de teste, pentru verificarea cunoștințelor într-un mod prietenos și non-stresant;  
- Listă de task-uri personalizate, TaskIQ, pentru o organizare mai ușoară;  
- Funcția de calculator integrată;  
- Sistem de notițe personalizate, în care utilizatorii își pot scrie observațiile și explicațiile proprii;  
- Temă light/dark pentru confort vizual și accesibilitate crescută;  
- Videoclipuri explicative create personal în Canva;  
- Acces rapid la subiecte BAC în format PDF + atlase/manuale, pentru pregătirea eficientă a examenelor;  
- Cronometru pentru BAC cu afișare în timp real (zile/ore/minute/secunde);  
- Sistem de pauză activă (jocuri educative – puzzle, desen) sau pauză de relaxare și hidratare;  
- Pagina de autentificare/logare – îți poți vedea activitatea / timpul petrecut pe site;  
- Suport multilingv: română, engleză, franceză, spaniolă, rusă, arabă, hindi, chineză;  
- Traducere automată, TranslaIQ, pentru termeni neînțeleși;  
- Interfață modernă și intuitivă, concepută special pentru generația digitală.  

Toate aceste funcționalități sunt integrate într-o platformă care funcționează direct din browser, fără a necesita instalare, și este compatibilă cu toate dispozitivele moderne. Aplicația este gândită pentru a oferi o experiență completă de învățare, autoevaluare și organizare, într-un mediu accesibil și plăcut.

### 3.3 Publicul țintă 🎯

- Elevi de gimnaziu și liceu  
- Profesori  
- Pasionați de anatomie  

### 3.4 Funcționalitățile aplicației

- Teste interactive pentru fiecare sistem biologic;  
- Generator automat de teste;  
- Chatbot educațional – BioBot, integrat în pagină;  
- Notițe, listă de taskuri și calculator integrate;  
- Cronometru pentru BAC cu afișare în timp real (zile/ore/minute/secunde);  
- Subiecte de BAC în format PDF + atlase/manual;  
- Pagina de autentificare/logare – îți poți vedea activitatea / timpul petrecut pe site;  
- Modele 3D (organe și sisteme);  
- Videoclipuri explicative create personal în Canva;  
- Sistem de pauză activă (jocuri educative – puzzle, desen) sau pauză de relaxare și hidratare;  
- Suport multilingv;  
- Traducere automată pentru termeni neînțeleși, TranslaIQ;  
- Mod Light/Dark integrat pentru confort vizual;  

---

## Lucrul în echipă 🤝

Proiectul a fost realizat în echipă de **Păun Monica Georgiana** și **Treanță Daria Mihaela**, eleve ale Colegiului Național „Tudor Vladimirescu” din București, coordonate de doamna profesoară Mădălina Mareș.

- **Monica:** dezvoltare, implementare funcționalități, animații, cod HTML/JS/CSS  
- **Daria:** redactare conținut științific, design vizual (Canva), organizare și cercetare  

Colaborarea a fost constantă și eficientă, fiecare contribuind activ la toate etapele proiectului.

---

## Resurse 📚

### Tehnice:

- Visual Studio, HTML/CSS/JS  
- Canva pentru grafică, videoclipuri  
- Boxicons pentru iconițe  
- LocalStorage/SessionStorage  
- Animații CSS, responsive design  

### Educaționale:

- Manuale școlare de biologie (liceu)  
- Site-uri educaționale (Khan Academy, Biology Online)  
- Enciclopedii digitale  
- Modele 3D gratuite (BIODIGITAL/Sketchfab)  

---

## Planuri pentru viitor 🚀

Echipa AnatomIQ își propune extinderea continuă a platformei, atât din punct de vedere funcțional, cât și ca nivel de complexitate a conținutului:

- Traducerea integrală a platformei în cele 8 limbi deja disponibile (română, engleză, franceză, spaniolă, rusă, arabă, hindi, chineză) – în prezent, doar unele pagini sunt complet traduse; testele și unele lecții vor fi adaptate integral pentru toate limbile.  
- Vom face ca utilizatorii să primească notificări legate de activitatea și noutățile site-ului nostru.  
- Vom transforma site-ul într-o aplicație.  
- Vom pune manuale/atlase și în alte limbi.  
- Extinderea conținutului educațional la nivel universitar, în special pentru studenții la medicină sau viitori candidați la facultăți de profil.  
- Introducerea lecțiilor audio și video, pentru susținerea învățării auditive și explicarea în timp real a conceptelor.  
- Lansarea BioStream – o rețea socială educativă dedicată elevilor, studenților, profesorilor și pasionaților de biologie, unde utilizatorii pot partaja idei, resurse, întrebări, rezultate sau metode proprii de învățare.  
- Creșterea interactivității: dezvoltarea de noi jocuri educative (quiz-uri, provocări tematice) pentru pauza activă și recapitulări rapide.  

Aceste direcții urmăresc transformarea AnatomIQ într-o platformă educațională completă, scalabilă și accesibilă internațional, adresată pasionaților de biologie, profesorilor, elevilor de liceu și celor care urmează un traseu academic în domeniul biologiei și medicinei.
