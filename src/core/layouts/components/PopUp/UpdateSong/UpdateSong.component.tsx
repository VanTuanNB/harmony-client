import { IGenre, IUser } from '@/core/common/interfaces/collection.interface';
import { useGetServiceGenreQuery } from '@/core/redux/services/genre.service';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { useGetServiceSongByIdQuery, usePutUpdateSongMutation } from '@/core/redux/services/song.service';
import { useGetServiceUserRoleComposerQuery } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
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
    songId: string;
    isUpdated: (value: boolean) => void;
}
function UpdateSong({ dataProfile, isUpdated, songId }: IState) {
    const { data } = useGetServiceSongByIdQuery(songId);
    const [genresReference, setListGenreId] = useState<string[]>([]);
    const [performers, setListPerformers] = useState<string[]>([]);
    const [albumReference, setListAlbumReference] = useState<string[]>([]);
    const [title, setTitle] = useState<string>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dataGenre, setDataGenre] = useState<IGenre[]>();
    const [dataUser, setDataUser] = useState<IUser[]>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail] = useUploadThumnailMutation();
    const [putServiceSong] = usePutUpdateSongMutation();
    const aipGetGenre = useGetServiceGenreQuery();
    const aipGetUserComposer = useGetServiceUserRoleComposerQuery();

    useEffect(() => {
        if (data) {
            setTitle(data.data.title);
        }
    }, [data]);

    useEffect(() => {
        if (aipGetGenre.data) {
            setDataGenre(aipGetGenre.data.data);
        }
        if (aipGetUserComposer.data) {
            setDataUser(aipGetUserComposer.data.data);
        }
    }, [aipGetGenre.data, aipGetUserComposer.data]);

    const handleChangeGenre = (selectedOptions: any) => {
        const newInputGenre = [...(inputGenre ?? [])];
        inputGenreSong?.forEach((item) => {
            newInputGenre.push(item);
        });
        setListGenreId(newInputGenre.map((option: any) => option.value));
    };

    const handleChangePerformers = (selectedOptions: any) => {
        const newInputPerformers = [...(inputPerformers ?? [])];
        inputPerformerSong?.forEach((item) => {
            newInputPerformers.push(item);
        });
        setListPerformers(newInputPerformers.map((option: any) => option.value));
        console.log('change',selectedOptions);
    };
    const handleChangeAlbums = (selectedOptions: any) => {
        const newInputAlbum = [...(inputAlbum ?? [])];
        inputAlbumSong?.forEach((item) => {
            newInputAlbum.push(item);
        });
        setListAlbumReference(newInputAlbum.map((option: any) => option.value));
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const inputGenre = aipGetGenre.data?.data.map((song) => ({
        label: song.title,
        value: song._id,
    }));
    const inputPerformers = aipGetUserComposer?.data?.data.map((user) => ({
        label: user.name,
        value: user._id,
    }));
    const inputAlbum = dataProfile.albumsReference?.map((user) => ({
        label: user.title,
        value: user._id,
    }));
    const inputGenreSong = data?.data.genresReference.map((song) => ({
        label: song.title,
        value: song._id,
    }));
    const inputPerformerSong = data?.data.performers.map((user) => ({
        label: user.name,
        value: user._id,
    }));
    const inputAlbumSong = data?.data.albumReference?.map((item) => ({
        label: item.title,
        value: item._id,
    }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        const newValue = {
            _id: data?.data?._id,
            title: title,
            file: file,
            genresReference: genresReference,
            albumReference: albumReference,
            performers: performers,
        };
        console.log(newValue);

        // if (file) {
        //     const fileExtension = file.name.split('.').pop();
        //     const newValue = {
        //         _id: data?.data._id,
        //         isNewUploadAvatar: true,
        //         title: title,
        //         contentType: fileExtension,
        //     };
        //     const putData = (await putServiceSong(newValue)) as any;
        //     const uploadS3 = await uploadThumnail({ privateUrl: putData.data.data.privateUrl, file });
        //     isUpdated(true);
        // } else {
        //     const newValue = {
        //         _id: data?.data?._id,
        //         title: title,
        //         isNewUploadAvatar: false,
        //     };
        //     putServiceSong(newValue);
        //     isUpdated(true);
        // }
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
                                                data && data.data.thumbnailUrl
                                                    ? `${data.data.thumbnailUrl}?${new Date().getTime()}`
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
                                    value={title}
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
