/** Locally synthesized stereo audience: irregular handclaps and room reflections. */
export function playApplause(): () => void {
  const context = new AudioContext();
  void context.resume().catch(() => {});
  const duration = 5.8;
  const buffer = context.createBuffer(2, Math.ceil(context.sampleRate * duration), context.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const samples = buffer.getChannelData(channel);
    for (let person = 0; person < 34; person++) {
      const interval = 0.19 + Math.random() * 0.19;
      for (let t = Math.random() * 0.65; t < duration - 0.4; t += interval * (0.8 + Math.random() * 0.4)) {
        const start = Math.floor(t * context.sampleRate);
        const gain = (0.024 + Math.random() * 0.035) * Math.min(1, t * 3 + 0.2) * Math.min(1, (duration - t) / 2);
        const length = Math.floor(context.sampleRate * (0.025 + Math.random() * 0.025));
        let previous = 0;
        for (let i = 0; i < length && start + i < samples.length; i++) {
          const noise = Math.random() * 2 - 1;
          const clap = (noise - previous * 0.65) * Math.exp(-i / (length / 6)) * gain;
          previous = noise;
          samples[start + i] += clap;
          for (const [delay, level] of [[0.037, 0.35], [0.083, 0.19], [0.139, 0.1]]) {
            const reflected = start + i + Math.floor(delay * context.sampleRate);
            if (reflected < samples.length) samples[reflected] += clap * level;
          }
        }
      }
    }
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  const gain = context.createGain();
  gain.gain.value = 0.8;
  source.connect(gain).connect(context.destination);
  source.onended = () => { void context.close().catch(() => {}); };
  source.start();
  return () => { try { source.stop(); } catch { /* Already stopped. */ } };
}
