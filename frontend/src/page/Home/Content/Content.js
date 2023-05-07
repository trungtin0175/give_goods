import { Link } from 'react-router-dom';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import useAuthStore from '~/store/useAuthStore';

const cx = classNames.bind(styles);
function Content({ product }) {
    const [token, user] = useAuthStore((state) => [state.token, state.user]);
    const currentUser = token && JSON.stringify(user) !== '{}';
    return (
        <Link
            to={currentUser ? `/blog/store/${product._id}` : config.routes.login}
            className={cx('wrapper')}
        >
            <img className={cx('image')} src={product.image} alt="product" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{product.title}</h4>
                <div className={cx('footer')}>
                    <span className={cx('address')}>{product.city}</span>
                    <span className={cx('poster')}>{product.author}</span>
                </div>
            </div>
        </Link>
    );
}

export default Content;
