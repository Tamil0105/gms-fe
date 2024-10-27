import {create} from 'zustand';

interface SidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  toggleMobileSidebar:() =>void
  closeSidebar: () => void;
  closeMObileSidebar: () => void;
  openMobileSidebar: () => void;

}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isMobileOpen:false,
  toggleMobileSidebar: () => set((state) => ({ isOpen: true,isMobileOpen:!state.isMobileOpen })),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  openMobileSidebar: () => set({ isMobileOpen: true }),
  closeMObileSidebar: () => set({ isMobileOpen: false }),
}));

export default useSidebarStore;
