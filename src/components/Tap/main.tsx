import React from 'react';
import { IconType } from 'react-icons/lib';

interface Tab {
    title: string;
    key: string;
    icon?: IconType|any; // Optional icon property
  }

interface TabsProps {
  tabs: Tab[];
  active:number
  showIconsOnly:boolean
  setActiveTab:(value:number) =>void
}

const Tabs: React.FC<TabsProps> = ({ tabs,active ,showIconsOnly,setActiveTab}) => {

  return (
    <div className="w-full justify-center  flex max-w-md mx-auto">
       <div className="flex gap-2  border p-1 rounded-md justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.key} // Use tab.key for a unique key
            className={`flex-1 px-2 py-1 text-sm text-center focus:outline-none transition-all duration-300 rounded-lg transform ${
              active === index
                ? 'bg-blue-500 text-white scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-300'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon } {/* Render icon if it exists */}
            {!showIconsOnly?tab.title:null}
          </button>
        ))}
      </div>
      {/* <div className="p-4 border rounded-lg shadow mt-2">
        <div className={`transition-opacity duration-500 ${activeTab === 0 ? 'opacity-100' : 'opacity-0'}`}>
          {tabs[activeTab].content}
        </div>
      </div> */}
    </div>
  );
};

export default Tabs;