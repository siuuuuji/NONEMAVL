import { useCallback, useRef, useEffect } from 'react';
import audioManager from '../lib/soundEffect';

interface UseSoundEffectsOptions {
  enabled?: boolean;
  volume?: number;
  sceneTransitionSound?: 'fadeIn' | 'fadeOut' | 'transition' | 'click' | 'notification';
}

export function useSoundEffects(options: UseSoundEffectsOptions = {}) {
  const {
    enabled = true,
    volume = 0.3,
    sceneTransitionSound = 'transition'
  } = options;

  const hasResumedRef = useRef(false);

  // 오디오 컨텍스트 초기화 (사용자 상호작용 필요)
  useEffect(() => {
    const resumeAudio = async () => {
      if (!hasResumedRef.current) {
        await audioManager.resume();
        hasResumedRef.current = true;
      }
    };

    const handleUserInteraction = () => {
      resumeAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // 음량 설정
  useEffect(() => {
    if (enabled) {
      audioManager.setVolume(volume);
    }
  }, [enabled, volume]);

  // 장면 전환 사운드 재생
  const playSceneTransition = useCallback(() => {
    if (!enabled) return;

    try {
      switch (sceneTransitionSound) {
        case 'fadeIn':
          audioManager.playFadeIn({ duration: 0.6, volume });
          break;
        case 'fadeOut':
          audioManager.playFadeOut({ duration: 0.6, volume });
          break;
        case 'click':
          audioManager.playClick({ volume });
          break;
        case 'notification':
          audioManager.playNotification({ volume });
          break;
        case 'transition':
        default:
          audioManager.playSceneTransition({ duration: 0.8, volume });
          break;
      }
    } catch (error) {
      console.warn('Sound playback error:', error);
    }
  }, [enabled, sceneTransitionSound, volume]);

  // 버튼 클릭 사운드
  const playClickSound = useCallback(() => {
    if (!enabled) return;
    try {
      audioManager.playClick({ volume });
    } catch (error) {
      console.warn('Click sound error:', error);
    }
  }, [enabled, volume]);

  // 성공 사운드
  const playSuccessSound = useCallback(() => {
    if (!enabled) return;
    try {
      audioManager.playSuccess({ volume });
    } catch (error) {
      console.warn('Success sound error:', error);
    }
  }, [enabled, volume]);

  // 모든 사운드 중지
  const stopAllSounds = useCallback(() => {
    audioManager.stopAll();
  }, []);

  // 오디오 컨텍스트 재개 (필요시 수동으로 호출)
  const resumeAudio = useCallback(async () => {
    await audioManager.resume();
    hasResumedRef.current = true;
  }, []);

  return {
    playSceneTransition,
    playClickSound,
    playSuccessSound,
    stopAllSounds,
    resumeAudio,
    setVolume: (newVolume: number) => audioManager.setVolume(newVolume),
    getVolume: () => audioManager.getVolume(),
    enabled
  };
}
