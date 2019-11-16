import config from './_config';

/** 
 * 실제로 빈 값인지 검사하는 메서드
 * 빈객체 or 빈문자열 or null or undefined 인 경우 빈 값임
 * false or 0 인 경우는 빈값이 아님
 * @method
 * @param
 * @return {String}
*/
// const isEmpty = (value) => {
//     if ((value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) && value != 0) {
//         return true;
//     } else {
//         return false;
//     }
// };
const isEmpty = (value) => {
    if (value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    } else {
        return false;
    }
};

/** 
 * api 서버 주소:포트 가져오기
 * @method
 * @param
 * @return {String}
*/
const getApiServer = () => {
    return (config.apiServerHost + ':' + config.apiServierPort);
}

/** 
 * fetch 요청보내기
 * @method
 * @param {Object} - {method, path, payload, cb} 메소드(GET, POST), 요청경로, 바디, 콜백
*/
const doFetch = async (obj) => {
    // method, path, payload, cb
    try {
        let options = {
            method: obj.method.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        if (obj.method.toUpperCase() === 'POST') {
            options.body = JSON.stringify(obj.payload);
        }
        let response = await fetch(getApiServer() + obj.path, options);
        let responseJson = await response.json();
        obj.cb(responseJson);
    } catch (e) {
        console.error(e);
    }
}

/** 
 * yyyyMMddhhssmm 를 yyyy-MM-dd hh:mm 형식으로 반환
 * @method
 * @param {String} dateStr - 문자열로 된 시각
 * @return {String} - 포멧화된 시각
*/
const getTimeFormat = (dateStr) => {
    let year = dateStr.substring(0,4);
    let month = dateStr.substring(4,6);
    let day = dateStr.substring(6,8);
    let hour = dateStr.substring(8,10);
    let minute = dateStr.substring(10,12);
    let second = dateStr.substring(12,14);
    let res = `${year}-${month}-${day} ${hour}:${minute}`;
    return res;
}






const postPicture = function () {
    console.log("postPicture 실행");
    const apiUrl = `${getApiServer()}/post?postno=${this.state.postno}`;
    const uri = this.state.image;
    console.log(apiUrl);
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });
    // formData.append('postno', this.state.postno);
    // console.log("this.state.postno : " , this.state.postno);
    const options = {
        method: 'PUT',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };
    return fetch(apiUrl, options);
}

const postDocument = () => {
    const apiUrl = `${getApiServer()}/upload`;
    const { name, uri } = this.state.image;
    const uriParts = name.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append('document', {
        uri,
        name,
        type: `application/${fileType}`,
    });
    const options = {
        method: 'POST',
        body: formData,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        },
    };
    return fetch(apiUrl, options);
}

/** 
 * 현재 날짜 가져오기
 * @method
 * @param
 * @return {String}
*/
const getToday = () => {
    const date = new Date(); 
    let year = (date.getFullYear()).toString(); 
    let month = (date.getMonth()+1).toString(); 
    let day = (date.getDate()).toString(); 

    // 한자리수일 경우 0을 채워준다. 
    if(month.length == 1){ 
        month = "0" + month; 
    } 
    if(day.length == 1){ 
        day = "0" + day; 
    } 
    return (year + "" + month + "" + day);
}

/** 
 * 현재 날짜로부터 일정 날짜 이전 날짜 구하기
 * @method
 * @param {Object} - y: 년, m: 월, d: 일
 * @return {String}
*/
const getPastDate = ({y=0, m=0, d=0} = {}) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    // 입력받은 년/월/일을 더함
    date.setFullYear(year + parseInt(y));
    date.setMonth(month + parseInt(m));
    date.setDate(day + parseInt(d));

    year = (date.getFullYear()).toString();
    month = (date.getMonth()+1).toString();
    day = (date.getDate()).toString();

    // 한자리수일 경우 0을 채워준다. 
    if(month.length == 1){ 
        month = "0" + month; 
    } 
    if(day.length == 1){
        day = "0" + day; 
    } 

    return (year + "" + month + "" + day);
}

export default {
    isEmpty,
    getApiServer,
    doFetch,
    getTimeFormat,
    postPicture,
    postDocument,
    getToday,
    getPastDate
}