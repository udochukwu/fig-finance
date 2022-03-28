import React from 'react';

import styled from 'styled-components';

const EventCard = ({ eventData }) => {
  const trim = (string, length) => {
    return `${string.slice(0, length)} ${string.length > length ? '...' : ''}`;
  };

  const formatedDate = new Date(eventData.date);

  return (
    <EventWrapper className='card rounded-none' onClick={() => alert(`Opening event ${eventData.title}`)}>
      <div className='card-body'>
        <h5 className='title'>{trim(eventData.title, 60)}</h5>
        <h6 className='text-warning date'>{formatedDate.toDateString()}</h6>
        <p className='text-muted description'>
          {trim(eventData.description, 70)}
        </p>
        <div className='d-flex justify-content-between'>
          <p className='city mb-0'>
            <i className='fas fa-map-marker-alt me-2'></i>{' '}
            {eventData.isVirtual ? 'Virtual Event' : 'Live Event'} (
            {eventData.city})
          </p>{' '}
          <span className='category text-uppercase'>{eventData.category}</span>
        </div>
      </div>
    </EventWrapper>
  );
};

const EventWrapper = styled.div`
  cursor: pointer;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  border: none;
  margin-bottom: 20px;
  .title {
    color: rgb(2, 0, 36);
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .date {
    font-size: 16px;
  }
  .city {
    text-transform: capitalize;
    color: #000000;
    font-size: 14px;
  }
  .category {
    color: #ffffff;
    background: rgb(2, 0, 36);
    height: 20px;
    padding: 0px 15px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 6px;
  }
`;
export default EventCard;
