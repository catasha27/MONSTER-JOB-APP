const API_URL = "https://65392c60e3b530c8d9e80c6d.mockapi.io/jobs"

const delayResponse = (data) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(data)
    }, 2000)
})

const getJobs = (filterCriteria, filterValue) => {
    const url = new URL(API_URL);
    if (filterCriteria) {
        url.searchParams.append(filterCriteria, filterValue)
    }

    const jobs = fetch(url)
        .then((response) => response.json())
        .then(delayResponse)
    return jobs
}

const getJob = (id) => {
    const url = new URL(API_URL + "/" + id);

    const job = fetch(url)
        .then((response) => response.json())
        .then(delayResponse)
    return job
}

const deleteJob = (id) => {
    const url = new URL(API_URL + "/" + id);

    const job = fetch(url, { method: "DELETE" })
        .then((response) => response.json())
        .then(delayResponse)
    return job
}

const createJob = (job) => {
    const url = new URL(API_URL);

    const newJob = fetch(url, { 
        method: "POST", 
        body: JSON.stringify(job), 
        headers: { 'content-type': 'application/json' }
    })
        .then((response) => response.json())
        .then(delayResponse)
    return newJob
}

const editJob = (job) => {
    const url = new URL(API_URL + "/" + job.id);

    const editJob = fetch(url, { 
        method: "PUT", 
        body: JSON.stringify(job), 
        headers: { 'content-type': 'application/json' }
    })
        .then((response) => response.json())
        .then(delayResponse)
    return editJob
}