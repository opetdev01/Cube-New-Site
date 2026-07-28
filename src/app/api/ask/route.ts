import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { projects } from "../../../data/projects";
import { news, awards } from "../../../data/insights";
import { MOVIES } from "../../../data/movies";

const STOP_WORDS = new Set([
  "what", "do", "you", "know", "about", "how", "where", "to", "in", "of", 
  "for", "with", "on", "at", "by", "an", "this", "that", "from", "it", 
  "me", "tell", "show", "is", "are", "was", "were", "be", "been", "the", 
  "a", "and", "or", "but", "if", "then", "else", "can", "will", "would",
  "should", "could", "here", "there", "who", "whom", "whose", "why", "please",
  "find", "search", "get", "give", "look", "up", "info", "information"
]);

// Detailed structured employee registry
const EMPLOYEES = [
  { name: "Dr. Ashraf Abdel Mohsen", title: "Founder & CEO", studio: "CUBE Consultants" },
  { name: "Ashraf Abdel Mohsen", title: "Founder & CEO", studio: "CUBE Consultants" },
  { name: "Dr. Heba Soliman", title: "Executive Manager", studio: "CUBE Consultants" },
  { name: "Heba Soliman", title: "Executive Manager", studio: "CUBE Consultants" },
  { name: "Habiba Mohamed Mohamed", title: "Technical Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Mohamed Gamal-Eldin Mahmoud", title: "Technical Design Manager", studio: "CTS (Cube Technical Studio)" },
  { name: "Sara Samir Ahmed", title: "Junior Technical Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Tasneem Abdel-Wahab Ibrahim Mohamed", title: "Technical Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Haya Mostafa Kamal", title: "Technical Architect Team Leader", studio: "CTS (Cube Technical Studio)" },
  { name: "Mina Samir Gerges", title: "Bim Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Fatma Wael Mohamed", title: "Junior Technical Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Mariam Nabil Abdel-Kader", title: "Technical Interior Architect", studio: "CTS (Cube Technical Studio)" },
  { name: "Shaimaa Mohamed Kamel Attia", title: "Technical Architect Team Leader", studio: "CTS (Cube Technical Studio)" },
  { name: "Alaa Khaled Ahmed kamal Moussa", title: "Technical Interior Architect", studio: "CTS (Cube Technical Studio)" },
  
  { name: "Ahmed Adel Abdel-Aziz", title: "Design Manager", studio: "CDS (Cube Design Studio)" },
  { name: "Abdel-Rahman Mostafa Mahmoud", title: "Assistant Design Manager", studio: "CDS (Cube Design Studio)" },
  { name: "Ahmed Mohamed Elsayed Amin", title: "Design Architect Team Leader", studio: "CDS (Cube Design Studio)" },
  { name: "Nour Mahmoud Mohamed", title: "Design Architect Team Leader", studio: "CDS (Cube Design Studio)" },
  { name: "Ali Ahmed Elsayed", title: "Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Sara Khaled Ahmed", title: "Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Omar Khaled Omar", title: "Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Shawkat Mussa Abo-Khier", title: "Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Mariam Shrief Ramadan", title: "Junior Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Mai Ahmed Abdel-Hameed", title: "Junior Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Rowida Tarek Khamees", title: "Junior Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Ahmed Mohamed Hussien Mohamed", title: "Junior Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Nader Ahmed Ahmed", title: "Interior Design Architect", studio: "CDS (Cube Design Studio)" },
  { name: "Amany Osama Barakat", title: "Interior Design Architect", studio: "CDS (Cube Design Studio)" },
  
  { name: "Abdelrahman soliman", title: "Architect", studio: "opet studio" },
  { name: "toqa", title: "Architect", studio: "opet studio" },
  { name: "fatma", title: "Architect", studio: "opet studio" },
  { name: "yasmine", title: "Architect", studio: "opet studio" },
  { name: "ziad", title: "Architect", studio: "opet studio" },
  { name: "Raghad", title: "ui&ux designer", studio: "opet studio" },
  { name: "noura", title: "graphic designer", studio: "opet studio" },
  { name: "Adel", title: "full stack developer", studio: "opet studio" },
  { name: "karim", title: "full stack developer", studio: "opet studio" },
  { name: "Adham", title: "photographer, video editing", studio: "opet studio" }
];

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const lowercaseQuery = query.toLowerCase().trim();

    // 1. Greetings check
    if (["hello", "hi", "hey", "greetings", "مرحبا", "أهلاً", "اهلا"].some(g => lowercaseQuery.startsWith(g))) {
      return NextResponse.json({
        answer: "Hello! I am the CUBE Portal Assistant. Ask me anything about CUBE Consultants, our employees, our projects, or our design studios.",
        filesScannedCount: 4,
        matchesCount: 1
      });
    }

    // 2. Tokenize query
    const rawTokens = lowercaseQuery.replace(/[^\w\s\u0600-\u06FF]/g, " ").split(/\s+/);
    const keywords = rawTokens.filter(t => t.length > 1 && !STOP_WORDS.has(t));
    const searchTerms = keywords.length > 0 ? keywords : rawTokens.filter(t => t.length > 0);

    if (searchTerms.length === 0) {
      return NextResponse.json({
        answer: "I couldn't identify any searchable keywords in your question. Try asking for specific names, files, components, or config settings.",
        filesScannedCount: 0,
        matchesCount: 0
      });
    }

    // 3. Prioritized Employee Search (Direct Friendly Answer)
    const queryWords = rawTokens.filter(w => w.length > 0);
    const matchedEmployees = EMPLOYEES.filter(emp => {
      const empNameParts = emp.name.toLowerCase().split(/\s+/);
      // Check if any of the query words exactly match a part of the employee's name (case-insensitive)
      // e.g. querying "adel" matches "Adel" or "Ahmed Adel Abdel-Aziz"
      return queryWords.some(word => empNameParts.includes(word));
    });

    if (matchedEmployees.length > 0) {
      if (matchedEmployees.length === 1) {
        const emp = matchedEmployees[0];
        // Determine correct pronoun article (e.g. "a developer" or "an architect")
        const startsWithVowel = /^[aeiou]/i.test(emp.title);
        const article = startsWithVowel ? "an" : "a";
        const answerText = `Yes! I know ${emp.name}. He is ${article} ${emp.title} in ${emp.studio}.`;
        return NextResponse.json({
          answer: answerText,
          filesScannedCount: 1,
          matchesCount: 1
        });
      } else {
        // Multi-match scenario (e.g. "Sara" or "Ahmed")
        let answerText = `I found multiple employees matching your request:\n\n`;
        matchedEmployees.forEach(emp => {
          answerText += `* **${emp.name}**: ${emp.title} in ${emp.studio}\n`;
        });
        return NextResponse.json({
          answer: answerText,
          filesScannedCount: 1,
          matchesCount: matchedEmployees.length
        });
      }
    }

    // 4. Default Search Engine for Projects, Insights & General Knowledge
    interface SearchResult {
      type: "project" | "insight" | "movie" | "general";
      title: string;
      details: string;
      score: number;
    }

    const matches: SearchResult[] = [];

    // --- Search Projects Database ---
    for (const p of projects) {
      let score = 0;
      const titleLower = (p.title || "").toLowerCase();
      const descLower = (p.description || "").toLowerCase();
      const summaryLower = (p.summary || "").toLowerCase();
      const sectorLower = (p.sector || "").toLowerCase();
      const locLower = (p.location || "").toLowerCase();

      for (const term of searchTerms) {
        if (titleLower.includes(term)) score += 50;
        if (descLower.includes(term)) score += 15;
        if (summaryLower.includes(term)) score += 20;
        if (sectorLower.includes(term)) score += 10;
        if (locLower.includes(term)) score += 10;
      }

      if (score > 0) {
        const details = `**Sector:** ${p.sector || "General"}\n` +
          `**Location:** ${p.location || "N/A"}\n` +
          `**Status:** ${p.status || "Completed"}\n\n` +
          `${p.summary || p.description || ""}`;
        
        matches.push({
          type: "project",
          title: p.title || p.slug,
          details,
          score
        });
      }
    }

    // --- Search Insights/News/Awards Database ---
    const allInsights = [...news, ...awards];
    for (const item of allInsights) {
      let score = 0;
      const titleLower = (item.title || "").toLowerCase();
      const excerptLower = (item.excerpt || "").toLowerCase();
      const contentLower = (item.content || "").toLowerCase();

      for (const term of searchTerms) {
        if (titleLower.includes(term)) score += 40;
        if (excerptLower.includes(term)) score += 15;
        if (contentLower.includes(term)) score += 5;
      }

      if (score > 0) {
        const cleanExcerpt = (item.excerpt || "").replace(/<[^>]*>/g, "");
        const details = `**Date:** ${item.date || "N/A"}\n` +
          `**Type:** ${item.type === "award" ? "Award / Accolade" : "News Update"}\n\n` +
          `${cleanExcerpt}`;

        matches.push({
          type: "insight",
          title: item.title,
          details,
          score
        });
      }
    }

    // --- Search Movies Database ---
    for (const m of MOVIES) {
      let score = 0;
      const titleLower = (m.title || "").toLowerCase();
      const sectorLower = (m.sector || "").toLowerCase();
      const locLower = (m.location || "").toLowerCase();

      for (const term of searchTerms) {
        if (titleLower.includes(term)) score += 40;
        if (sectorLower.includes(term)) score += 10;
        if (locLower.includes(term)) score += 10;
      }

      if (score > 0) {
        const details = `**Category:** ${m.sector}\n` +
          `**Location:** ${m.location}\n` +
          `**Video link**: https://www.youtube.com/watch?v=${m.videoId}`;

        matches.push({
          type: "movie",
          title: `Video: ${m.title}`,
          details,
          score
        });
      }
    }

    // --- Search General portal_content.md ---
    const contentPath = path.join(process.cwd(), "src", "data", "portal_content.md");
    if (fs.existsSync(contentPath)) {
      const fullContent = fs.readFileSync(contentPath, "utf8");
      const sections = fullContent.split(/(?=\n##\s+|\n###\s+)/);

      for (const section of sections) {
        const trimmed = section.trim();
        if (!trimmed) continue;
        const lines = trimmed.split("\n");
        const header = lines[0] || "";
        const body = lines.slice(1).join("\n");

        let score = 0;
        for (const term of searchTerms) {
          if (header.toLowerCase().includes(term)) score += 35;
          if (body.toLowerCase().includes(term)) score += 15;
        }

        if (score > 0) {
          matches.push({
            type: "general",
            title: header.replace(/^[#\s]+/, ""),
            details: body,
            score
          });
        }
      }
    }

    // Sort by overall score
    matches.sort((a, b) => b.score - a.score);

    let responseText = "";
    if (matches.length > 0) {
      // Pick top match or join top 3 without search thinking prefix
      const topMatches = matches.slice(0, 3);
      responseText = topMatches.map(m => `### ${m.title}\n${m.details}`).join("\n\n---\n\n");
    } else {
      responseText = `I scanned all pages, projects, and insights but couldn't find matching information for: ${searchTerms.map(t => `\`${t}\``).join(", ")}.`;
    }

    return NextResponse.json({
      answer: responseText,
      filesScannedCount: 4,
      matchesCount: matches.length
    });
  } catch (error: any) {
    console.error("Error searching website content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
