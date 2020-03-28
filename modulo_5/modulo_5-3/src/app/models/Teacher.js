const { date } = require("../../lib/utils")
const Intl = require('intl')
const db = require('../../config/db')

module.exports = {
  all(callback) {

    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      GROUP BY teachers.id
      ORDER BY teachers.name ASC`, function(err, results){
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows)
    })

  },
  create(data, callback) {
    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        level,
        classtype,
        area,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.level,
      data.classtype,
      data.area,
      date(Date.now()).iso
    ]
  
    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
      if(err) return res.send("Database Error!")
      
      callback(results.rows[0])
    })
  },findBy(filter, callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.area ILIKE '%${filter}%'
      GROUP BY teachers.id
      ORDER BY teachers.name ASC`, function(err, results){
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE teachers SET 
        avatar_url=($1),
        name=($2),
        birth=($3),
        level=($4),
        classtype=($5),
        area=($6)
      WHERE id = $7
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.level,
      data.classtype,
      data.area,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`
      
      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`
      
      return callback()
    })
  }
}