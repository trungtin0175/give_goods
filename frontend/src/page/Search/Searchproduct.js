import classNames from 'classnames/bind';
import styles from '~/page/Myblog/Myblog.module.scss';
import Content from '~/page/Home/Content';
import '~/components/GridStyles/GridStyles.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Searchproduct() {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get('q');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/blog/search?q=${value}`)
            .then((response) => {
                // console.log(response);
                setProducts(response.data);
            })
            .catch((error) => {
                // console.log(error);
            });
        console.log(products);
        console.log(value);
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

export default Searchproduct;
