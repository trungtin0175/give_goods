import classNames from 'classnames/bind';
import styles from '~/page/Register/Register.module.scss';
import '~/components/GridStyles/GridStyles.scss';
import Button from '~/components/Button/Button';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '~/store/useAuthStore';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Fixblog() {
    const { id } = useParams();
    const [token] = useAuthStore((state) => [state.token]);

    const [post, setPost] = useState({
        title: '',
        address: '',
        description: '',
        city: '',
        image: null,
        numberPhone: '',
    });
    const [blog, setBlog] = useState({
        title: '',
        address: '',
        description: '',
        city: '',
        image: null,
        numberPhone: '',
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
            numberPhone: '',
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
        formData.append('title', post.title || blog.title);
        formData.append('address', post.address || blog.address);
        formData.append('description', post.description || blog.description);
        formData.append('city', post.city || blog.city);
        formData.append('image', post.image || blog.image);
        formData.append('numberPhone', post.numberPhone || blog.numberPhone);
        try {
            const response = await axios.put(
                `http://localhost:3000/blog/store/${id}/edit`,
                formData,
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Submit successful', {
                autoClose: 1000,
            });
            handleClearAll();
        } catch (error) {
            console.error(error);
            toast.error('Submit failure, please check your connect and try again');
        }
    };
    useEffect(() => {
        axios
            .get(`http://localhost:3000/blog/store/${id}/edit`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(setPost(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
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
                                value={post.title || blog.title}
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
                                value={post.address || blog.address}
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
                                value={post.description || blog.description}
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
                                value={post.city || blog.city}
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
                            <label htmlFor="numberPhone" className={cx('form-label')}>
                                Số điện thoại:
                            </label>
                            <input
                                id="numberPhone"
                                name="numberPhone"
                                value={post.numberPhone || blog.numberPhone}
                                onChange={handleInputChange}
                                type="tel"
                                className={cx('form-control')}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={handleClear} primary>
                    Sửa đổi
                </Button>
            </form>
        </div>
    );
}

export default Fixblog;
