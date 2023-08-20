'use client';
import { AUTH_API_SOCIAL } from '@/core/common/constants/api.enum';
import { REGEX } from '@/core/common/constants/common.constant';
import { setUserToken } from '@/core/redux/features/client/client.slice';
import { updateProfile } from '@/core/redux/features/user/user.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { useAuthLoginFormMutation } from '@/core/redux/services/auth.service';
import LoadingPage from '@/shared/components/Loading/LoadingPage/LoadingPage.component';
import { FacebookIcon, GoogleIcon } from '@/shared/components/Svg/index.component';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);
type IFormData = {
    email: string;
    password: string;
};
const MESSAGE_ERROR: { [key: string]: string } = {
    ACCOUNT_NOT_EXIST: 'Tài khoản của bạn không tồn tại!',
    ACCOUNT_ALREADY_EXISTS: 'Tài khoản này đã có sẵn, vui lòng đăng nhập bằng google!',
    INCORRECT_PASSWORD: 'Sai tài khoản hoặc mật khẩu!',
    LOGIN_FAILED: 'Không thể đăng nhập, vui lòng thử lại sau!',
    LOGIN_FORM_FAILED: 'Không thể đăng nhập, máy chủ bảo trì!',
};
function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPreviewPassword, setIsPreviewPassword] = useState<boolean>(false);
    const router = useRouter();
    const [loginApi, { data, isSuccess, isError, error }] = useAuthLoginFormMutation();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>();
    const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
        setIsLoading(true);
        loginApi(data);
    };

    useEffect(() => {
        if (isSuccess && data && data.success) {
            dispatch(
                updateProfile({
                    _id: data.data._id,
                    email: data.data.email,
                    name: data.data.name,
                    role: data.data.role,
                    avatarUrl: data.data.avatarUrl,
                    locale: data.data.locale,
                    nickname: data.data.nickname,
                }),
            );
            dispatch(
                setUserToken({
                    _id: data.data._id,
                    accessToken: data.data.accessToken,
                    refreshToken: data.data.refreshToken,
                }),
            );
            setIsPreviewPassword(false);
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data]);

    useEffect(() => {
        if (error) setIsLoading(false);
    }, [isError, error]);

    return (
        <div className={cx('wrapper')}>
            {isLoading && <LoadingPage />}
            <div className={cx('form')}>
                <h2>Đăng nhập Harmony</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('login-form')}>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            placeholder="Nhập email..."
                            className={cx(errors.email && 'invalid')}
                            {...register('email', { required: true, pattern: REGEX.EMAIL })}
                        />
                        <div className={cx('messages')}>
                            {errors.email && errors.email.type !== 'pattern' && (
                                <span className={cx('message-errors')}>Vui lòng nhập email!</span>
                            )}
                            {errors.email && errors.email.type === 'pattern' && (
                                <span className={cx('message-errors')}>Email không hợp lệ!</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('wrapper-password')}>
                            <input
                                type={isPreviewPassword ? 'text' : 'password'}
                                placeholder="Nhập password..."
                                className={cx(errors.password && 'invalid')}
                                {...register('password', { required: true })}
                            />
                            <button className={cx('btn-preview')} onClick={() => setIsPreviewPassword((prev) => !prev)}>
                                {isPreviewPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                            </button>
                        </div>
                        <div className={cx('messages')}>
                            {errors.password && <span className={cx('message-errors')}>Vui lòng nhập mật khẩu!</span>}
                        </div>
                    </div>
                    <div className={cx('remember')}>
                        <input type="checkbox" /> <span>Remember me</span>
                    </div>
                    <button className={cx('btn-submit')}>Log in</button>
                </form>
                <Link href="" className={cx('forgot')}>
                    Quên mật khẩu?
                </Link>
                <hr />

                <div className={cx('form-top')}>
                    <Link href={AUTH_API_SOCIAL.URL_GOOGLE}>
                        <GoogleIcon width="30px" height="30px" className={cx('icon-facebook')} fill="none" />
                        <p> Tiếp tục với Google</p>
                    </Link>
                    <Link href={AUTH_API_SOCIAL.URL_FACEBOOK}>
                        <FacebookIcon width="30px" height="30px" className={cx('icon-facebook')} fill="none" />
                        <p> Tiếp tục với Facebook</p>
                    </Link>
                </div>
                <div className={cx('sub')}>
                    Bạn chưa có tài khoản?{' '}
                    <Link href="/auth/signup">
                        <i>Đăng ký với chúng tôi</i>
                    </Link>
                </div>
            </div>
            {isError && (
                <Toast
                    state="error"
                    title="Thất bại!"
                    message={error ? MESSAGE_ERROR[(error as any).data.message as string] : ''}
                />
            )}
        </div>
    );
}

export default memo(LoginPage);
