import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class AlbumsService {


  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    if (!album) throw new Error(`No Album with id: ${albumId}`)
    return album
  }

  async archiveAlbum(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)
    if (albumToArchive.creatorId != userId) throw new Forbidden("Could not archive, Improper access to Album")

    albumToArchive.archived = !albumToArchive.archived
    await albumToArchive.save()
    return albumToArchive
  }
}

export const albumsService = new AlbumsService()
