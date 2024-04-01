import { AppThunk } from '../store/store';
import { getItemsFailure, getItemsStart, getItemsSuccess, getItemStart, getItemSuccess, getItemFailure, createItemStart, createItemSuccess, createItemFailure, updateItemStart, updateItemSuccess, updateItemFailure, deleteItemStart, deleteItemSuccess, deleteItemFailure  } from '../slices/item_slice';
import apis from '../../api/api_service';
import { Asset } from 'react-native-image-picker';
import { navigateBack, navigateBackTwoPages } from '../../navigations/navigation_service';

class ItemAction {

    getItems = (): AppThunk => async (dispatch) => {
        try {
            dispatch(getItemsStart());
            const items = await apis.item.getItems();
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
        image: Asset,
        uid: number,
        wishlist: string,
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(createItemStart());
            const item = await apis.item.createItem(name, description, condition, image, uid, wishlist);
            console.log(item);
            dispatch(createItemSuccess(item));
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
        uid: number,
        wishlist: string,
        image?: Asset,
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(updateItemStart());
            const item = await apis.item.updateItem(id, name, description, condition, uid, wishlist,image);
            console.log(item);
            dispatch(updateItemSuccess(item));
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

}

const itemAction = new ItemAction();

export default itemAction;