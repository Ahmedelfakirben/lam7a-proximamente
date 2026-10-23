'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LamhaLogo } from '@/components/LamhaLogo'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'
import { Lang } from '@/lib/i18n'

interface PhotoItem {
  id: string
  category: 'preparativos' | 'detalles' | 'ceremonia' | 'retratos'
  title: string
  url: string
  defaultNote?: string
}

const LANG_OPTIONS: { code: Lang; name: string }[] = [
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  { code: 'EN', name: 'English' },
  { code: 'AR', name: 'العربية' },
]

const PORTAL_I18N = {
  ES: {
    backToSite: 'Volver a Lamha Studios',
    logout: 'Salir',
    confidentialTag: 'SUITE NUMÉRIQUE CONFIDENTIELLE',
    espacePrive: 'Espace Privé',
    loginDesc: 'Acceso exclusivo y confidencial. Introduce tu correo electrónico y código PIN personal para ver y seleccionar tus fotografías maestras.',
    emailLabel: 'Correo Electrónico',
    emailPlaceholder: 'ejemplo@correo.com',
    pinLabel: 'Código PIN de Seguridad',
    verifying: 'Verificando Credenciales...',
    accessBtn: 'Acceder a la Suite Privada',
    demoBtn: 'Probar sesión demo: Leyla & Karim (#8942)',
    errEmpty: 'Por favor introduce tu correo electrónico y tu código PIN personal.',
    errServer: 'Error al contactar con el servidor. Inténtalo nuevamente.',
    errInvalid: 'Correo o código PIN incorrecto. Por favor revisa los datos de acceso recibidos.',
    errUnexpected: 'Ocurrió un error inesperado al acceder a la suite.',
    suiteTag: 'ESPACE PRIVÉ DU CLIENT',
    defaultSessionDesc: 'Boda de Destino en Namaskar & Retratos Íntimos',
    tabSelection: 'Selección de Fotos',
    tabTimeline: 'Estado del Pedido',
    curationSubtitle: 'Curaduría de vuestro libro en piel',
    quotaTitle: (quota: number) => `Seleccionad vuestras ${quota} fotografías maestras`,
    quotaDescActive: (count: number, quota: number) =>
      `Hemos preparado ${count} fotografías compartidas con el tratamiento cromático de autor. Marcad las ${quota} que protagonizarán vuestro libro artesanal en lino y piel.`,
    quotaDescEmpty: 'Vuestro fotógrafo compartirá aquí las fotografías en cuanto finalice el proceso de edición y calibración cromática.',
    quotaAuthorLabel: 'Cupo de autor seleccionado',
    quotaPending: (selected: number, missing: number) =>
      `Tenéis ${selected} fotografías marcadas. Os faltan ${missing} para completar el cupo.`,
    quotaComplete: (selected: number, quota: number) =>
      `¡Cupo completado exactamente (${selected}/${quota})! Lista para enviar a Afaf.`,
    sendToAtelierBtn: 'Enviar Selección al Taller',
    downloadPreviewsBtn: 'Descargar Previews',
    filterAll: 'Todas',
    filterFavs: 'Mis Favoritas',
    filterPreparativos: 'Preparativos',
    filterCeremonia: 'Ceremonia',
    filterRetratos: 'Retratos Íntimos',
    filterDetalles: 'Detalles & Joyería',
    searchPlaceholder: 'Buscar por número o nota...',
    emptyCuratingTitle: 'Fotografías en Proceso de Curaduría',
    emptyCuratingDesc:
      'Afaf Elaribi está preparando el etalonaje y revelado cromático de vuestra sesión. En cuanto las fotografías maestras sean compartidas desde el estudio, aparecerán automáticamente en esta suite para vuestra selección.',
    requestedQuotaTag: (quota: number) => `Cupo solicitado: ${quota} fotografías`,
    noPhotosFound: 'No se encontraron fotografías con los filtros seleccionados.',
    inBookBadge: 'En Libro',
    withNoteBadge: 'Con Nota',
    addNoteTitle: 'Añadir nota de retoque',
    markForBookTitle: 'Marcar para el libro',
    timelineCenterTag: 'SEGUIMIENTO EN VIVO',
    timelineCenterTitle: 'El Viaje de tus Recuerdos',
    timelineCenterDesc: 'Acompañamos cada fase del proceso con calibración óptica y confección artesanal.',
    step1Tag: 'Etapa 1 • Completada',
    step1Date: 'Fase Inicial',
    step1Title: 'Entrevista Estética & Reserva',
    step1Desc: 'Definición del estilo visual, paleta cromática preferida y planificación de la cobertura.',
    step2Tag: 'Etapa 2 • Completada',
    step2Date: 'Fecha de Sesión',
    step2Title: 'Sesión en Localización',
    step2Desc: 'Cobertura integral con iluminación natural y doble equipo de formato completo.',
    step3Tag: 'Etapa 3 • Completada',
    step3Date: 'En Estudio',
    step3Title: 'Curaduría & Etalonaje de Autor',
    step3Desc: 'Selección de las tomas más emotivas y aplicación de la paleta tonal exclusiva Lamha.',
    step4Tag: 'Etapa 4 • En Curso (Vuestra Acción)',
    step4Date: 'Hoy',
    step4Title: (quota: number) => `Selección de las ${quota} Fotografías Maestras`,
    step4Desc: (quota: number) =>
      `Es vuestro momento: marcad vuestras ${quota} favoritas para comenzar el retoque fino y maquetación del libro.`,
    step4Cta: (count: number, quota: number) => `Continuar Selección (${count}/${quota})`,
    step5Tag: 'Etapa 5 • Próxima',
    step5Date: 'Est. 5 días tras selección',
    step5Title: 'Retoque Fino & Confección en Taller',
    step5Desc: 'Limpieza microscópica, etalonaje final y encuadernación manual del libro en lino belga y piel.',
    lbOf: 'de',
    lbInBook: 'En Libro',
    lbMarkForBook: 'Marcar para Libro',
    lbNoteSaved: 'Nota Guardada',
    lbAddNote: 'Añadir Nota',
    lbRotate: 'Girar',
    lbFitScreen: 'Ajustar',
    lbZoomIn: 'Ampliar 1:1',
    lbRetouchTitle: (id: string) => `Instrucción de Retoque para ${id}`,
    lbRetouchPlaceholder: 'Escribe aquí tu ajuste para esta foto...',
    lbSaveNote: 'Guardar Nota',
    revFinalStep: 'Paso Final',
    revConfirmTitle: 'Confirmar Selección para Confección del Libro',
    revChosenCount: 'Fotos Elegidas',
    revQuotaCount: 'Cupo Solicitado',
    revNotesCount: 'Notas de Retoque',
    revThumbsTitle: 'Miniaturas que integrarán vuestro libro:',
    revGeneralLabel: 'Instrucciones generales para Afaf Elaribi:',
    revGeneralPlaceholder: 'Comentarios sobre el orden, foto preferida para portada en piel...',
    revKeepEditing: 'Seguir Editando',
    revSendBtn: 'Enviar al Taller de Afaf Elaribi',
    revSendingBtn: 'Enviando al Taller...',
    successTitle: '¡Selección Recibida en el Taller!',
    successDesc: (count: number) =>
      `Afaf Elaribi ha recibido vuestras ${count} fotografías maestras con éxito. La selección ya está disponible en el panel del estudio para comenzar la calibración fina y confección de vuestro libro.`,
    successContinue: 'Continuar en la Suite Privada',
    noteModalTag: 'Instrucción de Retoque',
    noteModalTitle: (name: string) => `Nota para ${name}`,
    noteModalDesc:
      'Indica a Afaf Elaribi cualquier indicación sobre esta fotografía (ej: portada del libro, retoque de piel, pase a blanco y negro, recorte...):',
    noteModalPlaceholder: 'Escribe aquí tu instrucción para esta fotografía...',
    cancel: 'Cancelar',
    saveNote: 'Guardar Nota',
    quotaLimitReached: (quota: number) =>
      `Has alcanzado el límite máximo de ${quota} fotografías para esta selección. Desmarca alguna fotografía si deseas cambiarla.`,
    submitOrderError: 'Hubo un error al enviar la selección. Por favor intenta de nuevo.',

    // Final HD Delivery
    tabDelivery: 'Descarga Final HD',
    tabDeliveryBadge: 'HD',
    bannerDeliveryTitle: '¡Vuestras Fotografías Finales en Máxima Resolución están listas!',
    bannerDeliveryDaysLeft: (days: number, dateStr: string) =>
      `Disponible para descarga durante los próximos ${days} días (hasta el ${dateStr}).`,
    bannerDeliveryAvailable: 'Colección editada disponible para descarga en Google Drive.',
    bannerViewDetails: 'Ver detalles',
    bannerDownloadDrive: 'Descargar en Drive',
    timelineStep5DeliveredTag: 'Etapa 5 • Entregada y Lista',
    timelineStep5Cta: 'Acceder a Descarga Final HD',
    deliverySectionTag: 'COLECCIÓN DE AUTOR • ENTREGA FINAL',
    deliveryHeading: 'Descarga de vuestras Fotografías en Alta Resolución',
    deliveryDescription:
      'Cada fotografía ha recibido el calibrado óptico y revelado de autor de Lamha Studios. A continuación podéis acceder a la carpeta completa para descargar todos los archivos originales en máxima calidad.',
    deliveryDefaultLabel: 'Galería Completa en Google Drive',
    deliverySublabel: 'Archivos JPEG calibrados listos para impresión en gran formato y confección artesanal.',
    deliveryMetricFiles: 'Total Archivos',
    deliveryMetricFilesCount: (count: number) => `${count} fotos`,
    deliveryMetricFilesFallback: 'Colección Completa',
    deliveryMetricSize: 'Volumen Total',
    deliveryMetricSizeFallback: 'Alta Resolución',
    deliveryMetricExpiry: 'Caducidad en Nube',
    deliveryMetricExpiryDays: (days: number) => `${days} días`,
    deliveryDownloadBtn: 'Abrir y Descargar en Google Drive',
    deliveryDirectDownloadBtn: 'Descargar Archivo .ZIP Directamente',
    deliveryGuideTitle: 'Recomendaciones del Estudio:',
    deliveryGuide1Title: 'Descarga en un solo archivo:',
    deliveryGuide1Text:
      'En Google Drive, haz clic sobre el título de la carpeta arriba y selecciona "Descargar" para obtener todas las fotografías agrupadas en un archivo comprimido .ZIP.',
    deliveryGuide2Title: 'Copia de Seguridad:',
    deliveryGuide2Text:
      'Recomendamos guardar una copia en tu ordenador y en un disco duro externo. Los archivos permanecerán en la nube de descarga hasta la fecha de caducidad indicada.',
    deliveryBadgeOptical: 'Calibrado Óptico de Autor',
    deliveryBadgePrint: 'Listo para Impresión 300 DPI',
    deliveryBadgeSecure: 'Almacenamiento Seguro Cloud',
  },
  FR: {
    backToSite: 'Retour à Lamha Studios',
    logout: 'Déconnexion',
    confidentialTag: 'SUITE NUMÉRIQUE CONFIDENTIELLE',
    espacePrive: 'Espace Privé',
    loginDesc:
      'Accès exclusif et confidentiel. Saisissez votre adresse e-mail et votre code PIN personnel pour visualiser et sélectionner vos photographies d’art.',
    emailLabel: 'Adresse E-mail',
    emailPlaceholder: 'exemple@email.com',
    pinLabel: 'Code PIN de Sécurité',
    verifying: 'Vérification des identifiants...',
    accessBtn: 'Accéder à la Suite Privée',
    demoBtn: 'Tester la session démo : Leyla & Karim (#8942)',
    errEmpty: 'Veuillez saisir votre adresse e-mail et votre code PIN personnel.',
    errServer: 'Erreur de contact avec le serveur. Veuillez réessayer.',
    errInvalid: 'E-mail ou code PIN incorrect. Veuillez vérifier vos données d’accès.',
    errUnexpected: 'Une erreur inattendue est survenue lors de l’accès à la suite.',
    suiteTag: 'ESPACE PRIVÉ DU CLIENT',
    defaultSessionDesc: 'Mariage de Destination à Namaskar & Portraits Intimes',
    tabSelection: 'Sélection de Photos',
    tabTimeline: 'Statut de la Commande',
    curationSubtitle: 'Curation de votre livre d’art en cuir',
    quotaTitle: (quota: number) => `Sélectionnez vos ${quota} photographies maîtresses`,
    quotaDescActive: (count: number, quota: number) =>
      `Nous avons préparé ${count} photographies partagées avec le traitement chromatique d’auteur. Choisissez les ${quota} qui composeront votre livre d’art en lin et cuir.`,
    quotaDescEmpty: 'Votre photographe partagera ici les photographies dès que le traitement chromatique sera finalisé.',
    quotaAuthorLabel: 'Quota d’auteur sélectionné',
    quotaPending: (selected: number, missing: number) =>
      `Vous avez sélectionné ${selected} photos. Il vous reste ${missing} photos pour compléter le quota.`,
    quotaComplete: (selected: number, quota: number) =>
      `Quota complété exactement (${selected}/${quota}) ! Prêt pour l’envoi à Afaf.`,
    sendToAtelierBtn: 'Envoyer la Sélection à l’Atelier',
    downloadPreviewsBtn: 'Télécharger les Aperçus',
    filterAll: 'Toutes',
    filterFavs: 'Mes Favorites',
    filterPreparativos: 'Préparatifs',
    filterCeremonia: 'Cérémonie',
    filterRetratos: 'Portraits Intimes',
    filterDetalles: 'Détails & Joaillerie',
    searchPlaceholder: 'Rechercher par numéro ou note...',
    emptyCuratingTitle: 'Photographies en cours de Curation',
    emptyCuratingDesc:
      'Afaf Elaribi prépare l’étalonnage et le développement chromatique de votre séance. Dès que les photos maîtresses seront partagées, elles apparaîtront automatiquement ici.',
    requestedQuotaTag: (quota: number) => `Quota demandé : ${quota} photographies`,
    noPhotosFound: 'Aucune photographie trouvée avec les filtres sélectionnés.',
    inBookBadge: 'Dans le Livre',
    withNoteBadge: 'Avec Note',
    addNoteTitle: 'Ajouter une note de retouche',
    markForBookTitle: 'Sélectionner pour le livre',
    timelineCenterTag: 'SUIVI EN DIRECT',
    timelineCenterTitle: 'Le Voyage de vos Souvenirs',
    timelineCenterDesc:
      'Chaque étape est soignée avec étalonnage optique et confection artisanale de haute précision.',
    step1Tag: 'Étape 1 • Terminée',
    step1Date: 'Phase Initiale',
    step1Title: 'Entretien Esthétique & Réservation',
    step1Desc: 'Définition du style visuel, palette chromatique et organisation de la couverture photographique.',
    step2Tag: 'Étape 2 • Terminée',
    step2Date: 'Date de Séance',
    step2Title: 'Séance en Localisation',
    step2Desc: 'Couverture intégrale à la lumière naturelle et double équipement plein format de pointe.',
    step3Tag: 'Étape 3 • Terminée',
    step3Date: 'En Atelier',
    step3Title: 'Curation & Étalonnage d’Auteur',
    step3Desc: 'Sélection des clichés les plus émouvants et application de la palette exclusive Lamha.',
    step4Tag: 'Étape 4 • En Cours (Votre Action)',
    step4Date: 'Aujourd’hui',
    step4Title: (quota: number) => `Sélection des ${quota} Photographies Maîtresses`,
    step4Desc: (quota: number) =>
      `C’est votre moment : cochez vos ${quota} favorites pour lancer la retouche fine et la maquette du livre.`,
    step4Cta: (count: number, quota: number) => `Poursuivre la Sélection (${count}/${quota})`,
    step5Tag: 'Étape 5 • À Venir',
    step5Date: 'Est. 5 jours après sélection',
    step5Title: 'Retouche Fine & Confection en Atelier',
    step5Desc: 'Nettoyage microscopique, étalonnage final et reliure artisanale du livre en lin belge et cuir.',
    lbOf: 'sur',
    lbInBook: 'Dans le Livre',
    lbMarkForBook: 'Choisir pour le Livre',
    lbNoteSaved: 'Note Enregistrée',
    lbAddNote: 'Ajouter une Note',
    lbRotate: 'Pivoter',
    lbFitScreen: 'Ajuster',
    lbZoomIn: 'Agrandir 1:1',
    lbRetouchTitle: (id: string) => `Instruction de Retouche pour ${id}`,
    lbRetouchPlaceholder: 'Indiquez ici vos souhaits de retouche pour cette photo...',
    lbSaveNote: 'Enregistrer la Note',
    revFinalStep: 'Étape Finale',
    revConfirmTitle: 'Confirmer la Sélection pour la Confection du Livre',
    revChosenCount: 'Photos Choisies',
    revQuotaCount: 'Quota Demandé',
    revNotesCount: 'Notes de Retouche',
    revThumbsTitle: 'Miniatures qui composeront votre livre :',
    revGeneralLabel: 'Instructions générales pour Afaf Elaribi :',
    revGeneralPlaceholder: 'Commentaires sur l’ordre, photo favorite pour la couverture...',
    revKeepEditing: 'Continuer la Modification',
    revSendBtn: 'Envoyer à l’Atelier d’Afaf Elaribi',
    revSendingBtn: 'Envoi à l’Atelier en cours...',
    successTitle: 'Sélection Reçue à l’Atelier !',
    successDesc: (count: number) =>
      `Afaf Elaribi a bien reçu vos ${count} photographies maîtresses. La sélection est disponible dans l’atelier pour la calibration fine et la reliure.`,
    successContinue: 'Continuer dans l’Espace Privé',
    noteModalTag: 'Instruction de Retouche',
    noteModalTitle: (name: string) => `Note pour ${name}`,
    noteModalDesc:
      'Indiquez à Afaf Elaribi vos souhaits sur cette photographie (ex : couverture, retouche de peau, noir et blanc, recadrage...) :',
    noteModalPlaceholder: 'Écrivez ici vos instructions de retouche...',
    cancel: 'Annuler',
    saveNote: 'Enregistrer la Note',
    quotaLimitReached: (quota: number) =>
      `Vous avez atteint la limite maximale de ${quota} photographies pour cette sélection. Désélectionnez une photo pour la changer.`,
    submitOrderError: 'Une erreur est survenue lors de l’envoi de la sélection. Veuillez réessayer.',

    // Final HD Delivery
    tabDelivery: 'Téléchargement Final HD',
    tabDeliveryBadge: 'HD',
    bannerDeliveryTitle: 'Vos photographies finales en haute résolution sont prêtes !',
    bannerDeliveryDaysLeft: (days: number, dateStr: string) =>
      `Disponible au téléchargement pour les ${days} prochains jours (jusqu'au ${dateStr}).`,
    bannerDeliveryAvailable: 'Collection éditée disponible au téléchargement sur Google Drive.',
    bannerViewDetails: 'Voir les détails',
    bannerDownloadDrive: 'Télécharger sur Drive',
    timelineStep5DeliveredTag: 'Étape 5 • Livrée et Prête',
    timelineStep5Cta: 'Accéder au Téléchargement Final HD',
    deliverySectionTag: "COLLECTION D'AUTEUR • LIVRAISON FINALE",
    deliveryHeading: 'Téléchargement de vos Photographies en Haute Résolution',
    deliveryDescription:
      "Chaque photographie a bénéficié de l'étalonnage optique et du développement d'auteur de Lamha Studios. Vous pouvez désormais accéder au dossier complet pour télécharger tous les fichiers originaux en qualité maximale.",
    deliveryDefaultLabel: 'Galerie Complète sur Google Drive',
    deliverySublabel: "Fichiers JPEG calibrés prêts pour le tirage grand format et la reliure d'art.",
    deliveryMetricFiles: 'Total Fichiers',
    deliveryMetricFilesCount: (count: number) => `${count} photos`,
    deliveryMetricFilesFallback: 'Collection Complète',
    deliveryMetricSize: 'Volume Total',
    deliveryMetricSizeFallback: 'Haute Résolution',
    deliveryMetricExpiry: 'Expiration Cloud',
    deliveryMetricExpiryDays: (days: number) => `${days} jours`,
    deliveryDownloadBtn: 'Ouvrir et Télécharger sur Google Drive',
    deliveryDirectDownloadBtn: 'Télécharger le fichier .ZIP Directement',
    deliveryGuideTitle: "Recommandations de l'Atelier :",
    deliveryGuide1Title: 'Téléchargement en un seul fichier :',
    deliveryGuide1Text:
      'Sur Google Drive, cliquez sur le titre du dossier en haut et choisissez "Télécharger" pour obtenir toutes les photographies regroupées dans un fichier .ZIP compressé.',
    deliveryGuide2Title: 'Copie de Sauvegarde :',
    deliveryGuide2Text:
      "Nous vous recommandons de sauvegarder une copie sur votre ordinateur et un disque dur externe. Les fichiers resteront dans le cloud jusqu'à la date d'expiration indiquée.",
    deliveryBadgeOptical: "Étalonnage Optique d'Auteur",
    deliveryBadgePrint: 'Prêt pour Tirage 300 DPI',
    deliveryBadgeSecure: 'Stockage Cloud Sécurisé',
  },
  EN: {
    backToSite: 'Back to Lamha Studios',
    logout: 'Sign Out',
    confidentialTag: 'CONFIDENTIAL DIGITAL SUITE',
    espacePrive: 'Private Suite',
    loginDesc:
      'Exclusive and confidential access. Enter your email and personal PIN code to view and select your master photographs.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'example@email.com',
    pinLabel: 'Security PIN Code',
    verifying: 'Verifying Credentials...',
    accessBtn: 'Access Private Suite',
    demoBtn: 'Try demo session: Leyla & Karim (#8942)',
    errEmpty: 'Please enter your email and personal PIN code.',
    errServer: 'Error connecting to the server. Please try again.',
    errInvalid: 'Incorrect email or PIN code. Please verify your access details.',
    errUnexpected: 'An unexpected error occurred while accessing the suite.',
    suiteTag: 'CLIENT PRIVATE SUITE',
    defaultSessionDesc: 'Destination Wedding in Namaskar & Fine Art Portraits',
    tabSelection: 'Photo Selection',
    tabTimeline: 'Order Timeline',
    curationSubtitle: 'Curation of your fine leather art book',
    quotaTitle: (quota: number) => `Select your ${quota} master photographs`,
    quotaDescActive: (count: number, quota: number) =>
      `We have prepared ${count} shared photographs with fine art color grading. Choose the ${quota} that will feature in your handcrafted album.`,
    quotaDescEmpty: 'Your photographer will share photographs here as soon as color grading is completed.',
    quotaAuthorLabel: 'Selected photo quota',
    quotaPending: (selected: number, missing: number) =>
      `You have selected ${selected} photos. You need ${missing} more to complete your quota.`,
    quotaComplete: (selected: number, quota: number) =>
      `Quota completed perfectly (${selected}/${quota})! Ready to send to Afaf.`,
    sendToAtelierBtn: 'Submit Selection to Atelier',
    downloadPreviewsBtn: 'Download Previews',
    filterAll: 'All',
    filterFavs: 'My Favorites',
    filterPreparativos: 'Getting Ready',
    filterCeremonia: 'Ceremony',
    filterRetratos: 'Fine Art Portraits',
    filterDetalles: 'Details & Jewelry',
    searchPlaceholder: 'Search by number or note...',
    emptyCuratingTitle: 'Photographs in Curation Process',
    emptyCuratingDesc:
      'Afaf Elaribi is preparing the color grading for your session. As soon as master photos are shared from the studio, they will appear here automatically.',
    requestedQuotaTag: (quota: number) => `Requested quota: ${quota} photographs`,
    noPhotosFound: 'No photographs match the selected filters.',
    inBookBadge: 'In Book',
    withNoteBadge: 'With Note',
    addNoteTitle: 'Add retouch note',
    markForBookTitle: 'Mark for book',
    timelineCenterTag: 'LIVE PRODUCTION TIMELINE',
    timelineCenterTitle: 'The Journey of Your Memories',
    timelineCenterDesc: 'Every phase is carefully guided by optical precision and bespoke craftsmanship.',
    step1Tag: 'Stage 1 • Completed',
    step1Date: 'Initial Phase',
    step1Title: 'Aesthetic Consultation & Booking',
    step1Desc: 'Defining visual style, preferred color palette, and coverage planning.',
    step2Tag: 'Stage 2 • Completed',
    step2Date: 'Session Date',
    step2Title: 'On-Location Shoot',
    step2Desc: 'Comprehensive natural light coverage with dual full-frame equipment.',
    step3Tag: 'Stage 3 • Completed',
    step3Date: 'In Studio',
    step3Title: 'Author Curation & Color Grading',
    step3Desc: 'Selecting the most emotive captures and applying the signature Lamha palette.',
    step4Tag: 'Stage 4 • In Progress (Your Action)',
    step4Date: 'Today',
    step4Title: (quota: number) => `Selection of ${quota} Master Photographs`,
    step4Desc: (quota: number) =>
      `It's your moment: select your ${quota} favorites to begin fine retouching and book layout.`,
    step4Cta: (count: number, quota: number) => `Continue Selection (${count}/${quota})`,
    step5Tag: 'Stage 5 • Upcoming',
    step5Date: 'Est. 5 days after selection',
    step5Title: 'Fine Retouching & Atelier Crafting',
    step5Desc: 'Pixel-level retouching, final grading, and hand-binding of your book in Belgian linen and leather.',
    lbOf: 'of',
    lbInBook: 'In Book',
    lbMarkForBook: 'Mark for Book',
    lbNoteSaved: 'Note Saved',
    lbAddNote: 'Add Note',
    lbRotate: 'Rotate',
    lbFitScreen: 'Fit Screen',
    lbZoomIn: 'Zoom 1:1',
    lbRetouchTitle: (id: string) => `Retouch Instruction for ${id}`,
    lbRetouchPlaceholder: 'Write your retouching notes for this photo...',
    lbSaveNote: 'Save Note',
    revFinalStep: 'Final Step',
    revConfirmTitle: 'Confirm Selection for Book Crafting',
    revChosenCount: 'Photos Selected',
    revQuotaCount: 'Requested Quota',
    revNotesCount: 'Retouch Notes',
    revThumbsTitle: 'Thumbnails included in your book:',
    revGeneralLabel: 'General instructions for Afaf Elaribi:',
    revGeneralPlaceholder: 'Comments on photo sequence, preferred cover photo...',
    revKeepEditing: 'Keep Editing',
    revSendBtn: 'Send to Afaf Elaribi Atelier',
    revSendingBtn: 'Submitting to Atelier...',
    successTitle: 'Selection Received at the Atelier!',
    successDesc: (count: number) =>
      `Afaf Elaribi has received your ${count} master photographs successfully. Your selection is now ready in the studio dashboard for calibration and book crafting.`,
    successContinue: 'Continue in Private Suite',
    noteModalTag: 'Retouch Instruction',
    noteModalTitle: (name: string) => `Note for ${name}`,
    noteModalDesc:
      'Provide any instructions to Afaf Elaribi for this photo (e.g. album cover, skin retouching, black & white, crop...):',
    noteModalPlaceholder: 'Write your retouching instruction here...',
    cancel: 'Cancel',
    saveNote: 'Save Note',
    quotaLimitReached: (quota: number) =>
      `You have reached the maximum quota of ${quota} photographs for this selection. Deselect a photo to replace it.`,
    submitOrderError: 'There was an error submitting your selection. Please try again.',

    // Final HD Delivery
    tabDelivery: 'Final HD Download',
    tabDeliveryBadge: 'HD',
    bannerDeliveryTitle: 'Your final high-resolution photographs are ready!',
    bannerDeliveryDaysLeft: (days: number, dateStr: string) =>
      `Available for download for the next ${days} days (until ${dateStr}).`,
    bannerDeliveryAvailable: 'Edited collection available for download on Google Drive.',
    bannerViewDetails: 'View details',
    bannerDownloadDrive: 'Download on Drive',
    timelineStep5DeliveredTag: 'Stage 5 • Delivered & Ready',
    timelineStep5Cta: 'Access Final HD Download',
    deliverySectionTag: 'SIGNATURE COLLECTION • FINAL DELIVERY',
    deliveryHeading: 'Download Your High-Resolution Photographs',
    deliveryDescription:
      'Every photograph has undergone optical calibration and signature grading by Lamha Studios. You can now access the full folder to download all original files in master quality.',
    deliveryDefaultLabel: 'Complete Gallery on Google Drive',
    deliverySublabel: 'Calibrated JPEG files ready for large format fine art printing and handcrafted binding.',
    deliveryMetricFiles: 'Total Files',
    deliveryMetricFilesCount: (count: number) => `${count} photos`,
    deliveryMetricFilesFallback: 'Full Collection',
    deliveryMetricSize: 'Total Size',
    deliveryMetricSizeFallback: 'Master Quality',
    deliveryMetricExpiry: 'Cloud Expiration',
    deliveryMetricExpiryDays: (days: number) => `${days} days`,
    deliveryDownloadBtn: 'Open and Download on Google Drive',
    deliveryDirectDownloadBtn: 'Download .ZIP Archive Directly',
    deliveryGuideTitle: 'Studio Recommendations:',
    deliveryGuide1Title: 'Single archive download:',
    deliveryGuide1Text:
      'In Google Drive, click the folder title at the top and select "Download" to obtain all photographs bundled in a compressed .ZIP file.',
    deliveryGuide2Title: 'Backup & Archiving:',
    deliveryGuide2Text:
      'We recommend saving a copy on your computer and an external hard drive. Files will remain on the cloud until the specified expiration date.',
    deliveryBadgeOptical: 'Signature Optical Calibration',
    deliveryBadgePrint: 'Ready for 300 DPI Fine Art Print',
    deliveryBadgeSecure: 'Secure Cloud Storage',
  },
  AR: {
    backToSite: 'العودة إلى استوديوهات لمحة',
    logout: 'خروج',
    confidentialTag: 'الجناح الرقمي السري',
    espacePrive: 'البوابة الخاصة',
    loginDesc:
      'وصول حصري وسري. أدخل بريدك الإلكتروني ورمز PIN الشخصي لعرض واختيار صورك الفنية الرئيسية.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'example@email.com',
    pinLabel: 'رمز PIN للأمان',
    verifying: 'جارٍ التحقق من البيانات...',
    accessBtn: 'الدخول إلى الجناح الخاص',
    demoBtn: 'تجربة الجلسة التجريبية: ليلى وكريم (#8942)',
    errEmpty: 'يرجى إدخال بريدك الإلكتروني ورمز PIN الشخصي.',
    errServer: 'حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.',
    errInvalid: 'البريد الإلكتروني أو رمز PIN غير صحيح. يرجى التحقق من بيانات الدخول.',
    errUnexpected: 'حدث خطأ غير متوقع أثناء الدخول للجناح.',
    suiteTag: 'الجناح الخاص للعميل',
    defaultSessionDesc: 'حفل زفاف في مراكش وجلسات تصوير فنية',
    tabSelection: 'اختيار الصور',
    tabTimeline: 'مراحل الطلب',
    curationSubtitle: 'تنسيق ألبومكم الجلدي الفاخر',
    quotaTitle: (quota: number) => `اختر صورك الفنية الـ ${quota}`,
    quotaDescActive: (count: number, quota: number) =>
      `لقد جهزنا ${count} صورة مشتركة معالجة بألوان الاستوديو الفنية. حدد ${quota} صورة لتكون في ألبومكم المصنوع يدوياً بالكتان والجلد.`,
    quotaDescEmpty: 'سيقوم المصور بمشاركة الصور هنا فور انتهاء التعديل ومعايرة الألوان.',
    quotaAuthorLabel: 'الحد المختار للألبوم',
    quotaPending: (selected: number, missing: number) =>
      `لقد حددت ${selected} صورة. يتبقى لك ${missing} صورة لاكتمال الحد المطلوب.`,
    quotaComplete: (selected: number, quota: number) =>
      `تم استيفاء الحد تماماً (${selected}/${quota})! جاهز للإرسال إلى عفاف.`,
    sendToAtelierBtn: 'إرسال الاختيارات للاستوديو',
    downloadPreviewsBtn: 'تحميل المعاينات',
    filterAll: 'الكل',
    filterFavs: 'المفضلة لدي',
    filterPreparativos: 'التحضيرات',
    filterCeremonia: 'المراسيم',
    filterRetratos: 'جلسة البورتريه',
    filterDetalles: 'التفاصيل والمجوهرات',
    searchPlaceholder: 'البحث بالرقم أو الملاحظة...',
    emptyCuratingTitle: 'الصور قيد الانتقاء والتحضير',
    emptyCuratingDesc:
      'عفاف العريبي تقوم بمعايرة وتجهيز الألوان لجلساتكم. بمجرد مشاركة الصور من الاستوديو ستظهر هنا تلقائياً لتتمكنوا من اختيارها.',
    requestedQuotaTag: (quota: number) => `الحد المطلوب: ${quota} صورة`,
    noPhotosFound: 'لم يتم العثور على صور مطابقة للفلاتر المحددة.',
    inBookBadge: 'في الألبوم',
    withNoteBadge: 'مع ملاحظة',
    addNoteTitle: 'إضافة ملاحظة تعديل',
    markForBookTitle: 'تحديد للألبوم',
    timelineCenterTag: 'متابعة الإنتاج المباشرة',
    timelineCenterTitle: 'رحلة ذكرياتكم',
    timelineCenterDesc: 'نرافق كل مرحلة بالمعايرة الدقيقة والصناعة اليدوية الفاخرة.',
    step1Tag: 'المرحلة 1 • مكتملة',
    step1Date: 'المرحلة الأولى',
    step1Title: 'الاستشارة الفنية والحجز',
    step1Desc: 'تحديد الطابع البصري، لوحة الألوان المفضلة وتنظيم خطة التصوير.',
    step2Tag: 'المرحلة 2 • مكتملة',
    step2Date: 'تاريخ الجلسة',
    step2Title: 'جلسة التصوير في الموقع',
    step2Desc: 'تغطية شاملة بالضوء الطبيعي ومعدات احترافية متطورة.',
    step3Tag: 'المرحلة 3 • مكتملة',
    step3Date: 'في الاستوديو',
    step3Title: 'الانتقاء ومعايرة الألوان الفنية',
    step3Desc: 'اختيار اللقطات الأكثر تأثيراً وتطبيق درجات ألوان لمحة الحصرية.',
    step4Tag: 'المرحلة 4 • جارية (دوركم الآن)',
    step4Date: 'اليوم',
    step4Title: (quota: number) => `اختيار الـ ${quota} صورة الرئيسية`,
    step4Desc: (quota: number) =>
      `حان دوركم: حددوا ${quota} صورة مفضلة لبدء التعديل الدقيق وتصميم الألبوم.`,
    step4Cta: (count: number, quota: number) => `متابعة الاختيار (${count}/${quota})`,
    step5Tag: 'المرحلة 5 • القادمة',
    step5Date: 'تقريباً 5 أيام بعد الاختيار',
    step5Title: 'التعديل الدقيق والصناعة اليدوية',
    step5Desc: 'التنقيح الدقيق والمعايرة النهائية والتجليد اليدوي بالكتان والجلد الطبيعي.',
    lbOf: 'من أصل',
    lbInBook: 'في الألبوم',
    lbMarkForBook: 'تحديد للألبوم',
    lbNoteSaved: 'تم حفظ الملاحظة',
    lbAddNote: 'إضافة ملاحظة',
    lbRotate: 'تدوير',
    lbFitScreen: 'ملاءمة',
    lbZoomIn: 'تكبير 1:1',
    lbRetouchTitle: (id: string) => `تعليمات التعديل لـ ${id}`,
    lbRetouchPlaceholder: 'اكتب ملاحظاتك وتعديلاتك على هذه الصورة...',
    lbSaveNote: 'حفظ الملاحظة',
    revFinalStep: 'الخطوة النهائية',
    revConfirmTitle: 'تأكيد الاختيار لتجهيز الألبوم',
    revChosenCount: 'الصور المختارة',
    revQuotaCount: 'الحد المطلوب',
    revNotesCount: 'ملاحظات التعديل',
    revThumbsTitle: 'الصور المصغرة التي ستكون في ألبومكم:',
    revGeneralLabel: 'تعليمات عامة لعفاف العريبي:',
    revGeneralPlaceholder: 'ملاحظات حول الترتيب أو صورة الغلاف المفضلة...',
    revKeepEditing: 'متابعة التعديل',
    revSendBtn: 'إرسال إلى استوديو عفاف العريبي',
    revSendingBtn: 'جارٍ الإرسال إلى الاستوديو...',
    successTitle: 'تم استلام الاختيارات في الاستوديو بنجاح!',
    successDesc: (count: number) =>
      `استلمت عفاف العريبي صوركم الرئيسية الـ ${count} بنجاح. الاختيارات متاحة الآن في لوحة الاستوديو للبدء في المعايرة وتجهيز الألبوم.`,
    successContinue: 'البقاء في الجناح الخاص',
    noteModalTag: 'تعليمات التعديل',
    noteModalTitle: (name: string) => `ملاحظة لـ ${name}`,
    noteModalDesc:
      'أخبر عفاف العريبي بأي تعليمات خاصة بهذه الصورة (مثال: غلاف الألبوم، تنقية البشرة، تحويل للأبيض والأسود، قص...):',
    noteModalPlaceholder: 'اكتب تعليمات التعديل هنا...',
    cancel: 'إلغاء',
    saveNote: 'حفظ الملاحظة',
    quotaLimitReached: (quota: number) =>
      `لقد بلغت الحد الأقصى البالغ ${quota} صورة. قم بإلغاء تحديد صورة إذا أردت استبدالها.`,
    submitOrderError: 'حدث خطأ أثناء إرسال الاختيارات. يرجى المحاولة مرة أخرى.',

    // Final HD Delivery
    tabDelivery: 'التحميل النهائي عالي الدقة',
    tabDeliveryBadge: 'HD',
    bannerDeliveryTitle: 'صوركم النهائية بدقة فائقة الجودة جاهزة للتحميل!',
    bannerDeliveryDaysLeft: (days: number, dateStr: string) =>
      `متاحة للتحميل خلال الأيام الـ ${days} القادمة (حتى ${dateStr}).`,
    bannerDeliveryAvailable: 'المجموعة المعدلة متاحة للتحميل عبر Google Drive.',
    bannerViewDetails: 'عرض التفاصيل',
    bannerDownloadDrive: 'تحميل عبر Drive',
    timelineStep5DeliveredTag: 'المرحلة 5 • تم التسليم وجاهز',
    timelineStep5Cta: 'الوصول إلى التحميل النهائي',
    deliverySectionTag: 'مجموعة التوقيع • التسليم النهائي',
    deliveryHeading: 'تحميل صوركم بدقة فائقة الجودة',
    deliveryDescription:
      'خضعت كل صورة للمعايرة البصرية والتعديل الفني الخاص باستوديوهات لمحة. يمكنك الآن الوصول إلى المجلد الكامل لتحميل جميع الملفات الأصلية بأعلى جودة.',
    deliveryDefaultLabel: 'المعرض الكامل عبر Google Drive',
    deliverySublabel: 'ملفات JPEG معايرة جاهزة للطباعة الفنية بأحجام كبيرة والتجليد اليدوي.',
    deliveryMetricFiles: 'إجمالي الملفات',
    deliveryMetricFilesCount: (count: number) => `${count} صورة`,
    deliveryMetricFilesFallback: 'المجموعة الكاملة',
    deliveryMetricSize: 'الحجم الإجمالي',
    deliveryMetricSizeFallback: 'دقة فائقة',
    deliveryMetricExpiry: 'صلاحية السحابة',
    deliveryMetricExpiryDays: (days: number) => `${days} يوم`,
    deliveryDownloadBtn: 'فتح وتحميل من Google Drive',
    deliveryDirectDownloadBtn: 'تحميل ملف .ZIP مباشرة',
    deliveryGuideTitle: 'إرشادات الاستوديو:',
    deliveryGuide1Title: 'تحميل في ملف واحد:',
    deliveryGuide1Text:
      'في Google Drive، انقر على اسم المجلد في الأعلى واختر "تحميل" للحصول على جميع الصور مجمعة في ملف مضغوط .ZIP.',
    deliveryGuide2Title: 'النسخ الاحتياطي والأرشفة:',
    deliveryGuide2Text:
      'نوصي بالاحتفاظ بنسخة على جهاز الكمبيوتر الخاص بك وعلى قرص صلب خارجي. ستبقى الملفات متاحة للتنزيل حتى تاريخ انتهاء الصلاحية المحدد.',
    deliveryBadgeOptical: 'معايرة بصرية فنية خاصة',
    deliveryBadgePrint: 'جاهز للطباعة بدقة 300 DPI',
    deliveryBadgeSecure: 'تخزين سحابي آمن',
  },
}

