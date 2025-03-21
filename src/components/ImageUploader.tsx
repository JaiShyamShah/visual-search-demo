
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  label?: string;
  initialImage?: string;
}

const ImageUploader = ({ onImageSelect, label = "Upload Image", initialImage }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageSelect(file, previewUrl);
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
            <p className="text-white font-medium mb-2">Click to change image</p>
            <div
              {...getRootProps()}
              className="p-3 bg-white/20 rounded-full backdrop-blur-sm cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="text-white" size={20} />
            </div>
          </div>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`dropzone ${
            isDragActive ? "border-primary/70 bg-primary/10" : ""
          }`}
        >
          <input {...getInputProps()} />
          <ImageIcon size={32} className="text-muted-foreground mb-2" />
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Drag & drop, or click to select
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
