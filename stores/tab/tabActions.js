export const SET_TRADE_MODAL_VISIBILITY = "SET_TRADE_MODAL_VISIBILITY"

export const setTradeModalvisibilitySuccess = (isVisible) => ({
    type: SET_TRADE_MODAL_VISIBILITY,
    payload: {isVisible}
})

export function setTradeModalvisibility(isVisible) {
    return dispatch => {
        dispatch(setTradeModalvisibilitySuccess(isVisible))
    }
}