const PHOTOS: PhotoItem[] = [
  { id: 'LMH_0101', category: 'preparativos', title: 'Velo de seda y luz matinal', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0102', category: 'detalles', title: 'Alianzas grabadas en estuche de lino', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0103', category: 'preparativos', title: 'Ajuste del vestido de novia', url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0104', category: 'ceremonia', title: 'Llegada al altar y mirada cómplice', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85', defaultNote: 'Elegida para portada del álbum' },
  { id: 'LMH_0105', category: 'ceremonia', title: 'Intercambio de votos bajo la cúpula', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0106', category: 'retratos', title: 'Retrato editorial en penumbra dorada', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0107', category: 'detalles', title: 'Ramo silvestre con dalias y olivo', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0108', category: 'ceremonia', title: 'El primer beso como esposos', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0109', category: 'retratos', title: 'Paseo entre olivares al atardecer', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0110', category: 'retratos', title: 'Retrato íntimo en blanco y negro', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0111', category: 'detalles', title: 'Zapatos bordados en seda marfil', url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0112', category: 'preparativos', title: 'El nudo de la corbata y reloj vintage', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0113', category: 'ceremonia', title: 'Lluvia de pétalos de rosa', url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0114', category: 'retratos', title: 'Miradas y luz de poniente', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0115', category: 'ceremonia', title: 'Abrazo familiar lleno de lágrimas', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0116', category: 'detalles', title: 'Mesa nupcial con velas y flores de cera', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0117', category: 'retratos', title: 'Abrazo en el claustro histórico', url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0118', category: 'detalles', title: 'Minutas en papel artesanal rasgado', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0119', category: 'ceremonia', title: 'Firma del acta matrimonial', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0120', category: 'preparativos', title: 'Brindis con las damas de honor', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0121', category: 'retratos', title: 'Risa espontánea en los jardines', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0122', category: 'preparativos', title: 'Retoque del labial y perfume', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0123', category: 'ceremonia', title: 'Entrada triunfal con música en directo', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85' },
  { id: 'LMH_0124', category: 'detalles', title: 'Pastel nupcial con higos y flores secas', url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=85' },
]

export default function PortalPage() {
  const { lang, setLang, isRTL } = useLanguage()
  const t = PORTAL_I18N[lang] || PORTAL_I18N.ES

  // Language selector menu state
  const [openLangMenu, setOpenLangMenu] = useState<'topbar' | 'card' | null>(null)
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false)

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [sessionPhotos, setSessionPhotos] = useState<PhotoItem[]>([])
  const [hasLoadedDatabaseAssets, setHasLoadedDatabaseAssets] = useState(false)

  // Variable Quota State
  const [maxQuota, setMaxQuota] = useState<number>(20)

  // Selection & Suite State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'selection' | 'timeline' | 'delivery'>('selection')
  const [category, setCategory] = useState<'all' | 'favs'>('all')
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Record<string, string>>({})

  // Modals
  const [activeNoteModal, setActiveNoteModal] = useState<PhotoItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [rotation, setRotation] = useState<number>(0)
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const filmstripRef = useRef<HTMLDivElement | null>(null)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [generalNotes, setGeneralNotes] = useState('')
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false)

  const handleLogin = async (enteredEmail: string, enteredPin: string) => {
    const cleanEmail = enteredEmail.trim().toLowerCase()
    const cleanPin = enteredPin.trim()

    if (!cleanEmail || !cleanPin) {
      setLoginError(t.errEmpty)
      return
    }

    setIsLoggingIn(true)
    setLoginError(null)

    try {
      // Demo Account
      if (cleanPin === '8942' && (cleanEmail === 'demo@lamhastudios.com' || cleanEmail.includes('demo') || cleanEmail.includes('leyla'))) {
        setIsAuthenticated(true)
        setMaxQuota(20)
        setSessionPhotos(PHOTOS)
        setSelectedIds(new Set(PHOTOS.slice(0, 10).map((p) => p.id)))
        setNotes({ LMH_0104: 'Elegida para portada del álbum' })
        setHasLoadedDatabaseAssets(false)
        setCurrentSession({
          id: 'demo-session',
          client_name: 'Leyla & Karim',
          client_email: 'demo@lamhastudios.com',
          category: 'Boda de Autor',
          session_date: '2026-09-15',
          status: 'delivered',
          media_deliveries: [
            {
              id: 'demo-delivery',
              delivery_type: 'final_link',
              url: 'https://drive.google.com',
              label: 'Colección de Autor en Alta Resolución (Google Drive)',
              delivered_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
              total_files: 48,
              total_size_mb: 850,
              is_active: true,
            }
          ]
        })
        setIsLoggingIn(false)
        return
      }

      // Supabase Email + PIN Verification (incluyendo media_deliveries)
      const { data: session, error } = await supabase
        .from('sessions')
        .select('id, client_name, client_email, category, session_date, portal_pin, status, tags, selected_assets, media_assets(*), media_deliveries(*)')
        .ilike('client_email', cleanEmail)
        .eq('portal_pin', cleanPin)
        .maybeSingle()

      if (error) {
        console.error('Error verificando credenciales en Supabase:', error)
        setLoginError(t.errServer)
        return
      }

      if (session) {
        setCurrentSession(session)
        setIsAuthenticated(true)

        // 1. Quota variable from session tags
        let resolvedQuota = 20
        if (Array.isArray(session.tags)) {
          const quotaTag = session.tags.find((item: string) => item.startsWith('quota:'))
          if (quotaTag) {
            const parsed = parseInt(quotaTag.replace('quota:', ''), 10)
            if (!isNaN(parsed) && parsed > 0) resolvedQuota = parsed
          }
        }
        setMaxQuota(resolvedQuota)

        // 2. Load existing selection
        if (session.selected_assets && Array.isArray(session.selected_assets)) {
          setSelectedIds(new Set(session.selected_assets))
        } else {
          setSelectedIds(new Set())
        }

        // Load existing retouch notes
        const loadedNotes: Record<string, string> = {}
        if (session.media_assets && Array.isArray(session.media_assets)) {
          for (const a of session.media_assets) {
            if (a.client_notes && a.client_notes.trim()) {
              const key = a.filename || a.id
              loadedNotes[key] = a.client_notes.trim()
            }
          }
        }
        setNotes(loadedNotes)

        // 3. Load shared photos (is_shared: true)
        if (session.media_assets && session.media_assets.length > 0) {
          setHasLoadedDatabaseAssets(true)
          const sharedAssets = session.media_assets.filter((a: any) => a.is_shared === true)
          if (sharedAssets.length > 0) {
            const mapped: PhotoItem[] = sharedAssets.map((a: any, idx: number) => ({
              id: a.filename || a.id || `LMH_${idx + 1}`,
              title: a.filename || `Photographie ${idx + 1}`,
              url: a.preview_url || a.nas_path || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
              category: (a.asset_type?.includes('video') ? 'ceremonia' : 'retratos') as any,
            }))
            setSessionPhotos(mapped)
          } else {
            setSessionPhotos([])
          }
        } else {
          setHasLoadedDatabaseAssets(false)
          setSessionPhotos([])
        }
      } else {
        setLoginError(t.errInvalid)
      }
    } catch (e: any) {
      console.error('Login error:', e)
      setLoginError(t.errUnexpected)
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Auto-login if parameters in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlEmail = params.get('email')
      const urlPin = params.get('pin')
      if (urlEmail) setEmail(urlEmail)
      if (urlPin) setPin(urlPin)

      if (urlEmail && urlPin) {
        handleLogin(urlEmail, urlPin)
      } else if (urlPin === '8942') {
        setEmail('demo@lamhastudios.com')
        handleLogin('demo@lamhastudios.com', '8942')
      }
    }
  }, [])

  const toggleSelect = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const next = new Set(selectedIds)
    const isAdding = !next.has(id)
    if (next.has(id)) {
      next.delete(id)
    } else {
      if (next.size >= maxQuota) {
        alert(t.quotaLimitReached(maxQuota))
        return
      }
      next.add(id)
    }
    setSelectedIds(next)

    // Sync in background with Supabase
    if (currentSession?.id) {
      try {
        const nextArr = Array.from(next)
        await supabase
          .from('sessions')
          .update({ selected_assets: nextArr })
          .eq('id', currentSession.id)

        await supabase
          .from('media_assets')
          .update({ client_selected: isAdding })
          .eq('session_id', currentSession.id)
          .eq('filename', id)
      } catch (err) {
        console.error('Error sincronizando selección con Supabase:', err)
      }
    }
  }

  const handleFinalSubmit = async () => {
    if (!currentSession?.id) return
    setIsSubmittingOrder(true)

    try {
      const selectedArr = Array.from(selectedIds)
      const localeStr = lang === 'FR' ? 'fr-FR' : lang === 'EN' ? 'en-US' : lang === 'AR' ? 'ar-MA' : 'es-ES'
      const timestamp = new Date().toLocaleDateString(localeStr, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      const existingComments = currentSession.comments ? `${currentSession.comments}\n` : ''
      const clientNoteEntry = `[${timestamp}] Selección cliente: ${selectedArr.length} fotos.${
        generalNotes.trim() ? ` Nota: "${generalNotes.trim()}"` : ''
      }`
      const updatedComments = `${existingComments}${clientNoteEntry}`

      const currentTags = Array.isArray(currentSession.tags) ? currentSession.tags : []
      const filteredTags = currentTags.filter((item: string) => !item.startsWith('stage:'))
      const updatedTags = [...filteredTags, 'stage:client_selected']

      await supabase
        .from('sessions')
        .update({
          selected_assets: selectedArr,
          comments: updatedComments,
          status: 'client_selected',
          tags: updatedTags,
        })
        .eq('id', currentSession.id)

      if (selectedArr.length > 0) {
        await supabase
          .from('media_assets')
          .update({ client_selected: true })
          .eq('session_id', currentSession.id)
          .in('filename', selectedArr)

        for (const [photoFilename, photoNote] of Object.entries(notes)) {
          if (photoNote && photoNote.trim()) {
            await supabase
              .from('media_assets')
              .update({ client_notes: photoNote.trim() })
              .eq('session_id', currentSession.id)
              .eq('filename', photoFilename)
          }
        }
      }

      setReviewModalOpen(false)
      setOrderSubmittedSuccess(true)
    } catch (err) {
      console.error('Error enviando selección:', err)
      alert(t.submitOrderError)
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  const activePhotos = sessionPhotos.length > 0 ? sessionPhotos : hasLoadedDatabaseAssets ? [] : currentSession ? [] : PHOTOS
  const filteredPhotos = activePhotos.filter((photo) => {
    const matchesSearch =
      photo.id.toLowerCase().includes(search.toLowerCase()) ||
      photo.title.toLowerCase().includes(search.toLowerCase()) ||
      (notes[photo.id] || '').toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false
    if (category === 'all') return true
    if (category === 'favs') return selectedIds.has(photo.id)
    return true
  })

  // Reset zoom & rotación y auto-scroll de miniaturas al cambiar de foto
  useEffect(() => {
    setRotation(0)
    setIsZoomed(false)
    if (lightboxIndex !== null && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[lightboxIndex] as HTMLElement
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [lightboxIndex])

  // Navegación por teclado para el Lightbox (Esc, Flechas, R para rotar, F para zoom)
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName
      if (targetTag === 'TEXTAREA' || targetTag === 'INPUT') return

      if (e.key === 'Escape') {
        if (activeNoteModal) {
          setActiveNoteModal(null)
        } else {
          setLightboxIndex(null)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActiveNoteModal(null)
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActiveNoteModal(null)
        setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        setRotation((prev) => (prev + 90) % 360)
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        setIsZoomed((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, activeNoteModal, filteredPhotos.length])

  // Language Dropdown Component
  const renderLanguageSelector = (placement: 'topbar' | 'card' = 'topbar') => {
    const isOpen = openLangMenu === placement
    const currentOption = LANG_OPTIONS.find((item) => item.code === lang) || LANG_OPTIONS[0]

    return (
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setOpenLangMenu(isOpen ? null : placement)}
          style={{
            background: placement === 'card' ? 'rgba(25, 22, 19, 0.95)' : 'rgba(20, 18, 17, 0.85)',
            border: '1px solid rgba(198, 159, 104, 0.4)',
            color: '#e5c38e',
            padding: placement === 'card' ? '8px 16px' : '6px 14px',
            borderRadius: '10px',
            fontSize: placement === 'card' ? '0.8rem' : '0.75rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
          title="Changer de langue / Change language / Cambiar idioma"
        >
          <i className="fa-solid fa-globe" style={{ fontSize: '0.85rem', color: 'var(--c-gold)' }} />
          <span>{currentOption.name}</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.6, fontFamily: 'monospace' }}>({currentOption.code})</span>
          <i
            className="fa-solid fa-chevron-down"
            style={{
              fontSize: '0.65rem',
              opacity: 0.8,
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {isOpen && (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 90 }}
              onClick={() => setOpenLangMenu(null)}
            />
            <div
              style={{
                position: 'absolute',
                right: isRTL ? 'auto' : 0,
                left: isRTL ? 0 : 'auto',
                bottom: placement === 'card' ? '100%' : 'auto',
                top: placement === 'card' ? 'auto' : '100%',
                marginBottom: placement === 'card' ? '8px' : '0',
                marginTop: placement === 'card' ? '0' : '8px',
                background: '#151311',
                border: '1px solid rgba(198, 159, 104, 0.35)',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.9)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '155px',
                backdropFilter: 'blur(20px)',
              }}
            >
              {LANG_OPTIONS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLang(item.code)
                    setOpenLangMenu(null)
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: item.code === lang ? 'rgba(198, 159, 104, 0.2)' : 'transparent',
                    color: item.code === lang ? '#f5f2eb' : '#a89f91',
                    fontWeight: item.code === lang ? 700 : 500,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: isRTL ? 'right' : 'left',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    if (item.code !== lang) {
                      e.currentTarget.style.background = 'rgba(198, 159, 104, 0.1)'
                      e.currentTarget.style.color = '#e5c38e'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (item.code !== lang) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#a89f91'
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.code === lang && (
                      <i className="fa-solid fa-check" style={{ color: 'var(--c-gold)', fontSize: '0.7rem' }} />
                    )}
                    <span>{item.name}</span>
                  </span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.5, fontFamily: 'monospace' }}>
                    {item.code}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // ══════════════════════════════════════════════
  // VISTA 1: ACCESO PRIVADO POR EMAIL + PIN (LOGIN)
  // ══════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0b0a09',
        }}
      >
        {/* Cinematic Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.22) sepia(0.3) hue-rotate(-15deg)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(11,10,9,0.4) 0%, rgba(11,10,9,0.95) 100%)',
            zIndex: 1,
          }}
        />

        {/* Topbar minimalista con Selector de Idioma */}
        <aside
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href="/"
            className="back-to-site-link"
            style={{
              color: 'rgba(251, 250, 248, 0.7)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <i className={`fa-solid ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}`} />
            <span>{t.backToSite}</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {renderLanguageSelector('topbar')}
          </div>
        </aside>

        {/* Centro de Login con Email y PIN */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            className="invitation-panel"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '3.5rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              background: 'rgba(20, 18, 17, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(198, 159, 104, 0.25)',
              borderRadius: '18px',
              boxShadow: '0 30px 80px rgba(0,0,0, 0.6)',
            }}
          >
            <div className="invitation-gold-frame" style={{ pointerEvents: 'none' }}>
              <span className="frame-corner top-left" />
              <span className="frame-corner top-right" />
              <span className="frame-corner bottom-left" />
              <span className="frame-corner bottom-right" />
            </div>

            {/* Logo oficial de Lamha Studios */}
            <div
              style={{
                marginBottom: '1.75rem',
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Link href="/" style={{ display: 'inline-block', transition: 'opacity 0.2s ease' }} title="Lamha Studios">
                <div style={{ width: '175px', height: 'auto' }}>
                  <LamhaLogo color="var(--c-gold)" />
                </div>
              </Link>
            </div>

            <div
              className="section-tag-gold"
              style={{ justifyContent: 'center', marginBottom: '0.75rem', position: 'relative', zIndex: 10 }}
            >
              <span>{t.confidentialTag}</span>
            </div>

            <h1
              className="editorial-heading"
              style={{
                fontSize: '2.2rem',
                color: 'var(--c-ivory)',
                marginBottom: '0.75rem',
                position: 'relative',
                zIndex: 10,
              }}
            >
              {t.espacePrive}
            </h1>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'rgba(251, 250, 248, 0.7)',
                fontFamily: 'var(--f-serif)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 10,
              }}
            >
              {t.loginDesc}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin(email, pin)
              }}
              style={{ width: '100%', position: 'relative', zIndex: 10, textAlign: isRTL ? 'right' : 'left' }}
            >
              {/* Campo Email */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#c69f68',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--f-body)',
                    fontWeight: 600,
                  }}
                >
                  <i className="fa-regular fa-envelope" style={{ marginInlineEnd: '6px' }} /> {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setLoginError(null)
                  }}
                  style={{
                    width: '100%',
                    fontSize: '0.95rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(10, 8, 7, 0.65)',
                    border: '1px solid rgba(198, 159, 104, 0.35)',
                    color: '#f5f2eb',
                    outline: 'none',
                    fontFamily: 'var(--f-body)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--c-gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(198, 159, 104, 0.35)')}
                />
              </div>

              {/* Campo PIN */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#c69f68',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--f-body)',
                    fontWeight: 600,
                  }}
                >
                  <i className="fa-solid fa-key" style={{ marginInlineEnd: '6px' }} /> {t.pinLabel}
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value)
                    setLoginError(null)
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    letterSpacing: '0.35em',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    background: 'rgba(10, 8, 7, 0.65)',
                    border: '1px solid rgba(198, 159, 104, 0.35)',
                    color: 'var(--c-gold)',
                    outline: 'none',
                    fontFamily: 'var(--f-mono, monospace)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--c-gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(198, 159, 104, 0.35)')}
                />
              </div>

              {loginError && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <p style={{ fontSize: '0.78rem', color: '#f87171', margin: 0, fontFamily: 'var(--f-body)', lineHeight: 1.4 }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ marginInlineEnd: '6px' }} />
                    {loginError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-luxury-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', fontSize: '0.85rem' }}
              >
                {isLoggingIn ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginInlineEnd: '8px' }} />
                    {t.verifying}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginInlineEnd: '8px' }} />
                    {t.accessBtn}
                  </>
                )}
              </button>
            </form>

            {/* Selector de idioma desplegable */}
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 25,
              }}
            >
              {renderLanguageSelector('card')}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ══════════════════════════════════════════════
  // VISTA 2: SUITE PRIVADA DEL CLIENTE (LOGUEADO)
  // ══════════════════════════════════════════════
  const finalDelivery = currentSession?.media_deliveries?.find((d: any) => d.delivery_type === 'final_link' && d.is_active)

  return (
    <div className="luxury-portal-body" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* BARRA SUPERIOR DE LA SUITE PRIVADA */}
      <aside className="suite-topbar">
        <div className="container suite-topbar-inner">
          <div className="topbar-left">
            <Link href="/" className="back-to-site-link desktop-only-link">
              <i className={`fa-solid ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}`} />
              <span>{t.backToSite}</span>
            </Link>
            {/* Logo de marca exclusivo para versión móvil */}
            <Link href="/" className="mobile-topbar-brand" title="Lamha Studios">
              <LamhaLogo className="brand-svg-logo-dark" style={{ height: '22px', width: 'auto', marginBottom: 0 }} />
            </Link>
          </div>

          {/* DESKTOP ACTIONS: Visibles en pantallas medianas y grandes */}
          <div className="topbar-right desktop-topbar-actions">
            {renderLanguageSelector()}
            {currentSession?.client_email && (
              <span style={{ fontSize: '0.75rem', color: '#a89f91', fontFamily: 'var(--f-mono)' }}>
                <i className="fa-regular fa-user" style={{ marginInlineEnd: '6px', color: '#c69f68' }} />
                {currentSession.client_email}
              </span>
            )}
            <button
              onClick={() => {
                setIsAuthenticated(false)
                setCurrentSession(null)
                setSessionPhotos([])
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(198,159,104,0.3)',
                color: '#c69f68',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
              title={t.logout}
            >
              <i className="fa-solid fa-power-off" /> {t.logout}
            </button>
          </div>

          {/* MOBILE ACTIONS: Acceso rápido al cupo y botón BURGER elegante para ahorrar espacio */}
          <div className="mobile-topbar-actions">
            <button
              type="button"
              className="mobile-quota-pill-btn"
              onClick={() => setActiveTab('selection')}
              title={t.tabSelection}
            >
              <i className="fa-regular fa-images" />
              <span>{selectedIds.size}/{maxQuota}</span>
            </button>

            <button
              type="button"
              className="portal-burger-btn"
              onClick={() => setMobileUserMenuOpen(true)}
              aria-label="Abrir menú de navegación"
            >
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </aside>

      {/* DRAWER MÓVIL TIPO BURGER ULTRA-LUJO */}
      {mobileUserMenuOpen && (
        <div className="portal-drawer-container" dir={isRTL ? 'rtl' : 'ltr'}>
          <div
            className="portal-drawer-backdrop"
            onClick={() => setMobileUserMenuOpen(false)}
          />
          <div className="portal-drawer-panel">
            {/* Cabecera del Drawer */}
            <div className="portal-drawer-header">
              <div className="portal-drawer-brand">
                <LamhaLogo className="brand-svg-logo-dark" style={{ height: '22px', width: 'auto', marginBottom: 0 }} />
                <span className="portal-drawer-badge">{t.suiteTag}</span>
              </div>
              <button
                type="button"
                className="portal-drawer-close-btn"
                onClick={() => setMobileUserMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            {/* Tarjeta del Cliente */}
            <div className="portal-drawer-client-card">
              <div className="portal-drawer-avatar">
                <i className="fa-regular fa-user" />
              </div>
              <div className="portal-drawer-client-details">
                <span className="portal-drawer-client-name">
                  {currentSession?.client_name || 'Client'}
                </span>
                {currentSession?.client_email && (
                  <span className="portal-drawer-client-email">
                    {currentSession.client_email}
                  </span>
                )}
                <span className="portal-drawer-session-meta">
                  {currentSession?.category || 'Session Photo'} • {currentSession?.session_date || ''}
                </span>
              </div>
            </div>

            {/* Navegación de la Suite (Tabs para liberar espacio de la cabecera) */}
            <div className="portal-drawer-section">
              <span className="portal-drawer-section-title">
                {lang === 'FR' ? 'NAVIGATION DE LA SUITE' : lang === 'EN' ? 'SUITE NAVIGATION' : lang === 'AR' ? 'أقسام الجناح' : 'NAVEGACIÓN DE LA SUITE'}
              </span>
              <nav className="portal-drawer-nav">
                <button
                  type="button"
                  className={`portal-drawer-nav-item ${activeTab === 'selection' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('selection')
                    setMobileUserMenuOpen(false)
                  }}
                >
                  <div className="portal-drawer-nav-left">
                    <i className="fa-regular fa-images" />
                    <span>{t.tabSelection}</span>
                  </div>
                  <span className="portal-drawer-badge-count">
                    {selectedIds.size} / {maxQuota}
                  </span>
                </button>

                <button
                  type="button"
                  className={`portal-drawer-nav-item ${activeTab === 'timeline' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('timeline')
                    setMobileUserMenuOpen(false)
                  }}
                >
                  <div className="portal-drawer-nav-left">
                    <i className="fa-solid fa-timeline" />
                    <span>{t.tabTimeline}</span>
                  </div>
                  {activeTab === 'timeline' && <i className="fa-solid fa-check active-check" />}
                </button>

                {finalDelivery && (
                  <button
                    type="button"
                    className={`portal-drawer-nav-item portal-drawer-delivery-item ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('delivery')
                      setMobileUserMenuOpen(false)
                    }}
                  >
                    <div className="portal-drawer-nav-left">
                      <i className="fa-solid fa-cloud-arrow-down" />
                      <span>{t.tabDelivery}</span>
                    </div>
                    <span className="portal-drawer-badge-count hd-badge">
                      {t.tabDeliveryBadge}
                    </span>
                  </button>
                )}
              </nav>
            </div>

            {/* Selector de Idiomas */}
            <div className="portal-drawer-section">
              <span className="portal-drawer-section-title">
                <i className="fa-solid fa-globe" style={{ marginInlineEnd: '6px', color: 'var(--c-gold)' }} />
                {lang === 'FR' ? 'LANGUE' : lang === 'EN' ? 'LANGUAGE' : lang === 'AR' ? 'اللغة' : 'IDIOMA'}
              </span>
              <div className="portal-drawer-lang-grid">
                {LANG_OPTIONS.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`portal-drawer-lang-btn ${item.code === lang ? 'active' : ''}`}
                    onClick={() => {
                      setLang(item.code)
                      setMobileUserMenuOpen(false)
                    }}
                  >
                    <span>{item.name}</span>
                    <span className="portal-drawer-lang-code">{item.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enlaces & Cerrar Sesión */}
            <div className="portal-drawer-footer">
              <Link
                href="/"
                className="portal-drawer-back-link"
                onClick={() => setMobileUserMenuOpen(false)}
              >
                <i className={`fa-solid ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'}`} />
                <span>{t.backToSite}</span>
              </Link>

              <button
                type="button"
                className="portal-drawer-logout-btn"
                onClick={() => {
                  setMobileUserMenuOpen(false)
                  setIsAuthenticated(false)
                  setCurrentSession(null)
                  setSessionPhotos([])
                }}
              >
                <i className="fa-solid fa-power-off" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER DEDICADO DE LA SUITE DE CLIENTE */}
      <header className="suite-header">
        <div className="container suite-header-inner">
          <div className="suite-brand">
            <Link href="/" title="Lamha Studios">
              <LamhaLogo className="brand-svg-logo-dark" />
            </Link>
          </div>

          <div className="suite-welcome">
            <span className="suite-tag">{t.suiteTag}</span>
            <h1 className="suite-client-name">{currentSession?.client_name || 'Leyla & Karim'}</h1>
            <p className="suite-session-name">
              {currentSession
                ? `${currentSession.category || 'Session Photo'} • ${currentSession.session_date}`
                : t.defaultSessionDesc}
            </p>
          </div>

          {/* Pestañas dedicadas del cliente */}
          {(() => {
            const finalDelivery = currentSession?.media_deliveries?.find((d: any) => d.delivery_type === 'final_link' && d.is_active)
            return (
              <nav className="suite-tabs">
                <button
                  className={`suite-tab-btn ${activeTab === 'selection' ? 'active' : ''}`}
                  onClick={() => setActiveTab('selection')}
                >
                  <i className="fa-regular fa-images" />
                  <span>{t.tabSelection}</span>
                  <span className="tab-badge" id="tabCount">
                    {selectedIds.size} / {maxQuota}
                  </span>
                </button>
                <button
                  className={`suite-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
                  onClick={() => setActiveTab('timeline')}
                >
                  <i className="fa-solid fa-timeline" />
                  <span>{t.tabTimeline}</span>
                </button>
                {finalDelivery && (
                  <button
                    className={`suite-tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery')}
                    style={{
                      border: '1px solid rgba(198, 159, 104, 0.65)',
                      background: activeTab === 'delivery' ? 'var(--c-gold)' : 'rgba(198, 159, 104, 0.12)',
                      color: activeTab === 'delivery' ? '#0b0a09' : '#e5c38e',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: activeTab === 'delivery' ? '0 4px 15px rgba(198,159,104,0.35)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <i className="fa-solid fa-cloud-arrow-down" style={{ color: activeTab === 'delivery' ? '#0b0a09' : 'var(--c-gold)' }} />
                    <span>{t.tabDelivery}</span>
                    <span
                      className="tab-badge"
                      style={{
                        background: activeTab === 'delivery' ? '#0b0a09' : 'rgba(198, 159, 104, 0.25)',
                        color: activeTab === 'delivery' ? 'var(--c-gold)' : '#f5f2eb',
                        border: '1px solid rgba(198, 159, 104, 0.4)',
                        fontSize: '9px',
                        padding: '1px 6px',
                        fontWeight: 800,
                      }}
                    >
                      {t.tabDeliveryBadge}
                    </span>
                  </button>
                )}
              </nav>
            )
          })()}
        </div>
      </header>

      {/* BANNER DE ENTREGA FINAL LISTA (ESTILO CLARO FINE-ART & 100% LOCALIZADO) */}
      {(() => {
        const finalDelivery = currentSession?.media_deliveries?.find((d: any) => d.delivery_type === 'final_link' && d.is_active)
        if (!finalDelivery) return null
        const daysLeft = finalDelivery.expires_at
          ? Math.max(1, Math.ceil((new Date(finalDelivery.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
          : null
        const formattedExpiryDate = finalDelivery.expires_at
          ? new Date(finalDelivery.expires_at).toLocaleDateString(
              lang === 'FR' ? 'fr-FR' : lang === 'EN' ? 'en-US' : lang === 'AR' ? 'ar-MA' : 'es-ES'
            )
          : ''

        const deliveryUrl = finalDelivery.url || ''
        const isDirectZip = !!deliveryUrl.match(/\.(zip|rar|tar\.gz)$/i)
        const driveFileMatch = deliveryUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || deliveryUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)
        const isDriveFolder = deliveryUrl.includes('/folders/')

        let directDownloadLink = deliveryUrl
        let isDirectDownloadable = false

        if (isDirectZip) {
          directDownloadLink = deliveryUrl
          isDirectDownloadable = true
        } else if (driveFileMatch && !isDriveFolder) {
          const fileId = driveFileMatch[1]
          directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`
          isDirectDownloadable = true
        }

        return (
          <div className="container" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #ffffff 0%, #fcf9f5 55%, #f6efe2 100%)',
                border: '1.5px solid rgba(198, 159, 104, 0.45)',
                boxShadow: '0 12px 32px -8px rgba(86, 64, 49, 0.08), 0 0 20px -3px rgba(198, 159, 104, 0.15)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px', flex: '1' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(198, 159, 104, 0.22) 0%, rgba(198, 159, 104, 0.08) 100%)',
                    border: '1.5px solid rgba(198, 159, 104, 0.5)',
                    color: '#b8894d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    boxShadow: '0 4px 14px rgba(198,159,104,0.22)',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-crown" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.02rem', color: '#261f18', fontFamily: 'var(--f-serif)', fontWeight: 700, letterSpacing: '0.02em' }}>
                    {t.bannerDeliveryTitle}
                  </h4>
                  <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#6e5f52', fontFamily: 'var(--f-body)', lineHeight: 1.5 }}>
                    {daysLeft !== null
                      ? t.bannerDeliveryDaysLeft(daysLeft, formattedExpiryDate)
                      : t.bannerDeliveryAvailable}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('delivery')}
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '10px',
                    border: '1.5px solid rgba(198, 159, 104, 0.4)',
                    background: '#ffffff',
                    color: '#8c6b3e',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(86, 64, 49, 0.05)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.bannerViewDetails}
                </button>
                <a
                  href={isDirectDownloadable ? directDownloadLink : finalDelivery.url}
                  target={isDirectDownloadable ? undefined : '_blank'}
                  download={isDirectZip ? '' : undefined}
                  rel="noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.82rem',
                    padding: '0.7rem 1.35rem',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #c69f68 0%, #dbb37c 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(198, 159, 104, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className={`fa-solid ${isDirectDownloadable ? 'fa-file-zipper' : 'fa-cloud-arrow-down'}`} />
                  <span>{isDirectDownloadable ? t.deliveryDirectDownloadBtn : t.bannerDownloadDrive}</span>
                </a>
              </div>
            </div>
          </div>
        )
      })()}

      {/* CONTENIDO DE LA SUITE */}
      <main className="suite-main-content">
        {/* TAB 1: GALERÍA DE SELECCIÓN DE FOTOS */}
        {activeTab === 'selection' && (
          <section id="tab-selection" className="suite-tab-pane active">
            {/* PANEL DE CONTROL DE CUOTA */}
            <div className="selection-quota-hero">
              <div className="container quota-inner">
                <div className="quota-text-col">
                  <span className="quota-subtitle">{t.curationSubtitle}</span>
                  <h2 className="quota-title">{t.quotaTitle(maxQuota)}</h2>
                  <p className="quota-desc">
                    {activePhotos.length > 0 ? (
                      <>{t.quotaDescActive(activePhotos.length, maxQuota)}</>
                    ) : (
                      <>{t.quotaDescEmpty}</>
                    )}
                  </p>
                </div>

                <div className="quota-metric-card">
                  <div className="q-metric-header">
                    <span className="q-label">{t.quotaAuthorLabel}</span>
                    <span className="q-ratio" id="quotaRatio">
                      {selectedIds.size} / {maxQuota}
                    </span>
                  </div>
                  <div className="q-progress-bar">
                    <div
                      className="q-progress-fill"
                      id="quotaProgressFill"
                      style={{ width: `${Math.min(100, (selectedIds.size / (maxQuota || 1)) * 100)}%` }}
                    />
                  </div>
                  <p className="q-subtext" id="quotaHelpText">
                    {maxQuota - selectedIds.size > 0
                      ? t.quotaPending(selectedIds.size, maxQuota - selectedIds.size)
                      : t.quotaComplete(selectedIds.size, maxQuota)}
                  </p>
                  <div className="q-actions">
                    <button className="btn-luxury-primary" onClick={() => setReviewModalOpen(true)}>
                      <i className="fa-solid fa-check-double" />
                      <span>{t.sendToAtelierBtn}</span>
                    </button>
                    <button className="btn-luxury-ghost-dark">
                      <i className="fa-solid fa-download" />
                      <span>{t.downloadPreviewsBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BARRA DE FILTROS POR MOMENTOS */}
            <div className="suite-filters-bar">
              <div className="container filters-bar-inner">
                <div className="suite-pills-row">
                  {[
                    { key: 'all', label: t.filterAll, count: activePhotos.length },
                    { key: 'favs', label: t.filterFavs, count: selectedIds.size, icon: 'fa-heart text-gold' },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      className={`suite-pill ${category === pill.key ? 'active' : ''}`}
                      onClick={() => setCategory(pill.key as any)}
                    >
                      {pill.icon && <i className={`fa-solid ${pill.icon}`} />}
                      <span>{pill.label}</span>
                      {pill.count !== undefined && <span className="pill-count">{pill.count}</span>}
                    </button>
                  ))}
                </div>

                <div className="suite-view-options">
                  <div className="suite-search">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* GRILLA DE FOTOGRAFÍAS */}
            <div className="container suite-gallery-container">
              {activePhotos.length === 0 ? (
                <div
                  style={{
                    margin: '3rem auto',
                    maxWidth: '600px',
                    textAlign: 'center',
                    padding: '3.5rem 2rem',
                    background: 'rgba(20, 18, 17, 0.85)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(198, 159, 104, 0.25)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(198,159,104,0.1)',
                      color: 'var(--c-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      margin: '0 auto 1.5rem',
                      border: '1px solid rgba(198,159,104,0.3)',
                    }}
                  >
                    <i className="fa-solid fa-camera-retro" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--f-serif)',
                      fontSize: '1.6rem',
                      color: 'var(--c-ivory)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {t.emptyCuratingTitle}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(251, 250, 248, 0.7)',
                      lineHeight: 1.6,
                      fontFamily: 'var(--f-serif)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {t.emptyCuratingDesc}
                  </p>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--c-gold)',
                      fontFamily: 'var(--f-body)',
                    }}
                  >
                    {t.requestedQuotaTag(maxQuota)}
                  </span>
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8c7a6b' }}>
                  <p>{t.noPhotosFound}</p>
                </div>
              ) : (
                <div className="suite-masonry-grid" id="suiteGrid">
                  {filteredPhotos.map((photo, index) => {
                    const isSelected = selectedIds.has(photo.id)
                    const hasNote = !!notes[photo.id]
                    return (
                      <div
                        key={photo.id}
                        className={`client-photo-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={(e) => {
                          if (!(e.target as HTMLElement).closest('button')) {
                            setLightboxIndex(index)
                          }
                        }}
                      >
                        {isSelected && (
                          <div className="card-corner-ribbon">
                            <i className="fa-solid fa-check" /> {t.inBookBadge}
                          </div>
                        )}
                        {hasNote && (
                          <div className="card-note-ribbon" title={notes[photo.id]}>
                            <i className="fa-solid fa-pen-nib" /> {t.withNoteBadge}
                          </div>
                        )}

                        <Image
                          src={photo.url}
                          alt={photo.title}
                          width={800}
                          height={600}
                          unoptimized
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />

                        <div className="card-overlay-luxury">
                          <div className="card-top-actions">
                            <span className="photo-badge-id">{photo.id}</span>
                            <div className="card-top-btns">
                              <button
                                className={`btn-card-note ${hasNote ? 'has-note' : ''}`}
                                title={hasNote ? notes[photo.id] : t.addNoteTitle}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveNoteModal(photo)
                                }}
                              >
                                <i className="fa-regular fa-comment-dots" />
                              </button>
                              <button
                                className="btn-card-heart"
                                title={t.markForBookTitle}
                                onClick={(e) => toggleSelect(photo.id, e)}
                              >
                                <i className={`${isSelected ? 'fa-solid' : 'fa-regular'} fa-heart`} />
                              </button>
                            </div>
                          </div>
                          <div className="card-bottom-info">
                            <div className="card-meta-txt">
                              <h4>{photo.title}</h4>
                              <span>{photo.category}</span>
                              {hasNote && (
                                <p className="card-note-preview">
                                  <i className="fa-solid fa-pen-nib" /> {notes[photo.id]}
                                </p>
                              )}
                            </div>
                            <button
                              className="btn-expand-icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                setLightboxIndex(index)
                              }}
                            >
                              <i className="fa-solid fa-expand" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: TIMELINE / ESTADO DEL PEDIDO */}
        {activeTab === 'timeline' && (
          <section id="tab-timeline" className="suite-tab-pane active">
            <div className="container timeline-container">
              <div className="suite-heading-center">
                <span className="section-tag-gold">{t.timelineCenterTag}</span>
                <h2 className="editorial-heading-lg">{t.timelineCenterTitle}</h2>
                <p className="timeline-intro">{t.timelineCenterDesc}</p>
              </div>

              <div className="suite-timeline-list">
                <div className="t-step completed">
                  <div className="t-node">
                    <i className="fa-solid fa-check" />
                  </div>
                  <div className="t-card">
                    <div className="t-card-head">
                      <span className="t-step-tag">{t.step1Tag}</span>
                      <span className="t-date">{t.step1Date}</span>
                    </div>
                    <h3>{t.step1Title}</h3>
                    <p>{t.step1Desc}</p>
                  </div>
                </div>

                <div className="t-step completed">
                  <div className="t-node">
                    <i className="fa-solid fa-check" />
                  </div>
                  <div className="t-card">
                    <div className="t-card-head">
                      <span className="t-step-tag">{t.step2Tag}</span>
                      <span className="t-date">{currentSession?.session_date || t.step2Date}</span>
                    </div>
                    <h3>{t.step2Title}</h3>
                    <p>{t.step2Desc}</p>
                  </div>
                </div>

                <div className="t-step completed">
                  <div className="t-node">
                    <i className="fa-solid fa-check" />
                  </div>
                  <div className="t-card">
                    <div className="t-card-head">
                      <span className="t-step-tag">{t.step3Tag}</span>
                      <span className="t-date">{t.step3Date}</span>
                    </div>
                    <h3>{t.step3Title}</h3>
                    <p>{t.step3Desc}</p>
                  </div>
                </div>

                <div className="t-step current">
                  <div className="t-node pulse-node">
                    <i className="fa-solid fa-arrows-rotate fa-spin" />
                  </div>
                  <div className="t-card active-t-card">
                    <div className="t-card-head">
                      <span className="t-step-tag highlight">{t.step4Tag}</span>
                      <span className="t-date">{t.step4Date}</span>
                    </div>
                    <h3>{t.step4Title(maxQuota)}</h3>
                    <p>{t.step4Desc(maxQuota)}</p>
                    <div className="t-cta-row">
                      <button className="btn-luxury-primary-sm" onClick={() => setActiveTab('selection')}>
                        {t.step4Cta(selectedIds.size, maxQuota)}{' '}
                        <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Etapa 5 */}
                {(() => {
                  const finalDelivery = currentSession?.media_deliveries?.find((d: any) => d.delivery_type === 'final_link' && d.is_active)
                  return (
                    <div className={`t-step ${finalDelivery ? 'completed' : 'pending'}`}>
                      <div className="t-node">
                        <i className={`fa-solid ${finalDelivery ? 'fa-check' : 'fa-wand-magic-sparkles'}`} />
                      </div>
                      <div className="t-card">
                        <div className="t-card-head">
                          <span className="t-step-tag">
                            {finalDelivery ? t.timelineStep5DeliveredTag : t.step5Tag}
                          </span>
                          <span className="t-date">{t.step5Date}</span>
                        </div>
                        <h3>{t.step5Title}</h3>
                        <p>{t.step5Desc}</p>
                        {finalDelivery && (
                          <div className="t-cta-row" style={{ marginTop: '0.75rem' }}>
                            <button className="btn-luxury-primary-sm" onClick={() => setActiveTab('delivery')}>
                              <i className="fa-solid fa-cloud-arrow-down" style={{ marginInlineEnd: '6px' }} />
                              {t.timelineStep5Cta}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: DESCARGA DE FOTOGRAFÍAS EN ALTA RESOLUCIÓN (ESTILO CLARO FINE-ART) */}
        {(() => {
          const finalDelivery = currentSession?.media_deliveries?.find((d: any) => d.delivery_type === 'final_link' && d.is_active)
          if (activeTab !== 'delivery' || !finalDelivery) return null

          const locale = lang === 'FR' ? 'fr-FR' : lang === 'EN' ? 'en-US' : lang === 'AR' ? 'ar-MA' : 'es-ES'
          const expiryFormatted = finalDelivery.expires_at 
            ? new Date(finalDelivery.expires_at).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
            : t.deliveryMetricExpiryDays(30)

          const deliveryUrl = finalDelivery.url || ''
          const isDirectZip = !!deliveryUrl.match(/\.(zip|rar|tar\.gz)$/i)
          const driveFileMatch = deliveryUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || deliveryUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)
          const isDriveFolder = deliveryUrl.includes('/folders/')

          let directDownloadLink = deliveryUrl
          let isDirectDownloadable = false

          if (isDirectZip) {
            directDownloadLink = deliveryUrl
            isDirectDownloadable = true
          } else if (driveFileMatch && !isDriveFolder) {
            const fileId = driveFileMatch[1]
            directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`
            isDirectDownloadable = true
          }

          return (
            <section id="tab-delivery" className="suite-tab-pane active" style={{ padding: '2.5rem 0 5rem' }}>
              <div className="container" style={{ maxWidth: '920px' }}>
                {/* Header Editorial de Entrega */}
                <div className="suite-heading-center" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                  <span className="section-tag-gold" style={{ letterSpacing: '0.18em', fontSize: '0.72rem' }}>
                    ◆ {t.deliverySectionTag} ◆
                  </span>
                  <h2 className="editorial-heading-lg" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', marginTop: '0.5rem', marginBottom: '0.85rem', color: '#261f18' }}>
                    {t.deliveryHeading}
                  </h2>
                  <p className="timeline-intro" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.92rem', color: '#6e5f52', lineHeight: 1.65 }}>
                    {t.deliveryDescription}
                  </p>
                </div>

                {/* Tarjeta Pabellón Luxury Atelier (Estilo Claro Lindo) */}
                <div
                  style={{
                    background: 'linear-gradient(165deg, #ffffff 0%, #fdfcf9 40%, #f8f3ec 100%)',
                    border: '1.5px solid rgba(198, 159, 104, 0.45)',
                    borderRadius: '28px',
                    padding: 'clamp(2rem, 4vw, 3.2rem)',
                    boxShadow: '0 24px 60px -15px rgba(86, 64, 49, 0.1), 0 0 40px -5px rgba(198, 159, 104, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Destello decorativo superior */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '65%',
                      height: '3px',
                      background: 'radial-gradient(ellipse at center, rgba(198, 159, 104, 0.7) 0%, rgba(198, 159, 104, 0) 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.75rem', position: 'relative', zIndex: 1 }}>
                    {/* Emblema Central Luminoso */}
                    <div
                      style={{
                        width: '88px',
                        height: '88px',
                        borderRadius: '26px',
                        background: 'linear-gradient(135deg, rgba(198, 159, 104, 0.2) 0%, rgba(198, 159, 104, 0.06) 100%)',
                        border: '1.5px solid rgba(198, 159, 104, 0.55)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#b8894d',
                        fontSize: '2.5rem',
                        boxShadow: '0 10px 25px rgba(198, 159, 104, 0.22), inset 0 0 18px rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <i className={`fa-solid ${isDirectDownloadable ? 'fa-file-zipper' : 'fa-cloud-arrow-down'}`} />
                    </div>

                    {/* Título de la Colección */}
                    <div style={{ maxWidth: '620px' }}>
                      <h3 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', color: '#261f18', fontFamily: 'var(--f-serif)', marginBottom: '0.5rem', fontWeight: 700 }}>
                        {finalDelivery.label || t.deliveryDefaultLabel}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: '#6e5f52', fontFamily: 'var(--f-body)', margin: '0 auto', lineHeight: 1.6 }}>
                        {t.deliverySublabel}
                      </p>
                    </div>

                    {/* Tríptico de Métricas de Entrega */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '680px',
                        marginTop: '0.25rem',
                      }}
                    >
                      {/* Métrica 1: Total Archivos */}
                      <div
                        style={{
                          padding: '1.1rem 1rem',
                          borderRadius: '16px',
                          background: 'linear-gradient(180deg, #ffffff 0%, #faf6f0 100%)',
                          border: '1.5px solid rgba(198, 159, 104, 0.3)',
                          boxShadow: '0 4px 14px rgba(86, 64, 49, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', color: '#826f5e', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                          <i className="fa-regular fa-images" style={{ marginInlineEnd: '5px', color: '#b8894d' }} />
                          {t.deliveryMetricFiles}
                        </span>
                        <span style={{ fontSize: '1.25rem', color: '#261f18', fontFamily: 'var(--f-mono)', fontWeight: 700 }}>
                          {finalDelivery.total_files ? t.deliveryMetricFilesCount(finalDelivery.total_files) : t.deliveryMetricFilesFallback}
                        </span>
                      </div>

                      {/* Métrica 2: Volumen Total */}
                      <div
                        style={{
                          padding: '1.1rem 1rem',
                          borderRadius: '16px',
                          background: 'linear-gradient(180deg, #ffffff 0%, #faf6f0 100%)',
                          border: '1.5px solid rgba(198, 159, 104, 0.3)',
                          boxShadow: '0 4px 14px rgba(86, 64, 49, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', color: '#826f5e', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                          <i className="fa-solid fa-hard-drive" style={{ marginInlineEnd: '5px', color: '#b8894d' }} />
                          {t.deliveryMetricSize}
                        </span>
                        <span style={{ fontSize: '1.25rem', color: '#b8894d', fontFamily: 'var(--f-mono)', fontWeight: 700 }}>
                          {finalDelivery.total_size_mb ? `${finalDelivery.total_size_mb} MB` : t.deliveryMetricSizeFallback}
                        </span>
                      </div>

                      {/* Métrica 3: Caducidad */}
                      <div
                        style={{
                          padding: '1.1rem 1rem',
                          borderRadius: '16px',
                          background: 'linear-gradient(180deg, #ffffff 0%, #faf6f0 100%)',
                          border: '1.5px solid rgba(198, 159, 104, 0.3)',
                          boxShadow: '0 4px 14px rgba(86, 64, 49, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', color: '#826f5e', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', fontWeight: 700, marginBottom: '6px' }}>
                          <i className="fa-regular fa-calendar-xmark" style={{ marginInlineEnd: '5px', color: '#b56f17' }} />
                          {t.deliveryMetricExpiry}
                        </span>
                        <span style={{ fontSize: '1rem', color: '#b56f17', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <i className="fa-regular fa-clock" />
                          {expiryFormatted}
                        </span>
                      </div>
                    </div>

                    {/* Botón Principal Hero de Descarga */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <a
                        href={isDirectDownloadable ? directDownloadLink : finalDelivery.url}
                        target={isDirectDownloadable ? undefined : '_blank'}
                        download={isDirectZip ? '' : undefined}
                        rel="noreferrer"
                        style={{
                          textDecoration: 'none',
                          padding: '1.2rem 3rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          borderRadius: '16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'linear-gradient(135deg, #c69f68 0%, #d8b078 50%, #b88f58 100%)',
                          color: '#ffffff',
                          boxShadow: '0 12px 30px rgba(198, 159, 104, 0.42), 0 2px 8px rgba(86, 64, 49, 0.15)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <i className={`fa-solid ${isDirectDownloadable ? 'fa-file-zipper' : 'fa-arrow-down-to-bracket'}`} style={{ fontSize: '1.15rem' }} />
                        <span>{isDirectDownloadable ? t.deliveryDirectDownloadBtn : t.deliveryDownloadBtn}</span>
                        {!isDirectDownloadable && (
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem', opacity: 0.8 }} />
                        )}
                      </a>
                    </div>

                    {/* Guía rápida de descarga con diseño pergamino atelier claro */}
                    <div
                      style={{
                        marginTop: '1.25rem',
                        padding: '1.6rem 1.85rem',
                        borderRadius: '20px',
                        background: 'linear-gradient(180deg, #faf6f0 0%, #f4ede3 100%)',
                        border: '1.5px solid rgba(198, 159, 104, 0.35)',
                        textAlign: isRTL ? 'right' : 'left',
                        width: '100%',
                        fontSize: '0.85rem',
                        color: '#5c4e40',
                        lineHeight: 1.65,
                      }}
                    >
                      <h5 style={{ margin: '0 0 0.95rem', color: '#261f18', fontFamily: 'var(--f-serif)', fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-lightbulb" style={{ color: '#b8894d' }} />
                        <span>{t.deliveryGuideTitle}</span>
                      </h5>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                        <div style={{ padding: '0.9rem 1.1rem', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(198,159,104,0.25)', boxShadow: '0 2px 8px rgba(86, 64, 49, 0.04)' }}>
                          <span style={{ color: '#9c733a', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                            <i className="fa-regular fa-file-zipper" style={{ marginInlineEnd: '6px' }} />
                            {t.deliveryGuide1Title}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#615244' }}>{t.deliveryGuide1Text}</span>
                        </div>
                        <div style={{ padding: '0.9rem 1.1rem', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(198,159,104,0.25)', boxShadow: '0 2px 8px rgba(86, 64, 49, 0.04)' }}>
                          <span style={{ color: '#9c733a', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                            <i className="fa-solid fa-shield-halved" style={{ marginInlineEnd: '6px' }} />
                            {t.deliveryGuide2Title}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#615244' }}>{t.deliveryGuide2Text}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sellos de garantía y autenticidad del Atelier */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '1.25rem',
                        paddingTop: '0.5rem',
                        fontSize: '0.74rem',
                        color: '#7d6e60',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-certificate" style={{ color: '#b8894d', fontSize: '0.82rem' }} />
                        {t.deliveryBadgeOptical}
                      </span>
                      <span style={{ color: 'rgba(198,159,104,0.4)' }}>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-print" style={{ color: '#b8894d', fontSize: '0.82rem' }} />
                        {t.deliveryBadgePrint}
                      </span>
                      <span style={{ color: 'rgba(198,159,104,0.4)' }}>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-lock" style={{ color: '#b8894d', fontSize: '0.82rem' }} />
                        {t.deliveryBadgeSecure}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })()}
      </main>

      {/* LIGHTBOX CINEMATOGRÁFICO DE LA SUITE */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="lightbox-overlay" id="lightboxModal" role="dialog" aria-modal="true">
          <div className="lightbox-backdrop" onClick={() => setLightboxIndex(null)} />
          <div className="lightbox-content">
            <div className="lightbox-topbar">
              <div className="lightbox-counter">
                <span id="lbCurrentIndex">{lightboxIndex + 1}</span> {t.lbOf}{' '}
                <span id="lbTotalCount">{filteredPhotos.length}</span>
                <span className="lb-category-tag" id="lbCategoryTag">
                  {filteredPhotos[lightboxIndex].id} • {filteredPhotos[lightboxIndex].title}
                </span>
              </div>
              <div className="lightbox-actions">
                <button
                  type="button"
                  className="lb-btn-icon"
                  title="Girar 90° (R)"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                >
                  <i className="fa-solid fa-rotate-right" />
                  <span>{t.lbRotate}</span>
                </button>

                <button
                  type="button"
                  className={`lb-btn-icon ${isZoomed ? 'is-favorite' : ''}`}
                  title={isZoomed ? "Ajustar a pantalla (F)" : "Ampliar 1:1 (F)"}
                  onClick={() => setIsZoomed((prev) => !prev)}
                >
                  <i className={`fa-solid ${isZoomed ? 'fa-compress' : 'fa-magnifying-glass-plus'}`} />
                  <span>{isZoomed ? t.lbFitScreen : t.lbZoomIn}</span>
                </button>

                <button
                  type="button"
                  className={`lb-btn-icon ${selectedIds.has(filteredPhotos[lightboxIndex].id) ? 'is-favorite' : ''}`}
                  onClick={() => toggleSelect(filteredPhotos[lightboxIndex].id)}
                >
                  <i
                    className={`${
                      selectedIds.has(filteredPhotos[lightboxIndex].id) ? 'fa-solid' : 'fa-regular'
                    } fa-heart`}
                  />
                  <span>
                    {selectedIds.has(filteredPhotos[lightboxIndex].id) ? t.lbInBook : t.lbMarkForBook}
                  </span>
                </button>

                <button
                  type="button"
                  className={`lb-btn-icon ${notes[filteredPhotos[lightboxIndex].id] ? 'is-favorite' : ''}`}
                  onClick={() => setActiveNoteModal(activeNoteModal ? null : filteredPhotos[lightboxIndex])}
                >
                  <i
                    className={`${
                      notes[filteredPhotos[lightboxIndex].id] ? 'fa-solid' : 'fa-regular'
                    } fa-comment-dots`}
                  />
                  <span>
                    {notes[filteredPhotos[lightboxIndex].id] ? t.lbNoteSaved : t.lbAddNote}
                  </span>
                </button>

                <button 
                  type="button" 
                  className="lb-btn-icon close-btn" 
                  onClick={() => setLightboxIndex(null)}
                  title="Cerrar (Esc)"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>

            <div className="lightbox-main-stage">
              <button
                type="button"
                className="lb-nav-btn prev"
                title="Anterior (Flecha Izquierda)"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveNoteModal(null)
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
                }}
              >
                <i className={`fa-solid ${isRTL ? 'fa-chevron-right' : 'fa-chevron-left'}`} />
              </button>

              <div 
                className="lightbox-image-wrapper"
                onClick={() => setIsZoomed((prev) => !prev)}
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
              >
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].title || 'Fotografía'}
                  id="lbImage"
                  className="lightbox-img"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${isZoomed ? 1.6 : 1})`,
                    maxHeight: isZoomed ? 'none' : '100%',
                    maxWidth: isZoomed ? 'none' : '100%',
                  }}
                  draggable={false}
                />
                <div className="lb-watermark">LAMHA STUDIOS • PROOF OF ART</div>
              </div>

              <button
                type="button"
                className="lb-nav-btn next"
                title="Siguiente (Flecha Derecha)"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveNoteModal(null)
                  setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
                }}
              >
                <i className={`fa-solid ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`} />
              </button>
            </div>

            {/* CARRUSEL INFERIOR DE FOTOS PEQUEÑAS (FILMSTRIP ESTILO TELÉFONO) */}
            <div className="lightbox-filmstrip">
              <div ref={filmstripRef} className="filmstrip-scroll">
                {filteredPhotos.map((photo, idx) => {
                  const isActive = idx === lightboxIndex
                  const isThumbSelected = selectedIds.has(photo.id)
                  return (
                    <button
                      key={photo.id || idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveNoteModal(null)
                        setLightboxIndex(idx)
                      }}
                      className={`filmstrip-thumb ${isActive ? 'is-active' : ''}`}
                      title={`${idx + 1} - ${photo.title}`}
                    >
                      <img src={photo.url} alt="" loading="lazy" />
                      {isThumbSelected && <span className="thumb-badge" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* MODAL NOTA DE ENCUADRE / RETOQUE (DRAWER) */}
            <div className={`lightbox-notes-drawer ${!activeNoteModal ? 'hidden' : ''}`} id="lbNotesDrawer">
              <div className="drawer-header">
                <h4>
                  <i className="fa-solid fa-pen-nib" /> {t.lbRetouchTitle(filteredPhotos[lightboxIndex].id)}
                </h4>
                <button type="button" className="btn-close-sm" onClick={() => setActiveNoteModal(null)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <textarea
                className="notes-textarea"
                placeholder={t.lbRetouchPlaceholder}
                value={notes[filteredPhotos[lightboxIndex].id] || ''}
                onChange={(e) => setNotes({ ...notes, [filteredPhotos[lightboxIndex].id]: e.target.value })}
              />
              <button
                type="button"
                className="btn-luxury-primary-sm"
                onClick={async () => {
                  const photoId = filteredPhotos[lightboxIndex].id
                  const noteText = notes[photoId] || ''
                  if (currentSession?.id) {
                    try {
                      await supabase
                        .from('media_assets')
                        .update({ client_notes: noteText.trim() || null })
                        .eq('session_id', currentSession.id)
                        .eq('filename', photoId)
                    } catch (e) {
                      console.error('Error guardando nota:', e)
                    }
                  }
                  setActiveNoteModal(null)
                }}
              >
                {t.lbSaveNote}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE REVISIÓN FINAL */}
      {reviewModalOpen && (
        <div className="modal-dialog-overlay" id="reviewModal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setReviewModalOpen(false)} />
          <div className="modal-window">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="tag-pill">{t.revFinalStep}</span>
                <h3>{t.revConfirmTitle}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setReviewModalOpen(false)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="selection-summary-banner">
                <div className="summary-metric">
                  <span className="metric-num" id="modalSelectedCount">
                    {selectedIds.size}
                  </span>
                  <span className="metric-label">{t.revChosenCount}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-metric">
                  <span className="metric-num">{maxQuota}</span>
                  <span className="metric-label">{t.revQuotaCount}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-metric">
                  <span className="metric-num" id="modalNotesCount">
                    {Object.keys(notes).length}
                  </span>
                  <span className="metric-label">{t.revNotesCount}</span>
                </div>
              </div>
              <div className="modal-thumbnails-preview">
                <h4>{t.revThumbsTitle}</h4>
                <div className="thumbs-scroll-grid" id="modalThumbsGrid">
                  {activePhotos
                    .filter((p) => selectedIds.has(p.id))
                    .map((p) => (
                      <div key={p.id} className="thumb-preview-item">
                        <img src={p.url} alt={p.id} />
                        <span className="thumb-id">{p.id}</span>
                        {notes[p.id] && (
                          <span className="thumb-note-badge" title={notes[p.id]}>
                            <i className="fa-solid fa-pen-nib" />
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-general-notes">
                <label>
                  <strong>{t.revGeneralLabel}</strong>
                </label>
                <textarea
                  rows={3}
                  placeholder={t.revGeneralPlaceholder}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-luxury-ghost-dark"
                disabled={isSubmittingOrder}
                onClick={() => setReviewModalOpen(false)}
              >
                {t.revKeepEditing}
              </button>
              <button
                className="btn-luxury-primary"
                disabled={isSubmittingOrder}
                onClick={handleFinalSubmit}
              >
                {isSubmittingOrder ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" /> {t.revSendingBtn}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check" /> {t.revSendBtn}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ENVÍO EXITOSO */}
      {orderSubmittedSuccess && (
        <div className="modal-dialog-overlay" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setOrderSubmittedSuccess(false)} />
          <div className="modal-window" style={{ maxWidth: '500px', textAlign: 'center', padding: '2.5rem' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.35)',
              }}
            >
              <i className="fa-solid fa-check-double" />
            </div>
            <h3
              style={{
                fontFamily: 'var(--f-serif)',
                fontSize: '1.75rem',
                color: '#f5f2eb',
                marginBottom: '0.75rem',
              }}
            >
              {t.successTitle}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#a89f91',
                lineHeight: 1.6,
                fontFamily: 'var(--f-serif)',
                marginBottom: '1.75rem',
              }}
            >
              {t.successDesc(selectedIds.size)}
            </p>
            <button
              className="btn-luxury-primary"
              onClick={() => setOrderSubmittedSuccess(false)}
              style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
            >
              {t.successContinue}
            </button>
          </div>
        </div>
      )}

      {/* MODAL PARA AÑADIR / EDITAR NOTA DE FOTO ESPECÍFICA */}
      {activeNoteModal && (
        <div className="modal-dialog-overlay" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setActiveNoteModal(null)} />
          <div className="modal-window" style={{ maxWidth: '460px', padding: '2rem' }}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="tag-pill">{t.noteModalTag}</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}>
                  {t.noteModalTitle(activeNoteModal.title || activeNoteModal.id)}
                </h3>
              </div>
              <button className="btn-close-modal" onClick={() => setActiveNoteModal(null)}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body" style={{ marginTop: '1.25rem' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#a89f91',
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                  fontFamily: 'var(--f-serif)',
                }}
              >
                {t.noteModalDesc}
              </p>
              <textarea
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '10px',
                  background: 'rgba(10,8,7,0.7)',
                  border: '1px solid rgba(198,159,104,0.3)',
                  color: '#f5f2eb',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
                placeholder={t.noteModalPlaceholder}
                value={notes[activeNoteModal.id] || ''}
                onChange={(e) => {
                  const val = e.target.value
                  setNotes((prev) => ({ ...prev, [activeNoteModal.id]: val }))
                }}
              />
            </div>
            <div
              className="modal-footer"
              style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
            >
              <button className="btn-luxury-ghost-dark" onClick={() => setActiveNoteModal(null)}>
                {t.cancel}
              </button>
              <button
                className="btn-luxury-primary"
                onClick={async () => {
                  const photoId = activeNoteModal.id
                  const noteText = notes[photoId] || ''
                  if (currentSession?.id) {
                    try {
                      await supabase
                        .from('media_assets')
                        .update({ client_notes: noteText.trim() || null })
                        .eq('session_id', currentSession.id)
                        .eq('filename', photoId)
                    } catch (e) {
                      console.error('Error guardando nota:', e)
                    }
                  }
                  setActiveNoteModal(null)
                }}
              >
                <i className="fa-solid fa-check" /> {t.saveNote}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
