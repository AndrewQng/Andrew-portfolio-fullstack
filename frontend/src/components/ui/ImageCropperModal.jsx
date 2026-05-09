import { useState, useRef, useEffect } from 'react';

const ImageCropperModal = ({ isOpen, imageSrc, onCrop, onClose }) => {
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // Reset states when open
    useEffect(() => {
        if (isOpen) {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
        }
    }, [isOpen, imageSrc]);

    if (!isOpen) return null;

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        if (e.touches.length !== 1) return;
        setIsDragging(true);
        setDragStart({
            x: e.touches[0].clientX - offset.x,
            y: e.touches[0].clientY - offset.y
        });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        setOffset({
            x: e.touches[0].clientX - dragStart.x,
            y: e.touches[0].clientY - dragStart.y
        });
    };

    const handleCrop = () => {
        const image = imageRef.current;
        const container = containerRef.current;
        if (!image || !container) return;

        // Size of cropped output (high quality)
        const cropSize = 300;
        const canvas = document.createElement('canvas');
        canvas.width = cropSize;
        canvas.height = cropSize;
        const ctx = canvas.getContext('2d');

        // Viewport size inside container is 240x240
        const viewportSize = 240;
        const viewportOffset = (320 - viewportSize) / 2; // 40px

        // Get actual dimensions of the displayed image inside container
        const imgRect = image.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate scale factor between display image and natural image
        const scaleX = image.naturalWidth / imgRect.width;
        const scaleY = image.naturalHeight / imgRect.height;

        // Bounding position of viewport relative to the image
        const viewportLeftInImage = (containerRect.left + viewportOffset) - imgRect.left;
        const viewportTopInImage = (containerRect.top + viewportOffset) - imgRect.top;

        // Map viewport dimensions to natural image dimensions
        const sx = viewportLeftInImage * scaleX;
        const sy = viewportTopInImage * scaleY;
        const sWidth = viewportSize * scaleX;
        const sHeight = viewportSize * scaleY;

        ctx.drawImage(
            image,
            sx, sy, sWidth, sHeight,     // source coord
            0, 0, cropSize, cropSize     // dest coord
        );

        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        onCrop(base64);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Cắt ảnh đại diện</h3>
                    <p className="text-xs text-gray-400">Kéo để di chuyển và trượt để thu phóng ảnh đại diện của bạn.</p>
                </div>

                {/* Cropping Viewport Container */}
                <div 
                    ref={containerRef}
                    className="w-[320px] h-[320px] mx-auto bg-black rounded-2xl relative overflow-hidden cursor-move select-none touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                >
                    {/* The Image */}
                    <img
                        ref={imageRef}
                        src={imageSrc}
                        alt="To Crop"
                        draggable={false}
                        className="absolute max-w-none origin-center"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                        }}
                    />

                    {/* Spotlight mask layer */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-blue-500 rounded-2xl shadow-[0_0_0_9999px_rgba(15,23,42,0.75)]">
                        {/* Circle highlight */}
                        <div className="absolute top-[40px] left-[40px] w-[240px] h-[240px] rounded-full border-2 border-white/80 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                </div>

                {/* Zoom Controller */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Thu nhỏ</span>
                        <span>Phóng to</span>
                    </div>
                    <input 
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-2">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-all duration-200"
                    >
                        Hủy
                    </button>
                    <button 
                        onClick={handleCrop}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200"
                    >
                        Cắt & Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropperModal;
