// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  product: [],
  total: 0.0,
  opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    case actionTypes.SET_PRODUCT:
      state = {
        ...state,
        product: state.product.filter((res) => res.id_product != action.product.id_product)
      };
      return {
        ...state,
        product: [...state.product, action.product] //state.product.concat(action.product)
      };
    case actionTypes.SET_TOTAL:
      return {
        ...state,
        total: action.total
      };

    default:
      return state;
  }
};

export default customizationReducer;
