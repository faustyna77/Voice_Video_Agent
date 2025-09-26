"use client";

import Avatar from "../components/Avatar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      {/* Wstawienie avatara */}
      <Avatar
        avatarId="Katya_ProfessionalLook_public"
        voiceId="en_us_1"
        language="en"
      />
    </div>
  );
}
