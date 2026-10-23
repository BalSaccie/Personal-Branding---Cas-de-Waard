// Kleine scripts voor de site: menu op telefoon, actieve pagina,
// animatie bij scrollen en het projectfilter.

document.documentElement.classList.remove("no-js");

// Header en footer staan op elke pagina; zo hoef je het menu maar op één plek aan te passen.
const PAGES = [
  ["index.html", "Home"],
  ["wie-ben-ik.html", "Wie ben ik?"],
  ["wat-kan-ik.html", "Wat kan ik?"],
  ["wat-wil-ik.html", "Wat wil ik?"],
  ["portfolio.html", "Portfolio"],
  ["ontwikkeling.html", "Mijn ontwikkeling"],
  ["contact.html", "Contact"],
];

const current = location.pathname.split("/").pop() || "index.html";

const navItems = PAGES.map(([href, label]) => {
  const active = href === current ? ' aria-current="page"' : "";
  return `<li><a href="${href}"${active}>${label}</a></li>`;
}).join("");

const header = document.querySelector(".site-header");
if (header) {
  header.innerHTML = `
    <div class="wrap">
      <a class="logo" href="index.html"><span class="logo-mark">CW</span>Cas de Waard</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu <span aria-hidden="true">☰</span></button>
      <nav class="nav" id="nav" aria-label="Hoofdmenu"><ul>${navItems}</ul></nav>
    </div>`;

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const footer = document.querySelector(".site-footer");
if (footer) {
  const links = PAGES.slice(1).map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("");
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html"><span class="logo-mark">CW</span>Cas de Waard</a>
          <p style="margin-top:16px;max-width:36ch">Nieuwsgierig, analytisch en altijd in beweging. Student Commerciële Economie, afstudeerrichting sportmarketing.</p>
        </div>
        <div><h4>Pagina's</h4><ul>${links}</ul></div>
        <div><h4>Contact</h4><ul>
          <li><a href="mailto:cas.de.waard@hva.nl">cas.de.waard@hva.nl</a></li>
          <li><a href="https://www.linkedin.com/in/cas-de-waard-8b08642b8/" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li>Hogeschool van Amsterdam</li>
          <li>Commerciële Economie · jaar 4</li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Cas de Waard</span>
        <span>Studiejaar 2026–2027</span>
      </div>
    </div>`;
}

// Elementen rustig laten verschijnen bij scrollen
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 })
  : null;

document.querySelectorAll(".reveal, .bar").forEach((el) => {
  if (io) io.observe(el);
  else el.classList.add("in-view");
});

// Projectfilter op de portfoliopagina
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    document.querySelectorAll(".project-card").forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      card.hidden = f !== "alle" && !tags.includes(f);
    });
  });
});

// Zwevende ruiten achter de hero en de paginakoppen (puur decoratief)
document.querySelectorAll(".hero, .page-head").forEach((el) => {
  const f = document.createElement("div");
  f.className = "floaters";
  f.setAttribute("aria-hidden", "true");
  f.innerHTML = "<i></i><i></i><i></i><i></i>";
  el.prepend(f);
});

// Favicon: oranje CW-blokje, zelfde stijl als het logo
const icon = document.createElement("link");
icon.rel = "icon";
icon.href = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0 0h32v22l-10 10H0z" fill="#ff7a21"/><text x="15" y="21" font-family="Arial" font-weight="900" font-size="13" text-anchor="middle" fill="#07090c">CW</text></svg>');
document.head.appendChild(icon);
