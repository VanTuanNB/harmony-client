'use client';
import { changeNameAction } from '@/core/redux/features/user/user.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import Button from '@/shared/components/Button/Button.component';

export default function Home() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    console.log(user);
    return (
        <>
            <h1>Main Page</h1>
            <button onClick={() => dispatch(changeNameAction({ name: 'dispatch changed name' }))}>
                Check Redux Store
            </button>
            <Button></Button>
        </>
    );
}
