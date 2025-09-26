"use client";

import { useEffect, useRef, useState } from "react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  VoiceEmotion,
  VoiceChatTransport,
} from "@heygen/streaming-avatar";

interface AvatarProps {
  avatarId: string;
  voiceId: string;
  language: string;
}

export default function Avatar({ avatarId, voiceId, language }: AvatarProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const avatarRef = useRef<StreamingAvatar | null>(null);

  useEffect(() => {
    async function initAvatar() {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Pobranie tokena z API Route
        const tokenRes = await fetch("/api/heygen-token");
        const tokenData = await tokenRes.json();
        const token = tokenData?.data?.token;

        if (!token) {
          throw new Error("Brak tokena z HeyGen – sprawdź .env.local i endpoint /api/heygen-token");
        }

        // 2️⃣ Inicjalizacja StreamingAvatar
        const avatar = new StreamingAvatar({ token });
        avatarRef.current = avatar;

        // 3️⃣ Obsługa eventów
        avatar.on(StreamingEvents.STREAM_READY, () => console.log("✅ Avatar gotowy"));
        avatar.on(StreamingEvents.AVATAR_START_TALKING, () => console.log("🗣️ Avatar mówi"));
        avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => console.log("❌ Avatar rozłączony"));

        // 4️⃣ Utworzenie i start sesji
        await avatar.createStartAvatar({
          avatarName: avatarId,
          voice: { voiceId, rate: 1.0, emotion: VoiceEmotion.EXCITED },
          language,
          quality: AvatarQuality.Low,
          voiceChatTransport: VoiceChatTransport.LIVEKIT,
        });

        // 5️⃣ Start voice chat
        await avatar.startVoiceChat({ isInputAudioMuted: false });

        // 6️⃣ Podpięcie strumienia do <video>
        if (videoRef.current) {
          const stream = avatar.mediaStream;
          if (stream) {
            videoRef.current.srcObject = stream;
          } else {
            console.warn("⚠️ Brak mediaStream w avatarze");
          }
        }
      } catch (err: any) {
        console.error("Błąd inicjalizacji avatara:", err);
        setError(err.message || "Nieznany błąd");
      } finally {
        setLoading(false);
      }
    }

    initAvatar();

    return () => {
      avatarRef.current?.closeVoiceChat();
      avatarRef.current?.stopAvatar();
    };
  }, [avatarId, voiceId, language]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {loading && <p className="text-center text-gray-500">Ładowanie awatara...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <video
        ref={videoRef}
        className="w-full rounded-lg border border-gray-300"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
}
