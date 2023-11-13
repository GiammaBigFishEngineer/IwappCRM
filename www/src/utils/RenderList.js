import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function RenderList (URL) {
    const [objectList, setObjectList] = useState([]);

    const getSessionData = async () => {
      try {
        const response = await axios.get(URL, { withCredentials: true });
        const data = response.data;
        setObjectList(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() => {
      async function fetchData() {
        await getSessionData();
      }
      fetchData();
    }, []);

    return objectList;
}
export default RenderList