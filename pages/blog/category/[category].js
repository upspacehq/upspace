import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import SEO from '../../../components/seo/SEO';
import PostCard from '../../../components/blog/PostCard';
import Pagination from '../../../components/common/Pagination';
import { getPostsByCategory } from '../../../lib/posts';
import { getCategories } from '../../../lib/categories';
import { useState } from 'react';
import styles from '../../../styles/Blog.module.css';

const POSTSPERPAGE = 9;

export default function CategoryPage({ posts, category }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTSPERPAGE);
  const startIndex = (currentPage - 1) * POSTSPERPAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTSPERPAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <SEO 
        title={`${category} Articles - UpSpaceX`}
        description={`Read the latest articles about ${category}`}
      />

      <div className={styles.blog}>
        <div className="container">
          <header className={styles.header}>
            <h1>{category}</h1>
            <p>{posts.length} articles</p>
          </header>

          <div className={styles.grid}>
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const categories = getCategories();
  const paths = categories.map(cat => ({
    params: { category: cat.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = getPostsByCategory(params.category);
  const categories = getCategories();
  const category = categories.find(cat => cat.slug === params.category);

  return {
    props: {
      posts,
      category: category ? category.name : params.category
    }
  };
}