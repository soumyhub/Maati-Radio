export default function BackgroundVideo() {
  return (
    <video
      className="scene-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/bg/scene-wide.png"
      aria-hidden="true"
    >
      <source src="/bg/maati-radio-bg.mp4" type="video/mp4" />
    </video>
  );
}
