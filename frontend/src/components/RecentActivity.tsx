import React from 'react';
import { Card } from './ui/Card';
import { CheckCircle2, PenTool, Sparkles, Clock } from 'lucide-react';
const activities = [{
  id: 1,
  type: 'completion',
  title: 'Blog Post Completed',
  description: 'You finished "10 Tips for Better Mornings" - great job!',
  time: '2 hours ago',
  icon: CheckCircle2,
  color: 'text-success-green',
  bg: 'bg-success-green/10'
}, {
  id: 2,
  type: 'creation',
  title: 'New Project Started',
  description: 'Drafting copy for the Summer Campaign.',
  time: '4 hours ago',
  icon: PenTool,
  color: 'text-soft-blue',
  bg: 'bg-soft-blue/10'
}, {
  id: 3,
  type: 'suggestion',
  title: 'AI Suggestion Used',
  description: 'You improved 5 headlines with our smart suggestions.',
  time: 'Yesterday',
  icon: Sparkles,
  color: 'text-gentle-orange',
  bg: 'bg-gentle-orange/10'
}];
export function RecentActivity() {
  return <Card title="Recent Activity" className="h-full">
      <div className="relative pl-4 border-l-2 border-warm-gray/10 space-y-8 my-2">
        {activities.map(activity => <div key={activity.id} className="relative pl-4 group">
            {/* Timeline dot */}
            <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-white ${activity.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h4 className="font-semibold text-warm-gray group-hover:text-soft-blue transition-colors">
                  {activity.title}
                </h4>
                <p className="text-warm-gray-light text-sm mt-1">
                  {activity.description}
                </p>
              </div>
              <div className="flex items-center text-xs text-warm-gray-light whitespace-nowrap bg-warm-cream px-2 py-1 rounded-full">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </div>
            </div>
          </div>)}
      </div>

      <button className="w-full mt-6 py-2 text-sm font-medium text-soft-blue hover:text-soft-blue-dark hover:bg-soft-blue/5 rounded-lg transition-colors">
        View all activity
      </button>
    </Card>;
}