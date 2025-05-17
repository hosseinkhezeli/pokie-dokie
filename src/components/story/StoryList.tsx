import React, { useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Story } from '@/types/common.types';
import StoryForm from './StoryForm';
import StoryItem from './StoryItem';

const StoryList: React.FC = () => {
  const { session, currentUser, deleteStory, setCurrentStory } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | undefined>(
    undefined
  );

  if (!session) return null;

  const handleSelectStory = (storyId: string) => {
    setCurrentStory(storyId);
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setShowForm(true);
  };

  const handleDeleteStory = (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      deleteStory(storyId);
    }
  };

  const handleAddNewClick = () => {
    setEditingStory(undefined);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingStory(undefined);
  };

  const isHost = currentUser?.isHost;

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center'>
        <h2 className='text-lg font-medium text-indigo-800'>Stories</h2>
        {isHost && (
          <button
            onClick={handleAddNewClick}
            className='flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors'
          >
            <PlusIcon className='h-4 w-4 mr-1' />
            Add Story
          </button>
        )}
      </div>

      {showForm && (
        <div className='p-4 border-b border-gray-200'>
          <StoryForm onCancel={handleCancelForm} editingStory={editingStory} />
        </div>
      )}

      <div className='divide-y divide-gray-200'>
        {session.stories.length === 0 ? (
          <div className='py-8 text-center text-gray-500'>
            <p>No stories added yet.</p>
            {isHost && (
              <button
                onClick={handleAddNewClick}
                className='mt-2 text-indigo-600 hover:text-indigo-800 focus:outline-none'
              >
                Add your first story
              </button>
            )}
          </div>
        ) : (
          session.stories.map((story) => (
            <StoryItem
              key={story.id}
              story={story}
              isSelected={session.currentStoryId === story.id}
              onSelect={handleSelectStory}
              onEdit={isHost ? handleEditStory : undefined}
              onDelete={isHost ? handleDeleteStory : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StoryList;
