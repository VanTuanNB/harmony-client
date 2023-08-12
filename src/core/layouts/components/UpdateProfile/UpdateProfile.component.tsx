import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './UpdateProfile.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: () => void;
}
function UpdateProfile({ close }: IState) {
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <div className={cx('title')}>
                        <h2>Profile detail</h2>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faClose} className={cx('close')} />
                        </button>
                    </div>
                    <div className={cx('profile')}>
                        <div className={cx('img-upload')}>
                            <Image
                                src="https://lh3.googleusercontent.com/a/AAcHTtclC7haEXrV3ctE2qTse-FW93HQGJeVzExHCeCbJLM3dNA=s96-c"
                                width={100}
                                height={100}
                                alt=""
                            />
                            <label htmlFor="file" className={cx('title-upload')}>
                                Upload File
                            </label>
                            <input type="file" name="file" id="file" />
                        </div>
                        <form action="" className={cx('form')}>
                            <input type="text" placeholder="Add a display name" />

                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <p>
                        By proceeding, you agree to give Harmony access to the image you choose to upload. Please make
                        sure you have the right to upload the image.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
