import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "config";
import Auth from "../Auth";
import { CreateTodoPayload, RegisterPayload } from "./api.types";

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

   public async registerUser(user: RegisterPayload) {
      const response = await this.api.post<RegisterPayload>(
         "/api/users/add",
         user
      );
      return response;
   }
}

export default Api;
