import { toast } from "react-toastify";

export function openNotificationWithIcon(type, title, desc, redirectToLogin) {
  toast(desc, {
    type: type,
    toastId: "401",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeButton: false,
    onClose: () => {
      if (redirectToLogin) {
        localStorage.clear();
        window.location.href = "/";
      }
    },
  });
}

export function handleResponse(response) {
  return response
    .text()
    .then((text) => {
      const data = text && JSON.parse(text);
      if (data.code === "200") {
        return data;
      } else if (data.code === "201") {
        return data;
      } else if (data.code === "401") {
        openNotificationWithIcon(
          "error",
          "Session Expired",
          "Your session is no longer valid! You will be redirected to login screen.",
          true
        );

        return data;
      } else {
        openNotificationWithIcon("error", "Error", data.message, false);
        return data;
      }
    })
    .catch((e) => e);
}
export function prefixApi() {
  return window.server.url + "/";
}

export function generateCsv(items, fileName) {
  let csv = "";
  //
  for (let row = 0; row < items.length; row++) {
    let keysAmount = Object.keys(items[row]).length;
    let keysCounter = 0;
    if (row === 0) {
      for (let key in items[row]) {
        csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n");
        keysCounter++;
      }
      keysCounter = 0;
      for (let key in items[row]) {
        csv += items[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n");
        keysCounter++;
      }
      keysCounter = 0;
    } else {
      for (let key in items[row]) {
        csv += items[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n");
        keysCounter++;
      }
    }

    keysCounter = 0;
  }

  let link = document.createElement("a");
  link.id = "download-csv";
  link.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(csv)
  );
  //
  link.setAttribute("download", fileName + ".csv");
  document.body.appendChild(link);
  document.querySelector("#download-csv").click();
  document.querySelector("#download-csv").remove();
}

export const inputNumericValidation = (fieldValue) => {
  let valid = true;
  const reg = /^[0-9.]*$/;
  if (reg.test(fieldValue)) {
    valid = true;
  } else {
    valid = false;
    openNotificationWithIcon(
      "error",
      "Error",
      "Enter numeric value only",
      false
    );
  }
  return valid;
};

export function textValidation(fieldName, fieldValue, lengthChar) {
  let error = false;
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    fieldValue.trim().length < 1 ||
    fieldValue.trim() === ""
  ) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} is required`,
      false
    );
  } else if (lengthChar > 0 && fieldValue.trim().length < lengthChar) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} needs to be at least ${lengthChar} characters`,
      false
    );
  }
  return error;
}

export function textValidationWithoutNotification(fieldValue) {
  let error = false;
  if (
    fieldValue === undefined ||
    fieldValue === null
    // ||
    // fieldValue.trim().length < 1 ||
    // fieldValue.trim() === ""
  ) {
    error = true;
  }
  return error;
}

export function numberValidation(fieldName, fieldValue, lengthChar) {
  let error = false;
  // //
  if (
    fieldValue === undefined ||
    fieldValue === "" ||
    fieldValue === null ||
    fieldValue < 0 ||
    isNaN(fieldValue)
  ) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} needs to be a valid number`,
      false
    );
  } else if (lengthChar > 0 && fieldValue.length < lengthChar) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} needs to be at least ${lengthChar} characters`,
      false
    );
  }
  return error;
}

