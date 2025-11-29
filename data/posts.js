export const posts = [
  {
    id: 1,
    slug: "future-of-artificial-intelligence",
    title: "The Future of Artificial Intelligence in 2025",
    excerpt: "Exploring how AI is transforming industries and what to expect in the coming years. From automation to creative applications.",
    content: "Artificial Intelligence has come a long way in recent years. In 2025, we're seeing unprecedented advances in machine learning, natural language processing, and computer vision. This article explores the latest trends and what they mean for businesses and society. From GPT-4 to autonomous vehicles, AI is reshaping every industry. Companies are leveraging AI for customer service, data analysis, and creative tasks. The implications are profound and far-reaching.",
    category: "Technology",
    author: "John Doe",
    authorImage: "/images/authors/john-doe.jpg",
    coverImage: "/images/posts/ai-future.jpg",
    date: "2025-01-15",
    readTime: 5,
    tags: ["AI", "Technology", "Future"]
  },
  {
    id: 2,
    slug: "startup-funding-guide-2025",
    title: "Complete Guide to Startup Funding in 2025",
    excerpt: "Everything you need to know about raising capital for your startup, from seed rounds to Series A and beyond.",
    content: "Raising funding for a startup in 2025 requires a strategic approach. This comprehensive guide covers everything from preparing your pitch deck to negotiating term sheets. We'll explore the different funding stages, what investors look for, and common mistakes to avoid. Whether you're bootstrapping or seeking venture capital, this guide has you covered.",
    category: "Business",
    author: "Jane Smith",
    authorImage: "/images/authors/jane-smith.jpg",
    coverImage: "/images/posts/startup-funding.jpg",
    date: "2025-01-10",
    readTime: 8,
    tags: ["Startups", "Funding", "Business"]
  },
  // ... keep the rest of your posts unchanged
];

/**
 * Get all posts
 */
export function getAllPosts() {
  return posts;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

/**
 * Get featured posts (e.g., latest 3)
 */
export function getFeaturedPosts(limit = 3) {
  return posts.slice(0, limit);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category) {
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}