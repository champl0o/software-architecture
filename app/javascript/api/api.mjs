
const delay = ms => new Promise(res => setTimeout(res, ms));
import getAPIConfig from './apiConfig.mjs'
const APIConfig = getAPIConfig();

const fetchJSON = async (endpoint, options) => {
    const urlencoded = new URLSearchParams();
    if(options.body) {
        Object.keys(options.body).forEach(key => {
            urlencoded.append(key, options.body[key]);
        });
        options.body = urlencoded;
    }
    options.credentials ='include';

    if(!options.headers) options.headers = {};
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        console.log(endpoint, options, data)

        if (!response.ok) {
            throw {
                message: data && data.message,
                status: response.status
            }
        } else {
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

const getSlots = async () => {
    return [{
        day: 'Понеділок',
        time: [{
            from: '11:00',
            to: '12:00'
        }, {
            from: '14:00',
            to: '18:00'
        }]
    }, {
        day: 'Вівторок',
        time: [{
            from: '12:00',
            to: '18:00'
        }]
    }]
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

const searchUsers = async (sortBy) => {
    const responce =  await fetchJSON(
        `${APIConfig.url}${APIConfig.endpoints.usersSearch}?
        ${new URLSearchParams({
            sort: "rating",
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

const getSchedules = async () => {
    const responce =  await fetchJSON(`${APIConfig.url}${APIConfig.endpoints.schedulesList}`, {
        method: 'GET'
    });
    return responce;
}


export default {
    getConsultants, getSlots, getCities, getSpecialisations, searchUsers, getConsultations, getSchedules
};