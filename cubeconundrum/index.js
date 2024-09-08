fetch('input.txt')
  .then((res) => res.text())
  .then((text) => {
    const colorsAndAmount = { red: 12, blue: 14, green: 13 };
    const games = text.split('\r\n');
    const gamesObj = {};
    const gamesExtracted = games.map(
      (game, index) => game.split(`Game ${index + 1}: `)[1]
    );
    gamesExtracted?.forEach((game, index) => {
      const obj = {};
      const truthness = {};

      const colorArray = game
        .split(';')
        ?.map((info) => info?.split(', '))
        ?.flat();
      colorArray.forEach((color) => {
        let containsC = '';
        Object.keys(colorsAndAmount).forEach((c) => {
          color?.includes(c) ? (containsC = c) : '';
          truthness[c] = false;
        });

        const num = Number(color.split(containsC)[0]?.trim());

        containsC in obj
          ? (obj[containsC] = obj[containsC] + num)
          : (obj[containsC] = num);
      });

      for (const [gKey, gValue] of Object.entries(obj)) {
        for (const [cKey, cValue] of Object.entries(colorsAndAmount)) {
          gKey === cKey && gValue <= cValue ? (truthness[cKey] = true) : false;
        }
      }

      Object.values(truthness)?.every((val) => val === true)
        ? (gamesObj[index + 1] = obj)
        : '';
    });
    console.log({ gamesObj });

    const theFinalNumber = Object.keys(gamesObj).reduce(
      (partialSum, a) => partialSum + Number(a?.trim()),
      0
    );

    document.getElementById(
      'showing-final-number'
    ).innerHTML = ` This is the Final Number: ${theFinalNumber}`;
  })
  .catch((e) => console.error(e));
