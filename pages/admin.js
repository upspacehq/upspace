import { VercelCMS } from "vercel-cms";

export default function AdminPage() {
  return <VercelCMS config="/vercel-cms.config.js" />;
}