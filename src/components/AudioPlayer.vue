<script>
import { Howl, Howler } from 'howler';

export default {
  name: 'AudioPlayer',

  props: {
    playlist: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      default: 'primary',
    },
    itemIndex: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      sounds: [],
      playing: false,
      totalSeconds: 100,
      currentSeconds: 0,
      currentIndex: 0,
      soundLoading: false,
      playerId: '',
    };
  },

  computed: {
    // ...mapGetters('device', [
    //   'isIOS',
    // ]),

    disabled() {
      const { playlist } = this;
      return playlist.length < 1 || !playlist[0][0];
    },

    sound() {
      const { sounds, currentIndex } = this;
      return sounds[currentIndex] || {};
    },
  },

  watch: {
    playlist: {
      handler() {
        this.reset();
        this.setPlayerId();
        this.setSounds();
      },
    },
  },

  mounted() {
    Howler.autoUnlock = false;
    this.setPlayerId();
    this.setSounds();
  },

  created() {
    const { playOrPause, $root } = this;
    $root.$on('playOrPauseAudio', playOrPause);
  },

  beforeDestroy() {
    this.reset();
    Howler.unload();
  },

  methods: {
    setPlayerId() {
      const { playlist, disabled } = this;
      const firstUrl = disabled ? '' : playlist[0][0] || '';
      this.playerId = firstUrl.split('-').pop();
    },

    setSounds() {
      const { playlist, disabled } = this;
      // const { playlist, isIOS, disabled } = this;
      const sounds = [];

      if (disabled) {
        return;
      }

      playlist.forEach(source => {
        const sound = new Howl({
          src: source,
          // html5: !isIOS,
          html5: false,
          // preload: false, // Added to make cache work
          onload: () => {
            this.endLoadingTimer();
          },
          onloaderror: (id, error) => {
            console.log('Error loading audio', error);
          },
          onplay: () => {
            this.onPlay();
          },
          onpause: () => {
            this.onPause();
          },
          onend: () => {
            this.skipToNext();
          },
          onplayerror: (id, error) => {
            console.log('Error playing audio', error);
            // this.$store.dispatch('ui/showSnack', 'Error playing audio');
            this.sound.once('unlock', () => {
              this.play();
            });
          },
        });
        sounds.push(sound);
      });
      this.sounds = sounds;
    },

    playOrPause() {
      const { disabled, playing, sound, reset } = this;
      // if (disabled) {
      // this.$store.dispatch('ui/showSnack', 'Audio not available');
      // return;
      // }
      if (playing) {
        // sound.pause();
        reset();
      } else {
        // sound.load(); // Added to make cache work
        sound.play();
        this.startLoadingTimer();
      }
      this.$root.$emit('playingIndex', this.itemIndex);
    },

    onPlay() {
      this.playing = true;
      this.startTimer();
      this.endLoadingTimer();
    },

    onPause() {
      this.playing = false;
      this.clearTimer();
    },

    startTimer() {
      this.totalSeconds = this.sound.duration();
      this.currentSeconds = this.sound.seek();
      window[`progressInterval${this.playerId}`] = setInterval(() => {
        this.currentSeconds += 1;
      }, 1000);
    },

    clearTimer() {
      clearInterval(window[`progressInterval${this.playerId}`]);
    },

    startLoadingTimer() {
      const { sound } = this;
      if (sound.state() === 'loaded') {
        return;
      }

      this.soundLoading = true;
      this.totalSeconds = 100;
      this.currentSeconds = 0;
      window[`loadingInterval${this.playerId}`] = setInterval(() => {
        if (this.soundLoading) {
          this.currentSeconds += 100;
        } else {
          this.endLoadingTimer();
        }
      }, 1000);
    },

    endLoadingTimer() {
      this.soundLoading = false;
      clearInterval(window[`loadingInterval${this.playerId}`]);
    },

    skipToNext() {
      const { playlist, currentIndex, clearTimer, reset } = this;
      if (currentIndex < playlist.length - 1) {
        clearTimer();
        this.currentIndex += 1;
        this.sound.play();
        this.startLoadingTimer();
      } else {
        reset();
      }
    },

    reset() {
      const { sound, clearTimer, endLoadingTimer } = this;

      if ('stop' in sound) {
        sound.stop();
      }
      clearTimer();
      endLoadingTimer();
      this.playing = false;
      this.totalSeconds = 100;
      this.currentSeconds = 0;
      this.currentIndex = 0;
    },
  },
};
</script>

<template>
  <v-btn
    text
    icon
    x-large
    :color="color"
    min-width="52"
    max-width="52"
    :disabled="disabled"
    @click.prevent.stop="playOrPause"
  >
    <v-icon v-if="playing" key="stop" x-large class="material-icons-round">stop</v-icon>
    <v-icon v-else-if="!soundLoading" key="play" x-large class="material-icons-round">play_arrow</v-icon>
  </v-btn>
</template>

<style lang="scss" scoped>
// .spin-enter-active,
// .spin-leave-active {
//   transform-origin: 50% 50%;
//   transition: transform 0.5s, opacity 0.3s;
// }
// .spin-enter,
// .spin-leave-to {
//   opacity: 0;
//   transform-origin: 50% 50%;
// }

// .spin-enter {
//   transform: rotate(90deg);
// }

// .spin-leave-to {
//   transform: rotate(-90deg);
// }
</style>
