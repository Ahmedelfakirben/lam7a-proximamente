/**
 * LAMHA STUDIOS — SUITE PRIVÉE DU CLIENT (PORTAL.JS)
 * Lógica dedicada para la experiencia privada e independiente del cliente
 */

const QUOTA_LIMIT = 20;

let SUITE_PHOTOS = [];

let suiteState = {
  selectedIds: new Set(),
  currentCategory: "all",
  searchQuery: "",
  lightboxIndex: 0
};

const portalTranslations = {
  es: {
    portal_back: "Volver a Lamha Studios",
    portal_session_active: "Sesión Activa #LMH-8942",
    portal_badge: "Colección Fine Art Heritage",
    portal_chat_afaf: "Chat con Afaf",
    portal_tag: "ESPACE PRIVÉ DU CLIENT",
    portal_client_name: "Leyla & Karim",
    portal_session_name: "Boda de Destino en Namaskar & Retratos Íntimos",
    portal_tab_selection: "Selección de Fotos",
    portal_tab_timeline: "Estado del Pedido",
    quota_subtitle: "Curaduría de vuestro libro en piel",
    quota_title: "Seleccionad vuestras 20 fotografías maestras",
    quota_desc: "Hemos preparado <strong>24 fotografías seleccionadas</strong> con el tratamiento cromático de autor. Marcad las 20 que protagonizarán el libro artesanal en lino y piel.",
    quota_label: "Cupo de autor seleccionado",
    btn_submit_taller: "Enviar Selección al Taller",
    btn_download_previews: "Descargar Previews",
    pill_all: "Todas",
    pill_favs: "Mis Favoritas",
    pill_prep: "Preparativos",
    pill_ceremony: "Ceremonia",
    pill_portraits: "Retratos Íntimos",
    pill_details: "Detalles & Joyería",
    search_ph: "Buscar por número o nota..."
  },
  en: {
    portal_back: "Back to Lamha Studios",
    portal_session_active: "Active Session #LMH-8942",
    portal_badge: "Fine Art Heritage Collection",
    portal_chat_afaf: "Chat with Afaf",
    portal_tag: "CONFIDENTIAL CLIENT SUITE",
    portal_client_name: "Leyla & Karim",
    portal_session_name: "Destination Wedding at Namaskar & Intimate Portraits",
    portal_tab_selection: "Photo Selection",
    portal_tab_timeline: "Order Progress",
    quota_subtitle: "Heirloom Leather Album Curation",
    quota_title: "Select Your 20 Signature Photographs",
    quota_desc: "We have prepared <strong>24 master photographs</strong> with signature color grading. Mark the 20 featured in your handcrafted linen and leather book.",
    quota_label: "Selected Master Shots",
    btn_submit_taller: "Submit Selection to Atelier",
    btn_download_previews: "Download Proofs",
    pill_all: "All",
    pill_favs: "My Favorites",
    pill_prep: "Getting Ready",
    pill_ceremony: "Ceremony",
    pill_portraits: "Intimate Portraits",
    pill_details: "Details & Heirloom",
    search_ph: "Search frame number or note..."
  },
  fr: {
    portal_back: "Retour à Lamha Studios",
    portal_session_active: "Session Active #LMH-8942",
    portal_badge: "Collection Fine Art Heritage",
    portal_chat_afaf: "Discuter avec Afaf",
    portal_tag: "ESPACE PRIVÉ DU CLIENT",
    portal_client_name: "Leyla & Karim",
    portal_session_name: "Mariage de Destination au Namaskar & Portraits Intimes",
    portal_tab_selection: "Sélection Photos",
    portal_tab_timeline: "Suivi de Commande",
    quota_subtitle: "Curation de votre livre d'art en cuir",
    quota_title: "Sélectionnez vos 20 photographies magistrales",
    quota_desc: "Nous avons préparé <strong>24 photographies sélectionnées</strong> étalonnées à la main. Marquez les 20 qui composeront le livre d'art en lin et cuir.",
    quota_label: "Clichés d'auteur sélectionnés",
    btn_submit_taller: "Envoyer la Sélection à l'Atelier",
    btn_download_previews: "Télécharger les Previews",
    pill_all: "Toutes",
    pill_favs: "Mes Favorites",
    pill_prep: "Préparatifs",
    pill_ceremony: "Cérémonie",
    pill_portraits: "Portraits Intimes",
    pill_details: "Détails & Joaillerie",
    search_ph: "Rechercher un numéro ou note..."
  },
  ar: {
    portal_back: "العودة لاستوديو لمحة",
    portal_session_active: "الجلسة النشطة #LMH-8942",
    portal_badge: "مجموعة التراث الفاخر Fine Art",
    portal_chat_afaf: "محادثة عفاف",
    portal_tag: "الجناح الخاص بالعميل",
    portal_client_name: "ليلى وكريم",
    portal_session_name: "زفاف فاخر في ناماسكار وبورتريهات خاصة",
    portal_tab_selection: "اختيار الصور",
    portal_tab_timeline: "حالة الطلب",
    quota_subtitle: "تنسيق كتابك الفاخر المجلد بالجلد والكتان",
    quota_title: "اختر 20 صورة توقيعية رئيسية",
    quota_desc: "قمنا بإعداد <strong>24 صورة مختارة بعناية</strong> بالمعالجة اللونية الخاصة. حدد الـ 20 صورة التي ستزين كتابك المجلد يدويًا.",
    quota_label: "الصور المختارة للكتاب",
    btn_submit_taller: "إرسال الاختيار إلى الاستوديو",
    btn_download_previews: "تحميل العينات",
    pill_all: "الكل",
    pill_favs: "المفضلة لدي",
    pill_prep: "التحضيرات",
    pill_ceremony: "مراسم الزفاف",
    pill_portraits: "بورتريهات خاصة",
    pill_details: "التفاصيل والمجوهرات",
    search_ph: "ابحث برقم الصورة أو الملاحظة..."
  }
};

