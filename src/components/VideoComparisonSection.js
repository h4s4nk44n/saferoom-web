import React, { useRef, useEffect, useState } from 'react';

const VideoComparisonSection = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const videoBeforeRef = useRef(null); // Ref for the 'before' video
  const videoAfterRef = useRef(null); // Ref for the 'after' video (the leader)
  const animationFrameId = useRef(null); // Ref to store the animation frame ID
  const [beforeVideoReady, setBeforeVideoReady] = useState(false);
  const [afterVideoReady, setAfterVideoReady] = useState(false);

  // This effect will run when the ready state of either video changes.
  useEffect(() => {
    const videoBefore = videoBeforeRef.current;
    const videoAfter = videoAfterRef.current;

    // When both videos are ready to play through, play them.
    if (beforeVideoReady && afterVideoReady) {
      // Using Promise.all to play both videos.
      // This is helpful for catching potential errors if one fails to play.
      Promise.all([videoBefore.play(), videoAfter.play()]).catch(error => {
        console.error("Error attempting to play videos simultaneously:", error);
      });
    }
  }, [beforeVideoReady, afterVideoReady]);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    const videoBefore = videoBeforeRef.current;
    const videoAfter = videoAfterRef.current;
    let isDragging = false;

    // --- More Robust Video Sync Logic using requestAnimationFrame ---
    const syncWithMasterVideo = () => {
      if (!videoBefore || !videoAfter) return;

      // Sync current time - this is the core of the sync
      // A small tolerance helps prevent stuttering on minor discrepancies
      if (Math.abs(videoBefore.currentTime - videoAfter.currentTime) > 0.1) {
        videoBefore.currentTime = videoAfter.currentTime;
      }

      // Sync playback state
      if (videoAfter.paused && !videoBefore.paused) {
        videoBefore.pause();
      } else if (!videoAfter.paused && videoBefore.paused) {
        // Attempt to play the follower video if the leader is playing
        videoBefore.play().catch(error => console.error("Follower video play failed:", error));
      }
    };
    
    const syncLoop = () => {
      syncWithMasterVideo();
      animationFrameId.current = requestAnimationFrame(syncLoop);
    };

    const startSync = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(syncLoop);
    };

    const stopSync = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Run a final sync to ensure they are aligned when paused
      syncWithMasterVideo();
    };

    if (videoAfter) {
      // Start/stop the sync loop based on the master video's state
      // 'playing' is often more reliable than 'play' for starting sync
      videoAfter.addEventListener('playing', startSync);
      videoAfter.addEventListener('play', startSync);
      videoAfter.addEventListener('pause', stopSync);
      videoAfter.addEventListener('ended', stopSync);

      // Initial sync check in case videos auto-play at slightly different times
      startSync();
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
        videoAfter.removeEventListener('playing', startSync);
        videoAfter.removeEventListener('play', startSync);
        videoAfter.removeEventListener('pause', stopSync);
        videoAfter.removeEventListener('ended', stopSync);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
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
                <video ref={videoBeforeRef} src="/videos/144p.mp4" loop muted playsInline onCanPlayThrough={() => setBeforeVideoReady(true)} />
                <div className="video-label">Standart 144p</div>
            </div>
            <div className="video-wrapper video-after">
                {/* Use the 144p video the user specified */}
                <video ref={videoAfterRef} src="/videos/720p.mp4" loop muted playsInline onCanPlayThrough={() => setAfterVideoReady(true)} />
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