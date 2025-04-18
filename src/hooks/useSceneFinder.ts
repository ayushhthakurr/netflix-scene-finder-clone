import { useState } from 'react';
import { Scene, Movie } from '../types';
import { movies, scenes } from '../data/mockData';

export const useSceneFinder = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedScene, setMatchedScene] = useState<{ scene: Scene; movie: Movie } | null>(null);

  const uploadScreenshot = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setMatchedScene(null);
    
    try {
      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      
      // Mock successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsUploading(false);
      
      // Start processing
      await processScreenshot(file);
    } catch (err) {
      setIsUploading(false);
      setError(err instanceof Error ? err.message : 'An error occurred while uploading');
    }
  };

  const processScreenshot = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would send the image to a backend service for matching
      // Here we'll simulate the process with a delay and random match
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly select a scene from our mock data
      const randomSceneIndex = Math.floor(Math.random() * scenes.length);
      const randomScene = scenes[randomSceneIndex];
      
      // Find the movie this scene belongs to
      const relatedMovie = movies.find(movie => movie.id === randomScene.movieId);
      
      if (!relatedMovie) {
        throw new Error('Could not find matching movie for this scene');
      }
      
      setMatchedScene({
        scene: randomScene,
        movie: relatedMovie
      });
      
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'An error occurred while matching the screenshot');
    }
  };

  const resetFinder = () => {
    setMatchedScene(null);
    setError(null);
    setIsUploading(false);
    setIsProcessing(false);
  };

  return {
    isUploading,
    isProcessing,
    error,
    matchedScene,
    uploadScreenshot,
    resetFinder
  };
};