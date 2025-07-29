const MY_LIST_KEY = "my_list";

export const getMyList = () => {
    try {
        const data = localStorage.getItem(MY_LIST_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const addToMyList = (movie) => {
    const list = getMyList();
    const updatedList = [...list, movie];
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(updatedList));
};

export const removeFromMyList = (movieId) => {
    const list = getMyList();
    const updatedList = list.filter((m) => m.id !== movieId);
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(updatedList));
};

export const isInMyList = (movieId) => {
    const list = getMyList();
    return list.some((m) => m.id === movieId);
};
