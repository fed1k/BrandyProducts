import { apiURI } from "../components/Home";

export const fetchData = async () => {
  const response = await fetch(apiURI);
  const data = await response.json();
  return data;
};

const thunkFunction = () => async (dispatch) => {
  const fetchedData = await fetchData();
  dispatch({ type: 'FETCH_DATA', payload: fetchedData });
};

export default thunkFunction;