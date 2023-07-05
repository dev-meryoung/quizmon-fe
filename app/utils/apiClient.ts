import axios from 'axios';
import apiAuthor from 'app/utils/apiAuthor';

const apiClient = {
  idCheck(userId: string) {
    const method: string = 'GET';
    const url: string = `/api/vi/user/${userId}/check`;

    axios
      .get(url, {
        headers: {
          Authorization: apiAuthor(method, url),
        },
      })
      .then((res) => console.log(res));
  },
};

export default apiClient;
