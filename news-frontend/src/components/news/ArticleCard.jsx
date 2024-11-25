import { useState } from 'react';
import { BookmarkIcon as BookmarkOutlineIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';

const ArticleCard = ({ article }) => {
  const { user } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const [isSaving, setIsSaving] = useState(false);

  const isBookmarked = preferences.savedArticles?.includes(article.id);

  const handleBookmark = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updatePreferences({
        savedArticles: isBookmarked
          ? preferences.savedArticles.filter((id) => id !== article.id)
          : [...(preferences.savedArticles || []), article.id],
      });
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Placeholder image URL
  const placeholderImageUrl = "https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {/* Image */}
        <img
          src={article.image_url || placeholderImageUrl} // Use placeholder if imageUrl is not available
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg sm:h-56 md:h-64"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-2">
              {article.source} •{' '}
              {new Date(article.published_at).toLocaleDateString()}
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h3>
          </div>
          <button
            onClick={handleBookmark}
            disabled={isSaving}
            className={`ml-2 p-2 rounded-full ${
              isBookmarked ? 'text-blue-600' : 'text-gray-400'
            } hover:bg-gray-100`}
          >
            {isBookmarked ? (
              <BookmarkSolidIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <p className="text-gray-600 mt-2 line-clamp-3">{article.content || 'No description available.'}</p>
        <div className="mt-4 flex justify-between items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more
          </a>
          <div className="text-sm text-gray-500">
            {article.author ? `By ${article.author}` : 'Unknown author'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
