export const appRoutes = {
  login: '/login',
  signup: '/signup',
  home: '/',
  'active-session': '/active-session',
  history: '/history',
  team: '/team',
  setting: '/setting',
  help: '/help',
  session: '/session',
  sessionById: (sessionId: string) => `/sessions/${sessionId}`,
  activeSessionById: (sessionId: string) => `/active-session/${sessionId}`,
};
