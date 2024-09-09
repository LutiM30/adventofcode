fetch('input.txt')
  .then((res) => res.text())
  .then((text) => {
    const MAX_CUBES = { red: 12, blue: 14, green: 13 };
    const games = text.split('\r\n');
    const gamesObj = {};
    const gamesExtracted = games.map(
      (game, index) => game.split(`Game ${index + 1}: `)[1]
    );

    gamesExtracted?.forEach((game, index) => {
      let colorsArray = game.split(';')?.map((info) => info?.split(', '));

      colorsArray = colorsArray.map((colorArr) => {
        const newColorObject = {};
        colorArr.map((color) => {
          let containsC = '';
          Object.keys(MAX_CUBES).forEach((c) =>
            color?.includes(c) ? (containsC = c) : ''
          );

          const num = Number(color.split(containsC)[0]?.trim());

          containsC in newColorObject
            ? (newColorObject[containsC] = newColorObject[containsC] + num)
            : (newColorObject[containsC] = num);
        });
        return newColorObject;
      });

      gamesObj[index + 1] = colorsArray;
    });

    for (const [gameID, gamesArr] of Object.entries(gamesObj)) {
      gamesArr.forEach((gameIteration) => {
        for (const [color, numberOTimes] of Object.entries(gameIteration)) {
          for (const [cKey, cValue] of Object.entries(MAX_CUBES)) {
            color === cKey && numberOTimes > cValue
              ? delete gamesObj[gameID]
              : false;
          }
        }
      });
    }

    const theFinalNumber = Object.keys(gamesObj).reduce(
      (partialSum, a) => partialSum + Number(a?.trim()),
      0
    );

    document.getElementById(
      'showing-final-number'
    ).innerHTML = ` This is the Final Number: ${theFinalNumber}`;
  })
  .catch((e) => console.error(e));
