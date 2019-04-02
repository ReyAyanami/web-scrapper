import {HTMLElement, parse} from 'node-html-parser'
import {oc} from 'ts-optchain'

const parseHtml = (content: string) => parse(content) as HTMLElement

const getCompanyName = (element: HTMLElement) => element.querySelector('.company-name a').text.trim()

const getCompanyLink = (element: HTMLElement) => element.querySelector('.website-link.website-link-a a').attributes.href

const getCompanyAttribute = (attr: string) => (element: HTMLElement) =>
  oc(element.querySelector(attr)).text('').trim()

const getCompanyPricing = getCompanyAttribute('.firm-pricing')
const getCompanyEmployees = getCompanyAttribute('.firm-employees')
const getCompanyFounded = getCompanyAttribute('.firm-founded')
const getCompanyLocation = getCompanyAttribute('.firm-location')

const parseCompany = (element: HTMLElement) => ({
  name: getCompanyName(element),
  link: getCompanyLink(element),
  pricing: getCompanyPricing(element),
  employees: getCompanyEmployees(element),
  founded: getCompanyFounded(element),
  location: getCompanyLocation(element)
})

export const extractCompaniesFromPage = (page: string) =>
  parseHtml(page).querySelectorAll('.provider-row').map(parseCompany)

