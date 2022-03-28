import { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import EventCard from '../components/EventCard';
import { fetchAllEvents } from '../features/event/eventSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import lodash from 'lodash';
function Dashboard() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);

  const [category, setCategory] = useState('');
  const [isVirtual, setIsVirtual] = useState('');
  const [search, setSearch] = useState('');

  const fetchData = useCallback(() => {
    dispatch(
      fetchAllEvents({
        category,
        isVirtual,
        search,
      })
    );
  }, [category, dispatch, isVirtual, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const debouncedFunc = lodash.debounce(
      () => setSearch(event.target.value),
      100
    );
    debouncedFunc();
  };
  return (
    <Layout>
      <Banner>
        <div className='container'>
          <h1 className='text-white text-center mb-4'>
            Find Tech Events Around Your City
          </h1>

          <div className='search-wrapper'>
            <div className='flex-container'>
              <input
                className='form-control input'
                placeholder='Search by city or title'
                value={search}
                // onChange={(e) => lodash.debounce(()=> setSearch(e.target.value),1000)}
                onChange={handleSearchChange}
              />
              <select
                className='form-select input'
                value={isVirtual}
                onChange={(e) => setIsVirtual(e.target.value)}
              >
                <option value='all'>Virtual / Live Event</option>
                <option value='true'>Virtual Event</option>
                <option value='false'>Live Event</option>
              </select>
              <select
                className='form-select input'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='all'>Filter by Category</option>
                <option value='ai'>AI</option>
                <option value='robotics'>Robotics</option>
                <option value='mobile'>Mobile Development</option>
              </select>
              <div className='text-center'>
                <button
                  className='btn rounded-none btn-shadow search-btn'
                  onClick={() => {
                    setCategory('all');
                    setIsVirtual('all');
                    setSearch('');
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </Banner>
      <EventsWrapper className='py-5'>
        <div className='container'>
          {!loading ? (
            !error ? (
              events?.length > 0 ? (
                <div className='row'>
                  {events?.map((event) => (
                    <div className='col-md-4' key={event?._id}>
                      <EventCard eventData={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center'>No data to show</div>
              )
            ) : (
              <div className='text-center'>Something went wrong.</div>
            )
          ) : (
            <div className='text-center'>Loading...</div>
          )}
        </div>
      </EventsWrapper>
    </Layout>
  );
}

const Banner = styled.div`
  height: 300px;
  width: 100%;
  background: #f0f6ff;
  background: rgb(2, 0, 36);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 575.98px) {
    height: 400px;
  }

  .search-wrapper {
    background: rgb(255, 255, 255);
    padding: 10px 20px;
    box-shadow: rgb(0 0 0 / 3%) 0px 6px 6px;
    max-width: 946px;
    margin: auto;
    border-radius: 0px;
    overflow: hidden;

    @media (max-width: 575.98px) {
      background: none;
      padding: 0px;
    }

    .flex-container {
      display: flex;
      @media (max-width: 575.98px) {
        display: block;
      }
    }

    .input {
      border: none;
      margin-right: 20px;
      border-radius: 0px;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      &:last-child {
        margin-right: 0px;
      }
      @media (max-width: 575.98px) {
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 12px;
      }
    }

    .search-btn {
      background: #000000;
      color: #ffffff;
      background: rgb(2, 0, 36);
      @media (max-width: 575.98px) {
        background: #ffc107;
        color: #ffffff;
        width: 300px;
      }
      @media (max-width: 400px) {
        width: 100%;
      }
    }
  }
`;

const EventsWrapper = styled.div``;
export default Dashboard;
