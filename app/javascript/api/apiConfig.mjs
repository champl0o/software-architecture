export default () => {
    return {
        url: 'http://localhost:3000',
        errorStatuses: [400, 403, 404, 500],
        endpoints: {
            usersList: '/api/v1/users',
            citiesList: '/api/v1/data/cities',
            specialisationsList: '/api/v1/data/specialisations',
            usersSearch: '/api/v1/users/search',
            consultationsList: '/api/v1/consultations',
            schedulesList: '/api/v1/schedules',
        }
    }
}
