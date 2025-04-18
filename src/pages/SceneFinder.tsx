import React from 'react';
import SceneFinderUpload from '../components/sceneFinder/SceneFinderUpload';
import SceneFinderResults from '../components/sceneFinder/SceneFinderResults';
import { useSceneFinder } from '../hooks/useSceneFinder';

const SceneFinder: React.FC = () => {
  const { 
    isUploading,
    isProcessing,
    error,
    matchedScene,
    uploadScreenshot,
    resetFinder
  } = useSceneFinder();
  
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col pt-24 pb-16">
      <div className="container mx-auto px-4">
        {matchedScene ? (
          <SceneFinderResults 
            scene={matchedScene.scene}
            movie={matchedScene.movie}
            onReset={resetFinder}
          />
        ) : (
          <SceneFinderUpload 
            onUpload={uploadScreenshot}
            isUploading={isUploading || isProcessing}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default SceneFinder;