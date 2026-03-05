// Lightweight README parser tailored to the repo's README structure.
// Missing sections simply return undefined.

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
  const map = { root: [] };
  let current = "root";
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
  const links = [];
  let inLinks = false;
  lines.forEach((l) => {
    const trimmed = l.trim();
    if (trimmed.toLowerCase().startsWith("- links")) {
      inLinks = true;
      return;
    }
    const isIndentedLink = l.startsWith("  -") || l.startsWith("\t-");
    if (inLinks && isIndentedLink) {
      const val = trimmed.replace(/^-+\s*/, "").trim();
      if (val) links.push(val.replace(/\.$/, ""));
      return;
    }
    const isNewTopItem = trimmed.startsWith("-") && !isIndentedLink;
    if (inLinks && isNewTopItem) inLinks = false;
  });
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
    const m = l.match(/^-+\s*\*\*(.+?)\*\*(.*)$/);
    if (m) {
      if (current) blocks.push(current);
      const rest = m[2]
        .replace(/\*\*/g, "")
        .replace(/Â·/g, "—")
        .trim();
      const parts = rest.split(/[-–—]+/).map((p) => p.trim()).filter(Boolean);
      const period = parts[0];
      const location = parts[1];
      current = { title: m[1].trim(), period, location, achievements: [], skills: [] };
      return;
    }
    if (!current) return;
    const bullet = l.match(/^\s*-+\s*(.+)$/);
    if (!bullet) return;
    const text = bullet[1].trim();
    const skillsMatch = text.match(/^Skills:\s*(.+)$/i);
    if (skillsMatch) {
      current.skills = skillsMatch[1].split(",").map((s) => s.trim());
    } else if (text.length) {
      current.achievements.push(text);
    }
  });
  if (current) blocks.push(current);
  return blocks.length ? blocks : undefined;
}

function parseSkills(lines = [], languageLines = []) {
  const groups = [];
  const items = parseList(lines);
  if (items.length) groups.push({ category: "Skills", items });
  const languages = parseList(languageLines).map((l) => ({ name: l.replace(/^-+\s*/, ""), proficiency: "" }));
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
  const socials = [];
  lines.forEach((l) => {
    const t = l.trim();
    if (t.toLowerCase().startsWith("- quick links")) {
      const list = t.split(":")[1] || "";
      list.split(",").forEach((item) => {
        const v = item.trim().replace(/\.$/, "");
        if (v) quickLinks.push(v);
      });
    } else if (t.toLowerCase().startsWith("- social links")) {
      const list = t.split(":")[1] || "";
      list.split(",").forEach((item) => {
        const v = item.trim().replace(/\.$/, "");
        if (v) socials.push(v);
      });
    }
  });
  return {
    tagline: kv["Tagline"],
    quickLinks: quickLinks.length ? quickLinks : undefined,
    socialLinks: socials.length ? socials : undefined,
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
