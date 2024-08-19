// components/admin/events/upcomingEvents.tsx

'use client';

import React from 'react';

interface UpcomingEvent {
  eventName: string,
  date: string,
  maleTotal: number,
  males: number,
  femaleTotal: number,
  females: number
}

interface UpcomingEvents {
  upcomingEvents: UpcomingEvent[]
}

const UpcomingEvents: React.FC<UpcomingEvents> = ({ upcomingEvents }) => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">開催日時</th>
            <th className="text-left">男性</th>
            <th className="text-left">女性</th>
            <th className="text-left">アクション</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.date}</td>
              <td>{event.males}/{event.maleTotal}</td>
              <td>{event.females}/{event.femaleTotal}</td>
              <td>•••</td>
              {/* "<div class='tooltip-container'>";
                      "<button class='tooltip-button'>•••</button>";
                      "<div class='tooltip-content'>";
                        < class='tooltip-arrow'></div>";
                        "<span class='tooltip-item tooltip-icon show_full_review'><span style='width: 18px; margin-top: 3px;'>".dtd_svg("star-outline", "dash-icon mr-1")."</span> Show full review</span>";
                        $tag == 'published' ? "<span class='tooltip-item tooltip-icon'><span style='width: 18px; margin-top: 3px;'>".dtd_svg("question", "dash-icon mr-1")."</span> Help</span>" : "<span class='tooltip-item tooltip-icon'><span style='width: 18px; margin-top: 3px;'>".dtd_svg("question", "dash-icon mr-1")."</span> Check the status</span>";
                      "</div>";
                    "</div>"; */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingEvents;
