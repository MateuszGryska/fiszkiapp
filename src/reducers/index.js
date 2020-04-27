const initialState = {
  words: [
    {
      id: 'fddsfsd',
      english: 'buy',
      polish: 'kupować',
    },
    {
      id: 'ccdd',
      english: 'sell',
      polish: 'sprzedawać',
    },
    {
      id: 'fgfg',
      english: 'shy',
      polish: 'nieśmiały',
    },
  ],
  notes: [
    {
      id: 'aasx',
      created: '19/21/22',
      title: 'Test your notes',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. ',
    },
    {
      id: 'fgdf',
      created: '19/21/22',
      title: 'Test your notes part 2',
      content: 'lorem ipsum si esta bien',
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item.id !== action.payload.id),
        ],
      };
    case 'ADD_ITEM':
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
      };
    default:
      return state;
  }
};

export default rootReducer;
