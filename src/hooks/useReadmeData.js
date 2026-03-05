import { useEffect, useRef, useState } from "react";
import { parseReadme } from "@/lib/readmeParser";
import { defaultContent } from "@/lib/defaultContent";

const MAX_SIZE = 200 * 1024;
const CACHE_TTL = Number(import.meta.env.VITE_README_CACHE_SECONDS ?? 300) * 1000;
const README_URL = import.meta.env.VITE_README_URL;
const FALLBACK_URL = "/fallback-readme.md";

const cache = { content: null, parsed: null, fetchedAt: 0 };

const isFresh = () => cache.content && Date.now() - cache.fetchedAt < CACHE_TTL;

export function useReadmeData() {
  const [data, setData] = useState(defaultContent);
  const [status, setStatus] = useState(cache.parsed ? "ready" : "loading");
  const [error, setError] = useState(null);
  const abortRef = useRef();

  const load = async ({ force = false } = {}) => {
    if (!force && isFresh()) {
      setData(mergeContent(cache.parsed));
      setStatus("ready");
      return;
    }
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");
    setError(null);

    const fetchText = async (url) => {
      const res = await fetch(url, { cache: "no-store", signal: controller.signal });
      if (!res.ok) throw new Error(`Failed to fetch README (${res.status})`);
      const text = await res.text();
      if (text.length > MAX_SIZE) throw new Error("README too large (200KB limit).");
      return text;
    };

    try {
      if (!README_URL) throw new Error("VITE_README_URL is not set.");
      const text = await fetchText(README_URL);
      const parsed = parseReadme(text);
      cache.content = text;
      cache.parsed = parsed;
      cache.fetchedAt = Date.now();
      setData(mergeContent(parsed));
      setStatus("ready");
    } catch (err) {
      console.warn("README fetch failed, trying fallback", err);
      try {
        const fallback = await fetchText(FALLBACK_URL);
        const parsed = parseReadme(fallback);
        cache.content = fallback;
        cache.parsed = parsed;
        cache.fetchedAt = Date.now();
        setData(mergeContent(parsed));
        setStatus("ready");
        setError(err.message);
      } catch (fallbackErr) {
        setStatus("error");
        setError(err.message ?? fallbackErr.message ?? "Failed to load README.");
      }
    }
  };

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => load({ force: true });

  return { data, status, error, refresh };
}

function mergeContent(parsed) {
  // shallow merge parsed onto defaults
  return {
    ...defaultContent,
    ...parsed,
    navbar: { ...defaultContent.navbar, ...parsed.navbar },
    hero: { ...defaultContent.hero, ...parsed.hero },
    about: { ...defaultContent.about, ...parsed.about },
    projects: parsed.projects?.length ? parsed.projects : defaultContent.projects,
    experience: parsed.experience?.length ? parsed.experience : defaultContent.experience,
    resume: {
      ...defaultContent.resume,
      skills: parsed.skills?.groups
        ? parsed.skills.groups.map((g, i) => ({ category: g.category ?? `Group ${i + 1}`, items: g.items }))
        : defaultContent.resume.skills,
      languages: parsed.skills?.languages ?? defaultContent.resume.languages,
      education: parsed.education?.length ? parsed.education : defaultContent.resume.education,
      certifications: parsed.certifications?.length ? parsed.certifications : defaultContent.resume.certifications,
    },
    contact: { ...defaultContent.contact, ...parsed.contact },
    footer: { ...defaultContent.footer, ...parsed.footer },
    assets: { ...defaultContent.assets, ...parsed.assets },
  };
}