function setPortalLanguage(lang) {
  if (!portalTranslations[lang]) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  try {
    localStorage.setItem('lamha_lang', lang);
  } catch (e) {}

  const currentBadge = document.getElementById('portalCurrentLangCode');
  if (currentBadge) {
    currentBadge.textContent = lang.toUpperCase();
  }

  document.querySelectorAll('#portalLangDropdownMenu .lang-option').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (portalTranslations[lang] && portalTranslations[lang][key]) {
      const val = portalTranslations[lang][key];
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (portalTranslations[lang] && portalTranslations[lang][key]) {
      el.placeholder = portalTranslations[lang][key];
    }
  });
}

function togglePortalLangDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("portalLangDropdown");
  const menu = document.getElementById("portalLangDropdownMenu");
  if (dropdown && menu) {
    dropdown.classList.toggle("open");
    menu.classList.toggle("hidden");
  }
}

function closePortalLangDropdown() {
  const dropdown = document.getElementById("portalLangDropdown");
  const menu = document.getElementById("portalLangDropdownMenu");
  if (dropdown) dropdown.classList.remove("open");
  if (menu) menu.classList.add("hidden");
}

function selectPortalLanguage(lang) {
  setPortalLanguage(lang);
  closePortalLangDropdown();
}

document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("portalLangDropdown");
  if (dropdown && !dropdown.contains(e.target)) {
    closePortalLangDropdown();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem('lamha_lang') || 'es';
  setPortalLanguage(savedLang);

  const client = window.supabaseClient;
  const urlParams = new URLSearchParams(window.location.search);
  const pinFromUrl = urlParams.get('pin');
  const sessionFromUrl = urlParams.get('session_id') || urlParams.get('session') || urlParams.get('id');
  let sessionId = localStorage.getItem('lamha_session_id');

  // Si el cliente viene desde un enlace con PIN (ej. WhatsApp o email)
  if (pinFromUrl && client) {
    try {
      const { data: pinData } = await client
        .from('sessions')
        .select('id')
        .eq('portal_pin', pinFromUrl.trim())
        .single();
      if (pinData?.id) {
        sessionId = pinData.id;
        localStorage.setItem('lamha_session_id', sessionId);
      }
    } catch (e) {
      console.warn("Could not resolve PIN from URL:", e);
    }
  } else if (sessionFromUrl) {
    sessionId = sessionFromUrl;
    localStorage.setItem('lamha_session_id', sessionId);
  }

  if (!sessionId) {
    showPortalLoginModal();
    return;
  }

  await loadSessionData(sessionId);
});

