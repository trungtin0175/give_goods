import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Search from '../Search';
import Filter from '../Filter';
import useAuthStore from '~/store/useAuthStore';

const cx = classNames.bind(styles);
function Header() {
    const [token, user, logout] = useAuthStore((state) => [state.token, state.user, state.logout]);
    const currentUser = token && JSON.stringify(user) !== '{}';
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate(config.routes.home);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="givegoods"></img>
                    </Link>
                    <h4 className={cx('logo-title')}>Cứ Cho Đi Rồi Sẽ Nhận Lại</h4>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Filter />
                    {currentUser ? (
                        <>
                            <Link to={`/user/store/${user._id}`}>
                                <img
                                    className={cx('user-avatar')}
                                    alt="Nguyễn Văn B"
                                    src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/121680021_717238292469579_2635071325374567304_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=3lOcizNxYaEAX8chp4y&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDrLh_DamyObM4dRIm9XyHIwmHzfs_okOvw63P72_WyTA&oe=6459F1D1"
                                />
                            </Link>
                            <Button primary onClick={handleLogout}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button primary to={config.routes.login}>
                                {' '}
                                Log in
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
