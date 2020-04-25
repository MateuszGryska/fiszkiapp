const initialState = {
  words: [
    {
      id: 1,
      english: 'buy',
      polish: 'kupować',
    },
    {
      id: 2,
      english: 'sell',
      polish: 'sprzedawać',
    },
    {
      id: 3,
      english: 'shy',
      polish: 'nieśmiały',
    },
  ],
  notes: [
    {
      id: 1,
      created: '19/21/22',
      title: 'Test your notes',
      content: 'lorem ipsum si esta bien',
    },
    {
      id: 2,
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
