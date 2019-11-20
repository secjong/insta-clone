import config from './_config';

/** 
 * 실제로 빈 값인지 검사하는 메서드
 * 빈객체 or 빈문자열 or null or undefined 인 경우 빈 값임
 * false or 0 인 경우는 빈값이 아님
 * @method
 * @param {Any} value - 검사할
 * @return {Boolean} - 빈값 여부
*/
let isEmpty = (value) => {
    if (
        value === "" 
        || value === null 
        || value === undefined 
        || ( value !== null && typeof value === "object" && !Object.keys(value).length)
    ) {
        return true;
    } else {
        return false;
    }
};

/** 
 * 타입체크
 * @method
 * @param {Any} input - 체크할 대상
 * @param {String} type - 체크할 타입
 * @return {Boolean} 타입일치 여부
*/
const checkType = (input, type) => {
    //인자가 부족할 경우 반환
    if(isEmpty(input) || isEmpty(type)){
        throw Error("checkType 인자가 부족합니다.");
    }
    const typeList = ["number", "string", "object", "function", "boolean", "undefined"];
    let typeFlag = false;

    //두번째 인자 검사
    for(v of typeList){
        if(v === type){
            typeFlag = true;
        }
    }

    //두번째 인자 유효하지 않은 경우
    if(!typeFlag){
        throw Error(type + " 은 정상적인 타입이 아닙니다.");
    }

    //실제 타입검사
    if(typeof input === type){
        return true;
    } else {
        return false;
        // throw Error(input + " 의 타입이 " + type + " 이 아닙니다.");
    }
};

/** 
 * Object의 각 프로퍼티들이 Json String 형태인 경우 JSON.parse 수행하여 반환
 * @method
 * @param {Object} obj - json으로 파싱할 대상 Object
 * @return {Object} - 파싱 완료한 Object
*/
function checkAndParseJson(obj) {
    for (v in obj) {
        let checkJson = false;
        try {
            checkJson = JSON.parse(obj[v]);
        } catch (e) {
            // console.log("프로퍼티는 JSON String 이 아닙니다.");
        }
        if (!!checkJson && typeof checkJson == "object") {
            obj[v] = JSON.parse(obj[v]);
        }
    }
    return obj;
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
 * yyyyMMddhhssmm 를 yyyy-MM-dd hh:ss:mm 형식으로 반환
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
    let res = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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

/** 
 * 숫자여부 체크(숫자형태 문자열, 띄어쓰기 불가능)
 * @method
 * @param {String} str - 체크할 문자열
 * @return {Boolean} - 숫자여부
*/
const isNumber = (str) => {
   const regExp = /^[0-9]+$/;
   return regExp.test(str);
}

/** 
 * 한글여부 체크(ㄱㄴㄷ... 형식으로는 입력 불가능)
 * @method
 * @param {String} str - 체크할 문자열
 * @param {String} type - 0 또는 입력안할시: 띄어쓰기 불가능, 1: 띄어쓰기 가능
 * @return {Boolean} - 한글여부
*/
const isKorean = (str, type) => {
    let regExp = null;
    if(isEmpty(type) || type == "0"){
        regExp = /^[가-힣]+$/;
    } else if (type == "1") {
        regExp = /^[가-힣\s]+$/;
    }
    return regExp.test(str);
}

/** 
 * 영문여부 체크
 * @method
 * @param {String} str - 체크할 문자열
 * @param {String} type - 0 또는 입력안할시: 띄어쓰기 불가능, 1: 띄어쓰기 가능
 * @return {Boolean} - 영문여부
*/
const isEnglish = (str, type) => {
    let regExp = null;
    if(isEmpty(type) || type == "0"){
        regExp = /^[a-zA-Z]+$/;
    } else if (type == "1") {
        regExp = /^[a-zA-Z\s]+$/;
    }
    return regExp.test(str);
}

/** 
 * 한글 또는 영문여부 체크
 * @method
 * @param {String} str - 체크할 문자열
 * @param {String} type - 0 또는 입력안할시: 띄어쓰기 불가능, 1: 띄어쓰기 가능
 * @return {Boolean} - 한글 또는 영문여부
*/
const isKorOrEng = (str, type) => {
    let regExp = null;
    if(isEmpty(type) || type == "0"){
        regExp = /^[가-힣a-zA-Z]+$/;
    } else if (type == "1") {
        regExp = /^[가-힣a-zA-Z\s]+$/;
    }
    return regExp.test(str);
}

/** 
 * 이메일형식 여부 체크
 * @method
 * @param {String} str - 체크할 문자열
 * @return {Boolean} - 이메일형식 여부
*/
const isEmail = (str) => {
    let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    return regExp.test(str);
}

/** 
 * 전화번호형식 여부 체크(2~3자리-3~4자리-4자리)
 * @method
 * @param {String} str - 체크할 문자열
 * @return {Boolean} - 전화번호형식 여부
*/
const isPhone = (str) => {
    let regExp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return regExp.test(str);
}

/** 
 * 아이디형식 여부 체크(영문자로 시작하는 6~20자 영문자 또는 숫자)
 * @method
 * @param {String} str - 체크할 문자열
 * @return {Boolean} - 아이디형식 여부
*/
const isId = (str) => {
    let regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    return regExp.test(str);
}

/** 
 * 비밀번호형식 여부 체크(최소 8 자 및 최대 50 자, 대문자 하나 이상, 소문자 하나 이상, 숫자 하나 이상, 특수 문자 하나 이상)
 * @method
 * @param {String} str - 체크할 문자열
 * @return {Boolean} - 이메일형식 여부
*/
const isPassword = (str) => {
    let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%\^&*()-+=?])[A-Za-z\d~`!@#$%\^&*()-+=?]{8,50}/;
    return regExp.test(str);
}

/** 
 * 도메인여부 체크
 * @method
 * @param {String} str - 체크할 문자열
 * @param {String} type - 0 또는 입력안할시: http:// https:// 포함안해도 되고 해도 되고, 1: http:// https:// 꼭 포함, 2: http:// https:// 포함하면 안됨
 * @return {Boolean} - 영문여부
*/
const isDomain = (str, type) => {
    let regExp = null;
    if(isEmpty(type) || type == "0"){
        regExp = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    } else if (type == "1") {
        regExp = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    } else if (type == "2") {
        regExp = /^[^((http(s?))\:\/\/)]([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    }
    return regExp.test(str);
}

export default {
    isEmpty,
    checkType,
    checkAndParseJson,
    getApiServer,
    doFetch,
    getTimeFormat,
    postPicture,
    postDocument,
    getToday,
    getPastDate,
    isNumber,
    isKorean,
    isEnglish,
    isKorOrEng,
    isEmail,
    isPhone,
    isId,
    isPassword,
    isDomain
}