const STORAGE_KEY = "oyr_applications";
const SESSION_KEY = "oyr_admin_session";
const CONTACTS_KEY = "oyr_contact_messages";
const SETTINGS_KEY = "oyr_settings";
const EMAILS_KEY = "oyr_email_logs";
const AUDIT_KEY = "oyr_audit_logs";
const COOKIE_KEY = "oyr_cookie_ok";
const DRAFT_KEY = "oyr_draft";
const FILE_STORE = "oyr_files";
const year = new Date().getFullYear();
const app = document.querySelector("#app");

const COMPANY = {
  name: "Ocean Yacht Registration",
  email: "enquiries@oceanyachtregistration.com",
  adminEmail: "admin@oceanyachtregistration.com",
  adminPassword: "ocean-admin",
};

const LENGTH_TIERS = [
  { id: "0-7", label: "0 to 7 metres", price: 350 },
  { id: "7-12", label: "7.1 to 12 metres", price: 450 },
  { id: "12-24", label: "12.1 to 24 metres", price: 550 },
];
const SERVICE_TYPES = [
  { id: "new", label: "New Polish flag registration", price: 0 },
  { id: "ownership", label: "Change of ownership", price: 350 },
  { id: "modification", label: "Modification of existing Polish registration", price: 249 },
  { id: "deletion", label: "Polish deletion certificate", price: 249 },
  { id: "duplicate", label: "Duplicate Polish registration", price: 249 },
];
const USAGE_TYPES = [
  { id: "private", label: "Private / recreational", price: 0 },
  { id: "charter", label: "Commercial / passenger charter", price: 250 },
  { id: "bareboat", label: "Bareboat charter", price: 250 },
];
const RADIO_OPTIONS = [
  { id: "none", label: "Without MMSI licence", price: 0 },
  { id: "mmsi", label: "Polish MMSI radio licence (VHF, AIS, EPIRB, radar)", price: 149 },
];
const PRIORITY_OPTIONS = [
  { id: "standard", label: "Standard preparation (3–4 weeks)", price: 0 },
  { id: "fast", label: "Fast preparation (1–2 weeks)", price: 50 },
  { id: "express", label: "Express VIP (3–5 days)", price: 90 },
];
const DELIVERY_OPTIONS = [
  { id: "mail", label: "Registered mail", price: 15 },
  { id: "dhl", label: "DHL Express international courier", price: 50 },
];
const YACHT_TYPES = ["Motor yacht", "Sailing yacht", "Catamaran", "Motor sailer", "Other"];
const DOCUMENTS = [
  ["Passport or national identity document", "Clear colour scan of a valid identity document for each owner", true],
  ["Proof of ownership", "Bill of sale, builder's invoice or current registration in the seller's name", true],
  ["Previous registration or deletion", "Current flag papers or a deletion certificate, if the yacht is already registered", false],
  ["Technical particulars", "Builder's certificate, CE declaration or survey extract showing length and hull number", false],
];
const STATUS_LABELS = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under review",
  DOCUMENTS_REQUIRED: "Documents required",
  DOCUMENTS_VERIFIED: "Documents verified",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  ON_HOLD: "On hold",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const readApplications = () => readJson(STORAGE_KEY, []);
const writeApplications = (records) => writeJson(STORAGE_KEY, records);
const formatDate = (value) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
const formatMoney = (amount) => `€${Number(amount).toLocaleString("en-GB", { minimumFractionDigits: 0 })}`;
const optionById = (list, id) => list.find((item) => item.id === id) || list[0];
const showToast = (message) => {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.querySelector("#toast-region").append(node);
  setTimeout(() => node.remove(), 3600);
};
const statusBadge = (status) => `<span class="status ${status}">${escapeHtml(STATUS_LABELS[status] || status)}</span>`;
const writeAudit = (action, detail) => {
  const logs = readJson(AUDIT_KEY, []);
  logs.unshift({ action, detail, at: new Date().toISOString() });
  writeJson(AUDIT_KEY, logs.slice(0, 200));
};
const writeEmail = (to, subject, body) => {
  const logs = readJson(EMAILS_KEY, []);
  logs.unshift({ to, subject, body, at: new Date().toISOString(), status: "Queued locally" });
  writeJson(EMAILS_KEY, logs.slice(0, 200));
};

function openFilesDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_STORE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function saveFiles(id, files) {
  const db = await openFilesDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readwrite");
    tx.objectStore("files").put(files, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}
async function loadFiles(id) {
  const db = await openFilesDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readonly");
    const request = tx.objectStore("files").get(id);
    request.onsuccess = () => resolve(request.result || {});
    request.onerror = () => reject(request.error);
  });
}

function quoteFrom(data = {}) {
  const length = optionById(LENGTH_TIERS, data.lengthTier);
  const service = optionById(SERVICE_TYPES, data.serviceType);
  const usage = optionById(USAGE_TYPES, data.usageType);
  const radio = optionById(RADIO_OPTIONS, data.radio);
  const priority = optionById(PRIORITY_OPTIONS, data.priority);
  const delivery = optionById(DELIVERY_OPTIONS, data.delivery);
  const total = length.price + service.price + usage.price + radio.price + priority.price + delivery.price;
  return { length, service, usage, radio, priority, delivery, total };
}
function mergeDraft() { return readJson(DRAFT_KEY, {}); }
function saveDraft(data) {
  const current = mergeDraft();
  const next = { ...current };
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== "") next[key] = value;
  });
  writeJson(DRAFT_KEY, next);
  return next;
}
function defaultQuote() {
  return {
    lengthTier: "0-7",
    serviceType: "new",
    usageType: "private",
    radio: "none",
    priority: "standard",
    delivery: "mail",
    yachtType: "Motor yacht",
  };
}

const brandMark = () => `
  <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
    <rect x="1" y="1" width="34" height="34" fill="none" stroke="#7eb6d6" stroke-width="1.2"/>
    <path d="M18 7.5 20.8 15h7.6L22.4 19.6 25.2 27 18 22.6 10.8 27l2.8-7.4L7.6 15h7.6Z" fill="none" stroke="#7eb6d6" stroke-width="1.2"/>
  </svg>`;
const brand = () => `<a class="brand" href="#/">${brandMark()}<span>Ocean Yacht<br>Registration</span></a>`;

