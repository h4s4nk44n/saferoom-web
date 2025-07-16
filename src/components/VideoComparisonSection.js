import React, { useRef, useEffect } from 'react';

const VideoComparisonSection = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const videoBeforeRef = useRef(null);
  const videoAfterRef = useRef(null);
  const animationFrameId = useRef(null); // Ref for the animation frame

  // Video synchronization and autoplay logic
  useEffect(() => {
    const videoBefore = videoBeforeRef.current;
    const videoAfter = videoAfterRef.current;

    if (!videoBefore || !videoAfter) return;

    const syncLoop = () => {
      if (videoBefore && videoAfter) {
        if (Math.abs(videoBefore.currentTime - videoAfter.currentTime) > 0.05) {
          videoAfter.currentTime = videoBefore.currentTime;
        }
        animationFrameId.current = requestAnimationFrame(syncLoop);
      }
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
    };

    const onMasterPlay = () => {
      if (videoAfter.paused) {
        videoAfter.play().catch(e => console.error("Follower video failed to play.", e));
      }
      startSync();
    };

    const onMasterPauseOrEnd = () => {
      if (!videoAfter.paused) {
        videoAfter.pause();
      }
      stopSync();
    };
    
    const attemptAutoplay = () => {
      videoBefore.play().catch(e => {
        console.warn("Video autoplay was prevented. This can happen in Low Power Mode.", e);
      });
    };

    // We designate one video as the "master" and sync the other to it.
    videoBefore.addEventListener('play', onMasterPlay);
    videoBefore.addEventListener('pause', onMasterPauseOrEnd);
    videoBefore.addEventListener('ended', onMasterPauseOrEnd);

    attemptAutoplay();

    return () => {
      // Cleanup listeners and animation frame
      videoBefore.removeEventListener('play', onMasterPlay);
      videoBefore.removeEventListener('pause', onMasterPauseOrEnd);
      videoBefore.removeEventListener('ended', onMasterPauseOrEnd);
      stopSync();
    };
  }, []);

  // Slider drag logic
  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    const videoBeforeWrapper = container.querySelector('.video-before');
    let isDragging = false;

    if (!slider || !container || !videoBeforeWrapper) return;

    const getPosition = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      return Math.max(0, Math.min(x, rect.width));
    };

    const moveSlider = (x) => {
      slider.style.left = `${x}px`;
      videoBeforeWrapper.style.clipPath = `inset(0 ${container.getBoundingClientRect().width - x}px 0 0)`;
    };

    const startDrag = (e) => {
      e.preventDefault();
      isDragging = true;
      slider.classList.add('is-dragging');
    };

    const endDrag = () => {
      isDragging = false;
      slider.classList.remove('is-dragging');
    };

    const onDrag = (e) => {
      if (isDragging) {
        const newX = getPosition(e);
        moveSlider(newX);
      }
    };
    
    // Set initial position
    const initialX = container.getBoundingClientRect().width / 2;
    moveSlider(initialX);

    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', onDrag);

    slider.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });

    return () => {
      slider.removeEventListener('mousedown', startDrag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('mousemove', onDrag);
      
      slider.removeEventListener('touchstart', startDrag);
      document.removeEventListener('touchend', endDrag);
      document.removeEventListener('touchmove', onDrag);
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
          <video 
            ref={videoBeforeRef} 
            src={process.env.PUBLIC_URL + '/videos/144p.mp4'} 
            poster={process.env.PUBLIC_URL + '/images/saferoom_logo2.png'}
            loop 
            muted 
            playsInline
            autoPlay
          />
          <div className="video-label">Standard 144p</div>
        </div>
        <div className="video-wrapper video-after">
          <video 
            ref={videoAfterRef} 
            src={process.env.PUBLIC_URL + '/videos/720p.mp4'} 
            poster={process.env.PUBLIC_URL + '/images/saferoom_logo2.png'}
            loop 
            muted 
            playsInline
            autoPlay
          />
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