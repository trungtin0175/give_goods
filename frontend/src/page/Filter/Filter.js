import classNames from 'classnames/bind';
import styles from '~/page/Myblog/Myblog.module.scss';
import Content from '~/page/Home/Content';
import '~/components/GridStyles/GridStyles.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get('city');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/blog/filter?city=${value}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {});
    }, [value]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row', 'sm-gutter')}>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => {
                        return (
                            <div className={cx('col', 'l-2-4', 'item')} key={index}>
                                <Content product={product} />
                            </div>
                        );
                    })
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Filter;
