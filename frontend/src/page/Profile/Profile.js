import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useAuthStore from '~/store/useAuthStore';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Profile() {
    const { id } = useParams();
    const [token] = useAuthStore((state) => [state.token]);
    const [user, setUser] = useState({});
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        axios
            .get(`http://localhost:3000/user/store/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                setUser(response.data);
            })
            .catch((error) => {
                // console.log(error);
            });
    }, [token]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h4 className={cx('name')}>Hồ sơ của tôi</h4>
                <span className={cx('name-title')}>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
            </div>
            <div className={cx('body')}>
                <div className="image">
                    <img
                        className={cx('img')}
                        src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/121680021_717238292469579_2635071325374567304_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=3lOcizNxYaEAX8chp4y&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDrLh_DamyObM4dRIm9XyHIwmHzfs_okOvw63P72_WyTA&oe=6459F1D1"
                        alt="product"
                    />
                    <div className={cx('form-group')}>
                        <label htmlFor="myfile" className={cx('form-label')}>
                            Đổi ảnh đại diện của bạn:
                        </label>
                        <input
                            id="myfile"
                            name="myfile"
                            type="file"
                            className={cx('form-control')}
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className={cx('info')}>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Tên đầy đủ: </span>
                        <p className={cx('info-describe')}>{user.username}</p>
                    </div>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Số điện thoại: </span>
                        <p className={cx('info-describe')}>{user.numberPhone}</p>
                    </div>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Email: </span>
                        <p className={cx('info-describe')}>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