function publicHeader(active = "") {
  const item = (href, id, label) => `<a class="${active === id ? "active" : ""}" href="${href}">${label}</a>`;
  return `
    <div class="topbar">
      <div class="container" style="display:flex;justify-content:space-between;width:min(1180px,calc(100% - 48px))">
        <span>Polish EU flag applications · Private, charter and broker dossiers</span>
        <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>
      </div>
    </div>
    <header class="site-header">
      <div class="container nav">
        ${brand()}
        <nav class="nav-links">
          ${item("#/", "home", "Home")}
          ${item("#/about", "about", "About")}
          ${item("#/services", "services", "Services")}
          ${item("#/pricing", "pricing", "Pricing")}
          ${item("#/how-it-works", "process", "How it works")}
          ${item("#/faq", "faq", "FAQ")}
          ${item("#/contact", "contact", "Contact")}
          <a class="btn btn-primary btn-small" href="#/start-registration">Start registration</a>
        </nav>
        <button class="menu-toggle" aria-label="Open menu">☰</button>
      </div>
    </header>`;
}
function publicFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col">
          ${brand()}
          <p>Ocean Yacht Registration prepares Polish EU flag applications for private owners, companies and brokers. We are an application service, not a flag-state authority.</p>
        </div>
        <div class="footer-col">
          <strong>Navigate</strong>
          <a href="#/about">About</a>
          <a href="#/services">Services</a>
          <a href="#/pricing">Pricing</a>
          <a href="#/how-it-works">How it works</a>
        </div>
        <div class="footer-col">
          <strong>Applications</strong>
          <a href="#/start-registration">Start registration</a>
          <a href="#/faq">FAQ</a>
          <a href="#/contact">Contact</a>
          <a href="#/admin">Admin</a>
        </div>
        <div class="footer-col">
          <strong>Enquiries</strong>
          <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>
          <a href="#/privacy">Privacy</a>
          <a href="#/terms">Terms</a>
        </div>
      </div>
      <div class="container footer-base">
        <span>© ${year} Ocean Yacht Registration. All rights reserved.</span>
        <span>Government fees included in published package prices unless stated otherwise.</span>
      </div>
    </footer>`;
}
function setupPublicEvents() {
  document.querySelector(".menu-toggle")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("open");
  });
  renderCookieBar();
}
function basePage(content, active = "") {
  app.innerHTML = `${publicHeader(active)}${content}${publicFooter()}`;
  setupPublicEvents();
}
function renderCookieBar() {
  const region = document.querySelector("#cookie-region");
  if (!region || localStorage.getItem(COOKIE_KEY)) {
    region.innerHTML = "";
    return;
  }
  region.innerHTML = `
    <div class="cookie-bar">
      <p>We store application drafts, cookie preference and admin session data in this browser so the registration form and workspace can function. We do not use advertising cookies.</p>
      <button class="btn btn-primary btn-small" id="accept-cookies">Accept</button>
    </div>`;
  document.querySelector("#accept-cookies")?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_KEY, "1");
    region.innerHTML = "";
  });
}

function homePage() {
  const quote = quoteFrom(defaultQuote());
  basePage(`
    <main>
      <section class="hero">
        <div class="hero-media" aria-hidden="true">
          <video class="hero-video" autoplay muted loop playsinline>
            <source src="https://video-previews.elements.envatousercontent.com/files/569c60a7-d6c6-4d3b-939f-638a7ac6bba9/video_preview_h264.mp4" type="video/mp4">
          </video>
          <video class="hero-video" autoplay muted loop playsinline>
            <source src="https://videos.pexels.com/video-files/32790628/13977483_1920_1080_30fps.mp4" type="video/mp4">
          </video>
          <video class="hero-video" autoplay muted loop playsinline>
            <source src="https://videos.pexels.com/video-files/8319639/8319639-uhd_2560_1440_25fps.mp4" type="video/mp4">
          </video>
        </div>
        <div class="wide hero-grid">
          <div>
            <div class="eyebrow">Ocean Yacht Registration</div>
            <h1>Polish EU flag. Worldwide papers.</h1>
            <p class="lede">A complete application dossier for private yachts, charter vessels and brokers — identity, ownership, technical particulars, MMSI and couriered certificates in one structured process.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#/start-registration">Start registration</a>
              <a class="btn btn-ghost" href="#/pricing">Build a quote</a>
            </div>
            <div class="hero-meta">
              <span>Lifetime Polish flag</span>
              <span>EU registry</span>
              <span>Private &amp; charter</span>
              <span>MMSI available</span>
            </div>
          </div>
          <aside class="flag-card">
            <div class="eyebrow">Featured registry</div>
            <h3>Poland (EU)</h3>
            <p>Official European Union yacht registration with lifetime validity. Government fees are included in the published package.</p>
            <ul class="flag-list">
              <li>Recognised for private cruising and charter operations</li>
              <li>No annual flag renewal on the standard private package</li>
              <li>Optional Polish MMSI / call sign</li>
              <li>Laminated certificate delivered by registered mail or DHL</li>
            </ul>
            <a class="btn btn-primary" href="#/pricing">From ${formatMoney(quote.total)}</a>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="container split">
          <div>
            <div class="eyebrow">The work</div>
            <h2>A registry file, prepared properly.</h2>
            <p class="lede">Owners should not have to guess which scan, translation or hull number a Polish file needs. We collect the dossier, check it against the selected service, and submit a complete application for review.</p>
            <p class="lede">Ocean Yacht Registration is an independent application service. We do not issue flags ourselves. Certificates are produced by the competent registry once the file is accepted.</p>
          </div>
          <div class="facts" style="grid-template-columns:1fr 1fr;border:1px solid var(--line)">
            <div class="fact"><strong>Structured dossier</strong><span>Identity, title, technical data and radio options captured in sequence.</span></div>
            <div class="fact"><strong>Transparent pricing</strong><span>Length, service type, usage, MMSI, priority and courier shown before you apply.</span></div>
            <div class="fact"><strong>Case officer review</strong><span>Every file is checked before it is sent on. Missing papers are requested in writing.</span></div>
            <div class="fact"><strong>Private records</strong><span>Identity and ownership documents stay inside the application workspace.</span></div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="container">
          <div class="section-header">
            <div class="eyebrow">Services</div>
            <h2>What we prepare.</h2>
          </div>
          <div class="service-grid">
            ${SERVICE_TYPES.slice(0, 3).map((item) => `
              <a class="service-card" href="#/pricing">
                <div class="eyebrow">${item.price ? `+ ${formatMoney(item.price)}` : "Included in new flag"}</div>
                <h3>${item.label}</h3>
                <p>Configure length, usage and delivery, then continue into the documentation form.</p>
                <span class="link">Open pricing</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="media-band">
        <div class="container copy">
          <div class="eyebrow">For owners and brokers</div>
          <h2>One case officer. One application number.</h2>
          <p>When the file is submitted you receive a unique Ocean reference. Status, notes and document checks live against that number until the certificate is issued or further papers are requested.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <div class="eyebrow">How it works</div>
            <h2>Five steps, then a file number.</h2>
          </div>
          <div class="process-rail">
            ${[
              ["01", "Configure the flag", "Choose length, service, usage, radio, priority and delivery."],
              ["02", "Applicant details", "Individual or company ownership, nationality and address."],
              ["03", "Yacht particulars", "Name, type, builder, year, HIN and dimensions."],
              ["04", "Documents", "Identity, title and any previous papers, stored privately."],
              ["05", "Review & submit", "Confirm the dossier. An OYR file number is issued immediately."],
            ].map((item) => `
              <article class="process-card">
                <div class="num">${item[0]}</div>
                <h3>${item[1]}</h3>
                <p>${item[2]}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section-tight">
        <div class="container quote-panel">
          <div class="quote-copy">
            <div class="eyebrow">Instant estimate</div>
            <h2>See the package before you apply.</h2>
            <p>Published prices include the standard government fee for the selected length. Optional services are added only if you choose them.</p>
            <p class="hint">Preparation times are for our dossier work, not a guarantee of registry issue dates.</p>
          </div>
          <form class="quote-form" id="home-quote">
            ${selectField("home-length", "Vessel length", LENGTH_TIERS)}
            ${selectField("home-service", "Service", SERVICE_TYPES)}
            ${selectField("home-usage", "Intended use", USAGE_TYPES)}
            <div class="quote-total"><span>Estimated total</span><strong id="home-total">${formatMoney(quote.total)}</strong></div>
            <button class="btn btn-primary" type="submit">Continue to full quote</button>
          </form>
        </div>
      </section>

      <section class="section cta-band">
        <div class="container">
          <div class="eyebrow">Begin the file</div>
          <h2>Start your Polish flag application.</h2>
          <p class="lede">The form keeps a draft in this browser until you submit. You can review every section before it is sent.</p>
          <a class="btn btn-primary" href="#/start-registration">Start registration</a>
        </div>
      </section>
    </main>`, "home");

  document.querySelectorAll(".hero-video").forEach((video) => {
    video.play().catch(() => {});
  });

  const form = document.querySelector("#home-quote");
  const updateHomeQuote = () => {
    const next = quoteFrom({
      lengthTier: document.querySelector("#home-length").value,
      serviceType: document.querySelector("#home-service").value,
      usageType: document.querySelector("#home-usage").value,
    });
    document.querySelector("#home-total").textContent = formatMoney(next.total);
  };
  form.addEventListener("change", updateHomeQuote);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveDraft({
      ...defaultQuote(),
      lengthTier: document.querySelector("#home-length").value,
      serviceType: document.querySelector("#home-service").value,
      usageType: document.querySelector("#home-usage").value,
    });
    location.hash = "#/pricing";
  });
}

function selectField(id, label, options) {
  return `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map((item) => `<option value="${item.id}">${item.label}${item.price ? ` · ${formatMoney(item.price)}` : ""}</option>`).join("")}</select></div>`;
}

function pageHero(eyebrow, title, lede) {
  return `<section class="page-hero"><div class="container"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lede">${lede}</p></div></section>`;
}

