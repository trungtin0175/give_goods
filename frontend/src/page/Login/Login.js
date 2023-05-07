/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from '../Register/Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useForm } from 'react-hook-form';
import { login } from '~/services/authService';
import { toast } from 'react-toastify';
import useAuthStore from '~/store/useAuthStore';
import { useEffect } from 'react';
import config from '~/config';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [loginStore, token, user] = useAuthStore((state) => [
        state.login,
        state.token,
        state.user,
    ]);
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await login(data);
            loginStore(res);
            toast.success('login successful', {
                autoClose: 1000,
            });
            setTimeout(() => navigate(config.routes.home), 1000);
        } catch (error) {
            console.log(error);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else toast.error('login failure, please check your connect and try again');
        }
    };

    useEffect(() => {
        if (token && JSON.stringify(user) !== '{}') {
            navigate(config.routes.home);
        }
    }, [token, user]);

    return (
        <div className={cx('main')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} id="form-2">
                <h3 className={cx('heading')}>Đăng nhập</h3>
                <p className={cx('desc')}>Cùng nhau chia sẻ đồ dùng cũ❤️</p>

                <div className={cx('form-group')}></div>

                <div className={cx('form-group')}>
                    <label htmlFor="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        id="email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required',
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Email is not valid',
                            },
                        })}
                        type="text"
                        placeholder="VD: trungtin@gmail.com"
                        className={cx('form-control')}
                    />
                    {errors.email && dirtyFields.email && (
                        <span className={cx('form-message')}>{errors.email.message}</span>
                    )}
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required',
                            },
                            minLength: {
                                value: 6,
                                message: 'Password is at least 6 characters long',
                            },
                        })}
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className={cx('form-control')}
                    />
                    {errors.password && dirtyFields.password && (
                        <span className={cx('form-message')}>{errors.password.message}</span>
                    )}
                </div>

                <button className={cx('form-submit')}>Đăng nhập</button>
                <Link to={routes.register} className={cx('register-link')}>
                    Bạn chưa có tài khoản?
                </Link>
            </form>
        </div>
    );
}

export default Login;
