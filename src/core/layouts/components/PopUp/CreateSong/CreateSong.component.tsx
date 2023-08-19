'use client';
import { IResponseServer } from '@/core/common/interfaces/IResponseServer.interface';
import { IUser } from '@/core/common/interfaces/collection.interface';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useCallback, useEffect, useState } from 'react';
import style from './CreateSong.module.scss';
import DetailComponent from './Detail/Detail.component';
import UploadSongComponent from './Upload/UpLoadSong.component';
import UploadThumnailComponent from './Upload/UploadThumnail.component';

const cx = classNames.bind(style);

const label = ['Thêm bài hát', 'Thêm hình ảnh', 'Thêm thông tin'];

interface IState {
    close: () => void;
    setIsUpdated: (value: boolean) => void;
    data: IUser;
}
function CreateSongComponent({ close, setIsUpdated, data }: IState) {
    const [step, setStep] = useState(1);
    const [uploadId, setUploadId] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (uploadId == '') {
            setStep(1);
        }
    }, [uploadId]);

    const uploadSong = useCallback((data: IResponseServer) => {
        if (data.success) {
            setUploadId(data.data.uploadId);
            setStep(2);
        }
    }, []);
    const UploadThumnail = useCallback((data: IResponseServer) => {
        if (data.success) {
            setStep(3);
        }
    }, []);
    const uploadDetail = useCallback((data: IResponseServer) => {
        if (data.success) {
            setSuccess(true);
        }
    }, []);
    if (success) {
        close();
        setIsUpdated(true);
    }

    const handleLabel = label.map((data, index) => {
        return (
            <li key={index} className={cx('step-wizard-item', { 'current-item': index === step - 1 })}>
                <span className={cx('progress-count')}>{index + 1}</span>
                <span className={cx('progress-label')}>{data}</span>
            </li>
        );
    });
    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('btn-top')}>
                            <button onClick={close} className={cx('close')}>
                                <FontAwesomeIcon icon={faClose} fill="#909090" />
                            </button>
                        </div>
                        <section className={cx('step-wizard')}>
                            <ul className={cx('step-wizard-list')}>{handleLabel}</ul>
                        </section>
                        {step === 1 && <UploadSongComponent handleUploadSong={uploadSong} label="Thêm bài hát" />}
                        {step === 2 && (
                            <UploadThumnailComponent
                                handleUploadThumnail={UploadThumnail}
                                label="Thêm hình ảnh"
                                uploadId={uploadId}
                            />
                        )}
                        {step === 3 && (
                            <DetailComponent
                                uploadId={uploadId}
                                handleUploadDetail={uploadDetail}
                                label="Thêm thông tin"
                                user={data}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(CreateSongComponent);
