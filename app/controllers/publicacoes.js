const axios = require('axios')
const { validationResult } = require('express-validator')

module.exports = {
  async loadNews (req, res) {
    try {
      let response = await axios.get('http://localhost:3013/api/publish')
      res.render('./publicacao/noticias', { publish: response.data.results })
    } catch (error) {
      res.render('./master/error', {error: error})
    }    
  },

  async loadNew (req, res){
    try {
      let response = await axios.get(`http://localhost:3013/api/publish/${req.params.id}`)
      res.render('./publicacao/noticia', { publish: response.data.results })
    } catch (error) {
      res.render('./master/error', {error: error})
    }
  },
  
  async edit (req, res) {
    await axios({
      method: 'get',
      url   : `http://localhost:3013/api/publish/${req.params.id}`,
      data  : req.body
    })
      .then ( response => {
        res.render('./admin/editNew', { publish: response.data.results })
      })
      .catch ( error => {
        res.render('./master/error', { error: error })
      })
  },

  async editNew (req, res){
    let errors = validationResult(req)
    if(!errors.isEmpty()){
      res.redirect(`../edit/${req.params.id}`)
      return
    }
    await axios({
      method: 'put',
      url   : `http://localhost:3013/api/publish/${req.params.id}`,
      data  : req.body
    })
      .then ( response => {
        res.render('./publicacao/noticias', { publish: response.data.results })
      })
      .catch ( error => {
        res.render('./master/error', { error: error })
      })
  }
}
