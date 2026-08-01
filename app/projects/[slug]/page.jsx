import { notFound } from 'next/navigation';
import ProjectShowcase, { projectSlugs } from '@/components/ProjectShowcase';

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  if (!projectSlugs.includes(slug)) {
    notFound();
  }

  return <ProjectShowcase slug={slug} />;
}