function aboutPage() {
  basePage(`
    <main>
      ${pageHero("About", "A specialist file for a specialist registry.", "Ocean Yacht Registration exists to take Polish EU flag applications from incomplete email threads to a numbered, reviewable dossier.")}
      <section class="section page-content">
        <div class="container detail-grid">
          <div>
            <h2>What we are</h2>
            <p>We prepare and manage yacht registration applications for the Polish registry. The work covers new flags, ownership changes, modifications, deletions, duplicate certificates and optional MMSI licensing.</p>
            <p>Clients are private owners, family offices, yacht brokers and small charter operators who need a single case officer and a clear fee before papers are collected.</p>
            <h2>What we are not</h2>
            <p>We are not a government office and we do not sell “approvals”. Certificates are issued by the competent registry after it accepts the file. We will not invent processing-time guarantees or unpublished partnerships.</p>
          </div>
          <div>
            <h2>How a file is handled</h2>
            <ul>
              <li>One application number from submission to completion.</li>
              <li>Identity and title documents treated as private records.</li>
              <li>Written requests if a scan, translation or HIN is missing.</li>
              <li>Status history visible to the operations team.</li>
              <li>Physical certificate sent by registered mail or courier as selected.</li>
            </ul>
            <p>If you represent a brokerage, send the hull particulars first. We will confirm the length tier and service type before the owner is asked for identity papers.</p>
          </div>
        </div>
      </section>
    </main>`, "about");
}

function servicesPage() {
  const copy = {
    new: "First-time Polish flag for a yacht that is new, imported, or coming off another registry.",
    ownership: "Transfer the existing Polish file into a new owner or company after a sale.",
    modification: "Amend name, engine, dimensions or owner particulars already on the Polish record.",
    deletion: "Obtain a deletion certificate when the yacht is leaving the Polish registry.",
    duplicate: "Replace a lost or damaged laminated certificate without changing the underlying flag.",
  };
  basePage(`
    <main>
      ${pageHero("Services", "Polish flag work, itemised.", "Each service uses the same dossier process. Pricing changes with length, usage and the options you select.")}
      <section class="section page-content">
        <div class="container service-grid">
          ${SERVICE_TYPES.map((item) => `
            <a class="service-card" href="#/pricing">
              <div class="eyebrow">${item.price ? `From + ${formatMoney(item.price)}` : "Base package"}</div>
              <h3>${item.label}</h3>
              <p>${copy[item.id]}</p>
              <span class="link">Configure this service</span>
            </a>`).join("")}
        </div>
      </section>
    </main>`, "services");
}

function radioChoice(name, options, selected) {
  return `<div class="choice-grid">${options.map((item) => `
    <div class="choice">
      <input id="${name}-${item.id}" type="radio" name="${name}" value="${item.id}" ${selected === item.id ? "checked" : ""}>
      <label for="${name}-${item.id}">
        <span><strong>${item.label}</strong></span>
        <strong>${item.price ? formatMoney(item.price) : "Included"}</strong>
      </label>
    </div>`).join("")}</div>`;
}

function pricingPage() {
  const draft = { ...defaultQuote(), ...mergeDraft() };
  const renderSummary = (quote) => `
    <div class="summary-row"><span>${quote.length.label}</span><strong>${formatMoney(quote.length.price)}</strong></div>
    <div class="summary-row"><span>${quote.service.label}</span><strong>${quote.service.price ? formatMoney(quote.service.price) : "Included"}</strong></div>
    <div class="summary-row"><span>${quote.usage.label}</span><strong>${quote.usage.price ? formatMoney(quote.usage.price) : "Included"}</strong></div>
    <div class="summary-row"><span>${quote.radio.label}</span><strong>${quote.radio.price ? formatMoney(quote.radio.price) : "Included"}</strong></div>
    <div class="summary-row"><span>${quote.priority.label}</span><strong>${quote.priority.price ? formatMoney(quote.priority.price) : "Included"}</strong></div>
    <div class="summary-row"><span>${quote.delivery.label}</span><strong>${formatMoney(quote.delivery.price)}</strong></div>
    <div class="summary-row"><span>Total due</span><strong>${formatMoney(quote.total)}</strong></div>`;

  basePage(`
    <main>
      ${pageHero("Pricing", "Official Polish flag package.", "Select the length tier and options. The total includes the standard government fee for that length. Payment is arranged after the file is accepted — this site does not take cards yet.")}
      <section class="section page-content">
        <div class="container price-grid">
          <form id="pricing-form">
            <div class="option-group"><h3>1. Vessel length</h3>${radioChoice("lengthTier", LENGTH_TIERS, draft.lengthTier)}</div>
            <div class="option-group"><h3>2. Service type</h3>${radioChoice("serviceType", SERVICE_TYPES, draft.serviceType)}</div>
            <div class="option-group"><h3>3. Intended use</h3>${radioChoice("usageType", USAGE_TYPES, draft.usageType)}</div>
            <div class="option-group"><h3>4. Radio licence</h3>${radioChoice("radio", RADIO_OPTIONS, draft.radio)}</div>
            <div class="option-group"><h3>5. Preparation priority</h3>${radioChoice("priority", PRIORITY_OPTIONS, draft.priority)}</div>
            <div class="option-group"><h3>6. Certificate delivery</h3>${radioChoice("delivery", DELIVERY_OPTIONS, draft.delivery)}</div>
          </form>
          <aside class="summary-card">
            <div class="eyebrow">Order summary</div>
            <h3>Polish flag application</h3>
            <div id="quote-summary">${renderSummary(quoteFrom(draft))}</div>
            <p class="hint">All taxes and standard government fees for the selected length are included. Registry issue dates remain with the authority.</p>
            <button class="btn btn-primary" id="proceed-docs" type="button">Proceed to documentation</button>
          </aside>
        </div>
      </section>
    </main>`, "pricing");

  const form = document.querySelector("#pricing-form");
  const sync = () => {
    const data = Object.fromEntries([...form.querySelectorAll("input:checked")].map((input) => [input.name, input.value]));
    saveDraft(data);
    document.querySelector("#quote-summary").innerHTML = renderSummary(quoteFrom({ ...draft, ...data }));
  };
  form.addEventListener("change", sync);
  document.querySelector("#proceed-docs").addEventListener("click", () => {
    sync();
    location.hash = "#/start-registration";
  });
}

