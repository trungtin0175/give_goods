import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Content from './Content';
import '~/components/GridStyles/GridStyles.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [productCount, setProductCount] = useState(5);

    useEffect(() => {
        axios
            .get('http://localhost:3000/blog')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSortedProducts(sorted);
    }, [products]);

    const handleLoadMore = () => {
        setProductCount(productCount + 5);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-show')}>
                <img className={cx('slide-img')} src={images.panner} alt="givegoods"></img>
            </div>
            <div className={cx('container', 'row', 'sm-gutter')}>
                {Array.isArray(sortedProducts) ? (
                    sortedProducts.slice(0, productCount).map((product, index) => (
                        <div className={cx('col', 'l-2-4')} key={index}>
                            <Content product={product} />
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {productCount < sortedProducts.length && (
                <Button className={cx('button')} outline onClick={handleLoadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
}

export default Home;
