import classNames from 'classnames/bind';
import styles from '~/page/Register/Register.module.scss';
import '~/components/GridStyles/GridStyles.scss';
import Button from '~/components/Button/Button';
import { useState, useRef } from 'react';
import axios from 'axios';
import useAuthStore from '~/store/useAuthStore';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function Upload() {
    const [token] = useAuthStore((state) => [state.token]);

    const [post, setPost] = useState({
        title: '',
        address: '',
        description: '',
        city: '',
        image: null,
        phonenumber: '',
    });
    const inputRef = useRef();
    const handleClear = () => {
        inputRef.current.reset();
    };
    const handleClearAll = () => {
        setPost({
            title: '',
            address: '',
            description: '',
            city: '',
            image: null,
            phonenumber: '',
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPost({ ...post, image: file });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('address', post.address);
        formData.append('description', post.description);
        formData.append('city', post.city);
        formData.append('image', post.image);
        formData.append('phonenumber', post.phonenumber);
        try {
            const response = await axios.post('http://localhost:3000/blog/create', formData, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            toast.success('Submit successful', {
                autoClose: 1000,
            });
            // console.log(response.data);
            handleClearAll();
        } catch (error) {
            console.error(error);
            toast.error('Submit failure, please check your connect and try again');
        }
    };

    return (
        <div className={cx('wrapper-upload')}>
            <form ref={inputRef} onSubmit={handleSubmit}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="title" className={cx('form-label')}>
                                Tên của đồ vât:
                            </label>
                            <input
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={handleInputChange}
                                type="text"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="address" className={cx('form-label')}>
                                Địa chỉ:
                            </label>
                            <input
                                id="address"
                                name="address"
                                value={post.address}
                                onChange={handleInputChange}
                                type="text"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="description" className={cx('form-label')}>
                                Mô tả đồ vât:
                            </label>
                            <input
                                id="description"
                                name="description"
                                value={post.description}
                                onChange={handleInputChange}
                                type="text"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="city" className={cx('form-label')}>
                                Thành phố:
                            </label>
                            <input
                                id="city"
                                name="city"
                                value={post.city}
                                onChange={handleInputChange}
                                type="text"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="image" className={cx('form-label')}>
                                Hình ảnh của đồ vât:
                            </label>
                            <input
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                type="file"
                                className={cx('form-control')}
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="phonenumber" className={cx('form-label')}>
                                Số điện thoại:
                            </label>
                            <input
                                id="phonenumber"
                                name="phonenumber"
                                value={post.phonenumber}
                                onChange={handleInputChange}
                                type="tel"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={handleClear} primary>
                    Đăng
                </Button>
            </form>
        </div>
    );
}

export default Upload;
