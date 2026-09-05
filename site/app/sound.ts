/** Play the supplied recording from the beginning after a user gesture. */
export function playApplause(): () => void {
  const audio = new Audio('./applause.mp3');
  audio.volume = 1;
  void audio.play().catch(() => { /* Keep the invitation usable if playback is blocked. */ });
  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}
