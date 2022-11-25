
const delay = ms => new Promise(res => setTimeout(res, ms));
import getAPIConfig from './apiConfig.mjs'
const APIConfig = getAPIConfig();

const fetchJSON = async (endpoint, options) => {
    options.credentials ='include';

    if(!options.headers) options.headers = {};
    options.headers['Content-Type'] = 'application/json';

    try {
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            throw {
                message: data && data.message,
                status: response.status
            }
        } else {
            const data = await response.json();
            console.log(endpoint, options, data)

            return data.data;
        }
    } catch(error)  {
        console.warn(`API error: ${error}`);
        return {error};
    };

}

const getConsultants = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.usersList}`, {
        method: 'GET'
    });
    return responce;
    return [
        {
            name: 'Фаїна',
            surname: 'Мацюк',
            specialisation: 'Психолог, психотерапевт',
            experience: 'Практикуючий психолог, учасник проекту кататимно-імагінативної психотерапії, працюю в напрямку психоаналізу і символдрами. Допомагаю вийти зі складних життєвих ситуацій, подолати особистісні обмеження, внутрішні конфлікти і активізувати психічні ресурси.',
            rating: 4.93,
            slots: [
                {
                    title: 'Первинна консультація',
                    duration: '1 год. 30 хвилин',
                    description: 'На даній консультації ми обговорюємо Ваш запит, формуємо стратегію та ставимо цілі на подальшу терапію',
                },
                {
                    title: 'Консультація',
                    duration: '1 год.',
                },
                {
                    title: 'Парна консультація',
                    duration: '1 год. 30 хвилин'
                }
            ]
        },
        {
            name: 'Конон',
            surname: 'Яблонський',
            specialisation: 'Юрист-консультант, нотаріус',
            experience: 'Адвокатські послуги у сферах господарського, цивільного, сімейного, трудового, житлового, спадкового, корпоративного, податкового та кримінального права, операцій з нерухомістю. Юридичні консультації.',
            rating: 5.00,
        },
        {
            name: 'Лідія',
            surname: 'Грабовська',
            specialisation: 'Дієтолог',
            experience: 'Спеціалізуюсь на дієтології. Займаюсь корекцією харчування відповідно до патологічного стану пацієнта (цукровий діабет, гормональні порушення, метаболічні розлади, розлади харчової поведінки). Веду прийом дорослих і дітей.',
            rating: 4.87,
        },
        {
            name: 'Євген',
            surname: 'Кушніренко',
            specialisation: 'Психолог, психотерапевт',
            experience: 'Практикуючий психолог, учасник проекту кататимно-імагінативної психотерапії, працює в напрямку психоаналізу і символдрами. Допомагає вийти зі складних життєвих ситуацій, подолати особистісні обмеження, внутрішні конфлікти і активізувати психічні ресурси.',
            rating: 4.96,
        }
    ]
};

const getCities = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.citiesList}`, {
        method: 'GET'
    });
    return responce;
};

const getSpecialisations = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.specialisationsList}`, {
        method: 'GET'
    });
    return responce;
};

const searchUsers = async (sort, filter, search) => {
    console.log("searchUsers", sort, filter, search)
    const responce =  await fetchJSON(
        `${APIConfig.url}${APIConfig.endpoints.usersSearch}?${new URLSearchParams({
            sort: sort, filter: filter, search: search
        })}`, {
        method: 'GET',
    });
    return responce;
}

const getConsultations = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.consultationsList}`, {
        method: 'GET'
    });
    return responce;
}

const createConsultations = async ({appointment_time, issue, consultation_definition_id, user_id, consultant_id}) => {
    const responce =  await fetchJSON(
        `${APIConfig.url}${APIConfig.endpoints.consultationsList}`, {
        method: 'POST',
        body: JSON.stringify({
            "consultation": {
              "appointment_time": appointment_time,
              "issue": issue,
              "consultation_definition_id": consultation_definition_id,
              "user_id": user_id,
              "consultant_id": consultant_id
            }
        })
    });
    console.log("createConsultations", responce)
    return responce;
}

const getSchedules = async (id) => {
    console.log("getSchedules ID", id)
    const responce =  await fetchJSON(
        `${APIConfig.url}${APIConfig.endpoints.schedulesList}?consultant_id=${id}`, {
        method: 'GET',
    });
    return responce;
}

const getConsultationTypes = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.consultationDefinitions}`, {
        method: 'GET'
    });
    return responce;
}

const createSchedule = async ({consultant_id, day, start_time, end_time}) => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.schedulesList}`, {
        method: 'POST',
        body: JSON.stringify({
            "schedule": {
                "consultant_id": consultant_id,
                "day": day,
                "start_time": start_time,
                "end_time": end_time,
            }
        })
    });
    return responce;
}

const createConsultationType = async ({consultant_id, title, description, duration}) => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.consultationDefinitions}`, {
        method: 'POST',
        body: JSON.stringify({
            "consultation_definition": {
                "consultant_id": consultant_id,
                "title": title,
                "description": description,
                "duration": duration,
            }
        })
    });
    return responce;
}

const deleteConsultationType = async ({id}) => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.consultationDefinitions}/${id}`, {
        method: 'DELETE',
    });
    return responce;
}

const deleteSchedule = async ({id}) => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.schedulesList}/${id}`, {
        method: 'DELETE',
    });
    return responce;
}

const deleteConsultation = async ({id}) => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.consultationsList}/${id}`, {
        method: 'DELETE',
    });
    return responce;
}

export default {
    getConsultants, 
    getCities, 
    getSpecialisations, 
    searchUsers, 
    getConsultations, 
    getSchedules, 
    getConsultationTypes,
    createConsultations,
    createSchedule,
    createConsultationType,
    deleteConsultationType, 
    deleteSchedule, 
    deleteConsultation, 
};