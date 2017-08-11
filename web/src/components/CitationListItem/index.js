import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router-dom';
// import { fetchCitation } from '../../actions/citations';
// import MatchAuthenticated from '../../components/MatchAuthenticated';

const styles = StyleSheet.create({
  link: {
    color: 'var(--palette-med-gray)',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1500px',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

type Props = {
  citation: {
    id: number,
    title: string,
    source: string,
    quote: string,
    user_id: number
  },
  
  currentUserCitationIds: Array
};

const CitationListItem = ({ citation, currentUserCitationIds, c }: Props) => {
  return (
    <div key={citation.id} className={`card ${css(styles.card)}`}>
      <Link className={css(styles.link)} to={`/user/${citation.user_id}/citations/${citation.id}`}>
        <h2>{citation.title}</h2>
      </Link>
      <span>{citation.user_id} - {citation.id}</span>
      <span>{citation.source}</span>
      <span>{citation.quote}</span>
    </div>
  );
};

export default CitationListItem;