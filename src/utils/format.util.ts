export const formatDurationSong = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const shiftFormatSeconds =
        formattedSeconds.split('.')[0].length === 1
            ? `0${formattedSeconds.split('.')[0]}`
            : formattedSeconds.split('.')[0];
    return `${formattedMinutes}:${shiftFormatSeconds}`;
};
