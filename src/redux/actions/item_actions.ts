import { AppThunk } from '../store/store';
import { getItemsFailure, getItemsStart, getItemsSuccess, getItemStart, getItemSuccess, getItemFailure, createItemStart, createItemSuccess, createItemFailure, updateItemStart, updateItemSuccess, updateItemFailure, deleteItemStart, deleteItemSuccess, deleteItemFailure, getCategoryStart, getCategorySuccess, getCategoryFailure, getRequestsFailure, getRequestsStart, getRequestsSuccess, createRequestStart, createRequestSuccess, getRequestStart, getRequestFailure, getRequestSuccess  } from '../slices/item_slice';
import apis from '../../api/api_service';
import { Asset } from 'react-native-image-picker';
import { navigateBack, navigateBackTwoPages } from '../../navigations/navigation_service';

class ItemAction {

    getItems = (categoryId?: number | null, keyword?: string | null): AppThunk => async (dispatch) => {
        try {
            dispatch(getItemsStart());
            const items = await apis.item.getItems(categoryId, keyword);
            console.log(items);
            dispatch(getItemsSuccess(items));
        } catch (error) {
            console.log(error);
            dispatch(getItemsFailure(error as string));
        }
    }

    getItem = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getItemStart());
            console.log('test');
            const item = await apis.item.getItem(id);
            console.log(item);
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
            console.log(item);
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
            console.log(item);
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
            const item = await apis.item.deleteItem(id);
            console.log(item);
            dispatch(deleteItemSuccess(id));
        } catch (error) {
            console.log(error);
            dispatch(deleteItemFailure(error as string));
        }
    }

    getCategories = (): AppThunk => async (dispatch) => {
        try {
            dispatch(getCategoryStart());
            const categories = await apis.item.getCategories();
            console.log(categories);
            dispatch(getCategorySuccess(categories));
        } catch (error) {
            console.log(error);
            dispatch(getCategoryFailure(error as string));
        }
    }

    getRequests = (itemId: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getRequestsStart());
            const items = await apis.request.getRequests(itemId);
            console.log(items);
            dispatch(getRequestsSuccess(items));
        } catch (error) {
            console.log(error);
            dispatch(getRequestsFailure(error as string));
        }
    }

    getRequest = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getRequestStart());
            console.log('test');
            const item = await apis.item.getItem(id);
            console.log(item);
            dispatch(getRequestSuccess(item));
        } catch (error) {
            console.log(error);
            dispatch(getRequestFailure(error as string));
        }
    }

    createRequest = (uid: number, itemId: number, availableItemId: number): AppThunk => async (dispatch) => {
        try {
            dispatch(createRequestStart());
            const request = await apis.request.createRequest(uid, itemId, availableItemId);
            console.log(request);
            dispatch(createRequestSuccess(request));
        } catch (error) {
            console.log(error);
            dispatch(createItemFailure(error as string));
        }
    }

    deleteRequest = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(deleteItemStart());
            const request = await apis.request.deleteRequest(id);
            console.log(request);
            dispatch(deleteItemSuccess(id));
        } catch (error) {
            console.log(error);
            dispatch(deleteItemFailure(error as string));
        }
    }

}

const itemAction = new ItemAction();

export default itemAction;