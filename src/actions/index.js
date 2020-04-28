export const removeItem = (itemType, id) => {
  return {
    type: 'REMOVE_ITEM',
    payload: {
      itemType,
      id,
    },
  };
};

export const addItem = (itemType, itemContent) => {
  const getId = () => `_${Math.random().toString(36).substr(2, 9)}`;

  return {
    type: 'ADD_ITEM',
    payload: {
      itemType,
      item: {
        id: getId(),
        ...itemContent,
      },
    },
  };
};

export const updateItem = (itemType, id, itemContent) => {
  return {
    type: 'UPDATE_ITEM',
    payload: {
      itemType,
      item: {
        id,
        ...itemContent,
      },
    },
  };
};
