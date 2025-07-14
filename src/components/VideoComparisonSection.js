import React, { useRef, useEffect } from 'react';

const VideoComparisonSection = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const videoBeforeRef = useRef(null); // Ref for the 'before' video
  const videoAfterRef = useRef(null); // Ref for the 'after' video (the leader)

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    const videoBefore = videoBeforeRef.current;
    const videoAfter = videoAfterRef.current;
    let isDragging = false;

    // --- Video Sync Logic ---
    const syncVideos = () => {
      if (videoBefore && videoAfter) {
        // Sync current time
        if (Math.abs(videoBefore.currentTime - videoAfter.currentTime) > 0.1) {
          videoBefore.currentTime = videoAfter.currentTime;
        }
        // Sync play/pause state
        if (videoAfter.paused) {
          videoBefore.pause();
        } else {
          videoBefore.play();
        }
      }
    };

    if (videoAfter) {
      videoAfter.addEventListener('timeupdate', syncVideos);
      videoAfter.addEventListener('play', syncVideos);
      videoAfter.addEventListener('pause', syncVideos);
    }
    // --- End Video Sync Logic ---

    const dragStart = (e) => {
      isDragging = true;
      slider.classList.add('is-dragging');
      // Prevent text selection while dragging
      e.preventDefault();
    };

    const dragEnd = () => {
      isDragging = false;
      slider.classList.remove('is-dragging');
    };

    const dragMove = (e) => {
      if (!isDragging) return;

      const rect = container.getBoundingClientRect();
      // Use clientX for mouse events, and touches[0].clientX for touch events
      const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      
      // Clamp the value between 0 and container width
      let newX = Math.max(0, Math.min(x, rect.width));
      
      slider.style.left = `${newX}px`;

      // Clip the 'before' video
      container.querySelector('.video-before').style.clipPath = `inset(0 ${rect.width - newX}px 0 0)`;
    };

    // Mouse events
    slider.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    container.addEventListener('mousemove', dragMove);

    // Touch events
    slider.addEventListener('touchstart', dragStart);
    document.addEventListener('touchend', dragEnd);
    container.addEventListener('touchmove', dragMove);

    return () => {
      slider.removeEventListener('mousedown', dragStart);
      document.removeEventListener('mouseup', dragEnd);
      container.removeEventListener('mousemove', dragMove);

      slider.removeEventListener('touchstart', dragStart);
      document.removeEventListener('touchend', dragEnd);
      container.removeEventListener('touchmove', dragMove);
      
      // --- Cleanup Sync Logic ---
      if (videoAfter) {
        videoAfter.removeEventListener('timeupdate', syncVideos);
        videoAfter.removeEventListener('play', syncVideos);
        videoAfter.removeEventListener('pause', syncVideos);
      }
      // --- End Cleanup ---
    };
  }, []);

  return (
    <section className="video-comparison-section" id="comparison">
        <div className="section-inner-full">
            <h2 className="section-title-full">Experience the Difference</h2>
            <p className="section-intro-full">
              Witness our AI SuperResolution transform a low-bandwidth 144p video feed into a crisp 720p stream in real time.
              <br/>
              Drag the slider to see the result.
            </p>
        </div>
        <div className="video-comparison-container" ref={containerRef}>
            <div className="video-wrapper video-before">
                {/* Use a placeholder for the high-quality video */}
                <video ref={videoBeforeRef} src="/videos/144p.mp4" autoPlay loop muted playsInline />
                <div className="video-label">Standart 144p</div>
            </div>
            <div className="video-wrapper video-after">
                {/* Use the 144p video the user specified */}
                <video ref={videoAfterRef} src="/videos/720p.mp4" autoPlay loop muted playsInline />
                <div className="video-label">AI SuperResolution Enhanced 720p</div>
            </div>
            <div className="comparison-slider" ref={sliderRef}>
                <div className="slider-handle" />
            </div>
        </div>
    </section>
  );
};

export default VideoComparisonSection; 