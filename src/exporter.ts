import {parse as json2csv} from 'json2csv'

export const toCsv = (data: any, opts: any) => json2csv(data, opts)
