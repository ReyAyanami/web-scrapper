import axios from 'axios'

export const getPage = async (url: string) => {
  return (await axios.get(url)).data
}

//todo: refactor to async iterable https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html
export const paginator = (
  base: string,
  to: number,
  from = 1,
  strategy = (base: string, page: number) => `${base}?page=${page}`
) => {
  const pages = []
  for(let currentPage = from; currentPage <= to; currentPage++) {
    pages.push(currentPage)
  }
  return Promise.all(pages.map(it => getPage(strategy(base, it))))
}
