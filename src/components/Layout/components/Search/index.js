import HeadLessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItemm from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import * as searchService from '~/services/searchService';

const cx = classNames.bind(styles);
function Search() {
  const [serachResult, setSearchResult] = useState([]);
  const [serachValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const debounced = useDebounce(serachValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      return;
    }
    setLoading(true);

    const handleApi = async () => {
      setLoading(true);
      const res = await searchService.search(debounced);
      setSearchResult(res);
      setLoading(false);
    };
    handleApi();
  }, [debounced]);
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchVal = e.target.value;
    if (!searchVal.startsWith(' ')) {
      setSearchValue(searchVal);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <HeadLessTippy
        interactive
        visible={showResult && serachResult.length > 0}
        onClickOutside={handleHideResult}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {serachResult.map((res) => (
                <AccountItemm key={res.id} data={res} />
              ))}
            </PopperWrapper>
          </div>
        )}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={serachValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!serachValue && !loading && (
            <button
              className={cx('clear')}
              onClick={() => {
                setSearchValue('');
                setSearchResult([]);
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}

          <button className={cx('search-btn')} onMouseDown={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
      </HeadLessTippy>
    </div>
  );
}

export default Search;
