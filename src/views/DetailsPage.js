import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { useFirestoreConnect } from 'react-redux-firebase';
import { format } from 'date-fns';

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

    // format created date
    const itemDate = format(activeItem[0].created.toDate(), 'dd.mm.yyyy p');

    return (
      <DetailsTemplate
        title={activeItem[0].title}
        content={activeItem[0].content}
        created={itemDate}
      />
    );
  }

  return null;
};

DetailsPage.propTypes = {
  userId: PropTypes.string.isRequired,
  requested: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requested: firestore.status.requested,
});

export default withContext(connect(mapStateToProps)(DetailsPage));