function processPage() {
  const steps = [
    ["Configure the package", "Length, service, use, MMSI, priority and delivery are locked into the file total."],
    ["Applicant details", "Individual or company, nationality, address and contact details."],
    ["Yacht particulars", "Name, builder, year, HIN, dimensions and engine data currently available."],
    ["Upload documents", "Identity and title are required. Previous papers and technical extracts are requested where they exist."],
    ["Review and submit", "You confirm accuracy. An OYR-YYYY-000001 number is issued."],
    ["Operations review", "A case officer checks scans, names and hull data against the selected service."],
    ["Further papers if needed", "Anything missing is requested against the same file number."],
    ["Registry processing", "The completed dossier is submitted. Certificate and courier follow the option you chose."],
  ];
  basePage(`
    <main>
      ${pageHero("How it works", "From quote to certificate.", "The public form is the same process our operations desk uses. Nothing is sent until you review the file.")}
      <section class="section page-content">
        <div class="container process-rail" style="grid-template-columns:repeat(4,1fr)">
          ${steps.map((item, index) => `
            <article class="process-card">
              <div class="num">${String(index + 1).padStart(2, "0")}</div>
              <h3>${item[0]}</h3>
              <p>${item[1]}</p>
            </article>`).join("")}
        </div>
      </section>
    </main>`, "process");
}

function faqPage() {
  const items = [
    ["What does the published price include?", "The length-tier fee includes the standard government charge for that hull length plus our dossier preparation. Optional items — ownership change, charter use, MMSI, faster preparation and courier — are added only when selected."],
    ["Are you the Polish registry?", "No. Ocean Yacht Registration is a private application service. The flag, certificate and MMSI are issued by the competent authorities after they accept the file."],
    ["How long does registration take?", "Our preparation options are Standard (3–4 weeks), Fast (1–2 weeks) and Express VIP (3–5 days). Those windows describe how quickly we assemble and submit the dossier. Registry issue dates can run longer and are not guaranteed."],
    ["Do I need a survey?", "Many private yachts under 24 metres can proceed on builder's data, a CE file or existing papers. If the selected service or the yacht's history requires a survey, we will say so after review — we will not invent a survey rule here."],
    ["Can a non-EU owner apply?", "Yes. Company ownership is supported in the applicant step. Where a holding structure is needed, that is scoped separately after the file is opened."],
    ["Which documents are required?", "A valid identity document and proof of ownership are required for every new flag and ownership-change file. Previous registration, deletion papers and technical extracts are requested when they exist."],
    ["How do I know the application arrived?", "The confirmation screen shows your OYR file number. Keep it for every later email. A confirmation message is also queued to your address from this workspace."],
    ["Is payment taken on this website?", "Not in this release. After the file is accepted, the case officer will send payment instructions for the quoted total."],
  ];
  basePage(`
    <main>
      ${pageHero("FAQ", "Straight answers before you start.", "If a point depends on the yacht or the registry, we say so instead of promising a result.")}
      <section class="section page-content">
        <div class="container faq-list">
          ${items.map((item) => `<div class="faq-item"><button class="faq-question" type="button">${item[0]}<span>+</span></button><div class="faq-answer">${item[1]}</div></div>`).join("")}
        </div>
      </section>
    </main>`, "faq");
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => button.parentElement.classList.toggle("open"));
  });
}

function contactPage() {
  basePage(`
    <main>
      ${pageHero("Contact", "Open a file, or ask first.", "Include the yacht name, length and current flag if you have them. Broker introductions are welcome.")}
      <section class="section page-content">
        <div class="container detail-grid">
          <div>
            <h2>Enquiries</h2>
            <p>Email <a href="mailto:${COMPANY.email}"><strong>${COMPANY.email}</strong></a> or use the form. Messages appear in the operations inbox with the same timestamp as a submitted application.</p>
            <p>For an existing file, put the OYR number in the subject line so the note is attached to the right record.</p>
          </div>
          <form id="contact-form">
            <div class="field-grid">
              ${field("contact-name", "Name")}
              ${field("contact-email", "Email", "email")}
              ${field("contact-phone", "Phone", "tel", false)}
              ${field("contact-subject", "Subject")}
              <div class="field full"><label for="contact-message">Message <em>*</em></label><textarea id="contact-message" required></textarea></div>
            </div>
            <div class="form-actions"><span></span><button class="btn btn-dark" type="submit">Send message</button></div>
          </form>
        </div>
      </section>
    </main>`, "contact");
  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) { event.target.reportValidity(); return; }
    const contacts = readJson(CONTACTS_KEY, []);
    const message = {
      id: `MSG-${Date.now()}`,
      name: document.querySelector("#contact-name").value.trim(),
      email: document.querySelector("#contact-email").value.trim(),
      phone: document.querySelector("#contact-phone").value.trim(),
      subject: document.querySelector("#contact-subject").value.trim(),
      message: document.querySelector("#contact-message").value.trim(),
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
    };
    writeJson(CONTACTS_KEY, [message, ...contacts]);
    writeEmail(COMPANY.email, `Contact: ${message.subject}`, message.message);
    writeAudit("contact_received", message.email);
    showToast("Thank you. Your message has been received.");
    event.target.reset();
  });
}

function legalPage(kind) {
  const privacy = `
    <div class="prose">
      <h2>Who we are</h2>
      <p>Ocean Yacht Registration collects the information needed to prepare a yacht registration application and to answer enquiries. This notice describes that processing for the current website.</p>
      <h2>What we collect</h2>
      <p>Applicant identity and contact details; yacht particulars; uploaded identity and ownership documents; quote selections; contact-form messages; and, for staff, admin login session data.</p>
      <h2>Why we collect it</h2>
      <p>To assemble the dossier you asked us to submit, to contact you about missing papers or fees, and to keep an internal history of the file. Draft applications stay in your browser until you submit.</p>
      <h2>Where it is stored in this release</h2>
      <p>Submitted applications and document files are stored in this browser (localStorage and IndexedDB). They are not sent to a remote server until a production backend is connected. Do not use this demo storage for live client files on a shared computer.</p>
      <h2>Retention</h2>
      <p>You may clear site data in your browser to delete local records. A production deployment will apply a written retention schedule for identity documents.</p>
      <h2>Contact</h2>
      <p>Privacy enquiries: ${COMPANY.email}.</p>
    </div>`;
  const terms = `
    <div class="prose">
      <h2>The service</h2>
      <p>Ocean Yacht Registration prepares and manages applications for Polish yacht registration and related options described on this website. We are not a flag-state authority and we do not guarantee that a registry will issue papers.</p>
      <h2>Quotes</h2>
      <p>The configurator total is an estimate based on the options you select. The payable amount is confirmed in writing after the file is reviewed. This website does not collect payment.</p>
      <h2>Your information</h2>
      <p>You confirm that information and documents you submit are accurate, that you are entitled to provide them, and that you will tell us if ownership or particulars change before the certificate is issued.</p>
      <h2>Preparation times</h2>
      <p>Standard, Fast and Express windows describe our dossier preparation, not registry processing. We are not liable for delays caused by incomplete papers, third-party translations, or the registry itself.</p>
      <h2>Governing use of the site</h2>
      <p>Do not misuse the application form or attempt to access the admin workspace without authorisation. We may refuse or close a file that appears fraudulent or incomplete.</p>
    </div>`;
  basePage(`
    <main>
      ${pageHero(kind === "privacy" ? "Privacy" : "Terms", kind === "privacy" ? "How we handle a file." : "Terms of use.", kind === "privacy" ? "Written for identity and ownership documents — not marketing copy." : "The rules that apply when you request our application service.")}
      <section class="section page-content"><div class="container">${kind === "privacy" ? privacy : terms}</div></section>
    </main>`, kind);
}

