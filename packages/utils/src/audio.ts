/**
 * Barista ASMR Synthesizer Engine
 * Uses Web Audio API to create authentic coffee shop ambience (warm low brown noise + gentle water drip)
 * Zero external audio file download, 0 bytes footprint!
 */

class BaristaAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private dripInterval: any = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  // Generates warm, calming brown noise resembling coffee shop lounge ambiance
  private createBrownNoise(ctx: AudioContext): AudioNode {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 1.5; // Gain boost
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm low frequencies (lo-fi coffee room resonance)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    whiteNoise.connect(filter);
    whiteNoise.start(0);
    return filter;
  }

  // Gentle periodic phin coffee drip sound
  private triggerPhinDrip() {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const dripGain = this.ctx.createGain();

      osc.type = "sine";
      const startFreq = 1200 + Math.random() * 300;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.12);

      dripGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      dripGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(dripGain);
      dripGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // AudioContext state edge case
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.isPlaying = true;

      // Start ambient resonance
      const ambientNode = this.createBrownNoise(this.ctx);
      ambientNode.connect(this.masterGain);
      this.noiseNode = ambientNode;

      // Smooth fade-in
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);

      // Random coffee drip drops
      this.dripInterval = setInterval(() => {
        if (Math.random() > 0.4) {
          this.triggerPhinDrip();
        }
      }, 2200);
    }
  }

  public pause() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    this.isPlaying = false;
    if (this.dripInterval) {
      clearInterval(this.dripInterval);
      this.dripInterval = null;
    }

    // Smooth fade-out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

    setTimeout(() => {
      if (!this.isPlaying && this.ctx) {
        this.ctx.suspend();
      }
    }, 850);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getState(): boolean {
    return this.isPlaying;
  }
}

export const baristaAudio = new BaristaAudioManager();
