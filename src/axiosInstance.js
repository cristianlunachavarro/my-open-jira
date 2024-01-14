import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-open-jira.vercel.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
