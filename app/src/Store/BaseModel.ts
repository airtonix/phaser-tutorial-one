import { plainToClassFromExist } from 'class-transformer'

export interface IBaseModel {
  id: string
}

export interface IModelProps {
  [x: string]: any
}

export class BaseModel implements IBaseModel {
  id: string

  constructor (props: IModelProps = {}) {
    plainToClassFromExist(this, props)
  }
}