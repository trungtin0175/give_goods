import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUpload, faBook, faMessage, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '~/store/useAuthStore';

const cx = classNames.bind(styles);
function Sidebar() {
    const [token, user] = useAuthStore((state) => [state.token, state.user]);
    const currentUser = token && JSON.stringify(user) !== '{}';
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Home"
                    to={config.routes.home}
                    icon={<FontAwesomeIcon icon={faHouse} />}
                />

                <MenuItem
                    title="Upload"
                    to={currentUser ? config.routes.upload : config.routes.login}
                    icon={<FontAwesomeIcon icon={faUpload} />}
                />
                <MenuItem
                    title="My blog"
                    to={currentUser ? config.routes.myblog : config.routes.login}
                    icon={<FontAwesomeIcon icon={faBook} />}
                />
                <MenuItem
                    title="Chat"
                    to={currentUser ? config.routes.chat : config.routes.login}
                    icon={<FontAwesomeIcon icon={faMessage} />}
                />
                <div
                    className={cx('icon-scroll')}
                    onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </div>
            </Menu>
        </aside>
    );
}

export default Sidebar;
