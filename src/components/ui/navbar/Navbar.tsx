import React from 'react';
import { commonMessages } from '@/lib/messages/commonMessages';
import { Tabs } from '@/components/ui/tabs/Tabs';
import { ProfileButton } from '@/components/ProfileButton';

const tabs = [
  {
    id: 'pharmacy',
    label: commonMessages?.pharmacy,
  },
  {
    id: 'platform',
    label: commonMessages?.platforms,
  },
];

const Navbar = () => {
  return (
    <nav className='px-12 flex items-center justify-between relative bg-background-lowest w-full min-h-20'>
      <Tabs tabs={tabs} />
      <ProfileButton disabled />
    </nav>
  );
};

export default Navbar;
