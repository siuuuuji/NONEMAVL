import { useState, useCallback } from 'react';
import imageGenerator from '../utils/imageGenerator';
import type { Scene } from '../types';

interface UseImageGenerationResult {
  isGenerating: boolean;
  generatedImages: Map<string, string>;
  generateImagesForScenes: (scenes: Scene[]) => Promise<Scene[]>;
  error: string | null;
}

export function useImageGeneration(): UseImageGenerationResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const generateImagesForScenes = useCallback(
    async (scenes: Scene[]): Promise<Scene[]> => {
      setIsGenerating(true);
      setError(null);

      try {
        const imageMap = await imageGenerator.generateImagesBatch(
          scenes.map(scene => ({
            id: scene.id,
            text: scene.text
          }))
        );

        setGeneratedImages(imageMap);

        const scenesWithImages = scenes.map(scene => ({
          ...scene,
          imageUrl: imageMap.get(scene.id)
        }));

        return scenesWithImages;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '이미지 생성 중 오류가 발생했습니다.';
        setError(errorMessage);
        console.error('Image generation error:', err);

        return scenes;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    isGenerating,
    generatedImages,
    generateImagesForScenes,
    error
  };
}