async function loadSessionData(sessionId) {
  try {
    const client = window.supabaseClient;
    if (!client) throw new Error("El cliente de Supabase no está listo.");

    // 1. Fetch Session Details
    const { data: sessionData, error: sessionError } = await client
      .from('sessions')
      .select('*, media_deliveries(*)')
      .eq('id', sessionId)
      .single();

    if (sessionError || !sessionData) throw sessionError || new Error("Session not found");

    // Update UI with Session info (Client name, session name)
    const clientNameEls = document.querySelectorAll('[data-i18n="portal_client_name"]');
    clientNameEls.forEach(el => el.textContent = sessionData.client_name);
    
    // 2. Fetch Media Assets
    const { data: assetsData, error: assetsError } = await client
      .from('media_assets')
      .select('*')
      .eq('session_id', sessionId);
      
    if (assetsError) throw assetsError;

    // Filtrar por curaduría: si el estudio marcó activos como compartidos, mostrar solo los compartidos
    const hasExplicitlyShared = assetsData && assetsData.some(a => a.is_shared === true);
    const visibleAssets = hasExplicitlyShared 
      ? assetsData.filter(a => a.is_shared === true) 
      : (assetsData || []);

    // Convert assets to SUITE_PHOTOS format (Photos and Videos)
    SUITE_PHOTOS = visibleAssets.map((asset, index) => {
      const isVideo = asset.asset_type && asset.asset_type.includes("video");
      return {
        id: asset.id,
        category: isVideo ? "videos" : "fotos",
        type: isVideo ? "video" : "photo",
        title: asset.filename || (isVideo ? `Video ${index + 1}` : `Photo ${index + 1}`),
        url: asset.preview_url || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
        notes: asset.client_notes || asset.notes || ""
      };
    });

    // 3. Set selected photos
    const dbSelected = sessionData.selected_assets || [];
    suiteState.selectedIds = new Set(dbSelected);

    // Initial render
    renderSuiteGallery();
    updateSuiteMetrics();
    initSuiteCard3D();
    setupSuiteKeyboard();
  } catch (error) {
    console.error("Error loading session:", error);
    showPortalLoginModal("Código PIN requerido o sesión no encontrada.");
  }
}

function showPortalLoginModal(customError) {
  const modal = document.getElementById("portalLoginModal");
  if (modal) {
    modal.classList.remove("hidden");
    const err = document.getElementById("portalLoginError");
    if (err) {
      if (customError) {
        err.textContent = customError;
        err.style.display = "block";
      } else {
        err.style.display = "none";
      }
    }
    const input = document.getElementById("portalPinInput");
    if (input) input.focus();
  }
}

function closePortalLoginModal() {
  const modal = document.getElementById("portalLoginModal");
  if (modal) modal.classList.add("hidden");
  if (!localStorage.getItem('lamha_session_id')) {
    window.location.href = "index.html";
  }
}

async function attemptPortalLogin() {
  const pinInput = document.getElementById("portalPinInput");
  const errorMsg = document.getElementById("portalLoginError");
  const btn = document.getElementById("portalLoginBtn");
  if (!pinInput) return;
  const pin = pinInput.value.trim();
  if (!pin) {
    if (errorMsg) {
      errorMsg.textContent = "Por favor, introduce tu PIN de acceso.";
      errorMsg.style.display = "block";
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Verificando...";
  }
  if (errorMsg) errorMsg.style.display = "none";

  try {
    const client = window.supabaseClient;
    if (!client) throw new Error("Supabase client not ready");
    const { data, error } = await client
      .from('sessions')
      .select('id')
      .eq('portal_pin', pin)
      .single();

    if (error || !data) {
      if (errorMsg) {
        errorMsg.textContent = "Código PIN incorrecto o sesión no encontrada.";
        errorMsg.style.display = "block";
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Acceder a la Suite";
      }
    } else {
      localStorage.setItem('lamha_session_id', data.id);
      closePortalLoginModal();
      await loadSessionData(data.id);
    }
  } catch(err) {
    console.error(err);
    if (errorMsg) {
      errorMsg.textContent = "Error de conexión. Inténtalo de nuevo.";
      errorMsg.style.display = "block";
    }
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Acceder a la Suite";
    }
  }
}

