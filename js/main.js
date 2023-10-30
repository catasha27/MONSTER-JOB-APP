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

// RENDERS

const renderJobs = (jobs) => {
    cleanContainer("#job-cards-wrapper")
    const jobsHTML = jobs.map(({ position, description, location, type, workload, img }) => /*html*/`
        <article class="flex flex-col p-4 bg-white drop-shadow-xl rounded-md w-80">
            <figure>
                <img id="job-image" src="${img}" class="rounded-md mb-3 h-64 w-full object-cover">
                <figcaption id="job-position" class="text-xl font-bold text-slate-900">${position}</figcaption>
            </figure>
            <div class="job-data mt-2">
                <p id="job-description" class="font-normal text-slate-800 mb-3 line-clamp-3">${description}</p>
                <p id="job-location" class="mb-2"><i class="fa-solid fa-earth-americas mr-1" aria-hidden="true"></i>${location}</p>
                <p id="job-workload" class="mb-3"><i class="fa-regular fa-clock mr-1" aria-hidden="true"></i>${workload}</p>
                <div>
                    <span id="monster-type" class="align-middle py-1 px-2.5 text-base font-normal bg-orange-200 border border-orange-600 rounded-full">${type}</span>
                </div>
            </div>
            <button id="btn-detailed-data" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-3 bg-lime-600 hover:bg-green-700/90 rounded-md" aria-label="Redirect to full job data">Details<i class="fa-solid fa-angles-right mt-[2px] ml-1" aria-hidden="true"></i></button>
        </article>
      `);
      $("#job-cards-wrapper").innerHTML = jobsHTML.join("")
}

// EVENTS

const initializeApp = async () => {
    const allJobs = await getJobs()
    hideElements(["#loader"])
    showElements(["#job-cards-wrapper"])
    renderJobs(allJobs)

}

window.addEventListener("load", initializeApp)