import {extractCompaniesFromPage} from './parse'
import {paginator} from './fetcher'
import {flat} from './common'
import {toCsv} from './exporter'
import * as fs from 'fs'

const run = async () => {
  const pages = await paginator(
    'some url',
    43
  )
  const csv = toCsv(
    flat(pages.map(extractCompaniesFromPage)),
    //todo: extract fields from parser
    ({fields: ['name', 'link', 'pricing', 'employees', 'founded', 'location']})
  )
  fs.writeFileSync('./results.csv', csv)
}

run()
