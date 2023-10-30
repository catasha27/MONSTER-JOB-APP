const API_URL = "https://65392c60e3b530c8d9e80c6d.mockapi.io/jobs"

const getJobs = (filterCriteria, filterValue) => {
    const url = new URL(API_URL);
    if (filterCriteria) {
        url.searchParams.append(filterCriteria, filterValue)
    }

    const jobs = fetch(url)
        .then((response) => response.json())
    return jobs
}

const getJob = (id) => {
    const url = new URL(API_URL + "/" + id);

    const job = fetch(url)
        .then((response) => response.json())
    return job
}
