// Initial state for the reducer
const initialState = {
  folders: [],
  selectedFolder: null,
  selectedFile: null,
  reportData: [],
  pageSize: 20,
  currentPage: 1,
  createdBy: '',
  createdOn: '',
};

// Reducer function to manage state
function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, [action.context]: action.payload };
    case 'SET_STATE': {
      return action.payload;
    }
    default:
      return state;
  }
}

export { initialState, reducer };