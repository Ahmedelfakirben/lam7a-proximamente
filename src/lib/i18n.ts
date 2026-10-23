export type Lang = 'ES' | 'EN' | 'FR' | 'AR'

export interface Translations {
  // Navigation
  nav_filosofia: string
  nav_colecciones: string
  nav_tematicas: string
  nav_color: string
  nav_proceso: string
  nav_contacto: string
  nav_espace_prive: string

  // Hero
  hero_eyebrow: string
  hero_sub: string
  hero_main: string
  hero_lede: string
  hero_btn: string
  hero_atelier: string
  hero_author: string
  hero_explore: string

  // Manifiesto / Filosofía
  manifest_tag: string
  manifest_quote: string
  manifest_p1: string
  manifest_p2: string
  manifest_role: string

  // Portfolio / Colecciones
  port_tag: string
  port_heading: string
  port_lead: string
  filter_all: string
  filter_bodas: string
  filter_retratos: string
  filter_intimos: string
  view_reportage: string

  c1_genre: string
  c1_title: string
  c1_brief: string

  c2_genre: string
  c2_title: string
  c2_brief: string

  c3_genre: string
  c3_title: string
  c3_brief: string

  c4_genre: string
  c4_title: string
  c4_brief: string

  // Escenarios / Temáticas
  theme_tag: string
  theme_heading: string
  theme_lead: string
  btn_reserve_set: string

  box1_title: string
  box1_desc: string
  box2_title: string
  box2_desc: string
  box3_title: string
  box3_desc: string
  box4_title: string
  box4_desc: string
  box5_title: string
  box5_desc: string
  box6_title: string
  box6_desc: string
  box7_title: string
  box7_desc: string
  box8_title: string
  box8_desc: string
  box9_title: string
  box9_desc: string

  // Before & After
  ba_tag: string
  ba_heading: string
  ba_lead: string
  ba_badge_before: string
  ba_badge_after: string

  // Instagram
  insta_tag: string
  insta_heading: string
  insta_lead: string
  insta_btn: string
  insta_card_text: string

  // Protocolo
  proc_tag: string
  proc_heading: string
  step1_title: string
  step1_desc: string
  step2_title: string
  step2_desc: string
  step3_title: string
  step3_desc: string
  step4_title: string
  step4_desc: string

  // Suite Privada Invitación
  priv_tag: string
  priv_title: string
  priv_desc: string
  priv_feat1_title: string
  priv_feat1: string
  priv_feat2_title: string
  priv_feat2: string
  priv_feat3_title: string
  priv_feat3: string
  priv_feat4_title: string
  priv_feat4: string
  priv_btn: string

  // Contacto
  ct_tag: string
  ct_heading: string
  ct_lead: string
  ct_wa_title: string
  ct_wa_sub: string
  ct_mail_title: string
  lbl_names: string
  ph_names: string
  lbl_phone: string
  lbl_type: string
  opt_select: string
  opt_event: string
  opt_newborn: string
  opt_product: string
  opt_birthday: string
  opt_set: string
  lbl_date_loc: string
  ph_date_loc: string
  lbl_details: string
  ph_details: string
  btn_submit: string
  form_success: string

  // Footer
  ft_summary: string
  ft_nav_title: string
  ft_cli_title: string
  ft_contact_title: string
  ft_rights: string
  ft_subtitle: string
}

