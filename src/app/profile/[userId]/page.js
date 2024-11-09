'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StoryCard from '../../../components/StoryCard';
import { useAuth } from '../../../utils/context/authContext';
import getUser from '../../../api/userData';

function UserDashboard() {
  const { user } = useAuth(); // Retrieve logged-in user from auth context
  const [userStories, setUserStories] = useState([]);
  const [draftedChapters, setDraftedChapters] = useState([]);
  const [favoriteStories, setFavoriteStories] = useState([]);
  const router = useRouter();

  // Function to refresh user data
  const refreshUserData = () => {
    if (user?.id) {
      getUser(user.id).then((data) => {
        setUserStories(data.stories || []);
        setFavoriteStories(data.favoritedStories || []);
        setDraftedChapters(data.chapters || []);
      });
    }
  };

  // Fetch user data on initial load
  useEffect(() => {
    refreshUserData();
  }, [user.id]);

  const handleChapterClick = (chapterId, storyId) => {
    router.push(`/stories/${storyId}/chapters/${chapterId}`);
  };

  return (
    <div className="container my-4 story-details">
      <h1 className="text-center mb-4">{user.firstName}&apos;s Dashboard</h1>

      {/* Published Stories Section */}
      <div className="published-stories">
        <h2 className="text-center mb-3">Published Stories</h2>
        <div className="d-flex flex-wrap justify-content-center">{userStories.length > 0 ? userStories.map((story) => <StoryCard key={story.id} storyObj={story} onUpdate={refreshUserData} editDelete />) : <p className="text-center">You have not published any stories yet.</p>}</div>
      </div>

      {/* Drafted Chapters Section */}
      <div className="mt-5">
        <h2 className="text-center mb-3">Your Drafted Chapters</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {draftedChapters.length > 0 ? (
            <table className="details" style={{ margin: '0 auto', width: '400px' }}>
              <tbody>
                {draftedChapters.map((chapter) => (
                  <tr key={chapter.id}>
                    <td style={{ width: '60%', paddingRight: '10px', textAlign: 'left' }}>
                      <button
                        type="button"
                        className="story-details"
                        onClick={() => handleChapterClick(chapter.id, chapter.storyId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          textAlign: 'left',
                          cursor: 'pointer',
                          padding: 0,
                          width: '100%',
                        }}
                        aria-label={`Go to chapter ${chapter.title}`}
                      >
                        {chapter.title}
                      </button>
                    </td>
                    <td style={{ width: '40%', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
                        <span style={{ lineHeight: '1.5' }}>{new Date(chapter.dateCreated).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">You have no drafted chapters.</p>
          )}
        </div>
      </div>

      {/* Favorite Stories Section */}
      <div className="favorite-stories mt-5">
        <h2 className="text-center mb-3">Favorite Stories</h2>
        <div className="d-flex flex-wrap justify-content-center">{favoriteStories.length > 0 ? favoriteStories.map((story) => <StoryCard key={story.id} storyObj={story} onUpdate={refreshUserData} editDelete={false} />) : <p className="text-center">No stories have been added to your favorites yet.</p>}</div>
      </div>
    </div>
  );
}

export default UserDashboard;
