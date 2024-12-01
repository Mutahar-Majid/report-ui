import React, { createContext, useContext, useState } from 'react';
import { Home, FileText } from 'lucide-react'; // Import icons from Lucide

// Create a context for the Tabs component
const TabsContext = createContext();

export const Tabs = ({ defaultTab = 0, onSelect, children }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  function handleSelect() {
    onSelect && onSelect(selectedTab);
    setSelectedTab(selectedTab);
  }
  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children }) => {
  return <div className="tab-list flex space-x-2 pb-2">{children}</div>;
};

export const Tab = ({ children, tab, icon: Icon }) => {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  const isSelected = selectedTab === tab;

  return (
    <button
      onClick={() => setSelectedTab(tab)}
      className={`px-4 py-2 rounded flex items-center space-x-2 ${isSelected ? 'bg-blue-500 text-white border-b-4 border-blue-900' : 'bg-gray-200 hover:bg-gray-300'}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
};

export const TabPanels = ({ children }) => {
  const { selectedTab } = useContext(TabsContext);
  return <div className="tab-panels mt-4">{children[selectedTab]}</div>;
};

export const TabPanel = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};