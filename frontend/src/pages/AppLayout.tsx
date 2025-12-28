import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-warm-cream font-sans">
      <Sidebar />

      <main className="ml-64 p-8 min-h-screen transition-all duration-300 ease-in-out bg-warm-cream text-deep-navy text-base">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
