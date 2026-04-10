import { createSlice } from "@reduxjs/toolkit";

const ALLOWED_PLAYBACK_RATES = [0.5, 0.75, 1.0, 1.25, 1.5];
const REPEAT_MODES = ["none", "one", "all"];

const initialState = {
  isPlaying: false,
  currentTime: 0,
  maxTime: 180,
  volume: 50,
  isMuted: false,
  previousVolume: 50,
  playbackRate: 1.0,
  repeatMode: "none",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playPause(state) {
      state.isPlaying = !state.isPlaying;
    },

    setTime(state, action) {
      const time = action.payload;
      if (time < 0) {
        state.currentTime = 0;
      } else if (time > state.maxTime) {
        state.currentTime = state.maxTime;
      } else {
        state.currentTime = time;
      }
    },

    changeVolume(state, action) {
      let newVolume = action.payload;
      if (newVolume < 0) newVolume = 0;
      if (newVolume > 100) newVolume = 100;

      state.volume = newVolume;

      if (newVolume === 0) {
        state.isMuted = true;
      } else if (state.isMuted) {
        state.isMuted = false;
      }
    },

    toggleMute(state) {
      if (!state.isMuted) {
        state.previousVolume = state.volume;
        state.volume = 0;
        state.isMuted = true;
      } else {
        state.volume = state.previousVolume;
        state.isMuted = false;
      }
    },

    nextRepeatMode(state) {
      const currentIndex = REPEAT_MODES.indexOf(state.repeatMode);
      state.repeatMode = REPEAT_MODES[(currentIndex + 1) % REPEAT_MODES.length];
    },

    setPlaybackRate(state, action) {
      if (ALLOWED_PLAYBACK_RATES.includes(action.payload)) {
        state.playbackRate = action.payload;
      }
    },

    seekForward(state, action) {
      const seconds = Math.max(0, action.payload);
      state.currentTime = Math.min(state.currentTime + seconds, state.maxTime);
    },

    seekBackward(state, action) {
      const seconds = Math.max(0, action.payload);
      state.currentTime = Math.max(state.currentTime - seconds, 0);
    },
  },
});

export const {
  playPause,
  setTime,
  changeVolume,
  toggleMute,
  nextRepeatMode,
  setPlaybackRate,
  seekForward,
  seekBackward,
} = playerSlice.actions;

export default playerSlice.reducer;
