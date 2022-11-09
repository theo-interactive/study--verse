import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../entities/pictures.entity'

@Service()
export default class PicturesService {
  public getPicture(id: number) {
    // return dataSource.getRepository(PicturesEntity).findOne({ where: { id } })
    const query = dataSource
      .getRepository(PicturesEntity)
      .createQueryBuilder('pictures')
      .where({ id })
    return query.getOne()
  }

  public getPictureByIdAndSelect(id: number) {
    const query = dataSource
      .getRepository(PicturesEntity)
      .createQueryBuilder('pictures')
      .select(['pictures.id', 'pictures.url'])
      .where({ id })
    return query.getOne()
  }

  public addPicture(
    name: string,
    stored_name: string,
    stored_path: string,
    mime_type: string,
    url: string
  ) {
    const picture = new PicturesEntity()
    picture.name = name
    picture.stored_name = stored_name
    picture.stored_path = stored_path
    picture.mime_type = mime_type
    picture.url = url
    return picture.save()
  }

  public addUploadFile(uploadFile: any) {
    return this.addPicture('','','','','')
  }

  public addUploadFileWithS3(uploadFile: any) {
    return this.addPicture('','','','','')
  }

  public removePicture(picture: PicturesEntity) {
    return dataSource.getRepository(PicturesEntity).remove(picture)
  }
}