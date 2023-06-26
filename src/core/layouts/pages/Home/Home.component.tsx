'use client';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { useGetServiceSongsQuery } from '@/core/redux/services/song.service';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function HomePage() {
    const { data, error, isLoading } = useGetServiceSongsQuery('');
    console.log(data);
    console.log(error);
    console.log(isLoading);
    return <h1>Home Page Component</h1>;
}

export default HomePage;
