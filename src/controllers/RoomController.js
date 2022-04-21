const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password

    let roomId
    let isRoom = true

    while (isRoom) {
      for (let i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toLocaleString())
          : (roomId += Math.floor(Math.random() * 10).toLocaleString())
      }

      /* verificando se o id da sala ja existe */
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)

      isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId)

      /* adiciona a sala no banco de dados */
      if (!isRoom) {
        await db.run(`INSERT INTO rooms (
        id,
        pass
      ) VALUES (
        ${parseInt(roomId)},
        "${pass}"
      )`)
      }
    }

    await db.close(``)

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * from questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * from questions WHERE room = ${roomId} and read = 1`
    )

    let isNoQuestion 

    if(questions.length == 0){
      if(questionsRead.length == 0){
        isNoQuestion = true
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestion: isNoQuestion
    })
  },

  enter(req, res){
    
    const roomId = req.body.roomId
    res.redirect(`/room/${roomId}`)

  }
}
