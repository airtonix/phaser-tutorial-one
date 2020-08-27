import { AxiosResponse } from 'axios'

import { ApiClient } from '~/Core/api'

import { IMapData } from './MapModel'
import { MapdataRequestError } from './Exceptions'

export function GetLevelData (key: string): Promise<IMapData> {
  return ApiClient.get<IMapData, AxiosResponse<IMapData>>(key)
    .then(({ data }) => data)
    .catch(error => {
      throw new MapdataRequestError(error)
    })
}
