export const homepage = () => {
  location.href = "./index.html";
};
export const search_data = async (url) => {
    let promise = await fetch(url);
    let respose = await promise.json();
    return respose.data;
};
