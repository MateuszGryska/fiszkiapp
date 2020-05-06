import React from 'react';
import { connect, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import TableTemplate from 'templates/TableTemplate';
import { useFirestoreConnect } from 'react-redux-firebase';

const TablePage = ({ userId, requested, requesting }) => {
  useFirestoreConnect([
    { collection: 'words', doc: userId }, // or `todos/${props.todoId}`
  ]);
  const words = useSelector(({ firestore: { data } }) => data.words && data.words[userId]);

  let wordsList = [];
  if (!words) {
    wordsList = [];
  } else if (words.words.length === 0) {
    wordsList = [];
  } else if (requested[`words/${userId}`]) {
    wordsList = words.words;
  }

  return <TableTemplate words={wordsList} loading={requesting[`words/${userId}`]} />;
};

// TablePage.propTypes = {
//   words: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       polish: PropTypes.string.isRequired,
//       english: PropTypes.string.isRequired,
//     }),
//   ),
// };

// TablePage.defaultProps = {
//   words: [],
// };

const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  requesting: firestore.status.requesting,
  requested: firestore.status.requested,
});
export default connect(mapStateToProps)(TablePage);
