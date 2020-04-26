const initialState = {
  words: [
    {
      id: '1',
      english: 'buy',
      polish: 'kupować',
    },
    {
      id: '2',
      english: 'sell',
      polish: 'sprzedawać',
    },
    {
      id: '3',
      english: 'shy',
      polish: 'nieśmiały',
    },
  ],
  notes: [
    {
      id: '1',
      created: '19/21/22',
      title: 'Test your notes',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. ',
    },
    {
      id: '2',
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
    default:
      return state;
  }
};

export default rootReducer;
