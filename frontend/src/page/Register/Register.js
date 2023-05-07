import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useForm } from 'react-hook-form';
import useRegisterStore from '~/store/useRegisterStore';
import { toast } from 'react-toastify';
import config from '~/config';
import { useEffect } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import { signUp } from '~/services/authService';

const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            username: '',
            phonenumber: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await signUp(data);
            toast.success('register successful', {
                autoClose: 1000,
            });
            setTimeout(() => navigate(config.routes.login), 1000);
        } catch (error) {
            console.log(error);
            if (error?.response?.data.message) {
                toast.error(error.response.data.message);
            } else toast.error('register failure, please check your connect and try again');
        }
    };

    return (
        <div className={cx('main')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} id="form-1">
                <h3 className={cx('heading')}>Thành viên đăng ký</h3>
                <p className={cx('desc')}>Cùng nhau chia sẻ đồ dùng cũ❤️</p>

                <div className={cx('spacer')}></div>

                <div className={cx('form-group')}>
                    <label htmlFor="username" className={cx('form-label')}>
                        Tên đầy đủ
                    </label>
                    <input
                        id="username"
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'username is required',
                            },
                            minLength: {
                                value: 2,
                                message: 'username should have at least 2 characters',
                            },
                        })}
                        type="text"
                        placeholder="VD: Trung Tín"
                        className={cx('form-control')}
                    />
                    {errors.username && dirtyFields.username && (
                        <span className={cx('form-message')}>{errors.username.message}</span>
                    )}
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="phonenumber" className={cx('form-label')}>
                        Số điện thoại
                    </label>
                    <input
                        id="phonenumber"
                        {...register('phonenumber', {
                            required: {
                                value: true,
                                message: 'Phone number is required',
                            },
                            minLength: {
                                value: /^\d{10}$/,
                                message: 'Phone number must have exactly 10 digits',
                            },
                        })}
                        type="tel"
                        placeholder="VD: 0901234567"
                        className={cx('form-control')}
                    />
                    {errors.phonenumber && dirtyFields.phonenumber && (
                        <span className={cx('form-message')}>{errors.phonenumber.message}</span>
                    )}
                </div>

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
                        // type="email"
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

                <div className={cx('form-group')}>
                    <label htmlFor="password_confirmation" className={cx('form-label')}>
                        Nhập lại mật khẩu
                    </label>
                    <input
                        id="password_confirmation"
                        {...register('password_confirmation', {
                            required: {
                                value: true,
                                message: 'Password is required',
                            },
                            validate: {
                                compareValue: (value) =>
                                    value === getValues('password') ||
                                    'confirm password must equal to password',
                            },
                        })}
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        className={cx('form-control')}
                    />
                    {errors.password_confirmation && dirtyFields.password_confirmation && (
                        <span className={cx('form-message')}>
                            {errors.password_confirmation.message}
                        </span>
                    )}
                </div>

                <button className={cx('form-submit')}>Đăng ký</button>
            </form>
        </div>
    );
}

export default Register;
