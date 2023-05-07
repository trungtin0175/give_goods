import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const cities = [
    { id: 1, name: 'Hanoi', city: 'Hà Nội' },
    { id: 2, name: 'Danang', city: 'Đà Nẵng' },
    { id: 3, name: 'HoChiMinh', city: 'Hồ Chí Minh' },
];
function Filter() {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCityClick = (city) => {
        setSelectedCity(city);
    };

    const handleBackClick = () => {
        setSelectedCity(null);
    };
    return (
        <div className={cx('city-wrapper')}>
            <Link to={'/'}>
                <Button outline onClick={() => handleBackClick()} className={cx('city')}>
                    {selectedCity ? selectedCity.name : 'Tất cả'}
                </Button>
            </Link>
            <ul className={cx('list-city')}>
                {cities.map((city) => (
                    <Link key={city.id} to={`/blog/filter?city=${city.city}`}>
                        <li
                            className={cx('item-city')}
                            key={city.id}
                            onClick={() => handleCityClick(city)}
                        >
                            {city.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Filter;
