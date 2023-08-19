import { EDateFormat } from '@/core/common/constants/common.constant';

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

export const formatDate = (input: string, type?: EDateFormat): string => {
    if (!input) return '';
    if (!type) type = EDateFormat.DD_MM_YYYY;
    const date = new Date(input);
    switch (type) {
        case EDateFormat.YYYY_MM_DD:
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        default:
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
};