export function emailValidation(fieldName, fieldValue) {
  let error = true;
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    fieldValue.trim().length < 1 ||
    fieldValue.trim() === ""
  ) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} is required`,
      false
    );
  } else if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      fieldValue
    )
  ) {
    error = false;
  } else {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `Please enter a valid ${fieldName}`,
      false
    );
  }
  return error;
}

export function formatDateToDDMMYY(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return dt + "-" + month + "-" + year;
}
export function formatDateToYYMMDD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}
export function formatDateToYYMMDDWithFirstOfEveryMon(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = "01";
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}

export function formatDateToYYMMDDWithLastDayOfEveryPayroll(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = "20";
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}
export function formatDateToYYMM(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month;
}

//added by yasir
export function formatDateStringToYYMMDD(date) {
  let dateArr = date.split("/");
  let day = dateArr[0];
  let month = dateArr[1];
  let year = dateArr[2];
  return year + "-" + month + "-" + day;
}
export function getFirstDayOfMonthYYMMDD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = 1;

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}
export function formatHHMMToDate(timeString, date) {
  if (date === undefined || date === null) {
    date = new Date();
  }

  let timeArr = timeString.split(":");

  date.setHours(timeArr[0]);
  date.setMinutes(timeArr[1]);
  date.setSeconds(0);

  return date;
}

export function formatDateToHHMM(date) {
  // date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return hour + ":" + minutes;
}
export function formatDateToHHMMSS(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return hour + ":" + minutes + ":" + seconds;
}

export function formatDateForTextField(date) {
  // date = new Date(dateString);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return month + "-" + dt + "-" + year;
}

export function formatDateForTextsField(date) {
  // date = new Date(dateString);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dt;
}
export function formatDateToDDMMYY_HHSS(date) {
  // date = new Date(dateString);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return month + "-" + dt + "-" + year + " " + hour + ":" + minutes;
}

export function setTimeToCurrentDate(timeStr) {
  let timeArr = timeStr.split(":");
  //
  let date = new Date();
  date.setHours(timeArr[0]);
  date.setMinutes(timeArr[1]);
  date.setSeconds(0);
  return date;
}

export function getFunctionRightsDetail() {
  let urlArr = window.location.href.split("/");
  let urlKey = urlArr[urlArr.length - 1];
  let funArray = localStorage.getItem("allowed_function");
  let funObj = {};
  if (funArray !== undefined && funArray !== null && funArray.length > 0) {
    let funArrayParse = JSON.parse(funArray);
    // //
    for (let ob of funArrayParse) {
      if (ob.functionLink === urlKey) {
        funObj = ob;
        break;
      }
      if (ob.childList !== undefined && ob.childList.length > 0) {
        for (let obChild of ob.childList) {
          if (obChild.functionLink === urlKey) {
            funObj = obChild;
            break;
          }
        }
      }
    }
  }
  return funObj;
}

export function checkIsLogin() {
  let loggedIn = localStorage.getItem("li");
  //
  return loggedIn;
}

export function checkUserRight() {
  let urlArr = window.location.href.split("/");
  let urlKey = urlArr[urlArr.length - 1];
  let funArray = localStorage.getItem("allowed_function");
  let funObj = {};
  if (funArray !== undefined && funArray !== null && funArray.length > 0) {
    let funArrayParse = JSON.parse(funArray);
    // //
    for (let ob of funArrayParse) {
      if (ob.functionLink === urlKey) {
        funObj = ob;
        break;
      }
      if (ob.childList !== undefined && ob.childList.length > 0) {
        for (let obChild of ob.childList) {
          if (obChild.functionLink === urlKey) {
            funObj = obChild;
            break;
          }
        }
      }
    }
  }

  if (funObj === undefined || funObj === null || funObj.readRight !== 1) {
    openNotificationWithIcon(
      "error",
      "Error",
      `You dont have rights to see this page`,
      true
    );
  }
  return funObj;
}
export function downloadImage(imageUrl) {
  return window.server.url + "/image/downloadImage/" + imageUrl;
}
export function downloadPdf(pdfUrl) {
  return window.server.url + "/image/downloadPdf/" + pdfUrl;
}
// image/downloadFile/{fileUrl}
export function downloadFile(fileUrl) {
  return window.server.url + "/image/downloadFile/" + fileUrl;
}
export function startdateValidation(fieldName, startDate) {
  let error = false;
  let today = new Date().toISOString().split("T")[0];
  // //
  if (startDate === today) {
    //
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} should be greater than today`,
      false
    );
  }
  return error;
}
export function dateValidation(fieldName, fileDate) {
  let error = false;
  if (fileDate === "" || fileDate?.length < 1) {
    //
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} is required`,
      false
    );
  }

  return error;
}

export function greaterDateValidation(
  fieldName,
  startDate,
  endDate,
  fieldName2 = ""
) {
  let error = false;

  if (endDate < startDate) {
    //
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} should be greater than ${fieldName2}`,
      false
    );
  }

  return error;
}
export function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  } else if (hours < 12) {
    hours = `0${hours}`;
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}
export function getHoursAndMin(Time) {
  let startMin = new Date(Time).getMinutes();
  let startHours = new Date(Time).getHours();
  if (startMin < 10) {
    startMin = 0 + "" + new Date(Time).getMinutes();
  }
  if (startHours < 10) {
    startHours = 0 + "" + new Date(Time).getHours();
  }
  let startTime = startHours + ":" + startMin;
  return startTime;
}
export function sortObjectByKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
}
export function keyEnter(id, callApi) {
  document
    .getElementById(`${id}`)
    .addEventListener("keypress", async (event) => {
      if (event.keyCode === 13) {
        await callApi();
      }
    }); //On Enter Key press
}

