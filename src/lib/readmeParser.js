// README parser tailored for this portfolio.
// Missing sections simply return undefined; components hide missing parts.

const headingRegex = /^##\s+(.*)$/i;

export function parseReadme(markdown) {
  const sections = splitSections(markdown);
  const resumeSections = splitSubsections(sections["Resume"] || []);

  return {
    navbar: parseNavbar(sections["Navbar"]),
    hero: parseHero(sections["Hero"]),
    stats: parseStats(sections["Stats"]),
    about: parseAbout(sections["About"]),
    projects: parseProjects(sections["Projects"]),
    experience: parseExperience(sections["Experience"]),
    skills: parseSkills(resumeSections.skills),
    education: parseEducation(resumeSections.education),
    certifications: parseCertifications(resumeSections.certifications),
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

function splitSubsections(lines) {
  const res = { skills: [], education: [], certifications: [], languages: [] };
  let bucket = null;
  lines.forEach((line) => {
    const t = line.trim();
    if (t.startsWith("### Skills")) bucket = "skills";
    else if (t.startsWith("### Education")) bucket = "education";
    else if (t.startsWith("### Certifications")) bucket = "certifications";
    else if (t.startsWith("### Languages")) bucket = "languages";
    else if (bucket) res[bucket].push(line);
  });
  return res;
}

function parseListLoose(lines) {
  return lines
    .map((l) => l.replace(/^-+\s*/, "").trim())
    .filter((l) => l.length > 0);
}

function stripTicks(val) {
  return typeof val === "string" ? val.replace(/`/g, "") : val;
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
    const isIndented = l.startsWith("  -") || l.startsWith("\t-");
    if (inLinks && isIndented) {
      const val = trimmed.replace(/^-+\s*/, "").trim();
      if (val) links.push(val.replace(/\.$/, ""));
      return;
    }
    if (inLinks && trimmed.startsWith("-") && !isIndented) inLinks = false;
  });
  return {
    brandImage: stripTicks(kv["Brand image"] || "/loog-hcb.png"),
    brandName: kv["Brand name"] || "Himesh Bhattarai",
    links: links.length ? links : undefined,
    themeToggle: true,
  };
}

function parseHero(lines = []) {
  const kv = parseKeyValues(lines);
  const socials = [];
  let inSocial = false;
  lines.forEach((l) => {
    const trimmed = l.trim();
    if (trimmed.toLowerCase().startsWith("- social")) {
      inSocial = true;
      return;
    }
    const isIndented = l.startsWith("  -") || l.startsWith("\t-");
    if (inSocial && isIndented) {
      const m = trimmed.match(/^-+\s*([^:]+):\s*(.+)$/);
      if (m) socials.push({ label: m[1], url: m[2] });
      return;
    }
    if (inSocial && trimmed.startsWith("-") && !isIndented) inSocial = false;
  });
  return {
    title: kv["Title"],
    subtitle: kv["Subtitle"],
    location: kv["Location"],
    availability: kv["Availability"],
    socials: socials.length ? socials : undefined,
  };
}

function parseStats(lines = []) {
  const kv = parseKeyValues(lines);
  return Object.entries(kv).map(([label, value]) => ({ label, value }));
}

function parseAbout(lines = []) {
  const kv = parseKeyValues(lines);
  const paras = [];
  lines.forEach((l) => {
    const t = l.trim();
    if (!t) return;
    if (t.startsWith("-")) {
      const m = t.match(/^-+\s*Headline:\s*(.*)$/i);
      if (m) paras.push(m[1]);
    } else {
      paras.push(t);
    }
  });
  return {
    paragraphs: paras.length ? paras : undefined,
    name: kv["Name"],
    email: kv["Email"],
    location: kv["Location"],
    availability: kv["Availability"],
    portrait: stripTicks(kv["Portrait image"]),
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
    const m = l.match(/^-+\s*\*\*(.+?)\*\*\s*(.+)?$/);
    if (m) {
      if (current) blocks.push(current);
      const titleRaw = m[1].trim();
      const titleParts = titleRaw.split(/—/).map((p) => p.trim()).filter(Boolean);
      const title = titleParts[0] || titleRaw;
      const period = titleParts[1];
      const location = titleParts[3] || titleParts[2];
      current = { title, period, location, achievements: [], skills: [] };
      return;
    }
    if (!current) return;
    const bullet = l.match(/^\s*-+\s*(.+)$/);
    if (!bullet) return;
    const text = bullet[1].trim();
    const skillsMatch = text.match(/^Skills:\s*(.+)$/i);
    if (skillsMatch) current.skills = skillsMatch[1].split(",").map((s) => s.trim());
    else if (text.length) current.achievements.push(text);
  });
  if (current) blocks.push(current);
  return blocks.length ? blocks : undefined;
}

function parseSkills(lines = []) {
  const items = parseListLoose(lines);
  return { groups: items.length ? [{ category: "Skills", items }] : undefined, languages: undefined };
}

function parseEducation(lines = []) {
  return parseListLoose(lines);
}

function parseCertifications(lines = []) {
  return parseListLoose(lines);
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
    logo: stripTicks(kv["Logo"]),
    portrait: stripTicks(kv["Portrait"]),
    projectImages: lines.filter((l) => l.includes(".png") || l.includes(".jpg")),
  };
}

function parseKeyValues(lines) {
  const out = {};
  lines.forEach((l) => {
    const m = l.match(/^-+\s*([^:]+):\s*(.*)$/);
    if (m) out[m[1].trim()] = m[2].trim();
  });
  return out;
}
