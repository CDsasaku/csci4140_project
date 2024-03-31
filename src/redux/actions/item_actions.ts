import { AppThunk } from '../store/store';
import { getItemsFailure, getItemsStart, getItemsSuccess } from '../slices/item_slice';
import apis from '../../api/api_service';

class ItemAction {

    getItem = (): AppThunk => async (dispatch) => {
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

}

const itemAction = new ItemAction();

export default itemAction;