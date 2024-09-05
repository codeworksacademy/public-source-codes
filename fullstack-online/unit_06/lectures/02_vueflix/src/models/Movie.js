
let USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export class Movie {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.overview = data.overview
    this.popularity = data.popularity
    this.reviewScore = data.vote_average
    this.releaseDate = new Date(data.release_date)
    this.poster = `https://media.themoviedb.org/t/p/original${data.poster_path}`
    this.backdrop = `https://media.themoviedb.org/t/p/original${data.backdrop_path}`
  }

}


export class FullMovie extends Movie {
  constructor(data) {
    super(data)
    this.tagline = data.tagline
    this.productionCompanies = data.production_companies
    this.genres = data.genres
    this.status = data.status
    this.runtime = data.runtime
    this.revenue = data.revenue
    this.budget = data.budget
    this.homepage = data.homepage
  }

  get revenueFormat() {
    return USD.format(this.revenue)
  }

  get budgetFormat() {
    return USD.format(this.budget)
  }

  get estimatedProfits() {
    return USD.format(this.revenue - this.budget)
  }
}
