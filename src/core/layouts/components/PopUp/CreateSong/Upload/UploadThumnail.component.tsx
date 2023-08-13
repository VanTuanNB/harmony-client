import { usePostThumnailMutation, useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { UploadIcon } from '@/shared/components/Svg/index.component';
import classNames from 'classnames/bind';
import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import style from './Upload.module.scss';

const cx = classNames.bind(style);

interface UploadThumnailComponentProps {
    handleUploadThumnail: any;
    label: string;
    uploadId: string;
}

const UploadThumnailComponent: FC<UploadThumnailComponentProps> = ({ handleUploadThumnail, label, uploadId }) => {
    const [uploadThumnail] = useUploadThumnailMutation();
    const [error, setError] = useState<string | ''>('');
    const [fileThumnail, setFileThumnail] = useState<File | null>(null);
    const [postThumnail, { data }] = usePostThumnailMutation();

    useEffect(() => {
        if (data && uploadId) {
            const privateUrl = data.data.privateUrl;
            if (fileThumnail) uploadThumnail({ privateUrl, file: fileThumnail });
            const response = {
                status: data.status,
                success: data.success,
                message: data.message,
            };
            handleUploadThumnail(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, fileThumnail, uploadId]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileAnh = event.target.files[0];
            const context = fileAnh.type;
            const result = context.split('/')[1];
            if (fileAnh.size > 10 * 1024 * 1024) {
                setError('Kích thước tệp vượt quá giới hạn 10MB');
            } else if (!fileAnh.type.startsWith('image/')) {
                setError('Tệp không phải là hình ảnh');
            } else {
                setFileThumnail(fileAnh);
                setError('');
                postThumnail({ uploadId: uploadId, contentType: result });
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
                        <label className={cx('chon')} htmlFor="file">
                            Chọn tệp
                        </label>
                        <input type="file" id="file" onChange={onChange} />
                    </div>

                    {error && <p>{error}</p>}
                </div>
                <p>
                    Bằng cách tiếp tục, bạn đồng ý cấp cho Harmony quyền truy cập vào hình ảnh bạn chọn tải lên. Hãy
                    chắc chắn rằng bạn có quyền tải lên hình ảnh.
                </p>
            </form>
        </>
    );
};

export default memo(UploadThumnailComponent);
