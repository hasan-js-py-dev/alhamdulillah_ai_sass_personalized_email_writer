import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './pages/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { SingleCopy } from './pages/SingleCopy';
import { BulkCreator } from './pages/BulkCreator';
import { Settings } from './pages/Settings';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/ui" element={<Navigate to="/dashboard" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/single" element={<SingleCopy />} />
          <Route path="/bulk" element={<BulkCreator />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>;
}