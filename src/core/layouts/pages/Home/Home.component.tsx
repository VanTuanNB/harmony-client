import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import FormCreate from '@/shared/components/Form/FormSong.component';

const cx = classNames.bind(styles);

function HomePage() {
    return <FormCreate />;
}

export default HomePage;
