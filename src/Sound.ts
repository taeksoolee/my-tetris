export default class Sound {
  parent!: HTMLElement;
  sounds!: HTMLAudioElement[];
  muted!: boolean;

  constructor(parent: any) {
    this.parent = parent;
    this.sounds = [];
    this.muted = true;
  }

  create(src: string, id: string, loop?: boolean) {
    // const audio = document.createElement('audio') as HTMLAudioElement;
    // audio.src = src;
    
    const audio = new Audio(src);
    audio.id = id;
    audio.muted = true;

    this.sounds.push(audio);
    this.parent.append(audio);

    if (loop) {
      audio.setAttribute('loop', '');
    }

    console.log(audio);
    return audio;
  }

  soundSetting() {
    const soundItems = document.querySelectorAll('.sound-item');
    soundItems.forEach((soundItem) => {
      soundItem.addEventListener('click', (_e: Event) => {
        this.muteToggle();
      });
    });
  }

  muteToggle() {
    const muted = !this.muted;
    const soundSpeaker = document.getElementById('sound-speaker') as HTMLElement;
    const soundDescription = document.getElementById('sound-description') as HTMLElement;

    this.sounds.forEach((sound) => {
      sound.muted = muted;
    });

    soundSpeaker.innerHTML = muted ? "\u{1F507}" : "\u{1F509}";
    soundDescription.innerHTML = muted ? "off" : "on";
    this.muted = muted;
  }

  pause() {
    this.sounds.forEach((sound) => {
      sound.pause();
    });
  }

  play() {
    this.sounds.forEach((sound) => {
      sound.play();
    });
  }
}