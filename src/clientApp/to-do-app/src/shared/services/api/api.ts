import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import config from "config";
import Auth from "../Auth";
import { CreateTodoPayload, LoginPayload, RegisterPayload } from "./api.types";

class Api {
   protected api: AxiosInstance = axios.create({ baseURL: config.apiUrl });

   constructor() {
      this.api.interceptors.request.use(this.authenticate);
      this.api.interceptors.request.use((config) => {
         config.withCredentials = true;
         return config;
      });
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

   public async login(user: LoginPayload) {
      const response = await this.api.post<LoginPayload>(
         "/api/auth/login",
         user
      );
      return response;
   }
}

export default Api;
