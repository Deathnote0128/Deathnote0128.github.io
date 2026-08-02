/* ============================================================
   CONFIG — edit these as you add real GitHub projects/links
   ============================================================ */
const SITE_CONFIG = {
  githubUsername: "", // e.g. "shobitha-rao" — fill in and the link below updates itself
};

/* ============================================================
   DATA — add new project objects here any time; the grid
   below renders straight from this array, so new GitHub repos
   just need a new entry, no HTML edits required.
   ============================================================ */
const SKILLS = [
  { label: "Molecular Biology", type: "wet", items: ["DNA & RNA Isolation", "PCR", "Agarose Gel Electrophoresis", "Gel Prep & Documentation", "Primer Handling", "NanoDrop"] },
  { label: "Protein Analysis", type: "wet", items: ["SDS-PAGE", "Western Blotting", "Protein Extraction & Quantification"] },
  { label: "Lab Techniques", type: "wet", items: ["Centrifugation", "Micropipetting", "Buffer / Reagent Prep", "GLP"] },
  { label: "Bioinformatics", type: "dry", items: ["FastQC", "fastp", "MultiQC", "BLAST", "QUAST", "BUSCO", "MaSuRCA", "SPAdes", "SOAPdenovo2", "Augustus", "Linux / Unix"] },
  { label: "Software", type: "dry", items: ["MS Office", "Google Workspace", "Notebook LM"] },
];

const PROJECTS = [
  {
    tag: "Genomics · De Novo Assembly",
    title: "Whole Genome Sequencing & Assembly of Caesalpinia bonducella L.",
    points: [
      "Performed de novo whole-genome sequencing and assembly using MaSuRCA.",
      "Assembled and characterized the chloroplast and mitochondrial organelle genomes with GetOrganelle.",
      "Ran gene prediction in AUGUSTUS, identifying 15,052 genes, then annotated them via BLAST against NCBI nr — 8,765 conserved and 6,287 potentially novel to the species.",
      "Validated input quality with genomic DNA at OD A260/280 of 1.87–1.89, confirmed on raw reads with FastQC.",
    ],
    tools: ["MaSuRCA", "GetOrganelle", "AUGUSTUS", "BLAST", "FastQC"],
    repoUrl: null,
  },
  {
    tag: "Plant Biotechnology · Applied Research",
    title: "Efficacy of Hydrogels in Soil Water Retention and Plant Growth",
    points: [
      "Synthesized biodegradable hydrogel beads from sodium alginate with guar gum, locust bean gum, and bacterial cellulose — 82% water-holding capacity, 83.33% re-swelling capacity.",
      "Showed improved germination and sustained growth in radish, green gram, paddy, and spinach under reduced watering.",
      "Ran soil water-retention studies: 72% swelling ratio, 78.95% water retention, plus pH stability analysis.",
      "Confirmed hydrogels as a viable soil conditioner through tray and pot trials under water-deficit conditions.",
    ],
    tools: ["Hydrogel synthesis", "Soil analysis", "Plant trials"],
    repoUrl: null,
  },
];

/* ============================================================
   RENDER: skills
   ============================================================ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.innerHTML = SKILLS.map((lane) => `
    <div class="skill-lane">
      <span class="skill-lane__well">${lane.label}</span>
      ${lane.items.map((item) => `<span class="chip chip--${lane.type}">${item}</span>`).join("")}
    </div>
  `).join("");
}

/* ============================================================
   RENDER: projects
   ============================================================ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project-card">
      <span class="project-card__tag">${p.tag}</span>
      <h3 class="project-card__title">${p.repoUrl ? `<a href="${p.repoUrl}" target="_blank" rel="noopener">${p.title}</a>` : p.title}</h3>
      <ul class="project-card__list">
        ${p.points.map((pt) => `<li>${pt}</li>`).join("")}
      </ul>
      <div class="project-card__tools">
        ${p.tools.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

/* ============================================================
   TICKER — a quiet nucleotide strip along the hero baseline
   ============================================================ */
function renderTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track) return;
  const bases = ["A", "T", "C", "G"];
  let seq = "";
  for (let i = 0; i < 220; i++) {
    const b = bases[Math.floor(Math.random() * bases.length)];
    seq += `<span class="base-${b}">${b}</span>`;
  }
  // duplicate for a seamless loop
  track.innerHTML = seq + seq;
}

/* ============================================================
   COUNTERS — animate the readout numbers once in view
   ============================================================ */
function animateCounters() {
  const els = document.querySelectorAll(".readout__value");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  els.forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (prefersReduced) {
      el.textContent = target.toLocaleString();
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const targets = document.querySelectorAll(
    ".section__title, .lede, .readout, .skills, .projects, .timeline, .chips-row, .pub-card, .contact-links"
  );
  targets.forEach((t) => t.classList.add("reveal"));

  const readoutTriggered = { done: false };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.id === "readout" && !readoutTriggered.done) {
            readoutTriggered.done = true;
            animateCounters();
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ============================================================
   NAV toggle (mobile)
   ============================================================ */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================================
   GitHub link from config
   ============================================================ */
function applyConfig() {
  const ghLink = document.getElementById("githubLink");
  if (ghLink && SITE_CONFIG.githubUsername) {
    ghLink.href = `https://github.com/${SITE_CONFIG.githubUsername}`;
    ghLink.querySelector(".contact-links__value").textContent = `@${SITE_CONFIG.githubUsername}`;
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderTicker();
  initReveal();
  initNav();
  applyConfig();
});
