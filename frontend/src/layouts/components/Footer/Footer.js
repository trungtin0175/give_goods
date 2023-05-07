import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <span className={cx('message')}>
                <span>
                    Tham gia cộng đồng để chung tay góp phần bảo vệ môi trường và chia sẻ đồ vật cũ cùng mọi người nha!
                </span>
                <p className={cx('made-with')}>Made with ❤️ Powered by GG team</p>
            </span>
        </footer>
    );
}

export default Footer;