function field(id, label, type = "text", required = true, extra = "") {
  return `<div class="field"><label for="${id}">${label} ${required ? "<em>*</em>" : ""}</label><input id="${id}" type="${type}" ${required ? "required" : ""} ${extra}></div>`;
}
function applicationShell(card, step) {
  const names = ["Package", "Applicant", "Yacht", "Documents", "Review"];
  return `
    <main class="form-shell">
      <div class="container form-layout">
        <aside class="form-sidebar">
          ${brand()}
          <div class="eyebrow" style="margin-top:28px">New application</div>
          <h2>Polish flag file.</h2>
          <p>Complete the dossier in order. The quoted total stays with the file.</p>
          <div class="step-list">${names.map((name, index) => `<div class="step-item ${step === index ? "active" : ""} ${index < step ? "done" : ""}"><span>${index + 1}</span>${name}</div>`).join("")}</div>
          <p style="margin-top:24px"><a href="#/">Return to website</a></p>
        </aside>
        <section class="form-card">${card}</section>
      </div>
    </main>`;
}

function collectFields() {
  const value = (id) => document.querySelector(`#${id}`)?.value.trim() || "";
  const checked = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value || "";
  return {
    lengthTier: checked("lengthTier") || value("lengthTier"),
    serviceType: checked("serviceType") || value("serviceType"),
    usageType: checked("usageType") || value("usageType"),
    radio: checked("radio") || value("radio"),
    priority: checked("priority") || value("priority"),
    delivery: checked("delivery") || value("delivery"),
    applicantType: value("applicant-type"),
    fullName: value("full-name"),
    companyName: value("company-name"),
    email: value("email"),
    phone: value("phone"),
    nationality: value("nationality"),
    country: value("country"),
    address: value("address"),
    city: value("city"),
    state: value("state"),
    postalCode: value("postal-code"),
    yachtName: value("yacht-name"),
    yachtType: value("yacht-type"),
    manufacturer: value("manufacturer"),
    model: value("model"),
    yearBuilt: value("year-built"),
    hin: value("hin"),
    currentFlag: value("current-flag"),
    previousRegistration: value("previous-registration"),
    length: value("length"),
    beam: value("beam"),
    draft: value("draft"),
    grossTonnage: value("gross-tonnage"),
    engineManufacturer: value("engine-manufacturer"),
    engineModel: value("engine-model"),
    engineNumber: value("engine-number"),
    enginePower: value("engine-power"),
  };
}

function startRegistration() {
  if (!mergeDraft().lengthTier) saveDraft(defaultQuote());
  renderStep(0);
}

function renderStep(step) {
  const draft = { ...defaultQuote(), ...mergeDraft() };
  const quote = quoteFrom(draft);
  let card = "";
  if (step === 0) {
    card = `
      <div class="eyebrow">Step 1 of 5</div>
      <h2>Confirm the package.</h2>
      <p>These selections set the file total of <strong>${formatMoney(quote.total)}</strong>. You can still change them here.</p>
      <div class="option-group"><h3>Length</h3>${radioChoice("lengthTier", LENGTH_TIERS, draft.lengthTier)}</div>
      <div class="option-group"><h3>Service</h3>${radioChoice("serviceType", SERVICE_TYPES, draft.serviceType)}</div>
      <div class="option-group"><h3>Use</h3>${radioChoice("usageType", USAGE_TYPES, draft.usageType)}</div>
      <div class="option-group"><h3>Radio</h3>${radioChoice("radio", RADIO_OPTIONS, draft.radio)}</div>
      <div class="option-group"><h3>Priority</h3>${radioChoice("priority", PRIORITY_OPTIONS, draft.priority)}</div>
      <div class="option-group"><h3>Delivery</h3>${radioChoice("delivery", DELIVERY_OPTIONS, draft.delivery)}</div>
      <div class="form-actions"><a class="btn btn-light" href="#/pricing">Back to pricing</a><button class="btn btn-dark" data-next type="button">Continue</button></div>`;
  }
  if (step === 1) {
    card = `
      <div class="eyebrow">Step 2 of 5</div>
      <h2>Applicant.</h2>
      <p>Use the legal owner’s details. If a company will hold the yacht, choose Company and complete the registered name.</p>
      <div class="field-grid">
        <div class="field"><label for="applicant-type">Applicant type <em>*</em></label>
          <select id="applicant-type" required>
            <option value="">Select</option>
            ${["Individual", "Company", "Other"].map((item) => `<option ${draft.applicantType === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </div>
        ${field("full-name", "Full name")}
        ${field("company-name", "Company name", "text", false)}
        ${field("email", "Email", "email")}
        ${field("phone", "Phone", "tel")}
        ${field("nationality", "Nationality")}
        ${field("country", "Country of residence")}
        <div class="field full"><label for="address">Address <em>*</em></label><input id="address" type="text" required></div>
        ${field("city", "City")}
        ${field("state", "State / province", "text", false)}
        ${field("postal-code", "Postal code", "text", false)}
      </div>
      <div class="form-actions"><button class="btn btn-light" data-back type="button">Back</button><button class="btn btn-dark" data-next type="button">Continue</button></div>`;
  }
  if (step === 2) {
    card = `
      <div class="eyebrow">Step 3 of 5</div>
      <h2>Yacht particulars.</h2>
      <p>Give the data you have. Optional fields can be completed when the case officer writes.</p>
      <div class="field-grid">
        ${field("yacht-name", "Yacht name")}
        <div class="field"><label for="yacht-type">Yacht type <em>*</em></label>
          <select id="yacht-type" required>${YACHT_TYPES.map((item) => `<option ${draft.yachtType === item ? "selected" : ""}>${item}</option>`).join("")}</select>
        </div>
        ${field("manufacturer", "Manufacturer / builder")}
        ${field("model", "Model")}
        ${field("year-built", "Year built", "number", false, "min=1800 max=2100")}
        ${field("hin", "Hull identification number", "text", false)}
        ${field("current-flag", "Current flag", "text", false)}
        ${field("previous-registration", "Previous registration number", "text", false)}
        ${field("length", "Length overall (m)", "text", false)}
        ${field("beam", "Beam (m)", "text", false)}
        ${field("draft", "Draft (m)", "text", false)}
        ${field("gross-tonnage", "Gross tonnage", "text", false)}
        ${field("engine-manufacturer", "Engine manufacturer", "text", false)}
        ${field("engine-model", "Engine model", "text", false)}
        ${field("engine-number", "Engine number", "text", false)}
        ${field("engine-power", "Engine power", "text", false)}
      </div>
      <div class="form-actions"><button class="btn btn-light" data-back type="button">Back</button><button class="btn btn-dark" data-next type="button">Continue</button></div>`;
  }
  if (step === 3) {
    card = `
      <div class="eyebrow">Step 4 of 5</div>
      <h2>Documents.</h2>
      <p>PDF, JPG, PNG, DOC or DOCX. Maximum 10 MB each. Files stay in this browser until a production store is connected.</p>
      <div class="upload-list">${DOCUMENTS.map((doc, index) => `
        <div class="upload-card">
          <div class="upload-meta">
            <strong>${doc[0]} ${doc[2] ? "*" : ""}</strong>
            <span id="file-label-${index}">${draft[`document${index}`] ? `${draft[`document${index}`]} · Uploaded` : `${doc[1]} · No file selected`}</span>
          </div>
          <label class="upload-button" for="document-${index}">Choose file
            <input class="upload-input" id="document-${index}" data-document="${index}" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
          </label>
        </div>`).join("")}</div>
      <div class="form-actions"><button class="btn btn-light" data-back type="button">Back</button><button class="btn btn-dark" data-next type="button">Continue</button></div>`;
  }
  if (step === 4) {
    const rows = (pairs) => pairs.map((row) => `<div class="review-row"><span>${row[0]}</span><strong>${escapeHtml(row[1] || "Not provided")}</strong></div>`).join("");
    card = `
      <div class="eyebrow">Step 5 of 5</div>
      <h2>Review the file.</h2>
      <p>Submit only if these particulars are accurate. The quoted total will be confirmed in writing before payment.</p>
      <div class="review-block"><h3>Package · ${formatMoney(quote.total)}</h3>${rows([
        ["Length", quote.length.label],
        ["Service", quote.service.label],
        ["Use", quote.usage.label],
        ["Radio", quote.radio.label],
        ["Priority", quote.priority.label],
        ["Delivery", quote.delivery.label],
      ])}</div>
      <div class="review-block"><h3>Applicant</h3>${rows([
        ["Type", draft.applicantType],
        ["Name", draft.fullName],
        ["Company", draft.companyName],
        ["Email", draft.email],
        ["Phone", draft.phone],
        ["Country", draft.country],
      ])}</div>
      <div class="review-block"><h3>Yacht</h3>${rows([
        ["Name", draft.yachtName],
        ["Type", draft.yachtType],
        ["Builder", draft.manufacturer],
        ["Model", draft.model],
        ["Year", draft.yearBuilt],
        ["HIN", draft.hin],
      ])}</div>
      <label class="confirm-box"><input id="confirm-accurate" type="checkbox"> <span>I confirm that the information and documents provided are accurate and that I am authorised to submit this application.</span></label>
      <div class="form-actions"><button class="btn btn-light" data-back type="button">Back</button><button class="btn btn-primary" data-submit type="button">Submit application</button></div>`;
  }
  app.innerHTML = applicationShell(card, step);
  Object.entries(draft).forEach(([key, value]) => {
    const id = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    const input = document.querySelector(`#${id}`);
    if (input && input.type !== "radio" && input.type !== "file" && input.type !== "checkbox") input.value = value;
  });
  setupApplicationEvents(step);
}

