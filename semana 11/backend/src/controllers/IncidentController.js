const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.email', 'ongs.name', 'ongs.whatsapp', 'ongs.uf'])
    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  },
  async create(request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    })

    return response.json({ id })

  },
  async delete(req, res) {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operation not permited" })
    }

    await connection('incidents').where('id', id).delete()

    return res.status(204).send()
  }
}