import React, { useState, useRef } from 'react';
import { Upload, X, Image, Camera } from 'lucide-react';

interface SceneFinderUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  error: string | null;
}

const SceneFinderUpload: React.FC<SceneFinderUploadProps> = ({ 
  onUpload, 
  isUploading,
  error
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setSelectedFile(file);
    
    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const file = e.dataTransfer.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    setSelectedFile(file);
    
    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-netflix-dark rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Camera className="text-netflix-red h-6 w-6 mr-2" />
            <h2 className="text-white text-2xl font-bold">Scene Finder</h2>
          </div>
          
          <p className="text-white/80 text-sm mb-6">
            Upload a screenshot from any show or movie, and we'll find the exact scene for you. 
            Want to rewatch that epic moment? Just upload it and we'll tell you where to find it.
          </p>
          
          {/* Upload Area */}
          {!selectedFile ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-netflix-red bg-netflix-red/10' 
                  : 'border-gray-600 hover:border-gray-400'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center mb-4">
                <Image className="h-8 w-8 text-white/70" />
              </div>
              
              <h3 className="text-white text-lg font-semibold mb-2">
                Drag & drop a screenshot here
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                Or click to browse files (JPEG, PNG, or WebP)
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                data-testid="file-input"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-netflix-red hover:bg-red-700 text-white py-2 px-6 rounded-md transition"
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Choose File
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="Screenshot preview" 
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                )}
                
                <button 
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-1 bg-black/70 rounded-full text-white hover:bg-black transition"
                  aria-label="Remove screenshot"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className={`${
                    isUploading 
                      ? 'bg-gray-800 cursor-not-allowed' 
                      : 'bg-netflix-red hover:bg-red-700'
                  } text-white py-3 px-6 rounded flex items-center justify-center flex-1 transition`}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>Find This Scene</>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  disabled={isUploading}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded transition md:flex-initial"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-500 text-sm bg-red-900/20 p-3 rounded">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}
        </div>
        
        {/* Information Section */}
        <div className="bg-black/20 border-t border-gray-800 p-6">
          <h3 className="text-white text-lg font-semibold mb-3">How it works:</h3>
          <ul className="text-gray-300 text-sm space-y-3">
            <li className="flex items-start">
              <span className="bg-netflix-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>Upload a screenshot from any Netflix show or movie</span>
            </li>
            <li className="flex items-start">
              <span className="bg-netflix-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Our AI analyzes the image to match it to our content library</span>
            </li>
            <li className="flex items-start">
              <span className="bg-netflix-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>We identify the exact show/movie and timestamp of the scene</span>
            </li>
            <li className="flex items-start">
              <span className="bg-netflix-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
              <span>Click "Watch This Scene" to jump directly to that moment</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SceneFinderUpload;