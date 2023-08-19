import { HeartIcon1, HeartIcon2, HeartIcon3 } from "../Svg/index.component";
import classNames from "classnames/bind";
import style from './Heart.module.scss'

const cx = classNames.bind(style)

function HeartComponent() {
    return (
        <div className={cx('heart-container')} title="Like">
            <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
            <div className={cx('svg-container')}>
                <HeartIcon1 className={cx('svg-outline')} />
                <HeartIcon2 className={cx('svg-filled')} />
                <HeartIcon3 className={cx('svg-celebrate')} />
            </div>
        </div>
    );
}

export default HeartComponent;
