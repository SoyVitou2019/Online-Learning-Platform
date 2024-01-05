const apiUrl = import.meta.env.VITE_API_HOST;
export const END_POINTS = {
    USER: `${apiUrl}/user`,
    USER_SORT: `${apiUrl}/user?_sort=id&_order=asc`,
    USER_REQUEST: `${apiUrl}/user_request/`,
    COURSE: `${apiUrl}/course`,
    CATEGORY: `${apiUrl}/category`,
    KEY: `${apiUrl}/service_role`,
    YT: `${apiUrl}/youtube_key`,
    POST: `${apiUrl}/post`,
    FOLLOW: `${apiUrl}/follow`,
};
export default END_POINTS;
