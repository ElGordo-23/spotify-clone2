// const client_id = 'c69cedaf6a9a4261b831463851a01e35';
// const client_secret = '';

// const encodedData = window
//   .btoa(`${client_id}: ${client_secret}`, 'utf-8')
//   .toString('base64');

// console.log(encodedData);

// const authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     Authorization: `Basic ${encodedData}`,
//   },
//   form: {
//     grant_type: 'client_credentials',
//   },
//   json: true,
// };

// const getToken = async () => {
//   const response = await axios.post(
//     'https://accounts.spotify.com/api/token',
//     {
//       grant_type: 'client_credentials',
//     },

//     {
//       headers: {
//         Authorization: `Basic ${encodedData}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     },
//   );
//   console.log(response);
//   return response;
// };

// getToken();