function setupApplicationEvents(step) {
  document.querySelector("[data-back]")?.addEventListener("click", () => {
    saveDraft(collectFields());
    renderStep(step - 1);
  });
  document.querySelector("[data-next]")?.addEventListener("click", () => {
    const controls = [...document.querySelectorAll(".form-card input, .form-card select, .form-card textarea")].filter((el) => el.type !== "file" && el.type !== "radio");
    const invalid = controls.find((control) => !control.checkValidity());
    if (invalid) { invalid.reportValidity(); return; }
    const draft = saveDraft(collectFields());
    if (step === 1 && draft.applicantType === "Company" && !draft.companyName) {
      showToast("Company name is required for company applicants.");
      return;
    }
    if (step === 3 && DOCUMENTS.some((doc, index) => doc[2] && !draft[`document${index}`])) {
      showToast("Please upload the required documents.");
      return;
    }
    renderStep(step + 1);
  });
  document.querySelectorAll("[data-document]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files[0];
      if (!file) return;
      const allowed = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(file.type) || file.size > 10 * 1024 * 1024) {
        input.value = "";
        showToast("Use a supported file under 10 MB.");
        return;
      }
      const dataUrl = await fileToDataUrl(file);
      const draft = saveDraft({ [`document${input.dataset.document}`]: file.name });
      draft.files = draft.files || {};
      draft.files[input.dataset.document] = { name: file.name, type: file.type, dataUrl };
      writeJson(DRAFT_KEY, draft);
      const label = document.querySelector(`#file-label-${input.dataset.document}`);
      label.textContent = `${file.name} · Uploaded`;
      label.classList.add("uploaded");
    });
  });
  document.querySelector("[data-submit]")?.addEventListener("click", submitApplication);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function submitApplication() {
  if (!document.querySelector("#confirm-accurate")?.checked) {
    showToast("Please confirm the information is accurate.");
    return;
  }
  const draft = mergeDraft();
  const quote = quoteFrom(draft);
  const records = readApplications();
  const sequence = records.length + 1;
  const id = `OYR-${year}-${String(sequence).padStart(6, "0")}`;
  const submittedAt = new Date().toISOString();
  const record = {
    id,
    ...draft,
    quoteTotal: quote.total,
    quoteSummary: quote,
    status: "SUBMITTED",
    submittedAt,
    documents: DOCUMENTS.map((doc, index) => ({
      type: doc[0],
      required: doc[2],
      filename: draft[`document${index}`] || "Not uploaded",
      status: draft[`document${index}`] ? "UPLOADED" : "MISSING",
    })),
    notes: [],
    history: [{ status: "SUBMITTED", by: "System", at: submittedAt }],
  };
  delete record.files;
  writeApplications([record, ...records]);
  try { await saveFiles(id, draft.files || {}); } catch (error) { console.warn("Document store unavailable", error); }
  writeEmail(draft.email, `Application received ${id}`, `Your Polish flag application ${id} has been received. Quoted total ${formatMoney(quote.total)}.`);
  writeEmail(COMPANY.email, `New application ${id}`, `${draft.fullName} submitted ${id} for ${draft.yachtName || "unnamed yacht"}.`);
  writeAudit("application_submitted", id);
  sessionStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(DRAFT_KEY);
  app.innerHTML = applicationShell(`
    <div class="confirmation">
      <div class="success-mark">✓</div>
      <div class="eyebrow">File received</div>
      <h2>Your application is on the desk.</h2>
      <p>Quote ${formatMoney(quote.total)}. A case officer will review the dossier and write if anything further is required. Payment is not taken on this page.</p>
      <div class="application-number">${id}</div>
      <p>Use this number in every email to ${COMPANY.email}.</p>
      <a class="btn btn-dark" href="#/">Return to website</a>
    </div>`, 4);
  showToast(`Application ${id} submitted.`);
}

function loginPage() {
  app.innerHTML = `
    <main class="login-page">
      <form class="login-card" id="login-form">
        <a class="brand" href="#/">${brandMark()}<span>Ocean Yacht<br>Registration</span></a>
        <h1>Operations.</h1>
        <p>Review files, documents, messages and status from one desk.</p>
        <div class="field"><label for="admin-email">Email</label><input id="admin-email" type="email" autocomplete="username" required></div>
        <div class="field"><label for="admin-password">Password</label><input id="admin-password" type="password" autocomplete="current-password" required></div>
        <button class="btn btn-dark" type="submit">Sign in</button>
      </form>
    </main>`;
  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#admin-email").value.trim();
    const password = document.querySelector("#admin-password").value;
    if (email === COMPANY.adminEmail && password === COMPANY.adminPassword) {
      sessionStorage.setItem(SESSION_KEY, "active");
      writeAudit("admin_login", email);
      location.hash = "#/admin/dashboard";
    } else showToast("Those credentials were not recognised.");
  });
}

function adminShell(content, current = "dashboard") {
  const items = [
    ["dashboard", "Dashboard"],
    ["applications", "Applications"],
    ["customers", "Customers"],
    ["documents", "Documents"],
    ["contacts", "Messages"],
    ["emails", "Email log"],
    ["audit", "Audit log"],
    ["settings", "Settings"],
  ];
  app.innerHTML = `
    <main class="admin-app">
      <header class="admin-topbar">${brand()}<div class="admin-user"><span>Operations desk</span><button class="btn btn-ghost btn-small" id="logout" type="button">Log out</button></div></header>
      <div class="admin-layout">
        <aside class="admin-sidebar">
          <nav class="admin-nav">${items.map((item) => `<button class="${current === item[0] ? "active" : ""}" data-admin-route="${item[0]}" type="button">${item[1]}</button>`).join("")}</nav>
        </aside>
        <section class="admin-main">${content}</section>
      </div>
    </main>`;
  document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    writeAudit("admin_logout", "session ended");
    location.hash = "#/admin";
  });
  document.querySelectorAll("[data-admin-route]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/admin/${button.dataset.adminRoute}`; });
  });
}

