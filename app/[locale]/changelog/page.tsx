import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/zhaogongchengsi/holix-ai/main/RELEASE_NOTES.md';

async function fetchChangelog() {
  try {
    const res = await fetch(GITHUB_RAW_URL, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      return '# Error loading changelog\n\nFailed to fetch the changelog from GitHub.';
    }
    
    return await res.text();
  } catch (error) {
    return '# Error loading changelog\n\nCould not connect to GitHub to fetch the changelog.';
  }
}

export default async function ChangelogPage() {
  const content = await fetchChangelog();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12 prose dark:prose-invert max-w-4xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