// CAMBIO DE PESTAÑAS
function switchSuiteTab(tabId) {
  const tabs = document.querySelectorAll(".suite-tab-btn");
  tabs.forEach(t => {
    if (t.getAttribute("data-tab") === tabId) t.classList.add("active");
    else t.classList.remove("active");
  });

  const panes = document.querySelectorAll(".suite-tab-pane");
  panes.forEach(p => {
    if (p.id === `tab-${tabId}`) p.classList.add("active");
    else p.classList.remove("active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// RENDER DE GALERÍA DE SUITE
function renderSuiteGallery() {
  const grid = document.getElementById("suiteGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = SUITE_PHOTOS.filter(p => {
    if (suiteState.currentCategory === "favorites" && !suiteState.selectedIds.has(p.id)) return false;
    if (suiteState.currentCategory !== "all" && suiteState.currentCategory !== "favorites" && p.category !== suiteState.currentCategory) return false;
    if (suiteState.searchQuery) {
      const q = suiteState.searchQuery.toLowerCase();
      if (!p.id.toLowerCase().includes(q) && !p.title.toLowerCase().includes(q) && !(p.notes && p.notes.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  filtered.forEach(photo => {
    const isSelected = suiteState.selectedIds.has(photo.id);
    const hasNote = photo.notes && photo.notes.trim().length > 0;
    const card = document.createElement("div");
    card.className = `client-photo-card ${isSelected ? 'is-selected' : ''}`;
    card.id = `card-${photo.id}`;

    card.onclick = (e) => {
      if (!e.target.closest("button")) openLightboxById(photo.id);
    };

    card.innerHTML = `
      ${isSelected ? `
        <div class="card-corner-ribbon">
          <i class="fa-solid fa-check"></i> En Libro
        </div>
      ` : ''}
      ${hasNote ? `
        <div class="card-note-ribbon" title="${photo.notes}">
          <i class="fa-solid fa-pen-nib"></i> Con Nota
        </div>
      ` : ''}
      ${photo.type === 'video' ? `
        <div class="video-play-badge" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); z-index:2; width:48px; height:48px; border-radius:50%; background:rgba(198,159,104,0.9); display:flex; align-items:center; justify-content:center; color:#0b0a09; box-shadow:0 4px 15px rgba(0,0,0,0.5);">
          <i class="fa-solid fa-play" style="margin-left:3px; font-size:16px;"></i>
        </div>
      ` : ''}
      <img src="${photo.url}" alt="${photo.title}" loading="lazy">
      <div class="card-overlay-luxury">
        <div class="card-top-actions">
          <span class="photo-badge-id">${photo.id}</span>
          <div class="card-top-btns">
            <button class="btn-card-note ${hasNote ? 'has-note' : ''}" onclick="openLightboxAndNotes('${photo.id}', event)" title="${hasNote ? photo.notes : 'Añadir nota de retoque'}">
              <i class="fa-regular fa-comment-dots"></i>
            </button>
            <button class="btn-card-heart" onclick="toggleSuiteFavorite('${photo.id}', event)" title="Marcar para el libro">
              <i class="${isSelected ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
        </div>
        <div class="card-bottom-info">
          <div class="card-meta-txt">
            <h4>${photo.title}</h4>
            <span>${photo.category}</span>
            ${hasNote ? `<p class="card-note-preview"><i class="fa-solid fa-pen-nib"></i> ${photo.notes}</p>` : ''}
          </div>
          <button class="btn-expand-icon" onclick="openLightboxById('${photo.id}'); event.stopPropagation();">
            <i class="fa-solid fa-expand"></i>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openLightboxAndNotes(photoId, event) {
  if (event) event.stopPropagation();
  openLightboxById(photoId);
  const drawer = document.getElementById("lbNotesDrawer");
  if (drawer && drawer.classList.contains("hidden")) {
    drawer.classList.remove("hidden");
  }
}

function toggleSuiteFavorite(photoId, event) {
  if (event) event.stopPropagation();

  if (suiteState.selectedIds.has(photoId)) {
    suiteState.selectedIds.delete(photoId);
    showToast(`Foto ${photoId} deseleccionada del libro`, "info");
  } else {
    if (suiteState.selectedIds.size >= QUOTA_LIMIT) {
      showToast(`¡Has alcanzado el cupo base de ${QUOTA_LIMIT} fotografías!`, "warning");
    }
    suiteState.selectedIds.add(photoId);
    showToast(`Foto ${photoId} añadida al libro de boda`, "success");
  }

  updateSuiteMetrics();

  if (suiteState.currentCategory === "favorites") {
    renderSuiteGallery();
  } else {
    const card = document.getElementById(`card-${photoId}`);
    if (card) {
      if (suiteState.selectedIds.has(photoId)) {
        card.classList.add("is-selected");
        const heart = card.querySelector(".btn-card-heart i");
        if (heart) heart.className = "fa-solid fa-heart";
        if (!card.querySelector(".card-corner-ribbon")) {
          const ribbon = document.createElement("div");
          ribbon.className = "card-corner-ribbon";
          ribbon.innerHTML = '<i class="fa-solid fa-check"></i> En Libro';
          card.prepend(ribbon);
        }
      } else {
        card.classList.remove("is-selected");
        const heart = card.querySelector(".btn-card-heart i");
        if (heart) heart.className = "fa-regular fa-heart";
        const ribbon = card.querySelector(".card-corner-ribbon");
        if (ribbon) ribbon.remove();
      }
    }
  }

  updateLightboxFavoriteBtn();
}

function filterSuiteGallery(cat) {
  suiteState.currentCategory = cat;
  const pills = document.querySelectorAll(".suite-pill");
  pills.forEach(pill => {
    if (pill.getAttribute("onclick") && pill.getAttribute("onclick").includes(cat)) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
  renderSuiteGallery();
}

function handleSearch(q) {
  suiteState.searchQuery = q.trim();
  renderSuiteGallery();
}

function updateSuiteMetrics() {
  const count = suiteState.selectedIds.size;
  const ratio = `${count} / ${QUOTA_LIMIT}`;
  const pct = Math.min(100, Math.round((count / QUOTA_LIMIT) * 100));
  const remaining = QUOTA_LIMIT - count;

  const tabBadge = document.getElementById("tabCount");
  const ratioEl = document.getElementById("quotaRatio");
  const fillEl = document.getElementById("quotaProgressFill");
  const helpEl = document.getElementById("quotaHelpText");
  const pillFav = document.getElementById("pillFavCount");

  if (tabBadge) tabBadge.textContent = count;
  if (ratioEl) ratioEl.textContent = ratio;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (pillFav) pillFav.textContent = count;

  if (helpEl) {
    if (remaining > 0) {
      helpEl.textContent = `Tenéis ${count} fotografías marcadas. Os faltan ${remaining} para completar el libro.`;
    } else if (remaining === 0) {
      helpEl.textContent = `¡Cupo completado exactamente! Lista para enviar a Afaf.`;
    } else {
      helpEl.textContent = `Habéis seleccionado ${Math.abs(remaining)} fotos adicionales por encima del cupo base.`;
    }
  }
}

// LIGHTBOX
function openLightboxById(photoId) {
  const index = SUITE_PHOTOS.findIndex(p => p.id === photoId);
  if (index !== -1) openLightbox(index);
}

function openLightbox(index) {
  suiteState.lightboxIndex = index;
  const photo = SUITE_PHOTOS[index];

  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lbImage");
  const curr = document.getElementById("lbCurrentIndex");
  const tag = document.getElementById("lbCategoryTag");
  const noteInput = document.getElementById("lbPhotoNoteInput");

  if (img) img.src = photo.url;
  if (curr) curr.textContent = index + 1;
  if (tag) tag.textContent = `${photo.id} • ${photo.title}`;
  if (noteInput) noteInput.value = photo.notes || "";

  updateLightboxFavoriteBtn();
  updateLightboxNotesBtn();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightboxModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function prevLightboxPhoto() {
  let idx = suiteState.lightboxIndex - 1;
  if (idx < 0) idx = SUITE_PHOTOS.length - 1;
  openLightbox(idx);
}

function nextLightboxPhoto() {
  let idx = suiteState.lightboxIndex + 1;
  if (idx >= SUITE_PHOTOS.length) idx = 0;
  openLightbox(idx);
}

function updateLightboxFavoriteBtn() {
  const photo = SUITE_PHOTOS[suiteState.lightboxIndex];
  if (!photo) return;
  const btn = document.getElementById("lbBtnFavorite");
  if (!btn) return;

  const isSel = suiteState.selectedIds.has(photo.id);
  if (isSel) {
    btn.classList.add("is-favorite");
    btn.innerHTML = '<i class="fa-solid fa-heart"></i> <span>En Libro</span>';
  } else {
    btn.classList.remove("is-favorite");
    btn.innerHTML = '<i class="fa-regular fa-heart"></i> <span>Marcar para Libro</span>';
  }
}

function updateLightboxNotesBtn() {
  const photo = SUITE_PHOTOS[suiteState.lightboxIndex];
  if (!photo) return;
  const btn = document.getElementById("lbBtnNote");
  if (!btn) return;

  const hasNote = photo.notes && photo.notes.trim().length > 0;
  if (hasNote) {
    btn.classList.add("is-favorite");
    btn.innerHTML = '<i class="fa-solid fa-comment-dots"></i> <span>Nota Guardada</span>';
  } else {
    btn.classList.remove("is-favorite");
    btn.innerHTML = '<i class="fa-regular fa-comment-dots"></i> <span>Añadir Nota</span>';
  }
}

function toggleFavoriteCurrentFromLightbox() {
  const photo = SUITE_PHOTOS[suiteState.lightboxIndex];
  if (photo) toggleSuiteFavorite(photo.id);
}

function toggleLightboxNotes() {
  document.getElementById("lbNotesDrawer").classList.toggle("hidden");
}

function savePhotoNote() {
  const photo = SUITE_PHOTOS[suiteState.lightboxIndex];
  const input = document.getElementById("lbPhotoNoteInput");
  if (photo && input) {
    photo.notes = input.value.trim();
    showToast(`Instrucción guardada para ${photo.id}`, "success");
    toggleLightboxNotes();
    updateLightboxNotesBtn();
    renderSuiteGallery();
  }
}

function setupSuiteKeyboard() {
  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightboxModal");
    if (lb && !lb.classList.contains("hidden")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightboxPhoto();
      if (e.key === "ArrowRight") nextLightboxPhoto();
      if (e.key.toLowerCase() === "f") toggleFavoriteCurrentFromLightbox();
    }
  });
}

// TARJETA 3D TILT
function initSuiteCard3D() {
  const stage = document.getElementById("suiteCardStage");
  const card = document.getElementById("suiteVipCard");
  if (!stage || !card) return;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  stage.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

// REVISIÓN FINAL
function openReviewModal() {
  const modal = document.getElementById("reviewModal");
  const countEl = document.getElementById("modalSelectedCount");
  const notesCountEl = document.getElementById("modalNotesCount");
  const thumbs = document.getElementById("modalThumbsGrid");

  const selected = SUITE_PHOTOS.filter(p => suiteState.selectedIds.has(p.id));
  const selectedWithNotes = selected.filter(p => p.notes && p.notes.trim().length > 0);

  if (countEl) countEl.textContent = selected.length;
  if (notesCountEl) notesCountEl.textContent = selectedWithNotes.length;

  if (thumbs) {
    thumbs.innerHTML = "";
    selected.forEach(p => {
      const hasNote = p.notes && p.notes.trim().length > 0;
      const item = document.createElement("div");
      item.className = "thumb-preview-item";
      item.innerHTML = `
        <img src="${p.url}" alt="${p.id}">
        <span class="thumb-id">${p.id}</span>
        ${hasNote ? `<span class="thumb-note-badge" title="${p.notes}"><i class="fa-solid fa-pen-nib"></i> ${p.notes}</span>` : ''}
      `;
      thumbs.appendChild(item);
    });
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeReviewModal() {
  document.getElementById("reviewModal").classList.add("hidden");
  document.body.style.overflow = "";
}

async function submitFinalSelection() {
  const sessionId = localStorage.getItem('lamha_session_id');
  if (!sessionId) return;

  try {
    const client = window.supabaseClient;
    if (!client) throw new Error("El cliente de Supabase no está listo.");

    const { error } = await client
      .from('sessions')
      .update({ selected_assets: Array.from(suiteState.selectedIds) })
      .eq('id', sessionId);

    if (error) throw error;

    closeReviewModal();
    showToast("¡Selección enviada a Afaf Elaribi! Comenzamos el retoque y encuadernación en lino.", "success");
  } catch (error) {
    console.error("Error saving selection:", error);
    showToast("Error al guardar la selección. Inténtalo de nuevo.", "warning");
  }
}

function downloadSelectedProofs() {
  showToast(`Descargando archivo comprimido con las ${suiteState.selectedIds.size} fotografías seleccionadas...`, "info");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
