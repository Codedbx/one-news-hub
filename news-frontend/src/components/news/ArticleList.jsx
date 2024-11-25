import { useNews } from '../../context/NewsContext';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
  const { articles, loading } = useNews();

  if (loading) return <div>Loading...</div>;

  // Convert the articles object into an array
  const articleArray = Object.entries(articles).map(([id, details]) => ({
    id,
    ...details,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articleArray.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