export const translations: Record<Lang, Translations> = {
  ES: {
    nav_filosofia: 'Filosofía',
    nav_colecciones: 'Colecciones',
    nav_tematicas: 'Escenarios',
    nav_color: 'El Color',
    nav_proceso: 'Protocolo',
    nav_contacto: 'Contacto',
    nav_espace_prive: 'Espace Privé',

    hero_eyebrow: 'تخليد ذكرياتك في لمحة',
    hero_sub: 'La Poética de la Luz Natural',
    hero_main: 'Memorias de Autor',
    hero_lede: 'Narrativas visuales en lino y luz dorada. Cobertura íntima de bodas de destino y retratos con la mirada de Afaf Elaribi.',
    hero_btn: 'Ver Colecciones',
    hero_atelier: 'ATELIER',
    hero_author: 'Afaf Elaribi',
    hero_explore: 'EXPLORAR',

    manifest_tag: 'FILOSOFÍA & CONCEPTO DE MARCA',
    manifest_quote: '"El concepto de Lamha gira en torno al cuadrado: las cajas del estudio y el marco donde cada instante se vuelve un recuerdo inmortal."',
    manifest_p1: 'Fundado bajo la mirada artística de Afaf Elaribi, el concepto de Lamha se articula sobre el cuadrado como símbolo de las cajas y estuches del estudio y el encuadre fotográfico. Un espacio concebido para aprehender momentos preciosos y transformarlos en memorias inmortales.',
    manifest_p2: 'Trabajamos con una paleta cromática de autor fiel a la identidad de Lamha: blanco marfil #fbfaf8, beige #f3efec, marrón moka #564031 y negro puro #161616. Cada imagen es revelada de manera individual y artesanal con la dignidad de una pieza de museo.',
    manifest_role: 'Directora Creativa & Fundadora',

    port_tag: 'COLECCIONES DE AUTOR',
    port_heading: 'Historias Guiadas por la Belleza',
    port_lead: 'Una mirada a celebraciones singulares y retratos concebidos sin fecha de caducidad.',
    filter_all: 'Todas las Historias',
    filter_bodas: 'Bodas de Destino',
    filter_retratos: 'Retratos Editoriales',
    filter_intimos: 'Sesiones Íntimas & Maternidad',
    view_reportage: 'Ver Reportaje',

    c1_genre: 'BODA DE DESTINO • MARRAKECH',
    c1_title: 'Leyla & Karim — Palacio Namaskar',
    c1_brief: 'Celebración nocturna bajo arcos de adobe, jazmines y luz de quinqué.',

    c2_genre: 'RETRATO DE AUTOR • ESTUDIO',
    c2_title: 'Sarah — Miradas de Lino y Seda',
    c2_brief: 'Exploración de volúmenes, contrastes pictóricos y serenidad de luz natural.',

    c3_genre: 'BODA FINE ART • TOSCANA',
    c3_title: 'Camille & Alexandre — Villa Cetinale',
    c3_brief: 'Votos rodeados de cipreses centenarios y una cena iluminada por 500 cirios.',

    c4_genre: 'MATERNIDAD ÍNTIMA • HOGAR',
    c4_title: 'El Umbral de la Vida — Yasmine',
    c4_brief: 'La dulzura de la espera en blanco y negro sutil sobre sábanas de hilo belga.',

    theme_tag: 'ESCENARIOS & SETS DE AUTOR',
    theme_heading: 'Mundos Diseñados para Soñar',
    theme_lead: '9 escenarios conceptuales construidos artesanalmente en nuestro estudio para narrar historias únicas con luz editorial.',
    btn_reserve_set: 'Reservar Escenario',

    box1_title: 'Harry Potter Magic',
    box1_desc: 'Misterio, grimorios antiguos, velas flotantes y la magia de Hogwarts en un claroscuro cinematográfico.',
    box2_title: 'Graduation Ceremony 🧑‍🎓',
    box2_desc: 'El orgullo del éxito académico. Toga, birrete, pergaminos de honor y retratos institucionales de autor.',
    box3_title: 'Safari Adventure 🦁',
    box3_desc: 'Atmósfera silvestre, tonos caqui, vegetación exótica y textura expedición para almas libres.',
    box4_title: 'Moroccan Corner 🇲🇦',
    box4_desc: 'Arquitectura zellige artesanal, arcos de herradura, teteras de bronce y el alma viva de Marruecos.',
    box5_title: 'Gender Reveal Dreams 👶',
    box5_desc: 'La emoción de revelar la llegada del bebé entre nubes de tul rosa y azul pastel.',
    box6_title: 'Cinderella Fairy Tale 👑',
    box6_desc: 'Fantasía de cristal, vestidos de tul azul rey, tiaras de destello y la magia del gran baile.',
    box7_title: 'Astronaut Cosmos 👨‍🚀',
    box7_desc: 'Viaje intergaláctico, trajes espaciales de autor, polvo de estrellas y constelaciones infinitas.',
    box8_title: 'Arabian Corner 🌙',
    box8_desc: 'Lámparas de latón calado, almohadones de seda y la opulencia de las Noches de Arabia.',
    box9_title: 'Candy Sweet 🍬',
    box9_desc: 'Universo de fantasía dulce, piruletas gigantes, tonos pastel y nubes de golosina de autor.',

    ba_tag: 'EL TRATAMIENTO DE AUTOR',
    ba_heading: 'El Alquimista del Color',
    ba_lead: 'Arrastra el divisor central para apreciar la transformación desde el archivo digital en bruto (RAW) hasta nuestro etalonaje cromático de autor Lamha.',
    ba_badge_before: 'DISPARO RAW ORIGINAL',
    ba_badge_after: 'REVELADO LAMHA SIGNATURE',

    insta_tag: 'INSTAGRAM EDITORIAL',
    insta_heading: '@lam7a.studios en Directo',
    insta_lead: 'Explora nuestras últimas publicaciones, tras las cámaras y entregas de autor en la cuenta oficial.',
    insta_btn: 'Seguir @lam7a.studios',
    insta_card_text: 'Ver en Instagram',

    proc_tag: 'EL PROTOCOLO LAMHA',
    proc_heading: 'Una Experiencia Diseñada Sin Prisas',
    step1_title: 'La Entrevista Estética',
    step1_desc: 'Nos reunimos para conocer vuestra visión, paleta de estilo y sensibilidad hacia la luz antes de cualquier compromiso.',
    step2_title: 'El Disparo Discreto',
    step2_desc: 'Presencia invisible y dirección natural. Capturamos momentos de respiración y emoción genuina sin interrumpir el flujo.',
    step3_title: 'Curaduría en Suite Privada',
    step3_desc: 'Accedéis a vuestro portal exclusivo para marcar vuestras tomas favoritas, con instrucciones directas a Afaf.',
    step4_title: 'El Legado en Lino & Piel',
    step4_desc: 'Entrega física en cofre artesanal con el libro encuadernado a mano e impresiones con tintas de archivo de 100 años.',

    priv_tag: 'SUITE NUMÉRIQUE CONFIDENTIELLE',
    priv_title: 'Espace Privé de Clients',
    priv_desc: 'Cada una de nuestras parejas y clientes dispone de una suite digital independiente y protegida, concebida bajo la estética de alta costura para vivir la experiencia de selección de fotografías, comunicación directa con el atelier y seguimiento artesanal del revelado.',
    priv_feat1_title: 'Acceso Seguro por PIN',
    priv_feat1: 'Enlace privado cifrado y credencial única para vuestra galería.',
    priv_feat2_title: 'Curaduría Interactiva',
    priv_feat2: 'Anotaciones de encuadre y retoque en directo con el taller de Afaf.',
    priv_feat3_title: 'Seguimiento en Tiempo Real',
    priv_feat3: 'Estatus transparente desde el revelado RAW hasta el cofre artesanal.',
    priv_feat4_title: 'Máxima Calidad de Archivo',
    priv_feat4: 'Descarga de archivos de resolución completa para impresiones Fine Art.',
    priv_btn: 'Abrir Suite Privada de Cliente',

    ct_tag: 'CONSULTA PRIVADA',
    ct_heading: 'Hablemos de Vuestra Historia',
    ct_lead: 'Aceptamos un número limitado de bodas y reportajes al año para garantizar una dedicación absoluta a cada entrega.',
    ct_wa_title: 'WhatsApp Personal de Afaf',
    ct_wa_sub: 'Atención directa y confidencial',
    ct_mail_title: 'Correo de Estudio',
    lbl_names: 'Vuestros Nombres *',
    ph_names: 'Ej: Leyla & Karim',
    lbl_phone: 'Teléfono de Contacto *',
    lbl_type: 'Tipo de Cobertura / Extensión de Marca *',
    opt_select: 'Selecciona una categoría oficial',
    opt_event: 'EVENT — Bodas de Destino & Celebraciones',
    opt_newborn: 'NEW BORN — Recién Nacidos & Maternidad',
    opt_product: 'PRODUCT — Fotografía de Producto & Editorial',
    opt_birthday: 'BIRTHDAY — Aniversarios & Hitos Familiares',
    opt_set: 'Reserva de Escenario Temático (1 a 9)',
    lbl_date_loc: 'Fecha Estimada / Localización',
    ph_date_loc: 'Ej: Octubre 2026 en Tetuán / Tánger',
    lbl_details: 'Vuestra Historia & Detalles Deseados',
    ph_details: 'Contadnos cómo imagináis vuestro reportaje, la temática elegida o cualquier consulta...',
    btn_submit: 'Enviar Solicitud de Reserva',
    form_success: '¡Gracias! Hemos recibido vuestra solicitud. Afaf os responderá personalmente.',

    ft_summary: 'Estudio de alta fotografía, retratos, recién nacidos y producto editorial con sede en Tetuán, Marruecos.',
    ft_nav_title: 'NAVEGACIÓN',
    ft_cli_title: 'CLIENTES',
    ft_contact_title: 'CONTACTO & ATELIER',
    ft_rights: '© 2026 LAMHA STUDIOS BY AFAF EL ARIBI. TODOS LOS DERECHOS RESERVADOS.',
    ft_subtitle: 'L’ÉLÉGANCE SIMPLEMENT • تَخلِيد ذِكرَيَاتِك فِي لَمحَة',
  },

  EN: {
    nav_filosofia: 'Philosophy',
    nav_colecciones: 'Collections',
    nav_tematicas: 'Scenarios',
    nav_color: 'Colour Art',
    nav_proceso: 'Protocol',
    nav_contacto: 'Contact',
    nav_espace_prive: 'Private Suite',

    hero_eyebrow: 'تخليد ذكرياتك في لمحة',
    hero_sub: 'The Poetics of Natural Light',
    hero_main: 'Author Memories',
    hero_lede: 'Visual narratives in linen and golden light. Intimate coverage of destination weddings and portraits through the artistic gaze of Afaf Elaribi.',
    hero_btn: 'View Collections',
    hero_atelier: 'ATELIER',
    hero_author: 'Afaf Elaribi',
    hero_explore: 'EXPLORE',

    manifest_tag: 'PHILOSOPHY & BRAND CONCEPT',
    manifest_quote: '"The concept of Lamha revolves around the square: the studio boxes and the frame where each instant turns into an immortal memory."',
    manifest_p1: 'Founded under the artistic vision of Afaf Elaribi, Lamha\'s concept is articulated around the square as an emblem of studio casings and photographic framing. A sacred space crafted to preserve precious moments as eternal legacies.',
    manifest_p2: 'We work with an author palette faithful to Lamha identity: ivory white #fbfaf8, beige #f3efec, mocha brown #564031 and pure noir #161616. Every photograph is hand-developed with museum dignity.',
    manifest_role: 'Creative Director & Founder',

    port_tag: 'AUTHOR COLLECTIONS',
    port_heading: 'Stories Guided by Beauty',
    port_lead: 'A curated perspective on timeless celebrations and portraits crafted with permanent elegance.',
    filter_all: 'All Stories',
    filter_bodas: 'Destination Weddings',
    filter_retratos: 'Editorial Portraits',
    filter_intimos: 'Intimate & Maternity',
    view_reportage: 'View Reportage',

    c1_genre: 'DESTINATION WEDDING • MARRAKECH',
    c1_title: 'Leyla & Karim — Palais Namaskar',
    c1_brief: 'Nocturnal celebration under adobe arches, scented jasmine and candlelight.',

    c2_genre: 'AUTHOR PORTRAIT • STUDIO',
    c2_title: 'Sarah — Silks & Linen Visions',
    c2_brief: 'Exploration of drapery, delicate contrasts and quiet natural illumination.',

    c3_genre: 'FINE ART WEDDING • TUSCANY',
    c3_title: 'Camille & Alexandre — Villa Cetinale',
    c3_brief: 'Vows surrounded by century-old cypresses and an evening illuminated by 500 tapers.',

    c4_genre: 'INTIMATE MATERNITY • AT HOME',
    c4_title: 'Threshold of Life — Yasmine',
    c4_brief: 'The tenderness of anticipation captured on heirloom Belgian linen.',

    theme_tag: 'AUTHOR SETS & SCENARIOS',
    theme_heading: 'Realms Designed to Dream',
    theme_lead: '9 bespoke conceptual sets handcrafted in our atelier to stage exceptional stories in editorial lighting.',
    btn_reserve_set: 'Book Scenario',

    box1_title: 'Harry Potter Magic',
    box1_desc: 'Ancient grimoires, levitating tapers and Hogwarts allure enveloped in cinematic chiaroscuro.',
    box2_title: 'Graduation Ceremony 🧑‍🎓',
    box2_desc: 'Academic triumph and dignity. Gowns, mortarboards, and timeless fine art portraits.',
    box3_title: 'Safari Adventure 🦁',
    box3_desc: 'Wild botanical textures, sun-drenched savannah earth, and adventurous spirits.',
    box4_title: 'Moroccan Corner 🇲🇦',
    box4_desc: 'Master handcrafted zellige, horseshoe arches, etched brass and Morocco\'s timeless soul.',
    box5_title: 'Gender Reveal Dreams 👶',
    box5_desc: 'The pure thrill of revelation amidst billowing clouds of delicate pastel tulle.',
    box6_title: 'Cinderella Fairy Tale 👑',
    box6_desc: 'Crystal fantasies, royal azure gowns, brilliant tiaras and ball magic.',
    box7_title: 'Astronaut Cosmos 👨‍🚀',
    box7_desc: 'Cosmic voyaging, tailored space garments, stardust and celestial constellations.',
    box8_title: 'Arabian Corner 🌙',
    box8_desc: 'Pierced brass lanterns, sumptuous silks and opulent Arabian Nights resonance.',
    box9_title: 'Candy Sweet 🍬',
    box9_desc: 'Whimsical confectionery kingdom, oversized sugar sculptures and delicate pastel reveries.',

    ba_tag: 'AUTHOR COLOR GRADING',
    ba_heading: 'The Color Alchemist',
    ba_lead: 'Slide the central divider to experience the evolution from digital raw camera sensor to Lamha\'s signature museum tones.',
    ba_badge_before: 'ORIGINAL RAW CAPTURE',
    ba_badge_after: 'LAMHA SIGNATURE GRADING',

    insta_tag: 'EDITORIAL INSTAGRAM',
    insta_heading: '@lam7a.studios Live Feed',
    insta_lead: 'Experience our latest releases, atelier behind-the-scenes and deliveries on our official handle.',
    insta_btn: 'Follow @lam7a.studios',
    insta_card_text: 'View on Instagram',

    proc_tag: 'THE LAMHA PROTOCOL',
    proc_heading: 'An Experience Crafted Without Haste',
    step1_title: 'The Aesthetic Consultation',
    step1_desc: 'We meet to attune to your dreams, personal aesthetics and lighting sensibility before any commitment.',
    step2_title: 'The Discreet Capture',
    step2_desc: 'Invisible presence and natural direction. Unobtrusive observance of sincere breaths and emotion.',
    step3_title: 'Private Suite Curation',
    step3_desc: 'You access your bespoke private client portal to curate favorites with direct notes for Afaf.',
    step4_title: 'The Heirloom in Leather & Linen',
    step4_desc: 'Physical delivery in artisanal keepsake chests, hand-bound leather albums and 100-year archival inks.',

    priv_tag: 'CONFIDENTIAL DIGITAL SUITE',
    priv_title: 'Client Private Suite',
    priv_desc: 'Each couple and client enjoys an independent, private digital haven shaped with haute couture elegance to review imagery, communicate directly with Afaf and follow post-production progress.',
    priv_feat1_title: 'PIN-Protected Access',
    priv_feat1: 'Encrypted private portal and bespoke credentials for your gallery.',
    priv_feat2_title: 'Interactive Selection',
    priv_feat2: 'Cropping and retouching directives directly with Afaf\'s studio.',
    priv_feat3_title: 'Real-Time Progress',
    priv_feat3: 'Crystal-clear tracking from RAW master to bespoke album binder.',
    priv_feat4_title: 'Archival Master Quality',
    priv_feat4: 'Uncompressed high-resolution downloads for timeless Fine Art printing.',
    priv_btn: 'Launch Client Private Suite',

    ct_tag: 'PRIVATE CONSULTATION',
    ct_heading: 'Let Us Chronicle Your Story',
    ct_lead: 'We accept a strictly limited number of commissions per season to ensure unwavering devotion to each creation.',
    ct_wa_title: 'Afaf\'s Personal WhatsApp',
    ct_wa_sub: 'Confidential, personal attention',
    ct_mail_title: 'Studio Email',
    lbl_names: 'Your Names *',
    ph_names: 'e.g., Leyla & Karim',
    lbl_phone: 'Telephone / Mobile *',
    lbl_type: 'Commission Category *',
    opt_select: 'Select an official collection',
    opt_event: 'EVENT — Destination Weddings & Celebrations',
    opt_newborn: 'NEW BORN — Newborns & Maternity',
    opt_product: 'PRODUCT — Editorial Product & Brand',
    opt_birthday: 'BIRTHDAY — Milestones & Anniversaries',
    opt_set: 'Themed Studio Set (Boxes 1 to 9)',
    lbl_date_loc: 'Target Date / Location',
    ph_date_loc: 'e.g., October 2026 in Tetouan / Tangier',
    lbl_details: 'Your Narrative & Desired Details',
    ph_details: 'Tell us about your celebration, intended mood or questions...',
    btn_submit: 'Submit Commission Request',
    form_success: 'Thank you. We have received your inquiry. Afaf will respond personally.',

    ft_summary: 'Haute photography studio, author portraits, newborns and editorial product based in Tetouan, Morocco.',
    ft_nav_title: 'NAVIGATION',
    ft_cli_title: 'CLIENTS',
    ft_contact_title: 'CONTACT & ATELIER',
    ft_rights: '© 2026 LAMHA STUDIOS BY AFAF EL ARIBI. ALL RIGHTS RESERVED.',
    ft_subtitle: 'L’ÉLÉGANCE SIMPLEMENT • تَخلِيد ذِكرَيَاتِك فِي لَمحَة',
  },

  FR: {
    nav_filosofia: 'Philosophie',
    nav_colecciones: 'Collections',
    nav_tematicas: 'Scénarios',
    nav_color: 'L\'Art de la Couleur',
    nav_proceso: 'Protocole',
    nav_contacto: 'Contact',
    nav_espace_prive: 'Espace Privé',

    hero_eyebrow: 'تخليد ذكرياتك في لمحة',
    hero_sub: 'La Poétique de la Lumière Naturelle',
    hero_main: 'Mémoires d\'Auteur',
    hero_lede: 'Récits visuels en lin et lumière dorée. Couverture intimiste de mariages de destination et portraits d\'auteur par Afaf Elaribi.',
    hero_btn: 'Voir les Collections',
    hero_atelier: 'ATELIER',
    hero_author: 'Afaf Elaribi',
    hero_explore: 'EXPLORER',

    manifest_tag: 'PHILOSOPHIE & CONCEPT DE MARQUE',
    manifest_quote: '"Le concept de Lamha s\'articule autour du carré : les coffrets du studio et le cadre où chaque instant devient un souvenir immortel."',
    manifest_p1: 'Fondé sous la vision artistique d\'Afaf Elaribi, Lamha incarne le carré comme hommage aux coffrets d\'artisanat et au cadrage de l\'objectif. Un lieu dédié à sublimer l\'éphémère en héritage intemporel.',
    manifest_p2: 'Nous composons avec une palette d\'auteur fidèle à l\'identité Lamha : blanc ivoire #fbfaf8, beige #f3efec, brun moka #564031 et noir profond #161616. Chaque tirage est révélé avec la dignité d\'une œuvre muséale.',
    manifest_role: 'Directrice Créative & Fondatrice',

    port_tag: 'COLLECTIONS D\'AUTEUR',
    port_heading: 'Histoires Guidées par la Beauté',
    port_lead: 'Un regard sensible posé sur des célébrations d\'exception et des portraits créés sans compromis.',
    filter_all: 'Toutes les Histoires',
    filter_bodas: 'Mariages de Destination',
    filter_retratos: 'Portraits Éditoriaux',
    filter_intimos: 'Séances Intimes & Maternité',
    view_reportage: 'Voir le Reportage',

    c1_genre: 'MARIAGE DE DESTINATION • MARRAKECH',
    c1_title: 'Leyla & Karim — Palais Namaskar',
    c1_brief: 'Célébration nocturne sous les voûtes de pisé, jasmins et lueurs de lanternes.',

    c2_genre: 'PORTRAIT D\'AUTEUR • STUDIO',
    c2_title: 'Sarah — Éclats de Soie et de Lin',
    c2_brief: 'Recherche de volumes, drapés picturaux et quiétude en lumière naturelle.',

    c3_genre: 'MARIAGE FINE ART • TOSCANE',
    c3_title: 'Camille & Alexandre — Villa Cetinale',
    c3_brief: 'Vœux au milieu de cyprès centenaires et banquet illuminé par 500 cierges.',

    c4_genre: 'MATERNITÉ INTIME • DEMEURE',
    c4_title: 'Le Seuil de la Vie — Yasmine',
    c4_brief: 'La douceur de l\'attente en noir et blanc délicat sur lin belge.',

    theme_tag: 'DÉCORS & SCÉNARIOS D\'AUTEUR',
    theme_heading: 'Mondes Façonnés pour Rêver',
    theme_lead: '9 décors conceptuels façonnés à la main dans notre atelier pour mettre en scène des histoires uniques.',
    btn_reserve_set: 'Réserver ce Décor',

    box1_title: 'Harry Potter Magic',
    box1_desc: 'Mystère, grimoires ancestraux, bougies en lévitation et magie de Poudlard en clair-obscur.',
    box2_title: 'Graduation Ceremony 🧑‍🎓',
    box2_desc: 'La fierté académique. Toge, toque, parchemins honorifiques et portraits officiels d\'auteur.',
    box3_title: 'Safari Adventure 🦁',
    box3_desc: 'Univers végétal et minéral, teintes kaki, feuillages exotiques et souffle d\'expédition.',
    box4_title: 'Moroccan Corner 🇲🇦',
    box4_desc: 'Zellige traditionnel, arches mauresques, théières en laiton et l\'âme vibrante du Maroc.',
    box5_title: 'Gender Reveal Dreams 👶',
    box5_desc: 'L\'émerveillement de la révélation dans des volutes de tulle rose poudré et bleu ciel.',
    box6_title: 'Cinderella Fairy Tale 👑',
    box6_desc: 'Féerie de cristal, robes en tulle bleu nuit, diadèmes scintillants et bal de conte de fées.',
    box7_title: 'Astronaut Cosmos 👨‍🚀',
    box7_desc: 'Épopée cosmique, scaphandres d\'auteur, poussières stellaires et constellations lointaines.',
    box8_title: 'Arabian Corner 🌙',
    box8_desc: 'Lanterne ajourée en cuivre, coussins soyeux et splendeur digne des Mille et Une Nuits.',
    box9_title: 'Candy Sweet 🍬',
    box9_desc: 'Royaume de gourmandise et de poésie, douceurs pastel et nuages sucrés sur mesure.',

    ba_tag: 'L\'ART DE L\'ÉTALONNAGE',
    ba_heading: 'L\'Alchimiste de la Couleur',
    ba_lead: 'Glissez le curseur central pour apprécier la métamorphose entre le fichier numérique brut (RAW) et notre révélation signature Lamha.',
    ba_badge_before: 'CLICHÉ RAW ORIGINAL',
    ba_badge_after: 'SIGNATURE CHROMATIQUE LAMHA',

    insta_tag: 'INSTAGRAM ÉDITORIAL',
    insta_heading: '@lam7a.studios en Direct',
    insta_lead: 'Suivez nos publications récentes, coulisses d\'atelier et livraisons prestigieuses.',
    insta_btn: 'Suivre @lam7a.studios',
    insta_card_text: 'Voir sur Instagram',

    proc_tag: 'LE PROTOCOLE LAMHA',
    proc_heading: 'Une Expérience Conçue Sans Hâte',
    step1_title: 'L\'Entretien Esthétique',
    step1_desc: 'Nous échangeons afin de saisir vos aspirations, votre univers et votre sensibilité lumineuse.',
    step2_title: 'La Prise de Vue Discrète',
    step2_desc: 'Présence invisible et guidage feutré pour capter l\'émotion pure sans altérer la spontanéité.',
    step3_title: 'Curation en Suite Privée',
    step3_desc: 'Vous accédez à votre suite sécurisée pour composer votre sélection avec annotations directes.',
    step4_title: 'L\'Héritage en Lin & Cuir',
    step4_desc: 'Livraison en coffret confectionné à la main, reliure d\'artisan et encres d\'archives séculaires.',

    priv_tag: 'SUITE NUMÉRIQUE CONFIDENTIELLE',
    priv_title: 'Espace Privé de Clients',
    priv_desc: 'Chaque couple et client bénéficie d\'une suite confidentielle et sur-mesure, conçue dans l\'esprit haute couture pour sélectionner ses clichés, échanger avec Afaf et suivre le travail de laboratoire.',
    priv_feat1_title: 'Accès Sécurisé par PIN',
    priv_feat1: 'Portail chiffré et code d\'accès exclusif pour votre galerie privée.',
    priv_feat2_title: 'Curation Intuitive',
    priv_feat2: 'Consignes de recadrage et de retouche en lien direct avec Afaf.',
    priv_feat3_title: 'Suivi de Création en Temps Réel',
    priv_feat3: 'Visibilité totale du flux depuis le négatif numérique jusqu\'au livre d\'art.',
    priv_feat4_title: 'Fichiers Maîtres d\'Archive',
    priv_feat4: 'Téléchargement haute fidélité pour vos impressions d\'art.',
    priv_btn: 'Entrer dans l\'Espace Privé',

    ct_tag: 'CONSULTATION PRIVÉE',
    ct_heading: 'Écrivons Votre Histoire',
    ct_lead: 'Nous honorons un nombre restreint de mariages chaque année pour consacrer un soin absolu à chaque création.',
    ct_wa_title: 'WhatsApp Personnel d\'Afaf',
    ct_wa_sub: 'Échange confidentiel et direct',
    ct_mail_title: 'Courriel de l\'Atelier',
    lbl_names: 'Vos Noms *',
    ph_names: 'Ex : Leyla & Karim',
    lbl_phone: 'Téléphone de Contact *',
    lbl_type: 'Catégorie de Reportage *',
    opt_select: 'Choisissez une catégorie officielle',
    opt_event: 'EVENT — Mariages de Destination & Fêtes',
    opt_newborn: 'NEW BORN — Nouveaux-Nés & Maternité',
    opt_product: 'PRODUCT — Photographie de Marque & Produit',
    opt_birthday: 'BIRTHDAY — Anniversaires & Mémoires',
    opt_set: 'Réservation de Décor Thématique (1 à 9)',
    lbl_date_loc: 'Date Prévue / Lieu',
    ph_date_loc: 'Ex : Octobre 2026 à Tétouan / Tanger',
    lbl_details: 'Votre Récit & Détails Souhaités',
    ph_details: 'Décrivez-nous vos souhaits, le thème choisi ou toute question...',
    btn_submit: 'Transmettre la Demande de Réservation',
    form_success: 'Merci. Votre demande a bien été transmise. Afaf vous répondra personnellement.',

    ft_summary: 'Studio de haute photographie d\'auteur, portraits, nouveaux-nés et création éditoriale basé à Tétouan, Maroc.',
    ft_nav_title: 'NAVIGATION',
    ft_cli_title: 'ESPACE CLIENTS',
    ft_contact_title: 'CONTACT & ATELIER',
    ft_rights: '© 2026 LAMHA STUDIOS BY AFAF EL ARIBI. TOUS DROITS RÉSERVÉS.',
    ft_subtitle: 'L’ÉLÉGANCE SIMPLEMENT • تَخلِيد ذِكرَيَاتِك فِي لَمحَة',
  },

  AR: {
    nav_filosofia: 'الفلسفة',
    nav_colecciones: 'المجموعات',
    nav_tematicas: 'الديكورات',
    nav_color: 'فن الألوان',
    nav_proceso: 'المسار',
    nav_contacto: 'تواصل',
    nav_espace_prive: 'الجناح الخاص',

    hero_eyebrow: 'تخليد ذكرياتك في لمحة',
    hero_sub: 'شاعرية الضوء الطبيعي',
    hero_main: 'ذكريات من توقيع فنان',
    hero_lede: 'سرد بصري فاخر بالكتان والنور الذهبي. توثيق استثنائي لحفلات الزفاف والبورتريهات الفنية بعدسة عفاف العريبي.',
    hero_btn: 'استكشف المجموعات',
    hero_atelier: 'الاستوديو',
    hero_author: 'عفاف العريبي',
    hero_explore: 'استكشف',

    manifest_tag: 'فلسفة وهوية العلامة',
    manifest_quote: '"جوهر لمحة ينبثق من المربع: علب الاستوديو الحرفية والإطار الذي يخلد اللحظة إلى الأبد."',
    manifest_p1: 'تأسس استوديو لمحة تحت الرؤية الفنية لعفاف العريبي، متخذاً من المربع رمزاً لحفظ الذكريات في علب فاخرة وإطارات فوتوغرافية خالدة. مساحة صممت لالتقاط اللحظات النفيسة وجعلها تراثاً عائلياً أبدياً.',
    manifest_p2: 'نعتمد باليتة ألوان وفية لهوية لمحة: الأبيض العاجي #fbfaf8، والبيج الدافئ #f3efec، والبني الموكا #564031، والأسود الكربوني #161616. يتم إظهار كل صورة يدوياً بأرقى معايير المتاحف.',
    manifest_role: 'المديرة الإبداعية والمؤسسة',

    port_tag: 'أعمال مختارة',
    port_heading: 'قصص ترسمها معاني الجمال',
    port_lead: 'إطلالة على احتفالات استثنائية وبورتريهات راقية لا يطويها النسيان.',
    filter_all: 'جميع القصص',
    filter_bodas: 'حفلات الزفاف الراقية',
    filter_retratos: 'البورتريه الفني',
    filter_intimos: 'جلسات الأمومة واللحظات الخاصة',
    view_reportage: 'مشاهدة التقرير',

    c1_genre: 'حفل زفاف • مراكش',
    c1_title: 'ليلى وكريم — قصر ناماسكار',
    c1_brief: 'أمسية ساحرة بين أقواس الطين ورائحة الياسمين وضوء الفوانيس.',

    c2_genre: 'بورتريه فني • الاستوديو',
    c2_title: 'سارة — إشراقات الحرير والكتان',
    c2_brief: 'دراسة فنية للانسدال والتناغم الصامت في الضوء الطبيعي.',

    c3_genre: 'زفاف فاخر • توسكانا',
    c3_title: 'كاميل وألكسندر — فيلا سيتينالي',
    c3_brief: 'عهود محاطة بأشجار السرو المعمرة وعشاء رومانسي مضاء بـ 500 شمعة.',

    c4_genre: 'أمومة دافئة • في المنزل',
    c4_title: 'عتبة الحياة — ياسمين',
    c4_brief: 'حنان الانتظار بالأبيض والأسود الناعم على أقمشة الكتان البلجيكي.',

    theme_tag: 'الديكورات الخاصة المصممة',
    theme_heading: 'عوالم مبنية لتلهم الأحلام',
    theme_lead: '9 سيناريوهات فنية أنجزت يدوياً في استوديوهاتنا لنروي قصصكم بأروع إضاءة فوتوغرافية.',
    btn_reserve_set: 'حجز هذا الديكور',

    box1_title: 'Harry Potter Magic',
    box1_desc: 'سحر هاري بوتر، شموع معلقة وكتب قديمة في تباين ضوئي سينمائي.',
    box2_title: 'Graduation Ceremony 🧑‍🎓',
    box2_desc: 'فرحة التخرج والإنجاز الأكاديمي مع الروب والقبعة وشهادات الشرف التذكارية.',
    box3_title: 'Safari Adventure 🦁',
    box3_desc: 'أجواء المغامرة الطبيعية، ونباتات استوائية ولمسات السفاري الحرة.',
    box4_title: 'Moroccan Corner 🇲🇦',
    box4_desc: 'أصالة الزليج المغربي، أقواس تقليدية ونحاس أصيل ينبض بروح التراث.',
    box5_title: 'Gender Reveal Dreams 👶',
    box5_desc: 'لحظة الكشف عن جنس المولود وسط سحب التول الوردي والأزرق الهادئ.',
    box6_title: 'Cinderella Fairy Tale 👑',
    box6_desc: 'أناقة الأساطير، فستان أزرق ملكي، تيجان براقة وسحر الحفلات الكلاسيكية.',
    box7_title: 'Astronaut Cosmos 👨‍🚀',
    box7_desc: 'رحلة إلى النجوم، بذلات فضاء استثنائية وبريق المجرات البعيدة.',
    box8_title: 'Arabian Corner 🌙',
    box8_desc: 'فوانيس نحاسية مخرمة، وسائد حريرية وأجواء ليالي الشرق الساحرة.',
    box9_title: 'Candy Sweet 🍬',
    box9_desc: 'عالم الحلوى اللطيفة، مجسمات ملونة ونغمات ألوان الباستيل المبهجة.',

    ba_tag: 'فن المعالجة والألوان',
    ba_heading: 'كيمياء الألوان الخاصة',
    ba_lead: 'حرك المؤشر للمقارنة بين اللقطة الرقمية الخام (RAW) والنتيجة النهائية بأسلوب لمحة الفني.',
    ba_badge_before: 'الصورة الخام RAW',
    ba_badge_after: 'معالجة لمحة المميزة',

    insta_tag: 'إنستغرام الرئيسي',
    insta_heading: 'مباشر من حساب @lam7a.studios',
    insta_lead: 'تابعوا أحدث أعمالنا وكواليس جلسات التصوير على الحساب الرسمي.',
    insta_btn: 'متابعة @lam7a.studios',
    insta_card_text: 'عرض على إنستغرام',

    proc_tag: 'مسار تجربة لمحة',
    proc_heading: 'تجربة حصرية بلا استعجال',
    step1_title: 'اللقاء الجمالي التمهيدي',
    step1_desc: 'نجتمع للتعرف على رغباتكم وتفضيلاتكم للضوء والأسلوب قبل أي التزام.',
    step2_title: 'التصوير الهادئ غير المقتحم',
    step2_desc: 'حضور خفي وتوجيه عفوي لنلتقط المشاعر الحقيقية بنعومة تامة.',
    step3_title: 'الانتقاء في الجناح الخاص',
    step3_desc: 'تدخلون إلى بوابتكم الرقمية السرية لاختيار صوركم وتقديم الملاحظات المباشرة.',
    step4_title: 'الإرث في الكتان والجلد',
    step4_desc: 'تسليم يدوي في صندوق حرفي مع ألبوم جلدي فاخر وطباعة بأحبار تدوم 100 عام.',

    priv_tag: 'الجناح الرقمي السري',
    priv_title: 'الجناح الخاص بالعملاء',
    priv_desc: 'نوفر لكل عروسين وعميل منصة خاصة ومحمية بأعلى معايير الفخامة لمشاهدة الصور، واختيار ألبوم الذكريات، ومتابعة تجهيز الطلب يوماً بيوم.',
    priv_feat1_title: 'دخول آمن برمز PIN',
    priv_feat1: 'رابط خاص مشفر ورمز حماية فريد لمعرض صوركم.',
    priv_feat2_title: 'تحديد الصور والتعديل',
    priv_feat2: 'تحديد وتدوين الملاحظات الفنية مباشرة مع فريق عفاف.',
    priv_feat3_title: 'متابعة مراحل التنفيذ',
    priv_feat3: 'شفافية كاملة من معالجة الصورة الخام وحتى تجليد الألبوم.',
    priv_feat4_title: 'أعلى دقة رقمية أرشيفية',
    priv_feat4: 'تحميل الصور بالدقة الفائقة للطباعة الفنية عالية الجودة.',
    priv_btn: 'فتح الجناح الخاص للعميل',

    ct_tag: 'الحجز والاستفسار الخاص',
    ct_heading: 'لنخلد قصتكم الاستثنائية',
    ct_lead: 'نستقبل عدداً محدوداً من الحجوزات سنوياً لضمان الاهتمام التام بكل تفصيلة من تفاصيلكم.',
    ct_wa_title: 'واتساب عفاف العريبي الخاص',
    ct_wa_sub: 'تواصل مباشر وسري',
    ct_mail_title: 'بريد الاستوديو الرسمي',
    lbl_names: 'الأسماء الكريمة *',
    ph_names: 'مثال: ليلى وكريم',
    lbl_phone: 'رقم الهاتف / الواتساب *',
    lbl_type: 'نوع الجلسة أو المناسبة *',
    opt_select: 'اختر نوع التغطية المطلوب',
    opt_event: 'حفلات الزفاف والمناسبات الكبرى',
    opt_newborn: 'المواليد الجدد وجلسات الأمومة',
    opt_product: 'تصوير المنتجات والإعلانات الراقية',
    opt_birthday: 'أعياد الميلاد والمناسبات العائلية',
    opt_set: 'حجز أحد الديكورات التسعة بالاستوديو',
    lbl_date_loc: 'التاريخ التقريبي / المدينة',
    ph_date_loc: 'مثال: أكتوبر 2026 في تطوان أو طنجة',
    lbl_details: 'تفاصيل رؤيتكم للجلسة',
    ph_details: 'حدثونا عن تصوّركم للحدث أو الديكور المطلوب أو أي استفسار...',
    btn_submit: 'إرسال طلب الحجز',
    form_success: 'شكراً لكم! تم استلام طلبكم وسوف تتواصل معكم الأستاذة عفاف شخصياً.',

    ft_summary: 'استوديو التصوير الراقي، والبورتريه الفني، والأمومة والمنتجات ومقره بتطوان، المغرب.',
    ft_nav_title: 'روابط رئيسية',
    ft_cli_title: 'فضاء العملاء',
    ft_contact_title: 'التواصل والاستوديو',
    ft_rights: '© 2026 جميع الحقوق محفوظة لاستوديوهات لمحة — عفاف العريبي.',
    ft_subtitle: 'L’ÉLÉGANCE SIMPLEMENT • تَخلِيد ذِكرَيَاتِك فِي لَمحَة',
  },
}
