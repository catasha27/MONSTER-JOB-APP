// UTILITIES
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const hideElements = (selectors) => {
    for (const eachSelector of selectors) {
        $(eachSelector).classList.add('hidden')
    }
}

const showElements = (selectors) => {
    for (const eachSelector of selectors) {
        $(eachSelector).classList.remove('hidden')
    }
}

const cleanContainer = (selector) => $(selector).innerHTML = ""

