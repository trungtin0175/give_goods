import classNames from 'classnames/bind';
import styles from './Myblog.module.scss';
import Content from '~/page/Home/Content';
import '~/components/GridStyles/GridStyles.scss';
import Button from '~/components/Button/Button';
import routes from '~/config/routes';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useAuthStore from '~/store/useAuthStore';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function Myblog() {
    const [token, user] = useAuthStore((state) => [state.token, state.user]);
    const currentUser = token && JSON.stringify(user) !== '{}';
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/blog')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {});
    }, []);

    const handleDelete = async (e, productId) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/blog/store/${productId}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            toast.success('Delete successful', {
                autoClose: 1000,
            });
        } catch (error) {
            console.error(error);
            toast.error('Delete failure, please check your connect and try again');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row', 'sm-gutter')}>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => {
                        if (currentUser && user.username === product.author) {
                            return (
                                <div className={cx('col', 'l-2-4', 'item')} key={index}>
                                    <Content product={product} />
                                    <Button
                                        to={'/'}
                                        onClick={(e) => handleDelete(e, product._id)}
                                        primary
                                    >
                                        Xóa
                                    </Button>
                                    <Button to={`/blog/store/${product._id}/edit`} rounded>
                                        Sửa
                                    </Button>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            <Button to={routes.upload} outline>
                Thêm đồ dùng mới
            </Button>
        </div>
    );
}

export default Myblog;
