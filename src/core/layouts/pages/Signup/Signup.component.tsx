'use client';
import { AUTH_API_SOCIAL } from '@/core/common/constants/api.enum';
import { REGEX } from '@/core/common/constants/common.constant';
import { setUserToken } from '@/core/redux/features/client/client.slice';
import { updateProfile } from '@/core/redux/features/user/user.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { usePostSignUpCompletedMutation, usePostSignUpVerifyMutation } from '@/core/redux/services/user.service';
import LoadingPage from '@/shared/components/Loading/LoadingPage/LoadingPage.component';
import { FacebookIcon, GoogleIcon } from '@/shared/components/Svg/index.component';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);
type IFormDataVerify = {
    email: string;
    username: string;
    password: string;
};
type IFormDataSignUp = {
    verificationCode: number;
};
const MESSAGE_ERROR: { [key: string]: string } = {
    GMAIL_ALREADY_EXISTS: 'Tài khoản đã tồn tại!',
    CHECK_EMAIL_FAILED: 'Không thể đăng ký, máy chủ bảo trì!',
    POST_ACCOUNT_PENDING_SEND_MAIL_FAILED: 'Không thể gửi mã xác thực!',
    EMAIL_NOT_FOUND: 'Email không không hợp lệ để đăng ký!',
    SIGN_UP_FORM_FAILED: 'Đăng ký tài khoản thất bại, thử lại sau!',
};
function SignupPage() {
    const [isShowSignUp, setIsShowSignUp] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPreviewPassword, setIsPreviewPassword] = useState<boolean>(false);
    const [signUpApi, verifyResponse] = usePostSignUpVerifyMutation();
    const [completedSignUpApi, completedResponse] = usePostSignUpCompletedMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const formVerify = useForm<IFormDataVerify>();
    const formSignUp = useForm<IFormDataSignUp>();
    const onSubmit: SubmitHandler<IFormDataVerify> = (data: IFormDataVerify) => {
        setIsLoading(true);
        signUpApi(data);
    };
    const onSubmitSignUp: SubmitHandler<IFormDataSignUp> = (data: IFormDataSignUp) => {
        setIsLoading(true);
        completedSignUpApi({
            verificationCode: Number(data.verificationCode),
            email: formVerify.getValues('email'),
        });
    };

    useEffect(() => {
        if (verifyResponse.isSuccess) {
            setIsShowSignUp(true);
        }
        setIsLoading(false);
    }, [verifyResponse]);

    useEffect(() => {
        const { isSuccess, data, isError } = completedResponse;
        if (isError) {
            setIsLoading(false);
            return;
        }
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
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completedResponse]);

    return (
        <div className={cx('wrapper')}>
            {isLoading && <LoadingPage />}
            <div className={cx('form')}>
                <h2>Đăng ký tài khoản Harmony</h2>
                <form onSubmit={formVerify.handleSubmit(onSubmit)} className={cx('login-form')}>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            placeholder="Nhập email..."
                            className={cx(formVerify.formState.errors.email && 'invalid')}
                            {...formVerify.register('email', { required: true, pattern: REGEX.EMAIL })}
                        />
                        <div className={cx('messages')}>
                            {formVerify.formState.errors.email &&
                                formVerify.formState.errors.email.type !== 'pattern' && (
                                    <span className={cx('message-errors')}>Vui lòng nhập email!</span>
                                )}
                            {formVerify.formState.errors.email &&
                                formVerify.formState.errors.email.type === 'pattern' && (
                                    <span className={cx('message-errors')}>Email không hợp lệ!</span>
                                )}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            placeholder="Nhập tên..."
                            className={cx(formVerify.formState.errors.username && 'invalid')}
                            {...formVerify.register('username', { required: true })}
                        />
                        <div className={cx('messages')}>
                            {formVerify.formState.errors.username && (
                                <span className={cx('message-errors')}>Vui lòng nhập tên!</span>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('wrapper-password')}>
                            <input
                                type={isPreviewPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu..."
                                className={cx(formVerify.formState.errors.password && 'invalid')}
                                {...formVerify.register('password', { required: true })}
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
                            {formVerify.formState.errors.password && (
                                <span className={cx('message-errors')}>Vui lòng nhập mật khẩu!</span>
                            )}
                        </div>
                    </div>
                    {!isShowSignUp && <button className={cx('btn-submit')}>Gửi mã</button>}
                </form>
                <form onSubmit={formSignUp.handleSubmit(onSubmitSignUp)} className={cx('login-form', 'signUp')}>
                    {isShowSignUp && (
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                placeholder="Nhập mã xác thực..."
                                className={cx(formSignUp.formState.errors.verificationCode && 'invalid')}
                                {...formSignUp.register('verificationCode', { required: true })}
                            />
                            <div className={cx('messages')}>
                                {formSignUp.formState.errors.verificationCode && (
                                    <span className={cx('message-errors')}>Vui lòng nhập mã xác thực!</span>
                                )}
                            </div>
                        </div>
                    )}
                    {isShowSignUp && <button className={cx('btn-submit')}>Đăng ký</button>}
                </form>
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
                    Bạn đã có tài khoản?{' '}
                    <Link href="/auth/login">
                        <i>Đăng nhập ngay</i>
                    </Link>
                </div>
            </div>
            {verifyResponse.error && (
                <Toast
                    state="error"
                    title="Thất bại!"
                    message={
                        verifyResponse.error ? MESSAGE_ERROR[(verifyResponse.error as any).data.message as string] : ''
                    }
                />
            )}
            {completedResponse.error && (
                <Toast
                    state="error"
                    title="Thất bại!"
                    message={
                        completedResponse.error
                            ? MESSAGE_ERROR[(completedResponse.error as any).data.message as string]
                            : ''
                    }
                />
            )}
            {}
        </div>
    );
}

export default memo(SignupPage);
