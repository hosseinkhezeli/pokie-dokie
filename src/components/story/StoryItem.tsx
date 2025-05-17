import React from 'react';
import { EditIcon, TrashIcon, CheckCircleIcon } from 'lucide-react';
import { Story } from '@/types/common.types';

interface StoryItemProps {
  story: Story;
  isSelected: boolean;
  onSelect: (storyId: string) => void;
  onEdit?: (story: Story) => void;
  onDelete?: (storyId: string) => void;
}

const StoryItem: React.FC<StoryItemProps> = ({
  story,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const handleClick = () => {
    onSelect(story.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(story);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(story.id);
  };

  return (
    <div
      className={`
        p-4 cursor-pointer transition-colors
        ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}
      `}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-900 flex items-center">
            {story.title}
            {story.status === 'completed' && (
              <CheckCircleIcon className="h-4 w-4 ml-2 text-emerald-500" />
            )}
          </h3>
          
          {story.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{story.description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {story.finalEstimate !== null && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {story.finalEstimate} points
            </span>
          )}
          
          {onEdit && (
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-indigo-600 focus:outline-none"
              title="Edit story"
            >
              <EditIcon className="h-4 w-4" />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-600 focus:outline-none"
              title="Delete story"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryItem;