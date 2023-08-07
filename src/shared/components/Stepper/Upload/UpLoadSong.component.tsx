import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Upload.module.scss';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);

function UploadSongComponent() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('Kích thước tệp vượt quá giới hạn 10MB');
            } else if (!selectedFile.type.startsWith('audio/')) {
                setError('Tệp không phải là tệp âm thanh');
            } else {
                setFile(selectedFile);
                setError(null);
                console.log(selectedFile);
                setSuccess(`Tệp ${selectedFile.name} đã tải lên thành công`);
            }
        }
    };

    return (
        <form className={cx('upload')}>
            <div className={cx('zone')}>
                <FontAwesomeIcon icon={faUpload} className={cx('icon')} />
                <div className={cx('selectFile')}>
                    <label htmlFor="file">Chọn tệp</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </div>
        </form>
    );
}

export default UploadSongComponent;