function adminDashboard() {
  const records = readApplications();
  const counts = ["SUBMITTED", "UNDER_REVIEW", "DOCUMENTS_REQUIRED", "PROCESSING", "COMPLETED"].map((key) => records.filter((record) => record.status === key).length);
  const rows = records.slice(0, 8).map(applicationRow).join("");
  adminShell(`
    <div class="admin-heading"><div><div class="eyebrow">Overview</div><h1>Files on the desk.</h1></div><a class="btn btn-primary" href="#/start-registration">New application</a></div>
    <div class="stats-grid">
      <div class="stat-card"><span>Total</span><strong>${records.length}</strong></div>
      <div class="stat-card"><span>New</span><strong>${counts[0]}</strong></div>
      <div class="stat-card"><span>Review</span><strong>${counts[1]}</strong></div>
      <div class="stat-card"><span>Papers due</span><strong>${counts[2]}</strong></div>
      <div class="stat-card"><span>Completed</span><strong>${counts[4]}</strong></div>
    </div>
    <div class="admin-panel">
      <div class="panel-toolbar"><div><strong>Latest applications</strong><div style="color:var(--muted);font-size:.8rem">Polish flag files in arrival order</div></div>
      <button class="btn btn-light btn-small" data-admin-route="applications" type="button">View all</button></div>
      <div class="table-wrap">${records.length ? `<table><thead>${applicationHead()}</thead><tbody>${rows}</tbody></table>` : `<div class="empty-state">No applications yet.</div>`}</div>
    </div>`, "dashboard");
  setupAdminTableEvents();
}

function applicationHead() {
  return `<tr><th>File</th><th>Applicant</th><th>Yacht</th><th>Service</th><th>Total</th><th>Status</th><th>Submitted</th><th></th></tr>`;
}
function applicationRow(record) {
  const service = record.quoteSummary?.service?.label || record.serviceType || "—";
  return `<tr>
    <td><strong>${record.id}</strong></td>
    <td>${escapeHtml(record.fullName)}<br><small style="color:var(--muted)">${escapeHtml(record.email)}</small></td>
    <td>${escapeHtml(record.yachtName || "—")}</td>
    <td>${escapeHtml(service)}</td>
    <td>${record.quoteTotal ? formatMoney(record.quoteTotal) : "—"}</td>
    <td>${statusBadge(record.status)}</td>
    <td>${formatDate(record.submittedAt)}</td>
    <td><button class="btn btn-light btn-small" data-view="${record.id}" type="button">Open</button></td>
  </tr>`;
}

function applicationsPage() {
  adminShell(`
    <div class="admin-heading"><div><div class="eyebrow">Management</div><h1>Applications</h1></div></div>
    <div class="admin-panel">
      <div class="panel-toolbar">
        <input class="search-input" id="application-search" placeholder="Search file, name, email or yacht">
        <select class="filter-select" id="status-filter"><option value="">All statuses</option>${Object.entries(STATUS_LABELS).map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select>
      </div>
      <div id="application-table"></div>
    </div>`, "applications");
  renderApplicationTable();
  document.querySelector("#application-search").addEventListener("input", renderApplicationTable);
  document.querySelector("#status-filter").addEventListener("change", renderApplicationTable);
}

function renderApplicationTable() {
  const search = document.querySelector("#application-search")?.value.toLowerCase() || "";
  const filter = document.querySelector("#status-filter")?.value || "";
  const records = readApplications().filter((record) => (!filter || record.status === filter) && [record.id, record.fullName, record.email, record.yachtName].some((value) => String(value || "").toLowerCase().includes(search)));
  document.querySelector("#application-table").innerHTML = records.length
    ? `<div class="table-wrap"><table><thead>${applicationHead()}</thead><tbody>${records.map(applicationRow).join("")}</tbody></table></div>`
    : `<div class="empty-state">No applications match those filters.</div>`;
  setupAdminTableEvents();
}

function setupAdminTableEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/admin/application/${button.dataset.view}`; });
  });
  document.querySelectorAll("[data-admin-route]").forEach((button) => {
    button.addEventListener("click", () => { location.hash = `#/admin/${button.dataset.adminRoute}`; });
  });
}

