import React from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MyAccountTemplate from 'templates/MyAccountTemplate';
import { useFirestoreConnect } from 'react-redux-firebase';

const MyAccountPage = ({ userId, requested, requesting }) => {
  useFirestoreConnect([{ collection: 'words', doc: userId }]);
  const words = useSelector(({ firestore: { data } }) => data.words && data.words[userId]);
  const notes = useSelector(({ firestore: { data } }) => data.notes && data.notes[userId]);

  // get words
  let wordsList = [];
  if (!words) {
    wordsList = [];
  } else if (words.words.length === 0) {
    wordsList = [];
  } else if (requested[`words/${userId}`]) {
    wordsList = words.words;
  }
  // get notes
  let notesList = [];
  if (!notes) {
    notesList = [];
  } else if (notes.notes.length === 0) {
    notesList = [];
  } else if (requested[`notes/${userId}`]) {
    notesList = notes.notes;
  }

  return (
    <MyAccountTemplate
      words={wordsList}
      notes={notesList}
      loading={requesting[`words/${userId}`]}
    />
  );
};

MyAccountPage.propTypes = {
  userId: PropTypes.string.isRequired,
  requested: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  requesting: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});

export default connect(mapStateToProps)(MyAccountPage);
