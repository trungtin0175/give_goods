import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useAuthStore from '~/store/useAuthStore';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Product() {
    const [token, user] = useAuthStore((state) => [state.token, state.user]);
    const currentUser = token && JSON.stringify(user) !== '{}';
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        console.log(id);
        axios
            .get(`http://localhost:3000/blog/store/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                setBlog(response.data);
            })
            .catch((error) => {});
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className="image">
                <img className={cx('img')} src={blog.image} alt="product" />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>{blog.title}</h4>
                <div className={cx('info-group')}>
                    <span className={cx('info-title')}>Mô tả: </span>
                    <p className={cx('info-describe')}>{blog.description}</p>
                </div>
                <div className={cx('info-group')}>
                    <span className={cx('info-title')}>Người đăng: </span>
                    <p className={cx('info-describe')}>{blog.author}</p>
                </div>
                <div className={cx('info-group')}>
                    <span className={cx('info-title')}>Số điện thoại: </span>
                    <p className={cx('info-describe')}>{blog.numberPhone}</p>
                </div>
                <div className={cx('info-group')}>
                    <span className={cx('info-title')}>Địa chỉ: </span>
                    <p className={cx('info-describe')}>{blog.address}</p>
                </div>
                {currentUser && user.username !== blog.author ? (
                    <Button className={cx('button')} outline>
                        <FontAwesomeIcon className={cx('icon')} icon={faMessage} />
                        Chat
                    </Button>
                ) : null}
            </div>
        </div>
    );
}

export default Product;
