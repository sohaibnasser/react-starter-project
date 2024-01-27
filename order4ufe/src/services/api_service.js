import { openNotificationWithIcon } from "../utils/utils";

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
  
  
  export async function getCallRequest(url) {
    const requestOptions = { method: "GET", credentials: "include" };
    const response = await fetch(
      window.server.url + url,
      requestOptions
    ).then(handleResponse);
    const json = await response;
    return json;
  }
  
  
  
  export async function postCallRequest(url, data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(
        window.server.url  + url,
      requestOptions
    ).then(handleResponse);
    const json = await response;
    return json;
  }
  
  