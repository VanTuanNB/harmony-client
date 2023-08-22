import { IAlbum, ISong } from '@/core/common/interfaces/collection.interface';
import { usePutServiceAlbumMutation } from '@/core/redux/services/album.service';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import style from './UpdateSong.module.scss';

const cx = classNames.bind(style);

interface IState {
    dataProfile: IAlbum | undefined;
    songAlbum: ISong[] | undefined;
    isUpdated: (isReload: boolean) => void;
}
type Song = {
    label: string;
    value: string;
};
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
        marginBottom: '15px',
    }),
};
function UpdateSongComponent({ isUpdated, dataProfile, songAlbum }: IState) {
    const [listSong, setListSong] = useState<string[]>([]);
    const { data } = useGetServiceProfileQuery(dataProfile?.userReference._id || '');
    const [putServiceAlbum] = usePutServiceAlbumMutation();

    const handleChangeSong = (ars: any) => {
        setListSong(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const inputSongUpdate = data?.data.songsReference?.map((song) => ({
        label: song.title,
        value: song._id,
    }));
    const inputSongAlbum = songAlbum?.map((song) => ({
        label: song.title,
        value: song._id,
    }));
    const inputSong = (inputSongUpdate: Song[], inputSongAlbum: Song[]): Song[] => {
        if (inputSongAlbum.length === 0) {
            return inputSongUpdate;
        }
        const albumValues = new Set(inputSongAlbum.map((song) => song.value));
        return inputSongUpdate.filter((song) => !albumValues.has(song.value));
    };
    const result = inputSong(inputSongUpdate ?? [], inputSongAlbum ?? []);
    const submit = (e: any) => {
        e.preventDefault();
        putServiceAlbum({
            _id: dataProfile?._id,
            listSong: listSong as any,
        });
        isUpdated(true);
    };
    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Thêm bài hát của bạn vào Album</h2>
                            <button onClick={() => isUpdated(true)}>
                                <FontAwesomeIcon icon={faClose} className={cx('close')} />
                            </button>
                        </div>
                        <div className={cx('profile')}>
                            <form onSubmit={submit} className={cx('form')}>
                                <Select
                                    isMulti
                                    required
                                    defaultValue={inputSongAlbum}
                                    onChange={handleChangeSong}
                                    options={result}
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />
                                <button type="submit">Thêm bài hát vào album</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default memo(UpdateSongComponent);
