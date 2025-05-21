'use client';
import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TabItem } from '@/components/ui/tabs/TabItem';

type TTab = {
  id: string;
  label: ReactNode;
};

type TTabsProps = {
  tabs: TTab[];
};

type TIndicatorStyle = {
  left: number;
  width: number;
};

export function Tabs({ tabs }: TTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '');
  const tabsRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<TIndicatorStyle>({
    left: 0,
    width: 0,
  });

  const updateIndicator = useCallback(() => {
    if (!tabsRef.current) return;

    const activeTabButton = tabsRef.current.querySelector(
      `#tab-${activeTabId}`
    ) as HTMLElement | null;

    if (activeTabButton) {
      setIndicatorStyle({
        left: activeTabButton.offsetLeft,
        width: activeTabButton.offsetWidth,
      });
    }
  }, [activeTabId]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator]);

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
  };

  return (
    <div className='relative'>
      <ul ref={tabsRef} className='flex overflow-x-auto gap-6' role='tablist'>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={tab.id === activeTabId}
            onClick={handleTabClick}
          />
        ))}
      </ul>
      <TabIndicator {...indicatorStyle} />
    </div>
  );
}

const TabIndicator = ({ left, width }: { left: number; width: number }) => {
  return (
    <span
      className='absolute bottom-0 h-0.5 bg-primary transition-all'
      style={{
        left,
        width,
      }}
    />
  );
};
