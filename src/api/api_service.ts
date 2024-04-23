import ApiService from './api';
import { setupInterceptors } from './interceptors';
import ItemApi from './item_api';
import MessageApi from './message_api';
import NotificationApi from './notification_api';
import RequestApi from './request_api';
import UserApi from './user_api';

class APIs {
    private readonly apiService: ApiService;
    public readonly user: UserApi;
    public readonly item: ItemApi;
    public readonly message: MessageApi;
    public readonly request: RequestApi;
    public readonly notification: NotificationApi;

    constructor() {
        this.apiService = new ApiService();
        this.user = new UserApi(this.apiService);
        this.item = new ItemApi(this.apiService);
        this.message = new MessageApi(this.apiService);
        this.request = new RequestApi(this.apiService);
        this.notification = new NotificationApi(this.apiService);
        setupInterceptors(this.apiService);
    }

    setToken(token: string): void {
        this.apiService.setToken(token);
    }
}

const apis = new APIs();
export default apis;