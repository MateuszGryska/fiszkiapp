import React from 'react';
// import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { useFirestoreConnect } from 'react-redux-firebase';

const DetailsPage = ({ userId, requested, match }) => {
  useFirestoreConnect([{ collection: 'notes', doc: userId }]);
  const notes = useSelector(({ firestore: { data } }) => data.notes && data.notes[userId]);

  let activeItem = {};
  if (!notes) {
    activeItem = {};
  } else if (notes.notes.length === 0) {
    activeItem = {};
  } else if (requested[`notes/${userId}`]) {
    const items = notes.notes;
    activeItem = items.filter((item) => item.id === match.params.id);
    return (
      <DetailsTemplate
        title={activeItem[0].title}
        content={activeItem[0].content}
        created={activeItem[0].created}
      />
    );
  }

  return null;
};

// DetailsTemplate.propTypes = {
//   activeItem: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       content: PropTypes.string.isRequired,
//       created: PropTypes.string.isRequired,
//     }),
//   ),
// };

// DetailsTemplate.defaultProps = {
//   activeItem: [],
// };

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});

export default withContext(connect(mapStateToProps)(DetailsPage));
