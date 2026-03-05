import { useEffect, useRef, useState } from "react";
import { parseReadme } from "@/lib/readmeParser";
import { defaultContent } from "@/lib/defaultContent";

const MAX_SIZE = 200 * 1024;
const CACHE_TTL = Number(import.meta.env.VITE_README_CACHE_SECONDS ?? 300) * 1000;
const README_URL = import.meta.env.VITE_README_URL;
const FALLBACK_URL = "/fallback-readme.md";

const cache = { content: null, parsed: null, fetchedAt: 0, fallback: false };

const isFresh = () => cache.content && Date.now() - cache.fetchedAt < CACHE_TTL;

export function useReadmeData() {
  const [data, setData] = useState(defaultContent);
  const [status, setStatus] = useState(cache.parsed ? "ready" : "loading");
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const abortRef = useRef();

  const load = async ({ force = false } = {}) => {
    if (!force && isFresh()) {
      setData(normalizeContent(cache.parsed, cache.fallback));
      setIsFallback(cache.fallback);
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
      cache.fallback = false;
      setData(normalizeContent(parsed, false));
      setIsFallback(false);
      setStatus("ready");
    } catch (err) {
      console.warn("README fetch failed, trying fallback", err);
      try {
        const fallback = await fetchText(FALLBACK_URL);
        const parsed = parseReadme(fallback);
        cache.content = fallback;
        cache.parsed = parsed;
        cache.fetchedAt = Date.now();
        cache.fallback = true;
        setData(normalizeContent(parsed, true));
        setIsFallback(true);
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

  return { data, status, error, refresh, isFallback };
}

function normalizeContent(parsed, allowDefaults) {
  const dc = defaultContent;
  const emptyLinks = [];
  return {
    navbar: parsed.navbar
      ? { ...parsed.navbar, links: parsed.navbar.links || [] }
      : allowDefaults
        ? dc.navbar
        : { brandImage: "", brandName: "", links: emptyLinks },
    hero: allowDefaults ? { ...dc.hero, ...parsed.hero, stats: parsed.stats || dc.stats || [] } : { ...(parsed.hero || {}), stats: parsed.stats || [] },
    about: allowDefaults ? { ...dc.about, ...parsed.about, stats: parsed.stats || dc.stats || [] } : { ...(parsed.about || {}), stats: parsed.stats || [] },
    projects: mergeProjects(parsed.projects, dc.projects, allowDefaults, parsed.assets),
    experience: parsed.experience?.length ? parsed.experience : allowDefaults ? dc.experience : [],
    resume: {
      skills: parsed.skills?.groups?.length ? parsed.skills.groups.map((g, i) => ({ category: g.category ?? `Group ${i + 1}`, items: g.items })) : allowDefaults ? dc.resume.skills : [],
      languages: parsed.skills?.languages?.length ? parsed.skills.languages : allowDefaults ? dc.resume.languages : [],
      education: parsed.education?.length ? parsed.education : allowDefaults ? dc.resume.education : [],
      certifications: parsed.certifications?.length ? parsed.certifications : allowDefaults ? dc.resume.certifications : [],
    },
    contact: allowDefaults ? { ...dc.contact, ...parsed.contact } : parsed.contact || {},
    footer: allowDefaults ? { ...dc.footer, ...parsed.footer } : parsed.footer || {},
    assets: allowDefaults ? { ...dc.assets, ...parsed.assets } : parsed.assets || {},
    stats: parsed.stats || (allowDefaults ? dc.stats : []),
  };
}

function mergeProjects(parsed, defaults, allowDefaults, assets = {}) {
  const assetImages = assets?.projectImages || [];
  if (parsed?.length) {
    return parsed.map((p, idx) => {
      const fallback = defaults?.find((d) => d.title === p.title);
      const assetImage = assetImages[idx];
      return {
        ...fallback,
        ...p,
        image: p.image || fallback?.image || assetImage,
        tags: p.tags?.length ? p.tags : fallback?.tags,
        link: p.link || p.live || fallback?.link,
        code: p.code || fallback?.code,
      };
    });
  }
  return allowDefaults ? defaults : [];
}
