/* i18n.js — RU/SR (latinica) language switcher for annanvslv.github.io
   Usage: mark translatable elements with data-i18n="key" (uses innerHTML)
   or data-i18n-ATTR="key" (e.g. data-i18n-alt, data-i18n-content, data-i18n-title)
   to translate a specific attribute. Language buttons: <button class="lang-switch__btn" data-lang="ru|sr">
*/
(function () {
  var STORAGE_KEY = 'site_lang';
  var DEFAULT_LANG = 'ru';

  var t = {
    /* ===== NAV (shared across pages) ===== */
    'nav.home': { ru: 'Главная', sr: 'Početna' },
    'nav.about': { ru: 'Обо мне', sr: 'O meni' },
    'nav.services': { ru: 'Услуги и цены', sr: 'Usluge i cene' },
    'nav.appointment': { ru: 'Как проходит приём', sr: 'Kako izgleda pregled' },
    'nav.appointment_short': { ru: 'Приём', sr: 'Pregled' },
    'nav.promo': { ru: 'Акции', sr: 'Akcije' },
    'nav.vision': { ru: 'О зрении', sr: 'O vidu' },
    'nav.contacts': { ru: 'Контакты', sr: 'Kontakt' },
    'nav.booking_page': { ru: 'Запись', sr: 'Zakazivanje' },
    'nav.booking_cta': { ru: 'Online-запись', sr: 'Online zakazivanje' },
    'nav.booking_cta_short': { ru: 'Записаться', sr: 'Zakažite' },
    'nav.burger_aria': { ru: 'Меню', sr: 'Meni' },
    'nav.logo_aria_home': { ru: 'Анна Новосёлова — медицинский оптик и оптометрист', sr: 'Ana Novoselova — medicinski optičar i optometrista' },
    'nav.logo_aria_std': { ru: 'Анна Новосёлова — оптометрист', sr: 'Ana Novoselova — optometrista' },

    /* ===== FOOTER (shared) ===== */
    'footer.logo': { ru: 'Анна Новосёлова', sr: 'Ana Novoselova' },
    'footer.heading': { ru: 'Навигация', sr: 'Navigacija' },
    'footer.telegram_channel': { ru: 'Telegram-канал', sr: 'Telegram kanal' },
    'footer.instagram': { ru: 'Instagram', sr: 'Instagram' },
    'footer.tagline_home': { ru: 'Медицинский оптик и оптометрист в Нови Саде.<br>Приём на русском языке.', sr: 'Medicinski optičar i optometrista u Novom Sadu.<br>Pregledi na ruskom jeziku.' },
    'footer.tagline_about_promo': { ru: 'Медицинский оптик · Оптометрист<br>Нови Сад, оптика Ginter', sr: 'Medicinski optičar · Optometrista<br>Novi Sad, optika Ginter' },
    'footer.tagline_services': { ru: 'Оптометрист в Нови Саде.<br>Приём на русском языке.', sr: 'Optometrista u Novom Sadu.<br>Pregledi na ruskom jeziku.' },

    /* ===== COMMON (booking steps, TOC) ===== */
    'common.toc_aria': { ru: 'Оглавление', sr: 'Sadržaj' },
    'common.toc_title': { ru: 'На этой странице', sr: 'Na ovoj strani' },
    'common.step1': { ru: 'Выберите вид консультации', sr: 'Izaberite vrstu konsultacije' },
    'common.step2': { ru: 'Выберите свободный слот в календаре', sr: 'Izaberite slobodan termin u kalendaru' },
    'common.step3': { ru: 'Заполните анкету', sr: 'Popunite upitnik' },
    'common.step4': { ru: 'Нажмите кнопку «Написать боту» — бот пришлёт подтверждение в Telegram', sr: 'Kliknite dugme „Piši botu" — bot će vam poslati potvrdu na Telegram' },
    'common.step5': { ru: 'Получите подтверждение о записи', sr: 'Sačekajte potvrdu termina' },

    /* ===== SHARED CTA / BUTTONS ===== */
    'cta.book_title': { ru: 'Записаться на приём', sr: 'Zakazivanje pregleda' },
    'cta.book_sub_default': { ru: 'Выберите удобное время онлайн — без звонков и ожидания.', sr: 'Izaberite termin online — bez čekanja i poziva.' },
    'btn.online_booking': { ru: 'Online-запись', sr: 'Online zakazivanje' },
    'btn.telegram_write': { ru: 'Написать в Telegram', sr: 'Pišite na Telegram' },
    'about.hero_cta': { ru: 'Записаться на приём', sr: 'Zakažite pregled' },

    /* ===== HOME (index.html) ===== */
    'home.meta_title': { ru: 'Анна Новосёлова — медицинский оптик и оптометрист в Нови Саде', sr: 'Ana Novoselova — medicinski optičar i optometrista u Novom Sadu' },
    'home.meta_description': { ru: 'Помогу разобраться со зрением и очками: проверка зрения, подбор очков и контактных линз для взрослых, помощь с очками для детей по рецепту офтальмолога. Оптика Ginter, Нови Сад.', sr: 'Pomažem da razumete svoj vid i naočare: pregled vida, izbor naočara i kontaktnih sočiva za odrasle, pomoć oko naočara za decu po receptu oftalmologa. Optika Ginter, Novi Sad.' },
    'home.meta_keywords': { ru: 'медицинский оптик Нови Сад, оптометрист Нови Сад, проверка зрения Нови Сад, подбор очков Сербия, оптика Нови Сад', sr: 'medicinski optičar Novi Sad, optometrista Novi Sad, pregled vida Novi Sad, izbor naočara Srbija, optika Novi Sad' },
    'home.hero_label': { ru: 'Нови-Сад &middot; Оптика Ginter', sr: 'Novi Sad &middot; Optika Ginter' },
    'home.hero_title': { ru: 'Помогу разобраться со зрением и очками', sr: 'Pomažem da razumete svoj vid i naočare' },
    'home.hero_sub': { ru: 'Медицинский оптик и оптометрист. От проверки зрения до готовых очков — объясню простыми словами и подберу решение, с которым будет комфортно каждый день.', sr: 'Medicinski optičar i optometrista. Od pregleda vida do gotovih naočara — objasniću jednostavnim rečima i pronaći rešenje sa kojim ćete se osećati prijatno svaki dan.' },
    'home.check1': { ru: 'Подбор очков и контактных линз', sr: 'Izbor naočara i kontaktnih sočiva' },
    'home.check2': { ru: 'Помогу разобраться с очками и взрослым, и детям', sr: 'Pomažem oko naočara i odraslima i deci' },
    'home.check3': { ru: 'Перевожу с оптического на русский', sr: 'Objašnjavam stručne termine jednostavnim jezikom' },
    'home.check4': { ru: 'Веду приём на русском и сербском языке', sr: 'Pregledi na ruskom i srpskom jeziku' },
    'home.hero_hint': { ru: 'Удобное время онлайн', sr: 'Pogodan termin online' },
    'home.where_label': { ru: 'Где я принимаю', sr: 'Gde primam pacijente' },
    'home.where_title': { ru: 'Оптика Ginter, в центре Нови-Сада', sr: 'Optika Ginter, u centru Novog Sada' },
    'home.where_img1_alt': { ru: 'Оптика Ginter — зал', sr: 'Optika Ginter — salon' },
    'home.where_img2_alt': { ru: 'Оптика Ginter — кабинет проверки зрения', sr: 'Optika Ginter — kabinet za pregled vida' },
    'home.where_text': { ru: 'Работаю в Оптике Ginter, Trg Republike 25 — семейной оптике, где ценят профессионализм и тёплое отношение к каждому клиенту.', sr: 'Radim u Optici Ginter, Trg Republike 25 — porodičnoj optici gde se neguje profesionalnost i topao odnos prema svakom klijentu.' },
    'home.reasons_label': { ru: 'С чем обращаются', sr: 'Sa čim se pacijenti obraćaju' },
    'home.reasons_title': { ru: 'Чем могу помочь', sr: 'Kako mogu da pomognem' },
    'home.reason1_problem': { ru: 'Стало хуже видно', sr: 'Vid je oslabio' },
    'home.reason1_solution': { ru: 'Подберу новую коррекцию под ваши потребности.', sr: 'Prilagodiću novu korekciju vašim potrebama.' },
    'home.reason2_problem': { ru: 'Не привыкаю к очкам', sr: 'Ne mogu da se naviknem na naočare' },
    'home.reason2_solution': { ru: 'Разберу причину и предложу решение.', sr: 'Ustanoviću uzrok i predložiti rešenje.' },
    'home.reason3_problem': { ru: 'Сложный случай', sr: 'Složen slučaj' },
    'home.reason3_solution': { ru: 'Большие диоптрии, астигматизм, разница между глазами — разберёмся вместе.', sr: 'Velike dioptrije, astigmatizam, razlika između očiju — rešićemo zajedno.' },
    'home.reason4_problem': { ru: 'Нужны очки, но не знаете, с чего начать', sr: 'Potrebne su vam naočare, ali ne znate odakle da počnete' },
    'home.reason4_solution': { ru: 'Всё объясню и помогу с выбором — и взрослым, и детям.', sr: 'Sve ću objasniti i pomoći sa izborom — i odraslima i deci.' },
    'home.audience_label': { ru: 'Важно', sr: 'Važno' },
    'home.audience_title': { ru: 'Взрослым и детям', sr: 'Odraslima i deci' },
    'home.audience1_title': { ru: 'Взрослым', sr: 'Odraslima' },
    'home.audience1_text': { ru: 'Полная проверка зрения, подбор очков и контактных линз, рекомендации и сопровождение до результата.', sr: 'Kompletan pregled vida, izbor naočara i kontaktnih sočiva, preporuke i podrška do konačnog rezultata.' },
    'home.audience2_title': { ru: 'Детям', sr: 'Deci' },
    'home.audience2_text': { ru: 'Если у ребёнка плохое зрение — буду рада помочь подобрать правильные и удобные очки. Саму проверку зрения должен провести детский врач-офтальмолог, а я подключаюсь после — с выбором оправы, линз и оформлением заказа.', sr: 'Ako dete ima slabiji vid — rado ću pomoći da izaberete prave i udobne naočare. Sam pregled vida treba da obavi dečji oftalmolog, a ja se uključujem posle — pri izboru okvira, sočiva i naručivanju naočara.' },
    'home.cta_sub': { ru: 'Пройдите в форму онлайн-записи, выберите удобное время и вид приёма, заполните анкету — и Telegram-бот пришлёт подтверждение со всей информацией о приёме.', sr: 'Otvorite formular za online zakazivanje, izaberite pogodan termin i vrstu pregleda, popunite upitnik — Telegram bot će vam poslati potvrdu sa svim informacijama o terminu.' },

    /* ===== ABOUT (obo-mne.html) ===== */
    'about.meta_title': { ru: 'Обо мне — Анна Новосёлова, оптометрист', sr: 'O meni — Ana Novoselova, optometrista' },
    'about.meta_description': { ru: 'Анна Новосёлова — медицинский оптик и оптометрист в Нови Саде. Работаю в оптике с 2004 года, веду приём в оптике Ginter.', sr: 'Ana Novoselova — medicinski optičar i optometrista u Novom Sadu. U optici radim od 2004. godine, preglede obavljam u optici Ginter.' },
    'about.toc_edu': { ru: 'Образование и опыт', sr: 'Obrazovanje i iskustvo' },
    'about.toc_diplomas': { ru: 'Дипломы', sr: 'Diplome' },
    'about.toc_approach': { ru: 'Мой подход', sr: 'Moj pristup' },
    'about.hero_name': { ru: 'Анна Новосёлова', sr: 'Ana Novoselova' },
    'about.hero_role': { ru: 'Медицинский оптик · Оптометрист', sr: 'Medicinski optičar · Optometrista' },
    'about.hero_p1': { ru: 'Я специалист по проверке зрения, подбору очков и контактных линз.', sr: 'Ja sam stručnjak za pregled vida, izbor naočara i kontaktnih sočiva.' },
    'about.hero_p2': { ru: 'Помогаю разобраться со зрением: от первичной проверки до подбора коррекции — в том числе в сложных случаях: астигматизм, большая разница между глазами, сложности с привыканием к очкам.', sr: 'Pomažem da razumete svoj vid: od prvog pregleda do izbora korekcije — uključujući složene slučajeve: astigmatizam, veliku razliku između očiju, teškoće pri navikavanju na naočare.' },
    'about.hero_p3': { ru: 'Работаю в оптике с 2004 года. В 2014 получила классическое медицинское образование по специальности медицинский оптик, оптометрист. Работала в Санкт-Петербурге как с пациентами, так и мастером по изготовлению очков.', sr: 'U optici radim od 2004. godine. Klasično medicinsko obrazovanje za medicinskog optičara i optometristu stekla sam 2014. Radila sam u Sankt Peterburgu, i sa pacijentima i kao majstor za izradu naočara.' },
    'about.hero_p4': { ru: 'После переезда в Сербию в 2024 году продолжаю практику в Нови Саде. Веду офлайн-приём в оптике Ginter и онлайн-консультации. Придерживаюсь принципов доказательной медицины. Вижу в каждом пациенте человека!', sr: 'Nakon preseljenja u Srbiju 2024. godine, nastavljam praksu u Novom Sadu. Preglede obavljam uživo u optici Ginter, kao i putem online konsultacija. Držim se principa medicine zasnovane na dokazima. U svakom pacijentu vidim čoveka!' },
    'about.qualif_title': { ru: 'Квалификация', sr: 'Kvalifikacije' },
    'about.fact1_text': { ru: 'лет работы в оптике', sr: 'godina rada u optici' },
    'about.fact2_text': { ru: 'лет практики оптометрии', sr: 'godina prakse u optometriji' },
    'about.edu1_title': { ru: 'Медицинский оптик', sr: 'Medicinski optičar' },
    'about.edu1_desc': { ru: 'СПБ МТК — Санкт-Петербургский медико-технический колледж', sr: 'SPB MTK — Sankt-peterburški medicinsko-tehnički koledž' },
    'about.edu2_title': { ru: 'Оптометрист', sr: 'Optometrista' },
    'about.edu2_desc': { ru: 'СПБ МТК — специализация в области оптометрии', sr: 'SPB MTK — specijalizacija iz oblasti optometrije' },
    'about.doc1_alt': { ru: 'Диплом медицинского оптика', sr: 'Diploma medicinskog optičara' },
    'about.doc2_alt': { ru: 'Диплом оптометриста', sr: 'Diploma optometriste' },
    'about.approach_label': { ru: 'Подход', sr: 'Pristup' },
    'about.approach_title': { ru: 'Как я работаю', sr: 'Kako radim' },
    'about.appr1_title': { ru: 'Подробный сбор анамнеза', sr: 'Detaljno uzimanje anamneze' },
    'about.appr1_text': { ru: 'Восстанавливаю историю ношения очков: как менялось зрение с самого начала, какие очки были раньше, что не устраивает сейчас. Собираю анамнез по заболеваниям и состояниям, которые могут повлиять на зрение и подбор коррекции. Проверяю параметры старых очков.', sr: 'Rekonstruišem istoriju nošenja naočara: kako se vid menjao od samog početka, kakve su naočare bile ranije, šta trenutno ne odgovara. Uzimam anamnezu o bolestima i stanjima koja mogu uticati na vid i izbor korekcije. Proveravam parametre starih naočara.' },
    'about.appr2_title': { ru: 'Объясняю понятно', sr: 'Objašnjavam razumljivo' },
    'about.appr2_text': { ru: 'Никаких терминов без объяснений. Пациент уходит с пониманием того, что происходит с его зрением, какие очки и для чего ему нужны.', sr: 'Nema stručnih termina bez objašnjenja. Pacijent odlazi sa jasnim razumevanjem šta se dešava sa njegovim vidom i zašto su mu potrebne baš takve naočare.' },
    'about.appr3_title': { ru: 'Сопровождаю до получения готовых очков', sr: 'Pratim vas do preuzimanja gotovih naočara' },
    'about.appr3_text': { ru: 'В мой приём включена не только проверка зрения и выдача рекомендаций. Я буду рядом в оптике при выборе оправы и линз, при получении очков и на всём периоде адаптации.', sr: 'Moj pregled ne obuhvata samo proveru vida i davanje preporuka. Biću uz vas u optici prilikom izbora okvira i sočiva, pri preuzimanju naočara i tokom celog perioda adaptacije.' },
    'about.appr4_title': { ru: 'На связи после приёма', sr: 'Dostupna sam i posle pregleda' },
    'about.appr4_text': { ru: 'Если что-то не так — неудобные очки, дискомфорт в линзах, трудности с адаптацией к новой коррекции — просто напишите. Найдём решение вместе.', sr: 'Ako nešto nije u redu — neudobne naočare, nelagodnost sa sočivima, teškoće pri navikavanju na novu korekciju — samo napišite. Rešićemo to zajedno.' },

    /* ===== SERVICES (uslugi.html) ===== */
    'services.meta_title': { ru: 'Услуги и цены — Анна Новосёлова', sr: 'Usluge i cene — Ana Novoselova' },
    'services.meta_description': { ru: 'Стоимость приёма оптометриста в Нови Саде. Первичный и повторный приём, подбор очков и контактных линз, контрольный визит. Оптика Ginter.', sr: 'Cena pregleda kod optometriste u Novom Sadu. Prvi i kontrolni pregled, izbor naočara i kontaktnih sočiva. Optika Ginter.' },
    'services.h1': { ru: 'Стоимость приёма', sr: 'Cena pregleda' },
    'services.lead': { ru: 'Я принимаю в Оптике Ginter, в центре Нови Сада. Запись обязательна.', sr: 'Preglede obavljam u Optici Ginter, u centru Novog Sada. Zakazivanje je obavezno.' },
    'services.item1_title': { ru: 'Проверка зрения, подбор очков и контактных линз', sr: 'Pregled vida, izbor naočara i kontaktnih sočiva' },
    'services.item1_desc': { ru: 'Часовая консультация с обследованием и подбором очков и контактных линз.', sr: 'Jednosatna konsultacija sa pregledom i izborom naočara i kontaktnih sočiva.' },
    'services.item1_time': { ru: '60 минут', sr: '60 minuta' },
    'services.acc_includes': { ru: 'Что входит в приём', sr: 'Šta obuhvata pregled' },
    'services.item1_li1': { ru: 'Подробный сбор анамнеза', sr: 'Detaljno uzimanje anamneze' },
    'services.item1_li2': { ru: 'Обследование на авторефкератометре (объективная рефракция)', sr: 'Pregled na autorefraktometru (objektivna refrakcija)' },
    'services.item1_li3': { ru: 'Проверка остроты зрения', sr: 'Provera oštrine vida' },
    'services.item1_li4': { ru: 'Субъективная проверка рефракции пробным набором линз', sr: 'Subjektivna provera refrakcije probnim setom sočiva' },
    'services.item1_li5': { ru: 'Подбор очков с учётом особенностей зрительной работы', sr: 'Izbor naočara u skladu sa vašim vizuelnim potrebama' },
    'services.item1_li6': { ru: 'Рекомендации и разъяснения по вашей ситуации', sr: 'Preporuke i objašnjenja vezana za vašu situaciju' },
    'services.item1_li7': { ru: 'Сопровождение в оптике при заказе очков', sr: 'Podrška u optici prilikom naručivanja naočara' },
    'services.note_ophthalmologist': { ru: 'На приёме оптометриста не проводится циклоплегия (расширение зрачка), осмотр глазного дна и измерение внутриглазного давления. Это делает офтальмолог — врач, который также диагностирует и лечит глазные заболевания (катаракту, глаукому, патологии сетчатки и т.п.).', sr: 'Na pregledu kod optometriste ne vrši se cikloplegija (širenje zenice), pregled očnog dna niti merenje očnog pritiska. To radi oftalmolog — lekar koji takođe dijagnostikuje i leči očna oboljenja (kataraktu, glaukom, oboljenja mrežnjače i sl.).' },
    'services.link_appointment': { ru: 'О том, как проходит приём →', sr: 'O tome kako izgleda pregled →' },
    'services.currency_din': { ru: 'дин', sr: 'din.' },
    'services.item2_title': { ru: 'Проверка зрения, подбор контактных линз', sr: 'Pregled vida, izbor kontaktnih sočiva' },
    'services.item2_desc': { ru: 'Практическое обучение снятию/надеванию контактных линз.', sr: 'Praktična obuka za stavljanje i skidanje kontaktnih sočiva.' },
    'services.item2_time': { ru: '90–120 минут', sr: '90–120 minuta' },
    'services.item2_li2': { ru: 'Обследование на авторефкератометре', sr: 'Pregled na autorefraktometru' },
    'services.item2_li4': { ru: 'Субъективная проверка рефракции, подбор параметров линз', sr: 'Subjektivna provera refrakcije, izbor parametara sočiva' },
    'services.item2_li5': { ru: 'Теоретическая часть: правила безопасного ношения контактных линз', sr: 'Teorijski deo: pravila bezbednog nošenja kontaktnih sočiva' },
    'services.item2_li6': { ru: 'Специалист покажет на себе, как надевать и снимать линзу, затем наденет линзу вам', sr: 'Specijalista će prvo na sebi pokazati kako se sočivo stavlja i skida, a zatim će vama staviti sočivo' },
    'services.item2_li7': { ru: 'Вы будете тренироваться сами под контролем специалиста, пока не начнёт получаться уверенно', sr: 'Sami ćete vežbati pod nadzorom specijaliste, dok ne budete sigurni u to' },
    'services.item3_title': { ru: 'Контрольный визит', sr: 'Kontrolna poseta' },
    'services.item3_desc': { ru: 'Контрольный визит после получения очков.', sr: 'Kontrolna poseta nakon preuzimanja naočara.' },
    'services.time_15': { ru: '15 минут', sr: '15 minuta' },
    'services.free': { ru: 'Бесплатно', sr: 'Besplatno' },
    'services.item4_title': { ru: 'Помощь при оформлении заказа', sr: 'Pomoć pri naručivanju naočara' },
    'services.item4_desc': { ru: 'Если есть рецепт на очки, но нужна помощь в оптике, в том числе с детскими очками.', sr: 'Ako imate recept za naočare, ali vam je potrebna pomoć u optici, uključujući i dečje naočare.' },
    'services.item4_acc_summary': { ru: 'Чем могу помочь', sr: 'Kako mogu da pomognem' },
    'services.item4_li1': { ru: 'Помощь в подборе оправы', sr: 'Pomoć pri izboru okvira' },
    'services.item4_li2': { ru: 'Рекомендации по посадке, качеству и техническим ограничениям в соответствии с вашим рецептом', sr: 'Preporuke o pristajanju, kvalitetu i tehničkim ograničenjima u skladu sa vašim receptom' },
    'services.item4_li3': { ru: 'Помощь с выбором очковых линз — объясню разницу, подберу варианты под ваш бюджет', sr: 'Pomoć pri izboru stakala za naočare — objasniću razlike i predložiti opcije prema vašem budžetu' },
    'services.item4_li4': { ru: 'Ремонт очков', sr: 'Popravka naočara' },
    'services.item4_li5': { ru: 'Проверка соответствия изготовленных очков вашему рецепту', sr: 'Provera da li izrađene naočare odgovaraju vašem receptu' },
    'services.item5_title': { ru: 'Повторный приём', sr: 'Ponovljeni pregled' },
    'services.item5_desc': { ru: 'В течение 6 месяцев после первичного.', sr: 'U roku od 6 meseci od prvog pregleda.' },
    'services.item6_title': { ru: 'Экспресс-диагностика зрения', sr: 'Ekspresna dijagnostika vida' },
    'services.item6_desc': { ru: 'Экспресс-чекап: нужны ли новые очки (не полноценная проверка зрения).', sr: 'Ekspresna provera: da li su vam potrebne nove naočare (nije kompletan pregled vida).' },
    'services.item6_acc1_summary': { ru: 'Что входит', sr: 'Šta obuhvata' },
    'services.item6_li1': { ru: 'Авторефрактометрия (проверка на аппарате)', sr: 'Autorefraktometrija (provera na aparatu)' },
    'services.item6_li2': { ru: 'Проверка остроты зрения без коррекции', sr: 'Provera oštrine vida bez korekcije' },
    'services.item6_li3': { ru: 'Проверка остроты зрения в ваших очках', sr: 'Provera oštrine vida sa vašim naočarama' },
    'services.item6_result': { ru: 'В результате вы получите: понимание, пора ли заказывать первые очки или менять старые, направление к офтальмологу при необходимости, общие рекомендации по состоянию зрения.', sr: 'Na osnovu rezultata dobićete: jasnu sliku da li je vreme za prve naočare ili zamenu starih, upućivanje kod oftalmologa ako je potrebno, opšte preporuke o stanju vida.' },
    'services.item6_acc2_summary': { ru: 'Подходит ли мне экспресс-проверка?', sr: 'Da li mi odgovara ekspresna provera?' },
    'services.item6_g1_title': { ru: 'Подойдёт, если:', sr: 'Odgovara vam ako:' },
    'services.item6_g1_li1': { ru: 'Зрение начало портиться, но не уверены — нужны ли очки', sr: 'Vid je počeo da slabi, ali niste sigurni da li su vam potrebne naočare' },
    'services.item6_g1_li2': { ru: 'Очки стали слабоваты', sr: 'Naočare su postale preslabe' },
    'services.item6_g1_li3': { ru: 'Хотите проверить, что очки подобраны верно', sr: 'Želite da proverite da li su naočare pravilno izabrane' },
    'services.item6_g2_title': { ru: 'Нужен полноценный приём, если:', sr: 'Potreban vam je kompletan pregled ako:' },
    'services.item6_g2_li1': { ru: 'Нужен подбор очков/контактных линз, в т.ч. прогрессивных/офисных', sr: 'Potreban vam je izbor naočara/kontaktnih sočiva, uključujući progresivna ili radna' },
    'services.item6_g2_li2': { ru: 'Давно не проверяли зрение, были сложности с подбором', sr: 'Odavno niste proveravali vid ili ste imali poteškoća pri izboru' },
    'services.item6_g2_li3': { ru: 'Есть астигматизм, амблиопия, анизометропия и т.п.', sr: 'Imate astigmatizam, ambliopiju, anizometropiju i slično' },
    'services.item6_g2_li4': { ru: 'Пациент младше 20 лет', sr: 'Pacijent je mlađi od 20 godina' },
    'services.payment_title': { ru: 'Оплата', sr: 'Plaćanje' },
    'services.pay1_title': { ru: 'Консультация (приём)', sr: 'Konsultacija (pregled)' },
    'services.pay1_text': { ru: 'Оплата только наличными.', sr: 'Plaćanje isključivo gotovinom.' },
    'services.pay2_title': { ru: 'Готовые очки и контактные линзы', sr: 'Gotove naočare i kontaktna sočiva' },
    'services.pay2_text': { ru: 'Можно оплатить картой или наличными — при получении заказа.', sr: 'Može se platiti karticom ili gotovinom — prilikom preuzimanja porudžbine.' },
    'services.note_booking_required': { ru: 'Запись обязательна', sr: 'Zakazivanje je obavezno' },
    'services.section2_label': { ru: 'Что входит в приём', sr: 'Šta obuhvata pregled' },
    'services.section2_title': { ru: 'Из чего состоит приём', sr: 'Od čega se sastoji pregled' },
    'services.step1_title': { ru: 'Сбор анамнеза', sr: 'Uzimanje anamneze' },
    'services.step1_text': { ru: 'Подробно разбираем историю вашего зрения, жалобы и цели — это влияет на весь подбор.', sr: 'Detaljno prolazimo kroz istoriju vašeg vida, tegobe i ciljeve — to utiče na ceo proces izbora.' },
    'services.step2_title': { ru: 'Объективное обследование', sr: 'Objektivni pregled' },
    'services.step2_text': { ru: 'Авторефкератометрия — прибор считывает объективную рефракцию. Отправная точка подбора.', sr: 'Autorefraktometrija — aparat očitava objektivnu refrakciju. To je polazna tačka za izbor korekcije.' },
    'services.step3_title': { ru: 'Субъективный подбор', sr: 'Subjektivni izbor' },
    'services.step3_text': { ru: 'С пробными линзами определяем оптимальную коррекцию под ваш образ жизни и нагрузки.', sr: 'Pomoću probnih sočiva određujemo optimalnu korekciju prilagođenu vašem načinu života i potrebama.' },
    'services.step4_title': { ru: 'Карточка и помощь в оптике', sr: 'Kartica i pomoć u optici' },
    'services.step4_text': { ru: 'Распечатываю карточку с результатами, объясняю простыми словами, помогаю оформить заказ.', sr: 'Štampam karticu sa rezultatima, objašnjavam jednostavnim rečima i pomažem pri naručivanju.' },
    'services.more_about_appointment': { ru: 'Подробнее о приёме', sr: 'Više o pregledu' },

    /* ===== APPOINTMENT (priem.html) ===== */
    'appointment.meta_title': { ru: 'Как проходит приём — Анна Новосёлова', sr: 'Kako izgleda pregled — Ana Novoselova' },
    'appointment.meta_description': { ru: 'Подробно о приёме оптометриста в Нови Саде. Анна Новосёлова, оптика Ginter.', sr: 'Detaljno o pregledu kod optometriste u Novom Sadu. Ana Novoselova, optika Ginter.' },
    'appointment.page_label': { ru: 'Приём', sr: 'Pregled' },
    'appointment.toc2': { ru: 'Как подготовиться', sr: 'Kako se pripremiti' },
    'appointment.toc3': { ru: 'Как записаться', sr: 'Kako se zakazati' },
    'appointment.h1': { ru: 'Как проходит приём, и почему он длится час', sr: 'Kako izgleda pregled i zašto traje sat vremena' },
    'appointment.lead': { ru: 'Некоторые пациенты удивляются: зачем целый час на подбор очков? Расскажу подробно — считаю важным, чтобы вы знали, что вас ждёт.', sr: 'Neki pacijenti se iznenade: zašto je za izbor naočara potreban čitav sat? Objasniću detaljno — smatram važnim da znate šta vas očekuje.' },
    'appointment.photo1_alt': { ru: 'Пробный набор очковых линз и пробная оправа для проверки зрения', sr: 'Probni set sočiva i probni okvir za pregled vida' },
    'appointment.caption1': { ru: 'Пробный набор линз и пробная оправа — с их помощью подбирается коррекция', sr: 'Probni set sočiva i probni okvir — uz njihovu pomoć se bira korekcija' },
    'appointment.h2_1': { ru: 'До приёма: анкета', sr: 'Pre pregleda: upitnik' },
    'appointment.p1': { ru: 'При записи я прошу заполнить <strong>анкету</strong> — с вопросами о целях визита, последнем посещении офтальмолога, наличии заболеваний и состояний, которые могут влиять на зрение. Жду честных и развёрнутых ответов: от этого во многом зависит качество консультации.', sr: 'Prilikom zakazivanja tražim da popunite <strong>upitnik</strong> — sa pitanjima o cilju posete, poslednjoj poseti oftalmologu, bolestima i stanjima koja mogu uticati na vid. Očekujem iskrene i detaljne odgovore: od toga u velikoj meri zavisi kvalitet konsultacije.' },
    'appointment.p2': { ru: 'Когда получаю анкету — изучаю её, и если есть вопросы, могу уточнить их <strong>до приёма</strong>.', sr: 'Kada dobijem upitnik — proučim ga, i ako imam pitanja, mogu ih razjasniti <strong>pre pregleda</strong>.' },
    'appointment.insight1': { ru: 'Если не собрать анамнез заранее, можно начать обследование — и посередине понять, что продолжать бессмысленно: пациента всё равно нужно направить к офтальмологу. Анкета экономит время и деньги.', sr: 'Ako se anamneza ne prikupi unapred, može se desiti da pregled počne, a na pola shvatimo da nema smisla nastaviti — pacijenta svakako treba uputiti kod oftalmologa. Upitnik štedi vreme i novac.' },
    'appointment.p3': { ru: 'После получения анкеты я отправляю подтверждение: дату, время, адрес, стоимость приёма и инструкции по подготовке.', sr: 'Nakon što dobijem upitnik, šaljem potvrdu: datum, vreme, adresu, cenu pregleda i uputstva za pripremu.' },
    'appointment.h2_2': { ru: 'Анамнез и объяснение', sr: 'Anamneza i objašnjenje' },
    'appointment.p4': { ru: 'Четыре этапа консультации:', sr: 'Četiri faze konsultacije:' },
    'appointment.step1_p1': { ru: 'Подробно расспрашиваю о перенесённых заболеваниях, травмах, жалобах — и об истории зрения: с какого возраста упало, как носили очки, когда меняли.', sr: 'Detaljno raspitujem o preležanim bolestima, povredama, tegobama — i o istoriji vida: od kog uzrasta je opao, kako su nošene naočare, kada su menjane.' },
    'appointment.step1_p2': { ru: 'Потом почти всегда <strong>рисую</strong> — глаз и ход лучей (да-да, физика 8 класса). На схеме объясняю, почему сейчас видно так, и что изменится после коррекции.', sr: 'Zatim skoro uvek <strong>crtam</strong> — oko i putanju zraka svetlosti (da, fizika iz osnovne škole). Na šemi objašnjavam zašto sada tako vidite i šta će se promeniti nakon korekcije.' },
    'appointment.insight2': { ru: 'Около 80% пациентов не понимают, почему им нужны очки — просто носят, потому что врач сказал. Когда человек понимает, что происходит с его зрением, уходит тревога и появляется осознанность. Я уделяю этому время сознательно.', sr: 'Oko 80% pacijenata ne razume zašto su im naočare potrebne — jednostavno ih nose jer je lekar tako rekao. Kada osoba razume šta se dešava sa njenim vidom, nestaje strepnja i javlja se svesnost. Tome svesno posvećujem vreme.' },
    'appointment.step2_title': { ru: 'Обследование', sr: 'Pregled' },
    'appointment.step2_li1': { ru: '<strong>Объективная рефракция</strong> — авторефкератометр считывает показатели глаза, пока вы смотрите на воздушный шар внутри прибора.', sr: '<strong>Objektivna refrakcija</strong> — autorefraktometar očitava parametre oka dok gledate u balon unutar aparata.' },
    'appointment.step2_li2': { ru: '<strong>Субъективная рефракция</strong> — с помощью пробного набора линз и пробной оправы проверяется острота зрения.', sr: '<strong>Subjektivna refrakcija</strong> — pomoću probnog seta sočiva i probnog okvira proverava se oštrina vida.' },
    'appointment.photo2_alt': { ru: 'Кабинет проверки зрения', sr: 'Kabinet za pregled vida' },
    'appointment.caption2': { ru: 'Кабинет — авторефкератометр и рабочее место оптометриста', sr: 'Kabinet — autorefraktometar i radno mesto optometriste' },
    'appointment.step3_title': { ru: 'Подбор очков', sr: 'Izbor naočara' },
    'appointment.step3_p1': { ru: 'Учитываю запрос и особенности зрительной работы: расстояние до монитора, до швейной машинки, до холста. Процессу подбора уделяю столько времени, сколько нужно — это нормально.', sr: 'Uzimam u obzir vaše potrebe i specifičnosti vizuelnog rada: udaljenost do monitora, šivaće mašine, platna za slikanje. Procesu izbora posvećujem onoliko vremena koliko je potrebno — to je sasvim normalno.' },
    'appointment.step4_title': { ru: 'Рекомендации и сопровождение', sr: 'Preporuke i podrška' },
    'appointment.step4_p1': { ru: 'По итогам обследования распечатываю карточку с результатами и рекомендациями. Даю схему адаптации к новым очкам, а в сложных случаях — стратегию постепенной смены коррекции.', sr: 'Nakon pregleda štampam karticu sa rezultatima i preporukama. Dajem plan adaptacije na nove naočare, a u složenim slučajevima — strategiju postepene promene korekcije.' },
    'appointment.step4_p2': { ru: 'Если остаётся время — провожаю в оптику. Помогаю выбрать оправу, подбираю линзы под бюджет и задачи, проверяю посадку, делаю разметку.', sr: 'Ako ostane vremena — idem sa vama u optiku. Pomažem pri izboru okvira, biram sočiva prema budžetu i potrebama, proveravam pristajanje i vršim markiranje.' },
    'appointment.step4_p3': { ru: 'После получения очков <strong>я остаюсь на связи</strong> — можно писать и спрашивать, отвечу в свободное время.', sr: 'Nakon preuzimanja naočara <strong>ostajem dostupna</strong> — možete pisati i pitati, odgovoriću u slobodno vreme.' },
    'appointment.prep_label': { ru: 'Перед приёмом', sr: 'Pre pregleda' },
    'appointment.prep_title': { ru: 'Как подготовиться', sr: 'Kako se pripremiti' },
    'appointment.prep1_title': { ru: 'Возьмите всё, что есть', sr: 'Ponesite sve što imate' },
    'appointment.prep1_text': { ru: 'Все очки с диоптриями, обследования от врача — даже старые и сломанные. Это важно для корректного подбора коррекции.', sr: 'Sve naočare sa dioptrijom, nalaze od lekara — čak i stare i polomljene. To je važno za tačan izbor korekcije.' },
    'appointment.prep2_title': { ru: 'Отдохните от экрана', sr: 'Odmorite oči od ekrana' },
    'appointment.prep2_text': { ru: 'За 30 минут до приёма прекратите активную зрительную нагрузку — перестаньте работать за компьютером или телефоном, дайте глазам отдохнуть.', sr: '30 minuta pre pregleda prestanite sa aktivnim naprezanjem očiju — prekinite rad na kompjuteru ili telefonu i dajte očima da se odmore.' },
    'appointment.prep3_title': { ru: 'Снимите контактные линзы', sr: 'Skinite kontaktna sočiva' },
    'appointment.prep3_text': { ru: 'За 20 минут до приёма снимите линзы, чтобы глаза отдохнули. Можно снять прямо в оптике — возьмите контейнер и раствор и придите за 20 минут до назначенного времени.', sr: '20 minuta pre pregleda skinite sočiva da bi se oči odmorile. Sočiva možete skinuti i u optici — ponesite kutijicu i rastvor i dođite 20 minuta ranije.' },
    'appointment.prep4_title': { ru: 'Если планы изменились', sr: 'Ako se planovi promene' },
    'appointment.prep4_text': { ru: 'Сообщите заранее в Telegram <a href="https://t.me/AnnaNvslv">@AnnaNvslv</a> — перенесём или отменим без проблем. Если остались вопросы до приёма — тоже пишите, обсудим.', sr: 'Javite mi unapred na Telegram <a href="https://t.me/AnnaNvslv">@AnnaNvslv</a> — bez problema ćemo pomeriti ili otkazati termin. Ako imate pitanja pre pregleda — takođe pišite, dogovorićemo se.' },
    'appointment.booking_label': { ru: 'Онлайн-запись', sr: 'Online zakazivanje' },
    'appointment.booking_direct': { ru: 'Или напишите напрямую: <a href="https://t.me/AnnaNvslv" target="_blank">@AnnaNvslv</a> в Telegram', sr: 'Ili pišite direktno: <a href="https://t.me/AnnaNvslv" target="_blank">@AnnaNvslv</a> na Telegramu' },
    'appointment.cta_sub': { ru: 'Приём длится 1 час. Принимаю в Нови Саде, в оптике Ginter.', sr: 'Pregled traje 1 sat. Primam u Novom Sadu, u optici Ginter.' },

    /* ===== PROMO (akcii.html) ===== */
    'promo.meta_title': { ru: 'Акции — Анна Новосёлова, оптика Ginter', sr: 'Akcije — Ana Novoselova, optika Ginter' },
    'promo.meta_description': { ru: 'Актуальные акции и спецпредложения на очки, линзы и контактные линзы в оптике Ginter, Нови Сад.', sr: 'Aktuelne akcije i specijalne ponude za naočare, stakla i kontaktna sočiva u optici Ginter, Novi Sad.' },
    'promo.h1': { ru: 'Акции и спецпредложения', sr: 'Akcije i specijalne ponude' },
    'promo.lead': { ru: 'Актуальные скидки на очки, линзы и контактные линзы в оптике Ginter.', sr: 'Aktuelni popusti na naočare, stakla i kontaktna sočiva u optici Ginter.' },
    'promo.active_heading': { ru: 'Действуют сейчас', sr: 'Trenutno aktivno' },
    'promo.badge_active': { ru: '⚡️ Активна', sr: '⚡️ Aktivna' },
    'promo.card1_title': { ru: 'Скидка -20% на линзы при покупке оправы', sr: 'Popust -20% na stakla uz kupovinu okvira' },
    'promo.card1_lead': { ru: 'Если вы давно планировали новые очки — сейчас самый удачный момент.', sr: 'Ako ste odavno planirali nove naočare — sada je pravi trenutak.' },
    'promo.tags_intro': { ru: 'В акции участвуют все виды линз:', sr: 'U akciji učestvuju sve vrste stakala:' },
    'promo.tag1': { ru: '🟡 Однофокальные', sr: '🟡 Jednofokalna' },
    'promo.tag2': { ru: '🟡 Прогрессивные (мультифокальные)', sr: '🟡 Progresivna (multifokalna)' },
    'promo.tag3': { ru: '🟡 Фотохромные (хамелеоны)', sr: '🟡 Fotohromatska (samozatamnjujuća)' },
    'promo.tag4': { ru: '🟡 Stellest — контроль миопии у детей', sr: '🟡 Stellest — kontrola miopije kod dece' },
    'promo.tag5': { ru: '🟡 И все остальные', sr: '🟡 I sva ostala' },
    'promo.code_label': { ru: '🎁 Промокод:', sr: '🎁 Promo kod:' },
    'promo.code_note': { ru: '— и салфетка для очков в подарок', sr: '— uz poklon krpicu za naočare' },
    'promo.valid': { ru: 'Акция действует до 31 июля 2026', sr: 'Akcija traje do 31. jula 2026.' },
    'promo.ask_telegram': { ru: 'Спросить в Telegram', sr: 'Pitajte na Telegramu' },
    'promo.archive_heading': { ru: 'Архив акций', sr: 'Arhiva akcija' },
    'promo.archive_empty': { ru: 'Завершённые акции появятся здесь', sr: 'Završene akcije će se pojaviti ovde' },
    'promo.cta_title': { ru: 'Не хотите пропустить новую акцию?', sr: 'Ne želite da propustite novu akciju?' },
    'promo.cta_sub': { ru: 'Следите за новостями в Instagram и Telegram-канале оптики.', sr: 'Pratite novosti na Instagramu i Telegram kanalu optike.' },
    'promo.cta_instagram': { ru: 'Instagram оптики', sr: 'Instagram optike' },

    /* ===== VISION (o-zrenii.html) ===== */
    'vision.meta_title': { ru: 'О зрении — Анна Новосёлова', sr: 'O vidu — Ana Novoselova' },
    'vision.meta_description': { ru: 'Статьи об оптометрии, очках и контактных линзах от оптометриста Анны Новосёловой.', sr: 'Članci o optometriji, naočarima i kontaktnim sočivima autorke, optometristkinje Ane Novoselove.' },
    'vision.h1': { ru: 'Статьи', sr: 'Članci' },
    'vision.lead': { ru: 'Полезная информация о зрении, очках и контактных линзах.', sr: 'Korisne informacije o vidu, naočarima i kontaktnim sočivima.' },
    'vision.art1_alt': { ru: 'Фотохромные линзы', sr: 'Fotohromatska sočiva' },
    'vision.tag_lenses': { ru: 'Очковые линзы', sr: 'Stakla za naočare' },
    'vision.art1_title': { ru: 'Фотохромные линзы-хамелеоны: как работают и цены', sr: 'Fotohromatska (samozatamnjujuća) stakla: kako rade i cene' },
    'vision.art1_desc': { ru: 'Одна пара очков для улицы и помещения. Polo Photomatik от 6 000 дин., Transitions от 18 000 дин. Специальные варианты для водителей.', sr: 'Jedan par naočara za spolja i unutra. Polo Photomatik od 6.000 din., Transitions od 18.000 din. Postoje i posebne varijante za vozače.' },
    'vision.tag_lenses_contact': { ru: 'Контактные линзы', sr: 'Kontaktna sočiva' },
    'vision.art2_title': { ru: 'Acuvue Oasys в Сербии: цена до 30 июня', sr: 'Acuvue Oasys u Srbiji: cena do 30. juna' },
    'vision.art2_desc': { ru: 'Двухнедельные от 2 800 дин., однодневные от 3 300 дин. Без наценки, с доставкой в оптику Ginter.', sr: 'Dvonedeljna od 2.800 din., dnevna od 3.300 din. Bez marže, sa dostavom u optiku Ginter.' },
    'vision.art3_alt': { ru: 'Сухость глаз', sr: 'Suvo oko' },
    'vision.tag_care': { ru: 'Уход за глазами', sr: 'Nega očiju' },
    'vision.art3_title': { ru: 'Сухость глаз: какие капли выбрать?', sr: 'Suvo oko: koje kapi izabrati?' },
    'vision.art3_desc': { ru: 'Жжение, покраснение, ощущение песка — как выбрать подходящие капли и когда обратиться к офтальмологу.', sr: 'Peckanje, crvenilo, osećaj peska u očima — kako izabrati odgovarajuće kapi i kada se obratiti oftalmologu.' },
    'vision.tag_teens': { ru: 'Дети и подростки', sr: 'Deca i tinejdžeri' },
    'vision.art4_alt': { ru: 'Проверка зрения подростку в оптике', sr: 'Pregled vida kod tinejdžera u optici' },
    'vision.art4_title': { ru: 'Можно ли проверить зрение подростку в оптике?', sr: 'Da li je moguće proveriti vid tinejdžeru u optici?' },
    'vision.art4_desc': { ru: 'Когда достаточно оптометриста, а когда необходим детский офтальмолог — и почему это важно для точной коррекции.', sr: 'Kada je dovoljan optometrista, a kada je neophodan dečji oftalmolog — i zašto je to važno za tačnu korekciju.' },
    'vision.back_link': { ru: '← О зрении', sr: '← O vidu' },
    'vision.cta_title': { ru: 'Есть вопрос по зрению?', sr: 'Imate pitanje o vidu?' },
    'vision.cta_sub': { ru: 'Запишитесь на приём или напишите в Telegram — отвечу.', sr: 'Zakažite pregled ili pišite na Telegram — odgovoriću.' },

    /* ===== CONTACTS (kontakty.html) ===== */
    'contacts.meta_title': { ru: 'Контакты — Анна Новосёлова, оптика Ginter', sr: 'Kontakt — Ana Novoselova, optika Ginter' },
    'contacts.meta_description': { ru: 'Контакты оптики Ginter в Нови Саде: адрес, телефон, режим работы, Telegram и Instagram. Приём оптометриста Анны Новосёловой.', sr: 'Kontakt podaci optike Ginter u Novom Sadu: adresa, telefon, radno vreme, Telegram i Instagram. Pregledi kod optometristkinje Ane Novoselove.' },
    'contacts.h1': { ru: 'Как нас найти', sr: 'Kako do nas' },
    'contacts.lead': { ru: 'Оптика Ginter в центре Нови Сада — здесь я веду приём. Пишите, звоните или приходите.', sr: 'Optika Ginter u centru Novog Sada — ovde primam pacijente. Pišite, zovite ili dođite.' },
    'contacts.addr_title': { ru: 'Адрес', sr: 'Adresa' },
    'contacts.addr_text': { ru: 'Оптика Ginter<br>Trg Republike 25, Novi Sad', sr: 'Optika Ginter<br>Trg Republike 25, Novi Sad' },
    'contacts.map_link': { ru: 'Открыть на карте →', sr: 'Otvori na mapi →' },
    'contacts.hours_title': { ru: 'Режим работы оптики', sr: 'Radno vreme optike' },
    'contacts.hours1': { ru: 'По будням: 09:00–19:00', sr: 'Radnim danima: 09:00–19:00' },
    'contacts.hours2': { ru: 'Суббота: 09:00–13:00', sr: 'Subota: 09:00–13:00' },
    'contacts.hours3': { ru: 'Воскресенье — выходной', sr: 'Nedeljom ne radimo' },
    'contacts.phone_title': { ru: 'Телефон оптики', sr: 'Telefon optike' },
    'contacts.telegram_text': { ru: 'По всем вопросам — напрямую мне: <a href="https://t.me/AnnaNvslv" target="_blank">@AnnaNvslv</a>', sr: 'Za sva pitanja — direktno meni: <a href="https://t.me/AnnaNvslv" target="_blank">@AnnaNvslv</a>' },
    'contacts.instagram_text': { ru: 'Фото, акции и новости оптики: <a href="https://instagram.com/optika_ginter" target="_blank">@optika_ginter</a>', sr: 'Fotografije, akcije i novosti iz optike: <a href="https://instagram.com/optika_ginter" target="_blank">@optika_ginter</a>' },
    'contacts.map_title': { ru: 'Оптика Ginter на карте', sr: 'Optika Ginter na mapi' },
    'contacts.map_link2': { ru: 'Открыть в Google Maps →', sr: 'Otvori u Google mapama →' },

    /* ===== BOOKING (zapis.html) ===== */
    'booking.meta_title': { ru: 'Онлайн-запись — Анна Новосёлова', sr: 'Online zakazivanje — Ana Novoselova' },
    'booking.meta_description': { ru: 'Запишитесь на приём к оптометристу Анне Новосёловой в Нови Саде. Оптика Ginter.', sr: 'Zakažite pregled kod optometristkinje Ane Novoselove u Novom Sadu. Optika Ginter.' },
    'booking.hero_sub': { ru: 'Выберите удобный слот в календаре — без звонков, в любое время суток.', sr: 'Izaberite slobodan termin u kalendaru — bez poziva, u bilo koje doba dana.' },
    'booking.btn_online': { ru: 'Онлайн-запись', sr: 'Online zakazivanje' },
    'booking.steps_heading': { ru: 'Шаги', sr: 'Koraci' },
    'booking.tg_title': { ru: 'Есть вопросы?', sr: 'Imate pitanja?' },
    'booking.tg_text': { ru: 'Напишите мне напрямую в Telegram — я обязательно отвечу.', sr: 'Pišite mi direktno na Telegram — sigurno ću odgovoriti.' },
    'booking.prep_link_text': { ru: 'Подробная инструкция — на странице «Приём».', sr: 'Detaljno uputstvo — na stranici „Pregled".' },
    'booking.check1_title': { ru: 'Длительность — 1 час', sr: 'Trajanje — 1 sat' },
    'booking.check1_text': { ru: 'Стоимость: 3 000 динар, оплата наличными. Очки и линзы можно оплатить картой.', sr: 'Cena: 3.000 dinara, plaćanje gotovinom. Naočare i sočiva mogu se platiti karticom.' },
    'booking.check2_title': { ru: 'Возьмите все очки', sr: 'Ponesite sve naočare' },
    'booking.check2_text': { ru: 'Все рецепты, обследования от врача и очки с диоптриями — даже старые и сломанные.', sr: 'Sve recepte, nalaze od lekara i naočare sa dioptrijom — čak i stare i polomljene.' },
    'booking.check3_text': { ru: 'За 30 минут до приёма прекратите активную зрительную нагрузку.', sr: '30 minuta pre pregleda prestanite sa aktivnim naprezanjem očiju.' },
    'booking.check4_text': { ru: 'За 20 минут до приёма — возьмите контейнер и раствор.', sr: '20 minuta pre pregleda — ponesite kutijicu i rastvor.' },
    'booking.check5_text': { ru: 'Сообщите заранее в Telegram <a href="https://t.me/AnnaNvslv">@AnnaNvslv</a> — перенесём или отменим без проблем.', sr: 'Javite unapred na Telegram <a href="https://t.me/AnnaNvslv">@AnnaNvslv</a> — bez problema ćemo pomeriti ili otkazati termin.' },
    'booking.addr_label': { ru: 'Как добраться', sr: 'Kako doći' },
    'booking.addr_text': { ru: 'Trg Republike 25, Novi Sad<br>Напротив Трга Республике', sr: 'Trg Republike 25, Novi Sad<br>Preko puta Trga Republike' },
    'booking.hours_text': { ru: 'Время работы: понедельник — пятница, 09:00–17:00', sr: 'Radno vreme: ponedeljak — petak, 09:00–17:00' },
    'booking.map_link': { ru: '📍 Открыть на карте', sr: '📍 Otvori na mapi' },
    'booking.footer_link': { ru: 'Записаться', sr: 'Zakazivanje' }
  };

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
    catch (e) { return DEFAULT_LANG; }
  }

  var ATTRS = ['alt', 'content', 'aria-label', 'placeholder', 'title'];

  function applyLang(lang) {
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var entry = t[key];
      if (entry && entry[lang] !== undefined) {
        nodes[i].innerHTML = entry[lang];
      }
    }

    for (var a = 0; a < ATTRS.length; a++) {
      var attr = ATTRS[a];
      var attrNodes = document.querySelectorAll('[data-i18n-' + attr + ']');
      for (var j = 0; j < attrNodes.length; j++) {
        var akey = attrNodes[j].getAttribute('data-i18n-' + attr);
        var aentry = t[akey];
        if (aentry && aentry[lang] !== undefined) {
          attrNodes[j].setAttribute(attr, aentry[lang]);
        }
      }
    }

    var btns = document.querySelectorAll('.lang-switch__btn');
    for (var b = 0; b < btns.length; b++) {
      var isActive = btns[b].getAttribute('data-lang') === lang;
      btns[b].classList.toggle('is-active', isActive);
      btns[b].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    var btns = document.querySelectorAll('.lang-switch__btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        applyLang(this.getAttribute('data-lang'));
      });
    }
  });
})();
