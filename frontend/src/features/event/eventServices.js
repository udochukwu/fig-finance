import axios from 'axios';

const EVENTS_URL = `${process.env.REACT_APP_API_URL}/events`;

const fetchAllEvents = async (query) => {
  const { search, category, isVirtual } = query;
  let queryString = '';
  if (search) {
    queryString += `&search=${search}`;
  }
  if (category) {
    queryString += `&category=${category}`;
  }

  if (isVirtual) {
    queryString += `&isVirtual=${isVirtual}`;
  }
  const response = await axios.get(`${EVENTS_URL}?query=true${queryString}`);
  return response.data;
};

const eventServices = { fetchAllEvents };

export default eventServices;
