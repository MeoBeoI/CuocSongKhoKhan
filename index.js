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

  const responseHome = await axios(configHome);
  const responseAway = await axios(configAway);

  const totalGoalsHome = responseHome.data.data.reduce((total, cur) => Number(total) + Number(cur.team1goals), 0);
  const totalGoalsAway = responseAway.data.data.reduce((total, cur) => Number(total) + Number(cur.team2goals), 0);

  return totalGoalsHome + totalGoalsAway;
}

(async () => {
  const total = await getTotalScore('Barcelona', 2011);
  console.log(total);
})();
