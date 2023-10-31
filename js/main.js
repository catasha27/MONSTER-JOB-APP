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
                    <p id="job-experience" ><i class="fa-solid fa-user-check mr-2" aria-hidden="true"></i>Experience required: <span class="uppercase mr-1">${experience ? "yes" : "no"}</span></p>
                </div>
                <div class="flex flex-col md:flex-row gap-8 md:gap-28">
                    <div class="flex flex-col gap-3">
                        <p class="font-bold">Perks:</p>
                        <p id="job-time-off"><i class="fa-solid fa-plane-departure mr-2" aria-hidden="true"></i>PTO: ${pto} weeks</p>
                        <p id="job-allowance"><i class="fa-solid fa-hand-holding-dollar mr-2" aria-hidden="true"></i>Allowance: <span class="uppercase mr-1">${foodAllowance ? "yes" : "no"}</span></p>
                        <p id="job-training"><i class="fa-solid fa-graduation-cap mr-2" aria-hidden="true"></i>Training provided: <span class="uppercase mr-1">${inCompanyTraining ? "yes" : "no"}</span></p>
                    </div>
                    <div id="job-skills" class="flex flex-col gap-3">
                        <p class="font-bold">Skills:</p>
                        <ul role="list" class="marker:text-[#66C0D3ff] list-disc pl-5 space-y-3">
                            ${skills.map(skill => /*html*/`
                                <li>${skill}</li>
                                `).join("")
        }
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-end items-center gap-4 mt-4">
                <button id="btn-edit-job" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-5 bg-lime-600 hover:bg-green-700/90 rounded-md" aria-label="Edit job data" onclick="showEditJobForm()"><i class="fa-regular fa-pen-to-square mr-2" aria-hidden="true"></i>Edit</i></button>
                <button id="btn-delete-job" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-3 bg-purple-900  hover:bg-red-700/90 rounded-md" aria-label="Delete job" onclick="showDeleteModal('${id}', '${position}')"><i class="fa-solid fa-trash mr-2" aria-hidden="true"></i>Delete</button>
            </div>
        </div>
    </article>
    `
}

const renderDeleteModal = (id, position) => {
    $("#delete-job-modal").innerHTML = /*html*/`
    <article class="p-4 bg-white rounded-md">
        <h5 class="text-lg mb-8">¿Are you completely sure you want to delete this job position: <span class="job-position font-medium">${position}</span>?</h5>
        <div class="flex flex-row justify-end items-center gap-4">
            <button id="btn-cancel-modal" class="btn justify-center items-center text-base hover:text-slate-50 mt-4 py-2 px-5 bg-slate-300 hover:bg-slate-500  rounded-md" aria-label="Cancel deleting job" onclick="closeModal()">Cancel
            </button>
            <button id="btn-delete-modal" class="btn flex justify-center items-center text-slate-50 text-base mt-4 py-2 px-3 bg-purple-900  hover:bg-red-700/90 rounded-md" aria-label="Delete job confirmation" onclick="deleteSelectedJob('${id}')"><i class="fa-solid fa-trash mr-2" aria-hidden="true"></i>Delete</button>
        </div>
    </article>
    `
}

const getJobFormData = () => {
    return {
        id: $("#job-id").value,
        position: $("#job-title-entry").value,
        description: $("#job-description-entry").value,
        location: $("#location-option").value,
        type: $("#monster-option").value,
        workload: $("#workload-option").value,
        img: $("#job-image-url").value,
        salary: $("#salary").value,
        experience: $("#valid-experience").checked,
        perks: {
            pto: $("#vacation").value,
            foodAllowance: $("#valid-allowance").checked,
            inCompanyTraining: $("#valid-training").checked,
        },
        skills: [...$$("#skill-options-container input")].filter(input => input.checked).map(input => input.value)
    }
}

const setJobFormData = ({
    id,
    position,
    description,
    location,
    type,
    workload,
    img,
    salary,
    experience,
    perks: { pto, foodAllowance, inCompanyTraining },
    skills
}) => {
    $("#job-id").value = id
    $("#job-title-entry").value = position
    $("#job-description-entry").value = description
    $("#location-option").value = location
    $("#monster-option").value = type
    $("#workload-option").value = workload
    $("#job-image-url").value = img
    $("#salary").value = salary
    $("#valid-experience").checked = experience
    $("#vacation").value = pto
    $("#valid-allowance").checked = foodAllowance
    $("#valid-training").checked = inCompanyTraining
        ;[...$$("#skill-options-container input")].forEach(input => {
            if (skills.includes(input.value)) {
                input.checked = true
            }
        });

}


// EVENTS

const initializeApp = () => {
    searchJobs()
    $("#btn-search-filter").addEventListener("click", filterJobs)
    $("#monster-type-menu").addEventListener("change", selectMonster)
    $("#location-menu").addEventListener("change", selectLocation)
    $("#workload-menu").addEventListener("change", selectWorkload)
    $("#btn-reset-filter").addEventListener("click", clearFilter)
    $("#btn-new-job-data").addEventListener("click", submitJob)
    $("#btn-edit-job-data").addEventListener("click", submitJob)
    ;[...$$("#skill-options-container input")].forEach(input => {
        input.addEventListener("change", validateSkills)
    });
}

const searchJobs = async (criteria, value) => {
    disableFilters()
    hideElements(["#job-cards-wrapper"])
    showElements(["#loader"])
    const jobs = await getJobs(criteria, value)
    hideElements(["#loader"])
    renderJobs(jobs)
    showElements(["#filter-wrapper", "#job-cards-wrapper"])
    enableFilters()
}

const clickOnBurger = () => {
    showElements(["#nav-menu-container", "#close-burger-menu"])
    hideElements(["#show-burger-menu"])
}

const clickOnClose = () => {
    hideElements(["#nav-menu-container", "#close-burger-menu"])
    showElements(["#show-burger-menu"])
}

$("#btn-menu").addEventListener("click", () => {
    if ($("#show-burger-menu").classList.contains("hidden")) {
        clickOnClose()
    } else {
        clickOnBurger()
    }
})

$("#new-job-link").addEventListener("click", () => {
    $("#job-form").reset()
    showElements(["#job-form-wrapper", "#new-job-title", "#btn-new-job-data"])
    hideElements(["#filter-wrapper", "#job-cards-wrapper", "#job-detail-wrapper", "#edit-job-title", "#btn-edit-job-data"])
})

const showDetails = async (id) => {
    hideElements(["#job-cards-wrapper", "#filter-wrapper"])
    showElements(["#loader"])
    const job = await getJob(id)
    showElements(["#job-detail-wrapper"])
    hideElements(["#loader"])
    renderDetails(job)
    setJobFormData(job)
}

const disableFilters = () => {
    $("#monster-type-menu").disabled = true
    $("#location-menu").disabled = true
    $("#workload-menu").disabled = true
    $("#btn-search-filter").disabled = true
    $("#btn-reset-filter").disabled = true
}

const enableFilters = () => {
    $("#monster-type-menu").disabled = false
    $("#location-menu").disabled = false
    $("#workload-menu").disabled = false
    $("#btn-search-filter").disabled = false
    $("#btn-reset-filter").disabled = false
}

const selectMonster = () => {
    $("#location-menu").value = ""
    $("#workload-menu").value = ""
}

const selectLocation = () => {
    $("#monster-type-menu").value = ""
    $("#workload-menu").value = ""
}

const selectWorkload = () => {
    $("#monster-type-menu").value = ""
    $("#location-menu").value = ""
}

const filterJobs = async (e) => {
    e.preventDefault()
    const monster = $("#monster-type-menu").value
    const location = $("#location-menu").value
    const workload = $("#workload-menu").value
    let criteria = ""
    let value = ""
    if (monster) {
        criteria = "type"
        value = monster
    } else if (location) {
        criteria = "location"
        value = location
    } else if (workload) {
        criteria = "workload"
        value = workload
    }
    searchJobs(criteria, value)
}

const clearFilter = () => {
    $("#filter-form").reset()
    searchJobs()
}

const showDeleteModal = (id, position) => {
    hideElements(["#job-detail-wrapper", "#job-form-wrapper"])
    showElements(["#delete-job-modal"])
    renderDeleteModal(id, position)
}

const deleteSelectedJob = async (id) => {
    hideElements(["#delete-job-modal"])
    showElements(["#loader"])
    await deleteJob(id)
    searchJobs()
}

const closeModal = () => {
    hideElements(["#delete-job-modal"])
    searchJobs()
}

const submitJob = async (e) => {
    e.preventDefault()
    const newJob = getJobFormData()
    hideElements(["#job-form-wrapper", "#job-detail-wrapper"])
    showElements(["#loader"])
    if (newJob.id) {
        await editJob(newJob)
    } else {
        await createJob(newJob)
    }
    searchJobs()
}

const showEditJobForm = () => {
    showElements(["#job-form-wrapper", "#edit-job-title", "#btn-edit-job-data"])
    hideElements(["#new-job-title", "#btn-new-job-data"])
}

const validateSkills = () => {
    const inputs = [...$$("#skill-options-container input")]
    const numSelected = inputs.filter(input => input.checked).length
    if(numSelected >= 3) {
        inputs.forEach(input => input.disabled = !input.checked)
    }else {
        inputs.forEach(input => input.disabled = false)
    }
}

window.addEventListener("load", initializeApp)