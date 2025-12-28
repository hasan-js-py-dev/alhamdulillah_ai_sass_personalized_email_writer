import React from 'react';
import { Calendar } from 'lucide-react';

export function Settings() {
  return (
    <div className="flex items-center justify-center h-[60vh] text-center">
      <div>
        <div className="w-16 h-16 bg-warm-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-warm-gray" />
        </div>
        <h2 className="text-2xl font-bold text-warm-gray mb-2">Coming Soon!</h2>
        <p className="text-warm-gray-light">We’re crafting some lovely settings for you.</p>
      </div>
    </div>
  );
}
