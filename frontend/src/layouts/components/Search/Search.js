import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        fetch(`http://localhost:3000/blog/search?q=${encodeURIComponent(debounced)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debounced]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // ing a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. S
        <div>
            <Tippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-result-item')}>Kết quả</h4>
                            {Array.isArray(searchResult) &&
                                searchResult.map((result) => (
                                    <Link
                                        to={`/blog/store/${result._id}`}
                                        className={cx('search-result-link')}
                                        key={result._id}
                                        onClick={() => {
                                            handleHideResult();
                                            handleClear();
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            className={cx('search-result-icon')}
                                        />
                                        <p className={cx('search-result-name')}>{result.title}</p>
                                    </Link>
                                ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        type="search"
                        value={searchValue}
                        placeholder="Tìm kiếm đồ dùng, bài viết, ..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <Link to={`/blog/search?q=${encodeURIComponent(debounced)}`}>
                        <button
                            className={cx('search-btn')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Link>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
