import React from 'react';
import { LayoutDashboard, PenTool, Files, Settings, User, LogOut, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const menuItems = [{
    to: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  }, {
    to: '/single',
    label: 'Single Copy',
    icon: PenTool
  }, {
    to: '/bulk',
    label: 'Bulk Creator',
    icon: Files
  }, {
    to: '/settings',
    label: 'Settings',
    icon: Settings
  }];
  return <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-soft-blue to-[#8FB8E6] text-white rounded-r-[2rem] shadow-xl z-50 flex flex-col p-6">
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">CopyFriend</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map(item => <NavLink key={item.to} to={item.to} className={({
        isActive
      }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive ? 'bg-white text-soft-blue-dark shadow-md translate-x-1' : 'text-white hover:bg-white/10 hover:translate-x-1'}`}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>)}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-left group">
          <div className="w-10 h-10 rounded-full bg-gentle-orange flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Sarah Writer
            </p>
            <p className="text-xs text-white/70 truncate">Pro Plan</p>
          </div>
          <LogOut className="w-4 h-4 text-white/60 group-hover:text-white" />
        </button>
      </div>
    </aside>;
}