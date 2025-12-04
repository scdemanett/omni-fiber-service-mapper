'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SelectionContextType {
  selectedCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
  lastViewedPage: string | null;
  setLastViewedPage: (page: string | null) => void;
  timelineEnabled: boolean;
  setTimelineEnabled: (enabled: boolean) => void;
  selectedTimeIndex: number;
  setSelectedTimeIndex: (index: number) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = 'omni-fiber-selections';

interface StoredSelections {
  selectedCampaignId: string | null;
  lastViewedPage: string | null;
  timelineEnabled: boolean;
  selectedTimeIndex: number;
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedCampaignId, setSelectedCampaignIdState] = useState<string | null>(null);
  const [lastViewedPage, setLastViewedPageState] = useState<string | null>(null);
  const [timelineEnabled, setTimelineEnabledState] = useState<boolean>(false);
  const [selectedTimeIndex, setSelectedTimeIndexState] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: StoredSelections = JSON.parse(stored);
          setSelectedCampaignIdState(parsed.selectedCampaignId || null);
          setLastViewedPageState(parsed.lastViewedPage || null);
          setTimelineEnabledState(parsed.timelineEnabled || false);
          setSelectedTimeIndexState(parsed.selectedTimeIndex || 0);
        }
      } catch (error) {
        console.error('Error loading selections from sessionStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    }
  }, []);

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      try {
        const toStore: StoredSelections = {
          selectedCampaignId,
          lastViewedPage,
          timelineEnabled,
          selectedTimeIndex,
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (error) {
        console.error('Error saving selections to sessionStorage:', error);
      }
    }
  }, [selectedCampaignId, lastViewedPage, timelineEnabled, selectedTimeIndex, isInitialized]);

  const setSelectedCampaignId = (id: string | null) => {
    setSelectedCampaignIdState(id);
  };

  const setLastViewedPage = (page: string | null) => {
    setLastViewedPageState(page);
  };

  const setTimelineEnabled = (enabled: boolean) => {
    setTimelineEnabledState(enabled);
  };

  const setSelectedTimeIndex = (index: number) => {
    setSelectedTimeIndexState(index);
  };

  const value: SelectionContextType = {
    selectedCampaignId,
    setSelectedCampaignId,
    lastViewedPage,
    setLastViewedPage,
    timelineEnabled,
    setTimelineEnabled,
    selectedTimeIndex,
    setSelectedTimeIndex,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}

