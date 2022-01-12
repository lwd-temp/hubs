import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useMicrophone } from "./useMicrophone";
import { AudioToolbarPopoverButton } from "./AudioToolbarPopover";
import { useSpeakers } from "./useSpeakers";
import { useSound } from "./useSound";
import webmSrc from "../../assets/sfx/tone.webm";
import mp3Src from "../../assets/sfx/tone.mp3";
import oggSrc from "../../assets/sfx/tone.ogg";
import wavSrc from "../../assets/sfx/tone.wav";

export function VoiceButtonContainer({ scene }) {
  const buttonRef = useRef();

  const {
    micVolume,
    isMicEnabled,
    permissionStatus,
    micDeviceChanged,
    selectedMicDeviceId,
    micDevices,
    isMicMuted,
    toggleMute
  } = useMicrophone(scene);
  const { speakerDeviceChanged, selectedSpeakersDeviceId, speakerDevices } = useSpeakers(scene);
  const { playSound, soundVolume } = useSound({ scene, webmSrc, mp3Src, oggSrc, wavSrc });

  useEffect(
    () => {
      const rect = buttonRef.current.querySelector("rect");

      if (micVolume < 0.05) {
        rect.setAttribute("height", 0);
      } else if (micVolume < 0.3) {
        rect.setAttribute("y", 8);
        rect.setAttribute("height", 4);
      } else {
        rect.setAttribute("y", 4);
        rect.setAttribute("height", 8);
      }
    },
    [micVolume, isMicMuted]
  );

  return (
    <AudioToolbarPopoverButton
      ref={buttonRef}
      micLevel={micVolume}
      speakerLevel={soundVolume}
      onPlaySound={playSound}
      isMicrophoneEnabled={isMicEnabled}
      isMicrophoneMuted={isMicMuted}
      permissionStatus={permissionStatus}
      selectedMicrophone={selectedMicDeviceId}
      selectedSpeaker={selectedSpeakersDeviceId}
      microphoneOptions={micDevices}
      speakerOptions={speakerDevices}
      onChangeMicrophone={micDeviceChanged}
      onChangeSpeaker={speakerDeviceChanged}
      onChangeMicrophoneMuted={toggleMute}
    />
  );
}

VoiceButtonContainer.propTypes = {
  scene: PropTypes.object.isRequired
};
