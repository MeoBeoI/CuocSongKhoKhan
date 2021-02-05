/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
const axios = require('axios');

async function getTotalScore(team, year) {
  const configHome = {
    method: 'get',
    url: `http://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}`,
    headers: { },
  };

  const configAway = {
    method: 'get',
    url: `http://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}`,
    headers: { },
  };

  const responseHomeInit = await axios(configHome);
  const responseAwayInit = await axios(configAway);

  let arrayHomeMatchs = responseHomeInit.data.data;
  let arrayAwayMatchs = responseAwayInit.data.data;
  // If more than 1 page, append data array
  if (responseHomeInit.data.total_pages !== 1) {
    for (let i = 2; i <= responseHomeInit.data.total_pages; i++) {
      const returnData = await axios({
        method: 'get',
        url: `http://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=${i}`,
        headers: { },
      });
      arrayHomeMatchs = arrayHomeMatchs.concat(returnData.data.data);
    }
  }

  // If more than 1 page, append data array
  if (responseAwayInit.data.total_pages !== 1) {
    for (let i = 2; i <= responseHomeInit.data.total_pages; i++) {
      const returnData = await axios({
        method: 'get',
        url: `http://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}&page=${i}`,
        headers: { },
      });
      arrayAwayMatchs = arrayAwayMatchs.concat(returnData.data.data);
    }
  }

  const totalGoalsHome = arrayHomeMatchs.reduce((total, cur) => Number(total) + Number(cur.team1goals), 0);
  const totalGoalsAway = arrayAwayMatchs.reduce((total, cur) => Number(total) + Number(cur.team2goals), 0);

  return totalGoalsHome + totalGoalsAway;
}

(async () => {
  const total = await getTotalScore('Chelsea', 2014);
  console.log(total);
})();
