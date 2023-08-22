import { ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { useGetServiceGenreQuery } from '@/core/redux/services/genre.service';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { usePutUpdateSongMutation } from '@/core/redux/services/song.service';
import { useGetServiceUserRoleComposerQuery } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import style from './UpdateSong.module.scss';
const cx = classNames.bind(style);

const customStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        height: '100%',
        width: '100%',
        borderRadius: '5px',
        border: 'none',
        paddingLeft: '10px',
        color: 'var(--theme-mode-color)',
        background: 'var(--theme-filter)',
        marginBottom: '1px',
    }),
};

interface IState {
    dataProfile: IUser;
    songItem: ISong;
    isUpdated: (value: boolean) => void;
}
const validImageExtensions = ['jpg', 'jpeg', 'png'];
function UpdateSong({ dataProfile, isUpdated, songItem }: IState) {
    const [genresReference, setListGenreId] = useState<string[]>([]);
    const [performers, setListPerformers] = useState<string[]>([]);
    const [albumReference, setListAlbumReference] = useState<string[]>([]);
    const [title, setTitle] = useState<string>(songItem.title);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [invalidImageError, setInvalidImageError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail] = useUploadThumnailMutation();
    const [putServiceSong] = usePutUpdateSongMutation();
    const aipGetGenre = useGetServiceGenreQuery();
    const aipGetUserComposer = useGetServiceUserRoleComposerQuery();

    const handleChangePerformers = (selectedOptions: any) => {
        const newInputPerformers = [...performers];

        selectedOptions.forEach((item: any) => {
            if (!newInputPerformers.includes(item.value)) {
                newInputPerformers.push(item.value);
            }
        });
        setListPerformers(newInputPerformers);
    };

    const handleChangeGenre = (selectedOptions: any) => {
        const newInputGenre = [...genresReference];

        selectedOptions.forEach((item: any) => {
            if (!newInputGenre.includes(item.value)) {
                newInputGenre.push(item.value);
            }
        });
        setListGenreId(newInputGenre);
    };

    const handleChangeAlbums = (selectedOptions: any) => {
        const newInputAlbum = [...albumReference];

        selectedOptions.forEach((item: any) => {
            if (!newInputAlbum.includes(item.value)) {
                newInputAlbum.push(item.value);
            }
        });
        setListAlbumReference(newInputAlbum);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
            if (!fileExtension || !validImageExtensions.includes(fileExtension)) {
                setInvalidImageError('File tải lên không phải là hình ảnh');
                setImagePreview(null); 
                return;
            }
            setInvalidImageError(null);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const inputPerformers =
        aipGetUserComposer.data?.data?.map((user) => ({
            label: user.name,
            value: user._id,
        })) ?? [];
    const inputGenre =
        aipGetGenre.data?.data?.map((item) => ({
            label: item.title,
            value: item._id,
        })) ?? [];
    const inputAlbum =
        dataProfile.albumsReference?.map((user) => ({
            label: user.title,
            value: user._id,
        })) ?? [];
    const inputGenreSong = songItem.genresReference.map((item) => ({
        label: item.title,
        value: item._id,
    }));
    const inputPerformerSong = songItem.performers.map((user) => ({
        label: user.name,
        value: user._id,
    }));
    const inputAlbumSong = songItem.albumReference?.map((item) => ({
        label: item.title,
        value: item._id,
    }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        const newPerformers = performers.length > 0 ? performers : inputPerformerSong?.map((item) => item.value);
        const newGenres = genresReference.length > 0 ? genresReference : inputGenreSong?.map((item) => item.value);
        const newAlbum = albumReference.length > 0 ? albumReference : inputAlbumSong?.map((item) => item.value);
        if (file ) {
            const fileExtension = file.name.split('.').pop();
            const newValue = {
                _id: songItem._id,
                title: title,
                genresReference: newGenres,
                albumReference: newAlbum,
                performers: newPerformers,
                contentType: fileExtension,
                isNewUploadAvatar: true,
            };
            putServiceSong(newValue as any).then((data: any) => {
                uploadThumnail({ privateUrl: data.data.data.data.privateUrl, file });
            });
            isUpdated(true);
        } else {
            const newValue = {
                _id: songItem._id,
                title: title,
                file: file,
                genresReference: newGenres,
                albumReference: newAlbum,
                performers: newPerformers,
                isNewUploadAvatar: false,
            };
            putServiceSong(newValue as any);
            isUpdated(true);
        }
    };

    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Cập nhật bài hát</h2>
                            <button onClick={() => isUpdated(true)}>
                                <FontAwesomeIcon icon={faClose} className={cx('close')} />
                            </button>
                        </div>
                        <div className={cx('profile')}>
                            <form className={cx('form')} onSubmit={handleSubmit}>
                                <div className={cx('img-upload')}>
                                    {imagePreview ? (
                                        <Image
                                            className={cx('img')}
                                            src={imagePreview}
                                            width={100}
                                            height={100}
                                            alt=""
                                        />
                                    ) : (
                                        <Image
                                            className={cx('img')}
                                            src={
                                                songItem && songItem.thumbnailUrl
                                                    ? `${songItem.thumbnailUrl}?${new Date().getTime()}`
                                                    : '/images/fallback-thumbnail-user.jpg'
                                            }
                                            width={500}
                                            height={500}
                                            alt=""
                                            loading="lazy"
                                        />
                                    )}

                                    <label htmlFor="file" className={cx('title-upload')}>
                                        Thêm ảnh
                                    </label>
                                    {invalidImageError && <div className={cx('error-message')}>{invalidImageError}</div>}

                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Nhập tên bài hát mới"
                                    value={songItem.title}
                                    onChange={handleInputTitle}
                                />

                                <Select
                                    isMulti
                                    placeholder="Chọn ca sỹ"
                                    required
                                    onChange={handleChangePerformers}
                                    options={inputPerformers}
                                    defaultValue={inputPerformerSong}
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />

                                <Select
                                    isMulti
                                    required
                                    placeholder="Chọn thể loại cho bài hát"
                                    onChange={handleChangeGenre}
                                    options={inputGenre}
                                    defaultValue={inputGenreSong}
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />

                                <Select
                                    isMulti
                                    required
                                    placeholder="Chọn Album cho bài hát"
                                    onChange={handleChangeAlbums}
                                    options={inputAlbum}
                                    defaultValue={inputAlbumSong}
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />

                                <button type="submit">Cập nhập</button>
                            </form>
                        </div>
                        <p>
                            Bằng cách tiếp tục, bạn đồng ý cấp cho Harmony quyền truy cập vào hình ảnh bạn chọn tải lên.
                            Hãy chắc chắn rằng bạn có quyền tải lên hình ảnh.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(UpdateSong);
