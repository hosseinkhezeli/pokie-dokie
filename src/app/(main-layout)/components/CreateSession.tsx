'use client';
import React from 'react';
import { Session, User } from '@/types/common.types';
import { generateId } from '@/utils/methods';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button/Button';
import { TextInput } from '@/components/ui/input/TextInput';
import { SEARCH_PARAMS_KEYS } from '@/lib/consts';
import { PlusCircleIcon } from '@/lib/icons/PlusCircle';

interface CreateSessionProps {
  onCreate: (session: Session, user: User) => void;
  isLoading: boolean;
}

interface ICreateSessionProps {
  session: Session;
  user: User;
}

const CreateSession: React.FC<CreateSessionProps> = ({
  onCreate,
  isLoading,
}) => {
  const { addQueryParam } = useQueryParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreateSessionProps>();

  const onSubmit = (data: ICreateSessionProps) => {
    const sessionId = generateId();
    const userId = generateId();

    const user: User = {
      id: userId,
      name: data?.user?.name,
      isActive: true,
      isHost: true,
    };

    const session: Session = {
      id: sessionId,
      name: data?.session?.name.trim(),
      createdAt: Date.now(),
      host: userId,
      users: [user],
      stories: [],
      currentStoryId: null,
      timerDuration: 60, // Default: 1 minute
      timerEndTime: null,
      areVotesRevealed: false,
    };

    onCreate(session, user);
  };

  const handleNavigateToJoin = () => {
    addQueryParam(SEARCH_PARAMS_KEYS.dialogMode, 'join');
  };

  return (
    <div className='animate-slide-in'>
      <h2 className='text-display-sm mb-6 font-black'>بشینیم؟</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='flex flex-col gap-6'
      >
        <TextInput
          label='نام نشست'
          {...register('session.name', {
            required: 'نام نشست اجباریه!',
          })}
          error={errors.session?.name?.message}
          autoComplete='session id'
          aria-invalid={!!errors.session?.name}
        />

        <Button type='submit' disabled={isLoading} className='w-max'>
          {isSubmitting ? 'در حال ایجاد...' : 'ایجاد نشست جدید'}
          <PlusCircleIcon />
        </Button>
      </form>

      <div className='mt-4 text-body-md'>
        <span className=''>کلید نشست رو داری؟</span>{' '}
        <button
          className='text-tertiary underline underline-tertiary cursor-pointer'
          onClick={handleNavigateToJoin}
        >
          وارد شو
        </button>
      </div>
    </div>
  );
};

export default CreateSession;
