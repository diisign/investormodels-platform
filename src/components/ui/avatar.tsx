
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface AvatarUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onImageSelected?: (file: File) => void;
  onSaveImage?: () => void;
  loading?: boolean;
  currentImageUrl?: string | null;
  selectedFile?: File | null;
}

const AvatarUpload = React.forwardRef<
  HTMLDivElement, 
  AvatarUploadProps
>(({ className, onImageSelected, onSaveImage, loading = false, currentImageUrl, selectedFile, ...props }, ref) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // Set initial preview if we have a currentImageUrl
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
    
    // Clear preview when component unmounts
    return () => {
      if (previewUrl && previewUrl !== currentImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [currentImageUrl]);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      if (previewUrl && previewUrl !== currentImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      
      if (onImageSelected) {
        onImageSelected(file);
      }
    }
  };
  
  return (
    <div 
      ref={ref} 
      className={cn("relative group", className)}
      {...props}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      
      <Avatar className="h-full w-full">
        {(previewUrl) ? (
          <AvatarImage src={previewUrl} alt="Profile picture" />
        ) : (
          <AvatarFallback>
            <span className="sr-only">Profile picture</span>
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="text-white text-xs font-medium cursor-pointer"
          onClick={handleClick}
          type="button"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white/60 border-t-white rounded-full" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
});
AvatarUpload.displayName = "AvatarUpload";

export { Avatar, AvatarImage, AvatarFallback, AvatarUpload }
