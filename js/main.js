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
    const jobsHTML = jobs.map(({ position, description, location, type, workload, img, id }) => /*html*/`
        <article class="flex flex-col p-4 bg-white drop-shadow-xl rounded-md w-80">
            <figure>
                <img src="${img}" class="rounded-md mb-3 h-64 w-full object-cover">
                <figcaption class="text-xl font-bold text-slate-900">${position}</figcaption>
            </figure>
            <div class="job-data mt-2">
                <p class="font-normal text-slate-800 mb-3 line-clamp-3">${description}</p>
                <p class="mb-2"><i class="fa-solid fa-earth-americas mr-1" aria-hidden="true"></i>${location}</p>
                <p class="mb-3"><i class="fa-regular fa-clock mr-1" aria-hidden="true"></i>${workload}</p>
                <div>
                    <span class="align-middle py-1 px-2.5 text-base font-normal bg-orange-200 border border-orange-600 rounded-full">${type}</span>
                </div>
            </div>
            <button class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-3 bg-lime-600 hover:bg-green-700/90 rounded-md" aria-label="Redirect to full job data" onclick="showDetails('${id}')">Details<i class="fa-solid fa-angles-right mt-[2px] ml-1" aria-hidden="true"></i></button>
        </article>
      `);
    $("#job-cards-wrapper").innerHTML = jobsHTML.join("")
}

const renderDetails = ({ position, description, location, type, workload, img, id, salary, experience, perks: { pto, foodAllowance, inCompanyTraining }, skills }) => {
    $("#job-detail-wrapper").innerHTML = /*html*/`
    <article class="flex flex-col sm:flex-row gap-8 p-7 bg-white drop-shadow-xl rounded-md text-slate-800 w-auto 2xl:w-[1500px]">
        <img id="job-image" src="${img}" class="rounded-md mb-3 h-64 w-full xl:h-96 xl:w-auto object-cover">
        <div class="job-data flex flex-col gap-2">
            <div class="flex flex-col items-start sm:flex-row gap-3 mb-2">
                <h3 id="job-position" class="text-2xl sm:text-xl font-extrabold text-slate-900">${position}</h3>
                <span id="monster-type" class="items-center py-1 px-2.5 text-base font-semibold bg-orange-200 border border-orange-600 rounded-full">${type}</span>
            </div> <hr>
            <p class="font-bold ">Description:</p>
            <p id="job-description" class="font-normal mb-2">${description}</p> <hr>
            <div class="flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8">
                    <p id="job-location" ><i class="fa-solid fa-earth-americas mr-2" aria-hidden="true"></i>${location}</p>
                    <p id="job-workload" ><i class="fa-regular fa-clock mr-2" aria-hidden="true"></i>${workload}</p>
                    <p id="job-salary" ><i class="fa-solid fa-dollar-sign mr-2" aria-hidden="true"></i>${salary}</p>
                    <p id="job-experience" ><i class="fa-solid fa-user-check mr-2" aria-hidden="true"></i>Experience required: <span class="uppercase mr-1">${experience?"yes":"no"}</span></p>
                </div>
                <div class="flex flex-col md:flex-row gap-8 md:gap-28">
                    <div class="flex flex-col gap-3">
                        <p class="font-bold">Perks:</p>
                        <p id="job-time-off"><i class="fa-solid fa-plane-departure mr-2" aria-hidden="true"></i>PTO: ${pto} weeks</p>
                        <p id="job-allowance"><i class="fa-solid fa-hand-holding-dollar mr-2" aria-hidden="true"></i>Allowance: <span class="uppercase mr-1">${foodAllowance?"yes":"no"}</span></p>
                        <p id="job-training"><i class="fa-solid fa-graduation-cap mr-2" aria-hidden="true"></i>Training provided: <span class="uppercase mr-1">${inCompanyTraining?"yes":"no"}</span></p>
                    </div>
                    <div id="job-skills" class="flex flex-col gap-3">
                        <p class="font-bold">Skills:</p>
                        <ul role="list" class="marker:text-[#66C0D3ff] list-disc pl-5 space-y-3">
                            ${
                                skills.map(skill => /*html*/`
                                <li>${skill}</li>
                                `).join("")
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-end items-center gap-4 mt-4">
                <button id="btn-edit-job" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-5 bg-lime-600 hover:bg-green-700/90 rounded-md" aria-label="Edit job data"><i class="fa-regular fa-pen-to-square mr-2" aria-hidden="true"></i>Edit</i></button>
                <button id="btn-delete-job" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-3 bg-purple-900  hover:bg-red-700/90 rounded-md" aria-label="Delete job"><i class="fa-solid fa-trash mr-2" aria-hidden="true"></i>Delete</button>
            </div>
        </div>
    </article>
    `
}



// EVENTS

const initializeApp = async () => {
    const allJobs = await getJobs()
    hideElements(["#loader"])
    showElements(["#job-cards-wrapper"])
    renderJobs(allJobs)



}

const showDetails = async (id) => {
    hideElements(["#job-cards-wrapper", "#filter-wrapper"])
    showElements(["#loader"])
    const job = await getJob(id)
    showElements(["#job-detail-wrapper"])
    hideElements(["#loader"])
    renderDetails(job)
}



window.addEventListener("load", initializeApp)