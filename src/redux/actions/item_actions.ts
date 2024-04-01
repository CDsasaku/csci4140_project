import { AppThunk } from '../store/store';
import { getItemsFailure, getItemsStart, getItemsSuccess, getItemStart, getItemSuccess, getItemFailure  } from '../slices/item_slice';
import apis from '../../api/api_service';

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

}

const itemAction = new ItemAction();

export default itemAction;