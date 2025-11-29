// pages/api/posts/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  const { slug } = req.query;
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  res.status(200).json({
    post: {
      ...data,   // frontmatter fields
      content,   // markdown body
    },
  });
}