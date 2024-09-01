import { dbContext } from "../db/DbContext.js"



class CarsService {
  async getCars(query) {
    // const cars = await dbContext.Cars.find({ make: 'Chevrolet', color: 'red' }).populate('creator', 'name picture')
    const sortBy = query.order
    delete query.order

    const page = query.page || 1
    delete query.page
    const skipAmount = (page - 1) * 5

    const search = query.search
    delete query.search
    if (search) query.description = { $regex: new RegExp(search) }

    console.log('finding by', query);
    console.log('sorting by', sortBy);
    console.log('on page', page, skipAmount);
    console.log('searching description for', search)


    const cars = await dbContext.Cars.find(query).sort(sortBy + ' createdAt').skip(skipAmount).limit(5).populate('creator', 'name picture')
    const resultCount = await dbContext.Cars.countDocuments(query)
    return {
      query,
      sortBy,
      page: parseInt(page),
      totalPages: Math.ceil(resultCount / 5),
      count: resultCount,
      results: cars
    }
  }

}

export const carsService = new CarsService()
