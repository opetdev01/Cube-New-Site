import { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Cube Consultants",
    };
  }

  const imageUrl = project.featuredImage || "/logo.png";
  const cleanDescription = project.description
    ? project.description.replace(/<[^>]*>?/gm, "").trim()
    : `Explore ${project.title} by Cube Consultants.`;

  return {
    title: `${project.title} | Cube Consultants`,
    description: cleanDescription,
    openGraph: {
      title: project.title,
      description: cleanDescription,
      url: `https://cubeconsultants.org/projects/${project.slug}`,
      siteName: "Cube Consultants",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
