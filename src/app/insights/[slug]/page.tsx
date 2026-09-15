import { Metadata } from "next";
import { news, awards, InsightItem } from "@/data/insights";
import InsightDetailClient from "./InsightDetailClient";

const allInsights: InsightItem[] = [...news, ...awards];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = allInsights.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: "Insight Not Found | Cube Consultants",
    };
  }

  const imageUrl = item.image || "/logo.png";
  const cleanExcerpt = item.excerpt
    ? item.excerpt.replace(/<[^>]*>?/gm, "").trim()
    : item.title;

  return {
    title: `${item.title} | Cube Consultants`,
    description: cleanExcerpt,
    openGraph: {
      title: item.title,
      description: cleanExcerpt,
      url: `https://cubeconsultants.org/insights/${item.slug}`,
      siteName: "Cube Consultants",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: cleanExcerpt,
      images: [imageUrl],
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <InsightDetailClient slug={slug} />;
}
