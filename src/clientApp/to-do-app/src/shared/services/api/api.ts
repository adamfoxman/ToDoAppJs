import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "config";
import Auth from "../Auth";
import { CreateTodoPayload } from "./api.types";

class Api {
   protected api: AxiosInstance = axios.create({ baseURL: config.apiUrl });

   constructor() {
      this.api.interceptors.request.use(this.authenticate);
   }

   private authenticate(config: InternalAxiosRequestConfig) {
      const token = Auth.getToken();
      if (token && config.headers)
         config.headers.Authorization = `Bearer ${token}`;
      return config;
   }

   public async addTodo(task: CreateTodoPayload) {
      const response = await this.api.post<CreateTodoPayload>(
         "/api/tasks/add",
         task
      );
      return response;
   }
}

export default Api;
