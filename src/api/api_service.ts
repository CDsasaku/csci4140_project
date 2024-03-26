import ApiService from './api';
import { setupInterceptors } from './interceptors';
import UserApi from './user_api';

class APIs {
    private readonly apiService: ApiService;
    public readonly user: UserApi;

    constructor() {
        this.apiService = new ApiService();
        this.user = new UserApi(this.apiService);
        setupInterceptors(this.apiService);
    }

    setToken(token: string): void {
        this.apiService.setToken(token);
    }
}

const apis = new APIs();
export default apis;