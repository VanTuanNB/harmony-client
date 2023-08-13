import { usePostSongMutation, useUploadAudioMutation } from '@/core/redux/services/s3.service';
import { UploadIcon } from '@/shared/components/Svg/index.component';
import classNames from 'classnames/bind';
import { FC, memo, useEffect, useState } from 'react';
import style from './Upload.module.scss';
const cx = classNames.bind(style);

interface UploadSongComponentProps {
    handleUploadSong: any;
    label: string;
}
const UploadSongComponent: FC<UploadSongComponentProps> = ({ handleUploadSong, label }) => {
    const [error, setError] = useState<string | ''>('');
    const [fileSong, setFileSong] = useState<File | null>(null);
    const [uploadAudio] = useUploadAudioMutation();
    const [postSong, { data }] = usePostSongMutation();

    useEffect(() => {
        if (data) {
            const privateUrl = data.data.privateUrl;
            if (fileSong) uploadAudio({ privateUrl, file: fileSong });
            const response = {
                status: data.status,
                success: data.success,
                message: data.message,
                data: data.data,
            };

            handleUploadSong(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.size > 10 * 1024 * 1024) {
                setError('Kích thước tệp vượt quá giới hạn 10MB');
            } else if (!file.type.startsWith('audio/')) {
                setError('Tệp không phải là tệp âm thanh');
            } else {
                setFileSong(file);
                setError('');
                postSong();
            }
        }
    };
    return (
        <>
            <h2 className={cx('title')}>{label}</h2>
            <form className={cx('upload')}>
                <div className={cx('zone')}>
                    <label htmlFor="file">
                        <div className={cx('zone-icon')}>
                            <UploadIcon className={cx('icon')} />
                        </div>
                    </label>
                    <div className={cx('selectFile')}>
                        <label htmlFor="file" className={cx('chon')}>
                            Chọn tệp
                        </label>
                        <input type="file" id="file" onChange={handleUpload} />
                    </div>
                    {error && <p>{error}</p>}
                </div>
                <p>
                    Bằng cách tải bài hát lên, bạn đồng ý cấp cho Harmony quyền truy cập vào bài hát bạn chọn tải lên.
                    Hãy chắc chắn rằng bạn có quyền tải lên bài hát.
                </p>
            </form>
        </>
    );
};

export default memo(UploadSongComponent);
