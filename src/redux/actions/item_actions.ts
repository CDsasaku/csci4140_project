import { AppThunk } from '../store/store';
import { getItemsFailure, getItemsStart, getItemsSuccess, getItemStart, getItemSuccess, getItemFailure, createItemStart, createItemSuccess, createItemFailure, updateItemStart, updateItemSuccess, updateItemFailure, deleteItemStart, deleteItemSuccess, deleteItemFailure, getCategoryStart, getCategorySuccess, getCategoryFailure, getRequestsFailure, getRequestsStart, getRequestsSuccess, createRequestStart, createRequestSuccess, getRequestStart, getRequestFailure, getRequestSuccess, updateRequestStatusStart, updateRequestStatusSuccess, updateRequestStatusFailure, getAvailableItemsStart, getAvailableItemsSuccess, getAvailableItemsFailure, updateRequestsFailure, updateRequestsStart, updateRequestsSuccess, getSelectedItemIds, getProfileItemsSuccess  } from '../slices/item_slice';
import apis from '../../api/api_service';
import { Asset } from 'react-native-image-picker';
import { navigateBack, navigateBackTwoPages } from '../../navigations/navigation_service';
import { ItemStatus, RequestStatus } from '../../constants/types';

class ItemAction {
    getItems = (categoryId?: number | null, keyword?: string | null, status?: ItemStatus | null, uid?: number | null, isProfile?: boolean): AppThunk => async (dispatch) => {
        try {
            dispatch(getItemsStart());
            const items = await apis.item.getItems(categoryId, keyword, status, uid);
            if (isProfile) {
                dispatch(getProfileItemsSuccess(items));
            } else {
                dispatch(getItemsSuccess(items));
            }
        } catch (error) {
            console.log(error);
            dispatch(getItemsFailure(error as string));
        }
    }

    getItem = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getItemStart());
            const item = await apis.item.getItem(id);
            dispatch(getItemSuccess(item));
        } catch (error) {
            console.log(error);
            dispatch(getItemFailure(error as string));
        }
    }

    createItem = (
        name: string,
        description: string,
        condition: string,
        categoryId: number,
        image: Asset,
        uid: number,
        wishlist: string,
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(createItemStart());
            const item = await apis.item.createItem(name, description, condition, categoryId, image, uid, wishlist);
            dispatch(createItemSuccess(item));
            navigateBack();
        } catch (error) {
            console.log(error);
            dispatch(createItemFailure(error as string));
        }
    }

    updateItem = (
        id: number,
        name: string,
        description: string,
        condition: string,
        categoryId: number,
        uid: number,
        wishlist: string,
        image?: Asset,
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(updateItemStart());
            const item = await apis.item.updateItem(id, name, description, condition, categoryId, uid, wishlist,image);
            dispatch(updateItemSuccess(item));
            navigateBack();
        } catch (error) {
            console.log(error);
            dispatch(updateItemFailure(error as string));
        }
    }

    deleteItem = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(deleteItemStart());
            await apis.item.deleteItem(id);
            dispatch(deleteItemSuccess(id));
            navigateBackTwoPages();
        } catch (error) {
            console.log(error);
            dispatch(deleteItemFailure(error as string));
        }
    }

    getCategories = (): AppThunk => async (dispatch) => {
        try {
            dispatch(getCategoryStart());
            const categories = await apis.item.getCategories();
            dispatch(getCategorySuccess(categories));
        } catch (error) {
            console.log(error);
            dispatch(getCategoryFailure(error as string));
        }
    }

    getAvailableItems = ( itemId: number, uid: number ): AppThunk => async (dispatch) => {
        try {
            dispatch(getAvailableItemsStart());
            const items = await apis.item.getItems(null, null, ItemStatus.AVAILABLE, uid);
            const requests = await apis.request.getRequests(itemId, uid);
            const selectedItemsIds = requests.map((request) => request.availableItemId);
            dispatch(getAvailableItemsSuccess(items));
            dispatch(getSelectedItemIds(selectedItemsIds));
        } catch (error) {
            console.log(error);
            dispatch(getAvailableItemsFailure(error as string));
        }
    }

    getRequests = (itemId: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getRequestsStart());
            const items = await apis.request.getRequests(itemId);
            dispatch(getRequestsSuccess(items));
        } catch (error) {
            dispatch(getRequestsFailure(error as string));
        }
    }

    getRequest = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getRequestStart());
            const request = await apis.request.getRequest(id);
            dispatch(getRequestSuccess(request));
        } catch (error) {
            console.log(error);
            dispatch(getRequestFailure(error as string));
        }
    }

    updateRequestStatus = (id: number, status: RequestStatus): AppThunk => async (dispatch) => {
        try {
            dispatch(updateRequestStatusStart());
            const request = await apis.request.updateRequestStatus(id, status);
            dispatch(updateRequestStatusSuccess(request));
            navigateBack()
        } catch (error) {
            console.log(error);
            dispatch(updateRequestStatusFailure(error as string));
        }
    }

    updateRequests = (uid: number, itemId: number, availableItemId: number[]): AppThunk => async (dispatch) => {
        try {
            dispatch(updateRequestsStart());
            await apis.request.updateRequests(uid, itemId, availableItemId);
            dispatch(updateRequestsSuccess());
        } catch (error) {
            console.log(error);
            dispatch(updateRequestsFailure(error as string));
        }
    }

    createRequests = (uid: number, itemId: number, availableItemId: number[]): AppThunk => async (dispatch) => {
        try {
            dispatch(createRequestStart());
            await apis.request.createRequests(uid, itemId, availableItemId);
            dispatch(createRequestSuccess());
        } catch (error) {
            console.log(error);
            dispatch(createItemFailure(error as string));
        }
    }

    deleteRequest = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(deleteItemStart());
            const request = await apis.request.deleteRequest(id);
            dispatch(deleteItemSuccess(id));
        } catch (error) {
            console.log(error);
            dispatch(deleteItemFailure(error as string));
        }
    }

}

const itemAction = new ItemAction();

export default itemAction;