export function formatDateToDD_MMMM_YYYY_HHSS(date) {
  if (date === undefined || date === null) return "";
  return date.toLocaleString("default", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

export default function formatDateToDDMMYYYY(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return dt + "-" + month + "-" + year;
}

export function timeValidation(fieldName, hours, minutes, seconds) {
  let error = false;
  if (
    (hours === undefined || hours === null || hours === "" || hours === "00") &&
    (minutes === undefined ||
      minutes === null ||
      minutes === "" ||
      minutes === "00") &&
    (seconds === undefined ||
      seconds === null ||
      seconds === "" ||
      seconds === "00")
  ) {
    error = true;
    openNotificationWithIcon(
      "error",
      "Error",
      `${fieldName} is required`,
      false
    );
  }
  return error;
}

export function preTextCurrencyFormatter(currency, sign, decimal) {
  var sansDec = Number(currency !== null ? currency : 0).toFixed(decimal);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + " " + formatted;
}

export function posTextCurrencyFormatter(currency, sign, decimal) {
  var sansDec = Number(currency !== null ? currency : 0).toFixed(decimal);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatted + " " + sign;
}

export function handleResponseWithoutNotification(response) {
  return response
    .text()
    .then((text) => {
      const data = text && JSON.parse(text);
      if (data.code === "200") {
        return data;
      } else if (data.code === "201") {
        return data;
      } else if (data.code === "401") {
        openNotificationWithIcon(
          "error",
          "Session Expired",
          "Your session is no longer valid! You will be redirected to login screen.",
          true
        );

        return data;
      } else {
        return data;
      }
    })
    .catch((e) => e);
}
 

export function inWords(num) {
  let a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  let b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    Number(n[1]) !== 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    Number(n[2]) !== 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lac "
      : "";
  str +=
    Number(n[3]) !== 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    Number(n[4]) !== 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    Number(n[5]) !== 0
      ? (str !== "" ? "and " : "") +
      (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
      "only"
      : "";
  return str;
}

export function customDateComparator(filterLocalDateAtMidnight, cellValue) {
  const cellDate = new Date(cellValue);
  if (
    cellDate.getFullYear() === filterLocalDateAtMidnight.getFullYear() &&
    cellDate.getMonth() === filterLocalDateAtMidnight.getMonth() &&
    cellDate.getDate() === filterLocalDateAtMidnight.getDate()
  ) {
    return 0;
  }
  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }
  if (
    cellDate > filterLocalDateAtMidnight &&
    cellDate < filterLocalDateAtMidnight
  ) {
    return true;
  }

  return null;
}

export const splitStrAndCapFirstLetter = (str) => {
  const splitName = str.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g).join(" ");
  const newStr = splitName.charAt(0).toUpperCase() + splitName.slice(1);
  return newStr;
};
 