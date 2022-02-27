module.exports = {
  ifCond: (v1, operator, v2, options) => {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this)
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this)
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this)
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this)
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this)
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this)
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this)
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this)
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this)
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this)
      default:
        return options.inverse(this)
    }
  },

  checkNull: (v, options) => {
    return v == null ? options.fn(this) : options.inverse(this)
  },

  section: function (name, options) {
    if (!this._sections) this._sections = {}
    this._sections[name] = options.fn(this)
    return null
  },
  makeLink: function (value, options) {
    return value.toUpperCase()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
  },
  json: function (context) {
    return JSON.stringify(context)
  },
  inc: function (number) {
    return parseInt(number) + 1
  },
  durationConv: (duration) => {
    duration = parseInt(duration)
    let days = Math.floor(duration / (3600 * 24))
    duration -= days * 3600 * 24
    let hours = Math.floor(duration / 3600)
    duration -= hours * 3600
    let minutes = Math.floor(duration / 60)
    duration -= minutes * 60
    if (days === 0 && hours === 0)
      return `${minutes} dk ${duration} sn`
    return `${hours * days} sa ${minutes} dk`
  },
  dateConv: (date) => {
    date = Date.now() - date
    date /= 1000
    if (date < 60)
      return Math.round(date) + " Saniye önce"
    date /= 60
    if (date < 60)
      return Math.round(date) + " Dakika önce"
    date /= 60
    if (date < 24)
      return Math.round(date) + " Saat önce"
    date /= 24
    if (date < 7)
      return Math.round(date) + " Gün önce"
    if (date < 30)
      return Math.round(date / 7) + " Hafta önce"
    date /= 30
    if (date < 12)
      return Math.round(date) + " Ay önce"
    date /= 12
    return Math.round(date) + " Yıl önce"
  }
}