function adminResourcePage(resource) {
  const records = readApplications();
  if (resource === "customers") {
    const customers = [...new Map(records.map((record) => [record.email, record])).values()];
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Directory</div><h1>Customers</h1></div></div>
      <div class="admin-panel"><div class="table-wrap">${customers.length ? `<table><thead><tr><th>Name</th><th>Email</th><th>Country</th><th>Files</th></tr></thead><tbody>${customers.map((customer) => `<tr><td>${escapeHtml(customer.fullName)}</td><td>${escapeHtml(customer.email)}</td><td>${escapeHtml(customer.country || "—")}</td><td>${records.filter((record) => record.email === customer.email).length}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">Customers appear after a file is submitted.</div>`}</div></div>`, "customers");
    return;
  }
  if (resource === "documents") {
    const docs = records.flatMap((record) => record.documents.map((document) => ({ ...document, id: record.id })));
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Private records</div><h1>Documents</h1></div></div>
      <div class="admin-panel"><div class="table-wrap">${docs.length ? `<table><thead><tr><th>File</th><th>Document</th><th>Name</th><th>Status</th></tr></thead><tbody>${docs.map((document) => `<tr><td>${document.id}</td><td>${escapeHtml(document.type)}</td><td>${escapeHtml(document.filename)}</td><td>${escapeHtml(document.status)}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">Uploaded documents appear here.</div>`}</div></div>`, "documents");
    return;
  }
  if (resource === "contacts") {
    const contacts = readJson(CONTACTS_KEY, []);
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Inbox</div><h1>Messages</h1></div></div>
      <div class="admin-panel"><div class="table-wrap">${contacts.length ? `<table><thead><tr><th>Status</th><th>Name</th><th>Email</th><th>Subject</th><th>Received</th></tr></thead><tbody>${contacts.map((message) => `<tr><td>${statusBadge(message.status)}</td><td>${escapeHtml(message.name)}</td><td>${escapeHtml(message.email)}</td><td>${escapeHtml(message.subject)}</td><td>${formatDate(message.createdAt)}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">No messages yet.</div>`}</div></div>`, "contacts");
    return;
  }
  if (resource === "emails") {
    const emails = readJson(EMAILS_KEY, []);
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Notifications</div><h1>Email log</h1></div></div>
      <div class="admin-panel"><div class="table-wrap">${emails.length ? `<table><thead><tr><th>When</th><th>To</th><th>Subject</th><th>Status</th></tr></thead><tbody>${emails.map((item) => `<tr><td>${formatDate(item.at)}</td><td>${escapeHtml(item.to)}</td><td>${escapeHtml(item.subject)}</td><td>${escapeHtml(item.status)}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">Queued messages will appear here after a submission or contact.</div>`}</div></div>`, "emails");
    return;
  }
  if (resource === "audit") {
    const logs = readJson(AUDIT_KEY, []);
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Security</div><h1>Audit log</h1></div></div>
      <div class="admin-panel"><div class="table-wrap">${logs.length ? `<table><thead><tr><th>When</th><th>Action</th><th>Detail</th></tr></thead><tbody>${logs.map((item) => `<tr><td>${formatDate(item.at)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.detail)}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state">Login, submissions and status changes are recorded here.</div>`}</div></div>`, "audit");
    return;
  }
  if (resource === "settings") {
    const settings = Object.assign({ company: COMPANY.name, email: COMPANY.email, phone: "", website: "" }, readJson(SETTINGS_KEY, {}));
    adminShell(`
      <div class="admin-heading"><div><div class="eyebrow">Configuration</div><h1>Settings</h1></div></div>
      <div class="admin-panel" style="padding:24px">
        <form id="settings-form">
          <div class="field-grid">
            ${field("setting-company", "Company name")}
            ${field("setting-email", "Company email", "email")}
            ${field("setting-phone", "Phone", "text", false)}
            ${field("setting-website", "Website URL", "url", false)}
          </div>
          <div class="form-actions"><span></span><button class="btn btn-dark" type="submit">Save settings</button></div>
        </form>
      </div>`, "settings");
    document.querySelector("#setting-company").value = settings.company;
    document.querySelector("#setting-email").value = settings.email;
    document.querySelector("#setting-phone").value = settings.phone;
    document.querySelector("#setting-website").value = settings.website;
    document.querySelector("#settings-form").addEventListener("submit", (event) => {
      event.preventDefault();
      writeJson(SETTINGS_KEY, {
        company: document.querySelector("#setting-company").value,
        email: document.querySelector("#setting-email").value,
        phone: document.querySelector("#setting-phone").value,
        website: document.querySelector("#setting-website").value,
      });
      writeAudit("settings_updated", "company profile");
      showToast("Settings saved.");
    });
  }
}

async function applicationDetail(id) {
  const record = readApplications().find((item) => item.id === id);
  if (!record) { applicationsPage(); return; }
  const files = await loadFiles(id).catch(() => ({}));
  const quote = record.quoteSummary || quoteFrom(record);
  const info = [["Full name", record.fullName], ["Type", record.applicantType], ["Company", record.companyName], ["Email", record.email], ["Phone", record.phone], ["Nationality", record.nationality], ["Country", record.country], ["Address", record.address], ["City", record.city], ["Postal code", record.postalCode]];
  const yacht = [["Yacht name", record.yachtName], ["Type", record.yachtType], ["Manufacturer", record.manufacturer], ["Model", record.model], ["Year built", record.yearBuilt], ["HIN", record.hin], ["Current flag", record.currentFlag], ["Previous registration", record.previousRegistration], ["Length", record.length], ["Beam", record.beam], ["Draft", record.draft], ["Engine", `${record.engineManufacturer || ""} ${record.engineModel || ""}`.trim()]];
  const dataList = (items) => `<dl class="data-list">${items.map((item) => `<div><dt>${item[0]}</dt><dd>${escapeHtml(item[1] || "Not provided")}</dd></div>`).join("")}</dl>`;
  adminShell(`
    <div class="detail-admin">
      <div class="detail-top">
        <div><div class="eyebrow">Application</div><h1>${record.id}</h1><div>${escapeHtml(quote.service.label)} · ${formatMoney(record.quoteTotal || quote.total)} · ${formatDate(record.submittedAt)}</div></div>
        <select class="filter-select" id="detail-status">${Object.entries(STATUS_LABELS).map(([key, label]) => `<option value="${key}" ${key === record.status ? "selected" : ""}>${label}</option>`).join("")}</select>
      </div>
      <div class="detail-sections">
        <div class="admin-card"><h3>Package</h3>${dataList([["Length", quote.length.label], ["Use", quote.usage.label], ["Radio", quote.radio.label], ["Priority", quote.priority.label], ["Delivery", quote.delivery.label], ["Total", formatMoney(record.quoteTotal || quote.total)]])}</div>
        <div class="admin-card"><h3>Applicant</h3>${dataList(info)}</div>
        <div class="admin-card"><h3>Yacht</h3>${dataList(yacht)}</div>
        <div class="admin-card full"><h3>Documents</h3><div class="upload-list">${record.documents.map((doc, index) => {
          const stored = files[index];
          const open = stored?.dataUrl ? `<a class="upload-button" href="${stored.dataUrl}" target="_blank" rel="noopener">Open</a>` : `<span class="eyebrow">Metadata only</span>`;
          return `<div class="upload-card"><div class="upload-meta"><strong>${escapeHtml(doc.type)}</strong><span class="${doc.status === "UPLOADED" ? "uploaded" : ""}">${escapeHtml(doc.filename)} · ${doc.status}</span></div>${open}</div>`;
        }).join("")}</div></div>
        <div class="admin-card"><h3>Internal notes</h3>
          <form class="note-form" id="note-form"><textarea id="new-note" placeholder="Add an internal note..."></textarea><button class="btn btn-dark btn-small" type="submit">Add</button></form>
          <div class="note-list">${record.notes.length ? record.notes.map((note) => `<div class="note-item">${escapeHtml(note.text)}<small>${escapeHtml(note.by)} · ${formatDate(note.at)}</small></div>`).join("") : `<div style="color:var(--muted);font-size:.85rem">No notes yet.</div>`}</div>
        </div>
        <div class="admin-card"><h3>Activity</h3>${record.history.map((item) => `<div class="history-item"><span class="history-dot"></span><div><strong>${STATUS_LABELS[item.status] || item.status}</strong><br><span style="color:var(--muted)">${escapeHtml(item.by)} · ${formatDate(item.at)}</span></div></div>`).join("")}</div>
      </div>
    </div>`, "applications");
  document.querySelector("#detail-status").addEventListener("change", (event) => updateStatus(record.id, event.target.value));
  document.querySelector("#note-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = document.querySelector("#new-note").value.trim();
    if (!text) return;
    const records = readApplications();
    const item = records.find((candidate) => candidate.id === record.id);
    item.notes.unshift({ text, by: "Admin", at: new Date().toISOString() });
    writeApplications(records);
    writeAudit("note_added", record.id);
    applicationDetail(record.id);
    showToast("Internal note added.");
  });
}

function updateStatus(id, status) {
  const records = readApplications();
  const record = records.find((item) => item.id === id);
  if (!record || record.status === status) return;
  const old = record.status;
  record.status = status;
  record.history.unshift({ status, by: "Admin", at: new Date().toISOString(), from: old });
  writeApplications(records);
  writeEmail(record.email, `Application ${id} updated`, `Status is now ${STATUS_LABELS[status]}.`);
  writeAudit("status_changed", `${id}: ${old} → ${status}`);
  applicationDetail(id);
  showToast(`Status updated to ${STATUS_LABELS[status]}.`);
}

function adminRouter(path) {
  if (!sessionStorage.getItem(SESSION_KEY)) { loginPage(); return; }
  if (path === "dashboard") adminDashboard();
  else if (path === "applications") applicationsPage();
  else if (path.startsWith("application/")) applicationDetail(path.split("/")[1]);
  else if (["customers", "documents", "contacts", "emails", "audit", "settings"].includes(path)) adminResourcePage(path);
  else adminDashboard();
}

function router() {
  const path = location.hash.replace(/^#\/?/, "") || "home";
  window.scrollTo(0, 0);
  if (path === "home") homePage();
  else if (path === "about") aboutPage();
  else if (path === "services") servicesPage();
  else if (path === "pricing") pricingPage();
  else if (path === "how-it-works") processPage();
  else if (path === "faq") faqPage();
  else if (path === "contact") contactPage();
  else if (path === "privacy") legalPage("privacy");
  else if (path === "terms") legalPage("terms");
  else if (path === "start-registration") startRegistration();
  else if (path === "admin") loginPage();
  else if (path.startsWith("admin/")) adminRouter(path.slice(6));
  else homePage();
}

window.addEventListener("hashchange", router);
router();
