const db = require("../../models");

const createManyAssociation = async (req, res) => {
  try {
    await db.player.bulkCreate([
      { username: "s0me0ne" },
      { username: "empty" },
      { username: "greenhead" },
      { username: "not_spock" },
      { username: "bowl_of_petunias" },
    ]);
    await db.game.bulkCreate([
      { name: "The Big Clash" },
      { name: "Winter Showdown" },
      { name: "Summer Beatdown" },
    ]);
    await db.team.bulkCreate([
      { name: "The Martians" },
      { name: "The Earthlings" },
      { name: "The Plutonians" },
    ]);

    await db.gameTeam.bulkCreate([
      { GameId: 1, TeamId: 1 }, // this GameTeam will get id 1
      { GameId: 1, TeamId: 2 }, // this GameTeam will get id 2
      { GameId: 2, TeamId: 1 }, // this GameTeam will get id 3
      { GameId: 2, TeamId: 3 }, // this GameTeam will get id 4
      { GameId: 3, TeamId: 2 }, // this GameTeam will get id 5
      { GameId: 3, TeamId: 3 }, // this GameTeam will get id 6
    ]);

    await db.playerGameTeam.bulkCreate([
      // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
      { PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
      { PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
      { PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
      { PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
    ]);

    return res.json({
      status: 200,
      message: "Created successfully",
    });
  } catch (err) {
    return res.json({
      status: 400,
      error: err,
    });
  }
};

const getManyAssociation = async (req, res) => {
  try {
    const game = await db.game.findOne({
      where: {
        name: "Winter Showdown",
      },
      include: {
        model: db.gameTeam,
        include: [
          {
            model: db.player,
            through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
          },
          db.team,
        ],
      },
    });

    console.log(`Found game: "${game.name}"`);
    for (let i = 0; i < game.GameTeams.length; i++) {
      const team = game.GameTeams[i].Team;
      const players = game.GameTeams[i].Players;
      console.log(
        `- Team "${team.name}" played game "${game.name}" with the following players:`
      );
      console.log(players.map((p) => `--- ${p.username}`).join("\n"));
    }

    return res.json({
      status: 200,
      game: game,
    });
  } catch (err) {
    return res.json({
      status: 400,
      error: err,
    });
  }
};

module.exports = {
  createManyAssociation,
  getManyAssociation,
};
