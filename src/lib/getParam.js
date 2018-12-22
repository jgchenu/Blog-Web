import history from "@/router/history";
export default (key) => {
    let value = '';
    if (history.location.search) {
        let newArr = [];
        let arr = history.location.search.substr(1).split('&');
        arr.forEach(item => {
            newArr.push(...item.split('='))
        })
        let index = newArr.indexOf(key);
        if (!~index) {
            return value;
        }
        value = newArr[index + 1];
    }
    let obj = {
        'page': value || 1,
        'keyword': (value) || ''
    }
    value = obj[key];
    return value;
}