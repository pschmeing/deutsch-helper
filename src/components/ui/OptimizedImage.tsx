import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    placeholderSrc?: string;
}

const OptimizedImage = ({
    src,
    alt,
    className,
    placeholderSrc,
    ...props
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(placeholderSrc || "");

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <img
                src={currentSrc}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    !isLoaded ? "blur-lg scale-110" : "blur-0 scale-100"
                )}
                loading="lazy"
                {...props}
            />
            {!isLoaded && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedImage;
