import axios from "axios"
import { API_URL } from "../const/api.const";

const clienteAxios = axios.create({
  baseURL: API_URL,
});

clienteAxios.interceptors.request.use(
  (config) => {
    // const objToken = AUTH_TOKEN.get();
    // try {
    //   if (objToken) {
    //     config.headers.Authorization = `Bearer ${objToken.token}`;
    //     if (objToken.isAdmin) {
    //       const url_words = config.url.split("/");
    //       const searchIndexApi = url_words.indexOf("api");
    //       if (searchIndexApi === -1) return config;
    //       url_words.splice(searchIndexApi + 1, 0, "admin");
    //       const newStringUrl = url_words.join("/");
    //       config.url = newStringUrl;
    //     }
    //   } else {
    //     AUTH_TOKEN.remove();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    return {...config, headers: {
      "Content-Type": "multipart/form-data"
    }};
    // return config
  },
  (e) => {
    return Promise.reject(e);
  }
);

clienteAxios.interceptors.response.use(
  (response) => {
    const {data} = response;

    if(data.ok){
        return data;
    }else{
        throw ({
            message: data.msg
        });
        // return Promise.reject({
        //   data,
        //   message: data.msg
        // });
    }

  },
  (error) => {
    // La respuesta fue hecha y el servidor respondió con un código de estado
    // que esta fuera del rango de 2xx
    if (error.response) {
      const { response } = error;
      return Promise.reject({
        ...response.data,
        status: response.status,
        message: response.message, 
      });
      // if (error.response.status === 401) {
      //     AUTH_TOKEN.remove();
      //     //   window.location.href = "/";
      // }
    }
    // else if (error.request) {
    //   // La petición fue hecha pero no se recibió respuesta
    //   // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
    //   // http.ClientRequest en node.js
    //   console.log(error.request);
    //   console.log(error.code);
    //   return Promise.reject({
    //     message: "No se recibió respuesta del servidor, intentelo más tarde",
    //     status: 500,
    //   });
    // }
    else {
      return Promise.reject({
        // message: "Canceled request",
        ...error,
        status: error.code === "ERR_CANCELED" ? 0 : 1,
      });
    }
  }
);

 

export{ 
    clienteAxios
}