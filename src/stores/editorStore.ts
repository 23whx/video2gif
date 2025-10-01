import { create } from 'zustand';

export interface VideoSettings {
  width: number;
  height: number;
  fps: number;
  quality: number;
  colors: number;
  loop: number; // 0 = infinite, >0 = count
  loopMode: 'forward' | 'reverse' | 'yoyo';
  dither: 'none' | 'floyd-steinberg' | 'ordered';
  brightness: number;
  contrast: number;
  saturation: number;
  startTime: number;
  endTime: number;
}

interface EditorState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  settings: VideoSettings;
  aspectRatioLocked: boolean;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string | null) => void;
  setDuration: (duration: number) => void;
  updateSettings: (settings: Partial<VideoSettings>) => void;
  setAspectRatioLocked: (locked: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultSettings: VideoSettings = {
  width: 480,
  height: 360,
  fps: 15,
  quality: 80,
  colors: 128,
  loop: 0,
  loopMode: 'forward',
  dither: 'floyd-steinberg',
  brightness: 0,
  contrast: 0,
  saturation: 0,
  startTime: 0,
  endTime: 0,
};

export const useEditorStore = create<EditorState>((set) => ({
  videoFile: null,
  videoUrl: null,
  duration: 0,
  settings: defaultSettings,
  aspectRatioLocked: true, // 默认锁定高宽比
  isProcessing: false,
  progress: 0,
  error: null,
  
  setVideoFile: (file) => set({ videoFile: file }),
  setVideoUrl: (url) => set({ videoUrl: url }),
  setDuration: (duration) => set({ duration }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  setAspectRatioLocked: (locked) => set({ aspectRatioLocked: locked }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      videoFile: null,
      videoUrl: null,
      duration: 0,
      settings: defaultSettings,
      aspectRatioLocked: true,
      isProcessing: false,
      progress: 0,
      error: null,
    }),
}));

