import { ISong } from '@/core/common/interfaces/collection.interface';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';
import classNames from 'classnames/bind';
import styles from './LazyLoad.module.scss';
const cx = classNames.bind(styles);
interface IPropsLazyLoadSuggest {
    items: ISong[];
    onClickItem: (id: string) => void;
    trigger: (node: HTMLDivElement) => void;
}

function LazyLoadSuggestComponent({ items, onClickItem, trigger }: IPropsLazyLoadSuggest) {
    return (
        <>
            <ul className={cx('list-listening')}>
                {items.map((song, index: number) => {
                    return items.length === index + 1 ? (
                        <div key={index} ref={trigger} className={cx('trigger')}></div>
                    ) : (
                        <li key={index} className={cx('item')}>
                            <MediaItem
                                _id={song._id}
                                title={song.title}
                                thumbnailUrl={song.thumbnailUrl}
                                performers={song.performers as any}
                                onClick={onClickItem}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default LazyLoadSuggestComponent;
