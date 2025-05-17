import { Session, Story, User, Vote } from '@/types/common.types';
import { create } from 'zustand';

interface State {
  session: Session | null;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: Session | null) => void;
  setCurrentUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addStory: (story: Story) => void;
  updateStory: (story: Story) => void;
  deleteStory: (storyId: string) => void;
  setCurrentStory: (storyId: string) => void;
  addVote: (storyId: string, vote: Vote) => void;
  setVotesRevealed: (revealed: boolean) => void;
  setFinalEstimate: (storyId: string, estimate: number) => void;
  setTimer: (duration: number, endTime: number | null) => void;
  updateUser: (user: User) => void;
  resetVotes: (storyId: string) => void;
}

export const useStore = create<State>((set) => ({
  session: null,
  currentUser: null,
  isLoading: false,
  error: null,

  setSession: (session) => set({ session }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  addStory: (story) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            stories: [...state.session.stories, story],
          }
        : null,
    })),

  updateStory: (story) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            stories: state.session.stories.map((s) =>
              s.id === story.id ? story : s
            ),
          }
        : null,
    })),

  deleteStory: (storyId) =>
    set((state) => {
      if (!state.session) return state;
      const newStories = state.session.stories.filter((s) => s.id !== storyId);
      const newCurrentStoryId =
        state.session.currentStoryId === storyId
          ? newStories.length > 0
            ? newStories[0].id
            : null
          : state.session.currentStoryId;

      return {
        session: {
          ...state.session,
          stories: newStories,
          currentStoryId: newCurrentStoryId,
        },
      };
    }),

  setCurrentStory: (storyId) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            currentStoryId: storyId,
            areVotesRevealed: false,
          }
        : null,
    })),

  addVote: (storyId, vote) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            stories: state.session.stories.map((story) =>
              story.id === storyId
                ? {
                    ...story,
                    votes: [
                      ...story.votes.filter((v) => v.userId !== vote.userId),
                      vote,
                    ],
                  }
                : story
            ),
          }
        : null,
    })),

  setVotesRevealed: (revealed) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            areVotesRevealed: revealed,
          }
        : null,
    })),

  setFinalEstimate: (storyId, estimate) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            stories: state.session.stories.map((story) =>
              story.id === storyId
                ? {
                    ...story,
                    finalEstimate: estimate,
                    status: 'completed' as const,
                  }
                : story
            ),
          }
        : null,
    })),

  setTimer: (duration, endTime) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            timerDuration: duration,
            timerEndTime: endTime,
          }
        : null,
    })),

  updateUser: (user) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            users: state.session.users.map((u) =>
              u.id === user.id ? user : u
            ),
          }
        : null,
      currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
    })),

  resetVotes: (storyId) =>
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            stories: state.session.stories.map((story) =>
              story.id === storyId
                ? {
                    ...story,
                    votes: [],
                    status: 'voting' as const,
                  }
                : story
            ),
            areVotesRevealed: false,
          }
        : null,
    })),
}));
