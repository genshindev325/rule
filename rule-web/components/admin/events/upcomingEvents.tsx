// components/admin/events/upcomingEvents.tsx

'use client';

import React from 'react';

const events = [
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  {
    name: 'Town dating, matchmaking, drinking party events',
    date: 'September 20, 2023 17:00',
    male: '15/20 people',
    female: '12/20 people'
  },
  // Add more events as needed
];

const UpcomingEvents = () => {
  return (
    <div className="p-10 bg-white shadow-md rounded-md g-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">イベント名</th>
            <th className="text-left">日時</th>
            <th className="text-left">男</th>
            <th className="text-left">女</th>
            <th className="text-left">action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.male}</td>
              <td>{event.female}</td>
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
