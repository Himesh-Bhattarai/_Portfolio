// Lightweight README parser tailored to the repo's README structure.
// Falls back gracefully: missing sections simply return undefined.

const headingRegex = /^##\s+(.*)$/i;

export function parseReadme(markdown) {
  const sections = splitSections(markdown);
  return {
    navbar: parseNavbar(sections["Navbar"]),
    hero: parseHero(sections["Hero"]),
    about: parseAbout(sections["About"]),
    projects: parseProjects(sections["Projects"]),
    experience: parseExperience(sections["Experience"]),
    skills: parseSkills(sections["Skills"], sections["Languages"]),
    education: parseEducation(sections["Education"]),
    certifications: parseCertifications(sections["Certifications"]),
    contact: parseContact(sections["Contact"]),
    footer: parseFooter(sections["Footer"]),
    assets: parseAssets(sections["Assets used in site"]),
  };
}

function splitSections(md) {
  const lines = md.split(/\r?\n/);
  const map = {};
  let current = "root";
  map[current] = [];
  lines.forEach((line) => {
    const m = headingRegex.exec(line.trim());
    if (m) {
      current = m[1].trim();
      if (!map[current]) map[current] = [];
    } else {
      map[current].push(line);
    }
  });
  return map;
}

function parseList(lines) {
  return lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.match(/^\d+\)/))
    .map((l) => l.replace(/^-+\s*/, "").replace(/^\d+\)\s*/, "").trim());
}

function parseKeyValues(lines) {
  const out = {};
  lines.forEach((l) => {
    const m = l.match(/^-+\s*([^:]+):\s*(.*)$/);
    if (m) out[m[1].trim()] = m[2].trim();
  });
  return out;
}

function parseNavbar(lines = []) {
  const kv = parseKeyValues(lines);
  const links = parseList(lines.filter((l) => l.startsWith("  -") || l.startsWith("- "))).filter(
    (l) => !l.toLowerCase().startsWith("brand")
  );
  return {
    brandImage: kv["Brand image"] || "/loog-hcb.png",
    brandName: kv["Brand name"] || "Himesh Bhattarai",
    links: links.length ? links : undefined,
    themeToggle: true,
  };
}

function parseHero(lines = []) {
  const kv = parseKeyValues(lines);
  const socials = [];
  lines.forEach((l) => {
    const m = l.match(/^-+\s*([A-Za-z\/\s]+):\s*(.+)$/);
    if (m && ["facebook", "linkedin", "github", "twitter", "mail", "phone", "phone/whatsapp"].includes(m[1].toLowerCase())) {
      socials.push({ label: m[1], url: m[2] });
    }
  });
  return {
    title: kv["Title"],
    subtitle: kv["Subtitle"],
    location: kv["Location"],
    availability: kv["Availability"],
    socials: socials.length ? socials : undefined,
  };
}

function parseAbout(lines = []) {
  const kv = parseKeyValues(lines);
  const paragraphs = lines.join("\n").split("\n\n").map((p) => p.trim()).filter(Boolean);
  return {
    paragraphs: paragraphs.filter((p) => !p.startsWith("-")),
    name: kv["Name"],
    email: kv["Email"],
    location: kv["Location"],
    availability: kv["Availability"],
    portrait: kv["Portrait image"],
  };
}

function parseProjects(lines = []) {
  const blocks = [];
  let current = null;
  lines.forEach((l) => {
    const titleMatch = l.match(/^\d+\)\s+\*\*(.+?)\*\*/);
    if (titleMatch) {
      if (current) blocks.push(current);
      current = { title: titleMatch[1] };
      return;
    }
    if (!current) return;
    const m = l.match(/-\s*(Description|Stack|Live|Code):\s*(.*)/i);
    if (m) {
      const key = m[1].toLowerCase();
      const val = m[2].trim();
      if (key === "description") current.description = val;
      if (key === "stack") current.tags = val.split(",").map((s) => s.trim());
      if (key === "live") current.link = val;
      if (key === "code") current.code = val;
    }
  });
  if (current) blocks.push(current);
  return blocks.length ? blocks : undefined;
}

function parseExperience(lines = []) {
  const blocks = [];
  let current = null;
  lines.forEach((l) => {
    const m = l.match(/^-+\s*\*\*(.+?)\*\*\s*—\s*(.+?)\s*—\s*(.+)$/);
    if (m) {
      if (current) blocks.push(current);
      current = { title: m[1], period: m[2], location: m[3], achievements: [], skills: [] };
      return;
    }
    if (!current) return;
    const descMatch = l.match(/^\s*-+\s*(Built|Completed|Delivered|Experimented|Skills:)\s*(.*)$/i);
    if (descMatch) {
      const label = descMatch[1].toLowerCase();
      const val = descMatch[2].trim();
      if (label === "skills:") current.skills = val.split(",").map((s) => s.trim());
      else current.achievements.push(`${descMatch[1]} ${val}`.replace(/Skills:\s*/i, "").trim());
    }
  });
  if (current) blocks.push(current);
  return blocks.length ? blocks : undefined;
}

function parseSkills(lines = [], languageLines = []) {
  const kv = parseKeyValues(languageLines);
  const groups = [];
  // simple list split by dash items with colon
  const items = parseList(lines);
  if (items.length) {
    groups.push({ category: "Skills", items });
  }
  const languages = parseList(languageLines).map((l) => ({ name: l.replace(/^-\s*/, ""), proficiency: "" }));
  return { groups: groups.length ? groups : undefined, languages: languages.length ? languages : undefined };
}

function parseEducation(lines = []) {
  return parseList(lines);
}

function parseCertifications(lines = []) {
  return parseList(lines);
}

function parseContact(lines = []) {
  const kv = parseKeyValues(lines);
  return {
    email: kv["Email"],
    phone: kv["Phone"],
    location: kv["Location"],
    calendly: kv["Booking/Calendly"],
  };
}

function parseFooter(lines = []) {
  const kv = parseKeyValues(lines);
  const quickLinks = [];
  lines.forEach((l) => {
    if (l.toLowerCase().includes("quick links")) return;
    if (l.trim().startsWith("-")) quickLinks.push(l.replace(/^-+\s*/, "").trim());
  });
  return {
    tagline: kv["Tagline"],
    quickLinks: quickLinks.length ? quickLinks : undefined,
    copyright: kv["Copyright"],
  };
}

function parseAssets(lines = []) {
  const kv = parseKeyValues(lines);
  return {
    logo: kv["Logo"],
    portrait: kv["Portrait"],
    projectImages: lines.filter((l) => l.includes(".png") || l.includes(".jpg")),
  };
}
